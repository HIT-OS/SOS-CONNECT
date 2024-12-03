import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

import { AppConstants } from '@src/common/constants';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @Length(AppConstants.Auth.OTP_LENGTH)
  readonly otpCode: string;
}
