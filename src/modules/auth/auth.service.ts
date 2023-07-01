import { Injectable } from '@nestjs/common';

import { TokensService } from '../tokens/tokens.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { ValidUserDto } from '../users/dtos/valid-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async register(dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  async login(user: ValidUserDto) {
    const tokens = await this.tokensService.generateTokens(user.email, user.id);
    await this.tokensService.save(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(user: any) {
    return await this.tokensService.delete(user.id);
  }

  async refreshToken(user: ValidUserDto) {
    const tokens = await this.tokensService.generateTokens(user.email, user.id);
    await this.tokensService.save(user.id, tokens.refreshToken);
    return tokens;
  }
}
