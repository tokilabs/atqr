import { Exception } from '@tokilabs/lang';

export interface InvalidParameterInfo {
  name: string;
  error: string;
}

export class InvalidParametersException extends Exception {
  constructor(public parameters: InvalidParameterInfo[]) {
    super(
      `Invalid parameter values for: ${parameters
        .map((p) => p.name)
        .join(', ')}.`
    );
  }
}
