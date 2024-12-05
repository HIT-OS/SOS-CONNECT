import { IQuery } from '@nestjs/cqrs';
import { GetListDto } from '@src/application/dto/request/get-list.dto';

export class GetListUsersQuery implements IQuery {
  constructor(public readonly getListDto: GetListDto) {}
}
