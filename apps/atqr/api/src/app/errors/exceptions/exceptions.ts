import { ThrowHttpExceptions } from './throwHttpExceptions';
import {
  CommonErrorTypes,
  ErrorTypes,
  ValidationErrorTypes,
} from '../validationError';

export interface IExceptions {
  messageError: string;
  messageFixError: string;
  error: Error;
  type: ErrorTypes;
}

export class Exceptions {
  private exception: IExceptions;
  constructor(exception: IExceptions) {
    this.exception = exception;
  }
  throwException(): void {
    this.exception.error.message =
      this.exception.messageError + ' ' + this.exception.messageFixError;

    return ThrowHttpExceptions(this.exception);
  }
}

export class BadRequest implements IExceptions {
  public type: ErrorTypes = ValidationErrorTypes.InvalidValue;
  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}

export class NotFound implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.NotFound;
  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}
export class MethodNotAllowed implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.MethodNotAllowed;

  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}
export class Conflict implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.Conflict;

  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}

export class UnprocessableEntity implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.UnprocessableEntity;

  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}

export class NotImplemented implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.NotImplemented;

  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}
export class BadGateway implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.BadGateway;
  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}

export class ServiceUnavailable implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.ServiceUnavailable;
  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}
export class GatewayTimeout implements IExceptions {
  public type: ErrorTypes = CommonErrorTypes.GatewayTimeout;
  constructor(
    public messageError: string,
    public messageFixError: string,
    public error: Error
  ) {}
}
