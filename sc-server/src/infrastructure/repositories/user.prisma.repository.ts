import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { PrismaService } from '../services/prisma.service';
import { RegisterDto } from '@src/application/dto/request/auth/register.dto';
import { AppConstants } from '@src/common/constants';
import { GetListDto } from '@src/application/dto/request/get-list.dto';
import { GetListResponseDto } from '@src/application/dto/response/get-list.dto';

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getList(getListDto: GetListDto): Promise<GetListResponseDto> {
    const { limit, page, keyword } = getListDto;

    const where = {};
    if (keyword) {
      where['username'] = { contains: keyword, mode: 'insensitive' };
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        take: limit,
        skip: limit * (page - 1),
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: users.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
      }),
      total,
      limit,
      page,
      keyword,
    };
  }

  getById(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createNewUser(user: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, AppConstants.Auth.BCRYPT_SALT);
    return this.prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
      },
    });
  }
}
