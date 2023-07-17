import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateRequestDto } from './dto/authenticate.request.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { ConfirmSignupRequestDto } from './dto/confirmSignup.request.dto';
import { LogoutRequestDto } from './dto/logout.request.dto';
import { AwsCSCallbackDto } from './dto/awsCSCallback.request.dto';
import { RedirectRequestDto } from './dto/redirect.request.dto';
import { ResendCodeRequestDto } from './dto/resendCode.request.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private userAuthInfo: any;

  @Get('stormHome')
  async signinCallback(@Req() req: Request) {
    try {
      console.log('test-storm-home');
      const data = {
        heroBackgroundMedia: {
          type: 'image',
          src: 'https://res.cloudinary.com/dfkw9hdq3/image/upload/v1689612267/CI-Temp/hero.png',
        },
        featureBackgroundMedia: {
          type: 'image',
          src: 'https://res.cloudinary.com/dfkw9hdq3/image/upload/v1689612469/CI-Temp/feature_bg.png',
        },
        planPrices: {
          planPay: '$0.99',
          planSub: '$9.99',
        },
        GameGalleryImages: {
          cat1: [
            'https://source.unsplash.com/random?sig=1g',
            'https://source.unsplash.com/random?sig=2g',
            'https://source.unsplash.com/random?sig=3g',
            'https://source.unsplash.com/random?sig=4g',
            'https://source.unsplash.com/random?sig=5g',
            'https://source.unsplash.com/random?sig=6g',
            'https://source.unsplash.com/random?sig=7g',
            'https://source.unsplash.com/random?sig=8g',
          ],
          cat2: [
            'https://source.unsplash.com/random?sig=9g',
            'https://source.unsplash.com/random?sig=10g',
            'https://source.unsplash.com/random?sig=11g',
            'https://source.unsplash.com/random?sig=12g',
            'https://source.unsplash.com/random?sig=13g',
            'https://source.unsplash.com/random?sig=14g',
            'https://source.unsplash.com/random?sig=15g',
            'https://source.unsplash.com/random?sig=16g',
          ],
          cat3: [
            'https://source.unsplash.com/random?sig=17g',
            'https://source.unsplash.com/random?sig=18g',
            'https://source.unsplash.com/random?sig=19g',
            'https://source.unsplash.com/random?sig=20g',
            'https://source.unsplash.com/random?sig=21g',
            'https://source.unsplash.com/random?sig=22g',
            'https://source.unsplash.com/random?sig=23g',
            'https://source.unsplash.com/random?sig=24g',
          ],
          cat4: [
            'https://source.unsplash.com/random?sig=25g',
            'https://source.unsplash.com/random?sig=26g',
            'https://source.unsplash.com/random?sig=27g',
            'https://source.unsplash.com/random?sig=28g',
            'https://source.unsplash.com/random?sig=29g',
            'https://source.unsplash.com/random?sig=30g',
            'https://source.unsplash.com/random?sig=31g',
            'https://source.unsplash.com/random?sig=32g',
          ],
          cat5: [
            'https://source.unsplash.com/random?sig=33g',
            'https://source.unsplash.com/random?sig=34g',
            'https://source.unsplash.com/random?sig=35g',
            'https://source.unsplash.com/random?sig=36g',
            'https://source.unsplash.com/random?sig=37g',
            'https://source.unsplash.com/random?sig=38g',
            'https://source.unsplash.com/random?sig=39g',
            'https://source.unsplash.com/random?sig=40g',
          ],
        },
        CarouselImages: [
          'https://res.cloudinary.com/dfkw9hdq3/image/upload/v1688580459/CI-Temp/Banner_bmmtfm.png',
          'https://res.cloudinary.com/dfkw9hdq3/image/upload/v1688580459/CI-Temp/Banner_bmmtfm.png',
          'https://res.cloudinary.com/dfkw9hdq3/image/upload/v1688580459/CI-Temp/Banner_bmmtfm.png',
          'https://res.cloudinary.com/dfkw9hdq3/image/upload/v1688580459/CI-Temp/Banner_bmmtfm.png',
          'https://res.cloudinary.com/dfkw9hdq3/image/upload/v1688580459/CI-Temp/Banner_bmmtfm.png',
        ],
      };
      return data;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('awscognito/signinCallback')
  async awsCognitoSigninCallback(@Body() id: AwsCSCallbackDto) {
    if (this.userAuthInfo && this.userAuthInfo.accessToken) {
      const userInfo = this.userAuthInfo;
      this.userAuthInfo = '';
      return userInfo;
    } else return { status: 403, msg: 'awaiting login to be authenticated' };
  }

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

  @Post('resendCode')
  async resendCode(@Body() resendCodeRequest: ResendCodeRequestDto) {
    try {
      return await this.authService.resendCode(resendCodeRequest);
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
    console.log(redirectRequest);
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
