import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): string | void {
    if (!(exception instanceof HttpException)) {
      console.log('You need handle this error');
      console.log(
        "Error handling example: throw new NotFoundException('we didn't find what you were looking for') "
      );
      console.log(exception);
      exception = new InternalServerErrorException(
        "We don't know what happen'd"
      );
    }
    if (exception.message.length <= 10) {
      console.log('Your message is too short. Do a better one');
      exception = new InternalServerErrorException(
        "We don't know what happen'd"
      );
    }

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
