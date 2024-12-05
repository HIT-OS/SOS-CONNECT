import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UpdateUserByIdCommand } from '@src/application/command/user/interface';
import { UpdateUserByIdDto } from '@src/application/dto/request/user/update-by-id.dto';
import { GetUserByIdQuery } from '@src/application/queries/user/interfaces';
import { Auth } from '@src/common/decorators/auth.decorator';
import { UserAuth } from '@src/common/decorators/user-auth.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get('profile')
  @Auth()
  @ApiOperation({ summary: 'Get profile' })
  getProfile(@UserAuth() user) {
    return this.queryBus.execute(new GetUserByIdQuery(user.id));
  }

  @Patch('profile')
  @Auth()
  @ApiOperation({ summary: 'Update profile' })
  updateProfile(@UserAuth() user, @Body() updateProfileDto: UpdateUserByIdDto) {
    return this.commandBus.execute(new UpdateUserByIdCommand(user.id, updateProfileDto));
  }
}
