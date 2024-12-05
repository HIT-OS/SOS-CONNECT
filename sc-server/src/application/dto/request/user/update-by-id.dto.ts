import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserByIdDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly hometown?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly address?: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // readonly phone?: string;
}
