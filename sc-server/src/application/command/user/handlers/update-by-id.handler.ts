import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserByIdCommand } from '../interface';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdeHandler implements ICommandHandler<UpdateUserByIdCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: UpdateUserByIdCommand): Promise<any> {
    const { userId, updateUserByDto } = command;

    const user = this.userRepository.getById(userId);
    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    await this.userRepository.updateById(userId, updateUserByDto);

    return { message: 'Cập nhật thông tin thành công' };
  }
}
