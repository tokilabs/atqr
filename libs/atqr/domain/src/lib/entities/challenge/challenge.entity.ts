import { Guid } from '@tokilabs/lang/';
import { Transform } from 'class-transformer';
import { dateDiff } from '../../../utils/date-difference';

import { Player } from '../player/player.entity';
import { Entity, EntityDTO } from '../../entity.type';
import { PaymentMethod } from '../../valueObjects/payment-method';

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

export class Challenge extends Entity {
  private _id: Guid;
  private _deadline: Date;
  private _goal: string;
  private _paymentMethod?: PaymentMethod;
  private _player: Player;
  private _price: number;
  private _supervisorEmail: string;
  private _supervisorName: string;
  private _supervisorStatus: SupervisorStatusEnum =
    SupervisorStatusEnum.NotInvited;

  @Transform(({ value }) => ChallengeStatusEnum[value])
  private _status?: ChallengeStatusEnum;

  constructor(data: {
    goal: string;
    supervisorName: string;
    supervisorEmail: string;
    player: Player;
    price: number;
    deadline: Date;
    paymentMethod?: PaymentMethod;
    status?: ChallengeStatusEnum;
    supervisorStatus?: SupervisorStatusEnum;
  }) {
    super();

    this._id = new Guid();
    this._status = data.status || ChallengeStatusEnum.Ongoing;
    this._supervisorStatus =
      data.supervisorStatus || SupervisorStatusEnum.NotInvited;

    if (data.price >= 25) {
      this._price = data.price;
    } else {
      throw new Error('Selecione um valor acima de 25 reais');
    }

    const today = new Date();
    if (dateDiff(today, data.deadline) > 1) {
      this._deadline = data.deadline;
    } else {
      throw Error('Selecione uma data futura');
    }

    this._status = data.status;
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

  static createFromObject<Challenge>(
    data: EntityDTO<typeof Challenge>
  ): Challenge {
    // @FIXME: remove any
    return new Challenge(data) as any;
  }

  changeSupervisor(newSupervisorName: string, newSupervisorEmail: string) {
    this._supervisorName = newSupervisorName;
    this._supervisorEmail = newSupervisorEmail;
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
