// response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data: data,
        statusCode: HttpStatus.OK,
      })),
      tap({
        complete: () => {
          const method = request.method;
          const url = request.route?.path || request.path;
          const statusCode = response.statusCode;
          this.logger.log(`${method} ${url} ${statusCode}`);
        },
      })
    );
  }
}
