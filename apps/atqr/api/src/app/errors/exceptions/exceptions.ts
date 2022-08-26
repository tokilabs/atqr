import { HttpException, HttpStatus } from '@nestjs/common';

export interface IExceptions {
  error: Error;
  messageError: string;
  messageFixError: string;

  httpExceptions(error: Error): void;
}

export class Exceptions {
  private exception: IExceptions;
  constructor(exception: IExceptions) {
    this.exception = exception;
  }
  throwException(): void {
    const message: string =
      this.exception.messageError + ' ' + this.exception.messageFixError;
    this.exception.error.message = message;
    return this.exception.httpExceptions(this.exception.error);
  }
}

export class BadRequest implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
}

export class NotFound implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.NOT_FOUND);
  }
}
export class MethodNotAllowed implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.METHOD_NOT_ALLOWED);
  }
}
export class Conflict implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.CONFLICT);
  }
}

export class UnprocessableEntity implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class NotImplemented implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);
  }
}
export class BadGateway implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.BAD_GATEWAY);
  }
}

export class ServiceUnavailable implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
export class GatewayTimeout implements IExceptions {
  constructor(
    public error: Error,
    public messageError: string,
    public messageFixError: string
  ) {}

  httpExceptions(error: Error): void {
    throw new HttpException(error, HttpStatus.GATEWAY_TIMEOUT);
  }
}
