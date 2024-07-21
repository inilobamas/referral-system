import { Controller, Get, Post, Delete, Body,  Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { PurchasesService } from './purchases.service';

@ApiTags('Purchases')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'List of all purchases' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.purchasesService.findAll(page, limit);
  }


  @Post()
  @Roles(Role.User, Role.Admin)
  @ApiBody({ schema: { example: { userId: 'user_id', amount: 100 } } })
  @ApiResponse({ status: 201, description: 'Created purchase object and updated referral earnings' })
  async create(@Body() body: { userId: number, amount: number }) {
    return this.purchasesService.create(body.userId, body.amount);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiResponse({ status: 204, description: 'Purchase deleted successfully' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async delete(@Param('id') id: number) {
    await this.purchasesService.deletePurchase(id);
  }
}