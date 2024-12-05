import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Request } from 'express';

import { AppConstants } from '@src/common/constants';
import { IUserRepository } from '../repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(AppConstants.Auth.ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request[AppConstants.Auth.USER_AUTH_KEY];

    return requiredRoles.some((role) => user.role === role);
  }
}
