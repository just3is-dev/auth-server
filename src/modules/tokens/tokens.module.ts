import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { Token, TokenSchema } from './models/token.model';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
