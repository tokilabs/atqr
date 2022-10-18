import { Guid } from '@tokilabs/lang/';
import { Transform, Type } from 'class-transformer';
import { dateDiff } from '../../../utils/date-difference';

import { Player } from '../player/player.entity';
import { Entity } from '../../entity.type';
import { PaymentMethod } from '../../valueObjects/payment-method';
import { EmailAddress } from '../../valueObjects/emailAddress';

export enum SupervisorStatusEnum {
  NotInvited = 'NotInvited',
  Invited = 'Invited',
  Accepted = 'Accepted',
  Asked = 'Asked',
  Replied = 'Replied',
}

export enum ChallengeStatusEnum {
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Failed = 'Failed',
  Overdue = 'Overdue',
}

export type ChallengeRequiredProps = {
  id: Guid;
  deadline: Date;
  goal: String;
  player: Player;
  price: Number;
  supervisorName: String;
  supervisorEmail: String;
  status: ChallengeStatusEnum;
  supervisorStatus: SupervisorStatusEnum;
};

export type PartialChallenge = Partial<Challenge> & ChallengeRequiredProps;
export class Challenge extends Entity {
  @Transform(({ value }) => new Guid(value))
  private _id: Guid;
  private _deadline: Date;
  private _goal: string;
  private _paymentMethod?: PaymentMethod;
  @Type(() => Player)
  private _player: Player;
  private _price: Number;
  @Transform(({ value }) => new EmailAddress(value))
  private _supervisorEmail: EmailAddress;
  private _supervisorName: string;
  private _supervisorStatus: SupervisorStatusEnum =
    SupervisorStatusEnum.NotInvited;

  @Transform(({ value }) => ChallengeStatusEnum[value])
  private _status?: ChallengeStatusEnum;

  constructor({
    id,
    deadline,
    goal,
    player,
    price,
    supervisorName,
    supervisorEmail,
    status,
    supervisorStatus,
  }: ChallengeRequiredProps) {
    super();
    this._player = player;
    this._id = new Guid();
    this._status = status || ChallengeStatusEnum.Ongoing;
    this._supervisorStatus =
      supervisorStatus || SupervisorStatusEnum.NotInvited;

    if (price >= 25) {
      this._price = price;
    } else {
      throw new Error('Selecione um valor acima de 25 reais');
    }

    const today = new Date();
    if (dateDiff(today, deadline) > 1) {
      this._deadline = deadline;
    } else {
      throw Error('Selecione uma data futura');
    }

    this._status = status;
  }

  get id() {
    return this._id;
  }
  get goal() {
    return this._goal;
  }
  public get status() {
    return this._status;
  }
  get deadline() {
    return this._deadline;
  }
  get price() {
    return this._price;
  }

  get supervisorStatus() {
    return this._supervisorStatus;
  }
  get supervisorName() {
    return this._supervisorName;
  }
  get supervisorEmail() {
    return this._supervisorEmail;
  }
  get player() {
    return this._player;
  }

  get paymentMethod(): PaymentMethod | undefined {
    return this._paymentMethod;
  }

  /**
   * This method MUST ONLY be used to hydrate entities
   * when loading from persistent storage
   *
   * @param props An object with the properties values to be set in the returned instance
   * @returns A new player
   */
  static createFromObject(props: PartialChallenge): Challenge {
    // extract from props
    // leaving remaining props in optionalProps
    const {
      id,
      deadline,
      goal,
      player,
      price,
      supervisorName,
      supervisorEmail,
      status,
      supervisorStatus,
      ...optionalProps
    } = props;

    const challenge = new Challenge({
      id,
      deadline,
      goal,
      player,
      price,
      supervisorName,
      supervisorEmail,
      status,
      supervisorStatus,
    });

    this.overrideProps(challenge, optionalProps);

    return challenge;
  }

  changeSupervisor(newSupervisorName: string, newSupervisorEmail: string) {
    this._supervisorName = newSupervisorName;
    this._supervisorEmail = new EmailAddress(newSupervisorEmail);
  }
  changePaymentMethod(paymentMethod: PaymentMethod) {
    this._paymentMethod = paymentMethod;
  }

  /**
   * Checks if the challenge became overdue and returns true if the status changes
   */
  updateOverdueStatus(): boolean {
    if (this.deadline < new Date()) {
      this._status = ChallengeStatusEnum.Overdue;
      return true;
    } else {
      return false;
    }
  }
  updateStatus(status: ChallengeStatusEnum) {
    this._status = status;
    return true;
  }
}
