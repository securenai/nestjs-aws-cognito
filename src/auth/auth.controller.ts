import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateRequestDto } from './dto/authenticate.request.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { ConfirmSignupRequestDto } from './dto/confirmSignup.request.dto';
import { LogoutRequestDto } from './dto/logout.request.dto';
import { RedirectRequestDto } from './dto/redirect.request.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private userAuthInfo: any;

  @Post('register')
  async register(@Body() registerRequest: RegisterRequestDto) {
    try {
      console.log('register');
      return await this.authService.register(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('authenticate')
  async authenticate(@Body() authenticateRequest: AuthenticateRequestDto) {
    try {
      return await this.authService.authenticate(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('confirmSignup')
  async confirmSignup(@Body() confirmSignupRequest: ConfirmSignupRequestDto) {
    try {
      return await this.authService.confirmSignup(confirmSignupRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('globalSignOut')
  async globalSignOut(@Body() logoutRequest: LogoutRequestDto) {
    try {
      return await this.authService.globalSignOut(logoutRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Get('logout')
  async logout() {
    try {
      return await this.authService.logout();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('redirect')
  async redirect(@Body() redirectRequest: RedirectRequestDto) {
    try {
      console.log(redirectRequest);
      // return await this.authService.redirect(redirectRequest);
      const { idToken, accessToken, expiresIn } = redirectRequest;
      console.log(idToken, accessToken, expiresIn);
      this.userAuthInfo = {
        idToken,
        accessToken,
        expiresIn,
      };
      // return await this.authService.redirect();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  // @Get('redirect')
  // async redirect(@Req() request: Request) {
  //   try {
  //     console.log('params', request.params);
  //     console.log('query', request.query);
  //     return { ...request.params, ...request.query };

  //     // return await this.authService.redirect();
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }
  // @Post('globalSignOut')
  // async globalSignOut(@Body() globalSignOutRequest: GlobalSignOutRequestDto) {
  //   try {
  //     return await this.authService.globalSignOut(globalSignOutRequest);
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }
}
