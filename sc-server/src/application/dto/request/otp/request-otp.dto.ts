import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

export enum OtpAction {
  REGISTER = 'REGISTER',
}

export class RequestOtpDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ enum: OtpAction })
  @IsEnum(OtpAction)
  readonly action: OtpAction;
}
