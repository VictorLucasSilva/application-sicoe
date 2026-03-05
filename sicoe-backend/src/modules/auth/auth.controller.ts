import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import type { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { MsalStrategy } from './strategies/msal.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly msalStrategy: MsalStrategy,
  ) {}


  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }


  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }


  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }


  @Get('profile')
  async getProfile(@CurrentUser() user: any): Promise<any> {
    return {
      userId: user.userId,
      username: user.username,
      roles: user.roles,
    };
  }


  @Public()
  @Get('entraid/login')
  async entraidLogin(@Res() res: Response): Promise<void> {
    try {
      const authUrl = await this.msalStrategy.getAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Erro ao iniciar autenticação com EntraID',
        error: error.message,
      });
    }
  }


  @Public()
  @Get('entraid/callback')
  async entraidCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {

      const msalUser = await this.msalStrategy.validate(req);


      const authResponse = await this.authService.loginWithEntraId(msalUser);


      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173';
      const redirectUrl = `${frontendUrl}/auth/callback?token=${authResponse.access_token}`;

      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Erro no callback do EntraID:', error);
      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
    }
  }
}
