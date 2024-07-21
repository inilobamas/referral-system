import { Controller, Get, Put, Body, Delete, Param,Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { UsersService } from './users.service';
import { User } from './user.entity';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'List of all users' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiResponse({ status: 200, description: 'User object' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Get(':id/referrals')
  @Roles(Role.User, Role.Admin)
  @ApiResponse({ status: 200, description: 'List of users referred by the user' })
  async findReferrals(@Param('id') id: number) {
    return this.usersService.findReferrals(id);
  }

  @Put(':id')
  @Roles(Role.User, Role.Admin)
  @ApiBody({
    schema: {
      example: {
        username: 'newuser',
        password: 'newpassword',
        referralCode: 'newReferralCode',
        referralBy: 'existingReferralCode',
        earnings: 100,
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Updated user object' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async update(@Param('id') id: number, @Body() updateUserDto: Partial<User>) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
