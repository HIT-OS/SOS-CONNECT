import { ApiProperty } from '@nestjs/swagger';
import { AppConstants } from '@src/common/constants';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetListDto {
  @ApiProperty({ required: false, default: AppConstants.PAGE_DEFAULT })
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = AppConstants.PAGE_DEFAULT;

  @ApiProperty({ required: false, default: AppConstants.LIMIT_DEFAULT })
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly limit?: number = AppConstants.LIMIT_DEFAULT;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly keyword?: string;
}
