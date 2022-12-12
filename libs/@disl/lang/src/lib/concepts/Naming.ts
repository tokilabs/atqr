// import { Concept } from '@jamashita/publikum-concept';
import { isEmpty, StringWrapper } from '@tokilabs/lang';

export class Name extends StringWrapper {
  #value: string;

  rules: { min: 2; max: 25 };

  constructor(value: string) {
    super(value);

    if (isEmpty(value)) {
      throw new Error('Name type cannot be created with an empty string');
    }

    if (value.length < this.rules.min) {
      throw new Error(
        `Name type cannot be created with a string shorter than ${this.rules.min} characters`
      );
    }

    if (value.length > this.rules.max) {
      throw new Error(
        `Name type cannot be created with a string longer than ${this.rules.max} characters`
      );
    }

    if (value.includes(' ')) {
      throw new Error(
        'Name type cannot be created with a string containing spaces'
      );
    }

    this.#value = value;
  }

  protected get primitiveValue(): string {
    return this.#value;
  }
}
