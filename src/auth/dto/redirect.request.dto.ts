import { IsString } from 'class-validator';

export class RedirectRequestDto {
  @IsString()
  data: string;
}
