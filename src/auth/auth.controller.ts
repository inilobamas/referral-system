import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth-guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.enum';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ schema: { example: { username: 'user', password: 'password', referralCode: 'optionalReferralCode', roles: [Role.User, Role.Admin] } } })
  @ApiResponse({ status: 201, description: 'Created user object including a unique referral code' })
  async register(@Body() body: { username: string, password: string, referralCode?: string, roles: [Role.User, Role.Admin] }) {
    return this.authService.register(body.username, body.password, body.referralCode, body.roles);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ schema: { example: { username: 'user', password: 'password' } } })
  @ApiResponse({ status: 200, description: 'JWT token' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}