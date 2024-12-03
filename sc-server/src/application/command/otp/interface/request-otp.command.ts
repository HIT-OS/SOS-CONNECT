import { ICommand } from '@nestjs/cqrs';
import { RequestOtpDto } from '@src/application/dto/request/otp/request-otp.dto';

export class RequestOtpCommand implements ICommand {
  constructor(public readonly requestOtpDto: RequestOtpDto) {}
}
