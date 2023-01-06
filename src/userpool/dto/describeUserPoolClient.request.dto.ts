import { IsString } from 'class-validator';

export class DescribeUserPoolClientRequestDto {
  @IsString()
  clientId: string;

  @IsString()
  userPoolId: string;
}
