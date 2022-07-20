import { Exception } from '@tokilabs/lang';

export default class MailgunError extends Exception {
  private constructor(
    message: string,
    public error: Error,
    public type: ValidationErrorTypes
  ) {
    super(message);
  }

  static ConfigurationError(error: Error) {
    return new MailgunError(
      'A configuration error on the server has happened.',
      error,
      ValidationErrorTypes.InvalidValue
    );
  }
}

export enum ValidationErrorTypes {
  'InvalidValue',
}
