import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  getAccessTokenLongLife,
  getRefreshTokenLongLife,
} from '../../configs/jwt.config';
import { Token } from './models/token.model';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(email: string, id: string) {
    const payload = { email, id };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: getAccessTokenLongLife() + 'm',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: getRefreshTokenLongLife() + 'd',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async save(id: string, refreshToken: string) {
    const token = new this.tokenModel({
      user: id,
      refreshToken,
    });
    return token.save();
  }

  async delete(id: string) {
    return this.tokenModel.findByIdAndDelete(id).exec();
  }
}
