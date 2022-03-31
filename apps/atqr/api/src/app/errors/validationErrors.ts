import { Exception } from '@tokilabs/lang';

export default class ValidationErrors extends Exception {
  private constructor(
    message: string,
    public error: Error,
    public type: ValidationErrorTypes
  ) {
    super(message);
  }

  static InvalidValue(error: Error) {
    return new ValidationErrors('', error, ValidationErrorTypes.InvalidValue);
  }
}

export enum ValidationErrorTypes {
  'InvalidValue',

}
