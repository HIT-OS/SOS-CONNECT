import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListUsersQuery } from '../interfaces';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';

@QueryHandler(GetListUsersQuery)
export class GetListUserHandler implements IQueryHandler<GetListUsersQuery> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(query: GetListUsersQuery): Promise<any> {
    return this.userRepository.getList(query.getListDto);
  }
}
