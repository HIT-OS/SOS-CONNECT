import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { BadRequestException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { RequestOtpCommand } from '../interface';
import { SendMailService } from '@src/domain/utils/send-mail.util';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { OtpAction } from '@src/application/dto/request/otp/request-otp.dto';
import { AppConstants } from '@src/common/constants';
import { CacheKeyUtil } from '@src/domain/utils/cache-key.util';

@CommandHandler(RequestOtpCommand)
export class RequestOtpHandler implements ICommandHandler<RequestOtpCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly sendMailService: SendMailService
  ) {}

  async execute(command: RequestOtpCommand): Promise<any> {
    const {
      requestOtpDto: { email, action },
    } = command;

    if (action === OtpAction.REGISTER) {
      const user = await this.userRepository.getByEmail(email);
      if (user) throw new BadRequestException('Email đã được sử dụng');
    }

    const otpCode = this.createOtpCode(AppConstants.Auth.OTP_LENGTH);
    await this.sendMailService.sendMailOTP(email, otpCode);

    const otpRedisKey = CacheKeyUtil.getOtpCacheKey(email, action);
    await this.cacheManager.set(otpRedisKey, otpCode, 1 * 60 * 1000);

    return { message: 'OTP sent successfully', otpCode };
  }

  private createOtpCode(length: number = 6): string {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, '0');
  }
}
