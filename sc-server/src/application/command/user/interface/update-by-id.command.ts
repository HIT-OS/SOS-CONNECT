import { ICommand } from '@nestjs/cqrs';
import { UpdateUserByIdDto } from '@src/application/dto/request/user/update-by-id.dto';

export class UpdateUserByIdCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly updateUserByDto: UpdateUserByIdDto
  ) {}
}
