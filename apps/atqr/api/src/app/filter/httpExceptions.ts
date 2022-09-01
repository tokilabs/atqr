import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.getStatus();
    const message = exception.message;
    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const responseBody = {
      statusCode: httpStatus,
      message: message,
      path: path,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
