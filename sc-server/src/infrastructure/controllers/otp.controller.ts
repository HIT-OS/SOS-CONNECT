import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestOtpCommand } from '@src/application/command/otp/interface';
import { RequestOtpDto } from '@src/application/dto/request/otp/request-otp.dto';

@Controller('otp')
@ApiTags('OTP')
export class OtpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('request-otp')
  @ApiOperation({ summary: 'Request OTP by email' })
  requestOtp(@Body() requestOtpDto: RequestOtpDto) {
    return this.commandBus.execute(new RequestOtpCommand(requestOtpDto));
  }
}
