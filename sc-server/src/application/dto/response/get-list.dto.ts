export class GetListResponseDto<T = any> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  keyword?: string;
}
