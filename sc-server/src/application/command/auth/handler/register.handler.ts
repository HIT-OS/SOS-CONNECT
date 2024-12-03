import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { RegisterCommand } from '../interface';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';
import { CacheKeyUtil } from '@src/domain/utils/cache-key.util';
import { OtpAction } from '@src/application/dto/request/otp/request-otp.dto';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  async execute(command: RegisterCommand): Promise<any> {
    const { registerDto } = command;

    const isEmailExist = await this.userRepository.getByEmail(registerDto.email);
    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const otpFromCache = await this.cacheManager.get<string>(
      CacheKeyUtil.getOtpCacheKey(registerDto.email, OtpAction.REGISTER)
    );
    if (!otpFromCache || otpFromCache !== registerDto.otpCode) {
      throw new BadRequestException('Mã OTP không hợp lệ. Vui lòng thử lại');
    }

    await this.userRepository.createNewUser(registerDto);

    return { message: 'Đăng ký thành công' };
  }
}
