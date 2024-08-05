import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  // @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
