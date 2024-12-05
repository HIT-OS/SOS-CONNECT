import { User } from '@prisma/client';

import { RegisterDto } from '@src/application/dto/request/auth/register.dto';
import { GetListDto } from '@src/application/dto/request/get-list.dto';
import { GetListResponseDto } from '@src/application/dto/response/get-list.dto';

export interface IUserRepository {
  getList(getListDto: GetListDto): Promise<GetListResponseDto<User>>;
  getById(userId: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  createNewUser(user: RegisterDto): Promise<User>;
}
