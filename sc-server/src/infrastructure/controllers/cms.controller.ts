import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { GetListDto } from '@src/application/dto/request/get-list.dto';
import { GetListUsersQuery } from '@src/application/queries/user/interfaces';

import { Roles } from '@src/common/decorators/role.decorator';

@Controller('cms')
@ApiTags('CMS')
export class CmsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/users')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get list of users' })
  getListUsers(@Query() getListDto: GetListDto) {
    return this.queryBus.execute(new GetListUsersQuery(getListDto));
  }
}
