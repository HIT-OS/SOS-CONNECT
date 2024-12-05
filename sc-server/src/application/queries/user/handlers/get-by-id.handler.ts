import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { GetUserByIdQuery } from '../interfaces';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';

@Injectable()
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(query: GetUserByIdQuery): Promise<any> {
    const { userId } = query;
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }
    delete user.password;
    return user;
  }
}
