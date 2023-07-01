import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Get('health')
  async health() {
    return this.appService.checkHealth();
  }
}
