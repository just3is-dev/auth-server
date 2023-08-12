import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import {
  getCookieOptions,
  REFRESH_TOKEN_COOKIE,
} from '../../configs/cookie.config';
import { getRefreshTokenExpiredDate } from '../../configs/jwt.config';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { ValidUserDto } from '../users/dtos/valid-user.dto';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiCreatedResponse({
    description: 'Create user with email and password',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: HttpException,
  })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user as ValidUserDto,
    );

    res.cookie(
      REFRESH_TOKEN_COOKIE,
      refreshToken,
      getCookieOptions(getRefreshTokenExpiredDate()),
    );

    return { accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.user);
    res.clearCookie(REFRESH_TOKEN_COOKIE);
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  @Get('refresh_token')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      req.user as ValidUserDto,
    );

    res.cookie(
      REFRESH_TOKEN_COOKIE,
      refreshToken,
      getCookieOptions(getRefreshTokenExpiredDate()),
    );

    return { accessToken };
  }
}
