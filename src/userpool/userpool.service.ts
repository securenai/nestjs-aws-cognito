import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import {
  CognitoIdentityProviderClient,
  DescribeUserPoolCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { DescribeUserPoolClientRequestDto } from './dto/describeUserPoolClient.request.dto';

@Injectable()
export class UserpoolService {
  private userPool: CognitoUserPool;

  constructor(private configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    });
  }

  async register(
    describeUserPoolClientRequest: DescribeUserPoolClientRequestDto,
  ) {
    const { clientId, userPoolId } = describeUserPoolClientRequest;
    return new Promise((resolve, reject) => {
      // return this.userPool.s
      // return this.userPool.signUp(
      //   name,
      //   password,
      //   [new CognitoUserAttribute({ Name: 'email', Value: email })],
      //   null,
      //   (err, result) => {
      //     if (!result) {
      //       reject(err);
      //     } else {
      //       resolve(result.user);
      //     }
      //   },
      // );
    });
  }
}
