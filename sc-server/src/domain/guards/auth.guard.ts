import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { AppConstants } from '@src/common/constants';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.getById(payload.id);
      if (!user) {
        throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục');
      }
      request[AppConstants.Auth.USER_AUTH_KEY] = user;
    } catch {
      throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
