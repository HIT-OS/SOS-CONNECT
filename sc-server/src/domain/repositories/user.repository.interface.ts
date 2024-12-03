import { User } from '@prisma/client';
import { RegisterDto } from '@src/application/dto/request/auth/register.dto';

export interface IUserRepository {
  getById(userId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  createNewUser(user: RegisterDto): Promise<User>;
}
