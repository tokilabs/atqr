import { Guid, isEmpty } from '@tokilabs/lang';
import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Entity } from '../../entity.type';
import {
  InvalidParameterInfo,
  InvalidParametersException,
} from '../../exceptions/invalidParameters.exception';
import { EmailAddress } from '../../valueObjects/emailAddress';
import { Challenge } from '../challenge/challenge.entity';

// Defines the constructor's parameter type
export type PlayerRequiredProps = { name: string; email: EmailAddress };
// Defines the type used in createFromObject
export type PartialPlayer = Partial<Player> & PlayerRequiredProps;

export class Player extends Entity {
  @Expose({ name: 'id' })
  @Transform(({ value }) => new Guid(value))
  private _id: Guid;

  @Expose({ name: 'name' })
  private _name: string;

  @Expose({ name: 'email' })
  @Transform(({ value }) => new EmailAddress(value))
  private _email: EmailAddress;

  @Expose({ name: 'challenges' })
  @Type(() => Challenge)
  private _challenges: Challenge[];

  constructor({ name, email }: PlayerRequiredProps) {
    super();

    this._id = new Guid();
    const errors: InvalidParameterInfo[] = [];

    if (typeof name !== 'string' || isEmpty(name.trim())) {
      errors.push({ name: 'name', error: 'Player requires a name' });
    }

    if (!(email instanceof EmailAddress)) {
      errors.push({ name: 'email', error: 'Player requires an email' });
    }

    if (errors.length > 0) {
      throw new InvalidParametersException(errors);
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email(): EmailAddress {
    return this._email;
  }

  get challenges(): Challenge[] {
    return this._challenges;
  }

  /**
   * This method MUST ONLY be used to hydrate entities
   * when loading from persistent storage
   *
   * @param props An object with the properties values to be set in the returned instance
   * @returns A new player
   */
  static createFromObject(props: PartialPlayer): Player {
    // extract name and email from props
    // leaving remaining props in optionalProps
    const { name, email, ...optionalProps } = props;

    const player = new Player({ name, email });

    this.overrideProps(player, optionalProps);

    return player;
  }
}
