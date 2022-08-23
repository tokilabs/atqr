import { HttpException, HttpStatus } from "@nestjs/common";
import ValidationErrors, { ValidationErrorTypes } from "./validationError";


export function httpError(error: ValidationErrors){
    switch (error.type) {
      case ValidationErrorTypes.InvalidValue:
        throw new HttpException(error, HttpStatus.BAD_REQUEST);

      case ValidationErrorTypes.NotFound:
        throw new HttpException(error, HttpStatus.NOT_FOUND);

      case ValidationErrorTypes.MethodNotAllowed:
        throw new HttpException(error, HttpStatus.METHOD_NOT_ALLOWED);

      case ValidationErrorTypes.Conflict:
        throw new HttpException(error, HttpStatus.CONFLICT);

      case ValidationErrorTypes.UnprocessableEntity:
        throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);

      case ValidationErrorTypes.NotImplemented:
        throw new HttpException(error, HttpStatus.NOT_IMPLEMENTED);

      case ValidationErrorTypes.BadGateway:
        throw new HttpException(error, HttpStatus.BAD_GATEWAY);

     case ValidationErrorTypes.ServiceUnavailable:
        throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);

      default:
        throw new HttpException(error,
          HttpStatus.INTERNAL_SERVER_ERROR
        );

  }
}
