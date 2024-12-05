import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AppConstants } from '../constants';
import { RolesGuard } from '@src/domain/guards/role.guard';
import { AuthGuard } from '@src/domain/guards/auth.guard';

export function Roles(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(AppConstants.Auth.ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  );
}
