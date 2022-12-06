import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from './auth/jwt.guard';

@Controller('/test')
export class AppController {
  @Get('/hello')
  @UseGuards(JwtAuthenticationGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  helloWorld() {
    return 'Hello World';
  }
}
