import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { PrismaService } from '../services/prisma.service';
import { RegisterDto } from '@src/application/dto/request/auth/register.dto';
import { AppConstants } from '@src/common/constants';

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  getById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getByEmail(email: string): Promise<User | null> {
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
