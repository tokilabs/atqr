import { HttpException, HttpStatus } from '@nestjs/common';
import { CommonErrorTypes, ValidationErrorTypes } from '..';
import { IExceptions } from './exceptions';

export function ThrowHttpExceptions(error: IExceptions) {
  switch (error.type) {
    case ValidationErrorTypes.InvalidValue:
      throw new HttpException(error.error, HttpStatus.BAD_REQUEST);

    case CommonErrorTypes.NotFound:
      throw new HttpException(error.error, HttpStatus.NOT_FOUND);

    case CommonErrorTypes.MethodNotAllowed:
      throw new HttpException(error.error, HttpStatus.METHOD_NOT_ALLOWED);

    case CommonErrorTypes.Conflict:
      throw new HttpException(error.error, HttpStatus.CONFLICT);

    case CommonErrorTypes.UnprocessableEntity:
      throw new HttpException(error.error, HttpStatus.UNPROCESSABLE_ENTITY);

    case CommonErrorTypes.NotImplemented:
      throw new HttpException(error.error, HttpStatus.NOT_IMPLEMENTED);

    case CommonErrorTypes.BadGateway:
      throw new HttpException(error.error, HttpStatus.BAD_GATEWAY);

    case CommonErrorTypes.ServiceUnavailable:
      throw new HttpException(error.error, HttpStatus.SERVICE_UNAVAILABLE);

    default:
      throw new HttpException(error.error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
