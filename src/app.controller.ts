// import { Controller, Get, UseGuards } from '@nestjs/common';
// import JwtAuthenticationGuard from './auth/jwt.guard';

// @Controller('/test')
// export class AppController {
//   @Get('/hello')
//   @UseGuards(JwtAuthenticationGuard)
//   helloWorld() {
//     return 'Hello World';
//   }
// }

import { Controller, Get, Render } from '@nestjs/common';
// import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  userPool: string;
  clientId: string;
  url: string;
  constructor(
    // private readonly appService: AppService,
    private configService: ConfigService,
  ) {
    this.userPool = this.configService.get<string>('AWS_COGNITO_USER_POOL_ID');
    this.clientId = this.configService.get<string>('AWS_COGNITO_CLIENT_ID');
    this.url = this.configService.get<string>('DOMAIN') + '/auth/authenticate';
  }

  @Get('/login')
  @Render('login')
  root() {
    return {
      title: 'Login',
      userPool: this.userPool,
      clientId: this.clientId,
      url: this.url,
    };
  }

  @Get('/register')
  @Render('register')
  registerPage() {
    return;
  }

  @Get('/verification')
  @Render('verification')
  verificationPage() {
    return;
  }
}
