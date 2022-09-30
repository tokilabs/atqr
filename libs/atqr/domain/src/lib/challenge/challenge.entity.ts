import { Guid } from '@tokilabs/lang/';
import { Transform } from 'class-transformer';
import { dateDiff } from '../../utils/date-difference';
import { PaymentMethodEntity } from '../PaymentMethod';
import { Player } from '../player/player.entity';
import { EntityDTO } from '../entity-type/entity.type';

export enum SupervisorEnum {
  'notInvited',
  'invited',
  'accepted',
  'askedIfTheGoalIsAccomplished',
  'repliedIfTheGoalWasAccomplished',
}

export enum ChallengeStatus {
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Failed = 'Failed',
  Overdue = 'Overdue',
}

export abstract class Entity {
  static createFromObject<TEntity extends new (...args: any) => any>(
    data: any
  ): InstanceType<TEntity> {
    throw new Error(
      `createFromObject not implemented in ${this.constructor.name}`
    );
  }
}

export class Challenge extends Entity {
  private _id: Guid;
  private _deadline: Date;
  private _goal: string;
  private _paymentMethod?: PaymentMethodEntity;
  private _player: Player;
  private _price: number;
  private _supervisorEmail: string;
  private _supervisorName: string;
  private _supervisorStatus: SupervisorEnum = SupervisorEnum.notInvited;

  @Transform(({ value }) => ChallengeStatus[value])
  private _status?: ChallengeStatus;

  constructor(data: {
    goal: string;
    supervisorName: string;
    supervisorEmail: string;
    player: Player;
    price: number;
    deadline: Date;
    paymentMethod?: PaymentMethodEntity;
    status?: ChallengeStatus;
    supervisorStatus?: SupervisorEnum;
  }) {
    super();

    this._id = new Guid();
    this._status = data.status || ChallengeStatus.Ongoing;
    this._supervisorStatus = data.supervisorStatus || SupervisorEnum.notInvited;

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

  get paymentMethod(): PaymentMethodEntity | undefined {
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
  changePaymentMethod(paymentMethod: PaymentMethodEntity) {
    this._paymentMethod = paymentMethod;
  }

  /**
   * Checks if the challenge became overdue and returns true if the status changes
   */
  updateOverdueStatus(): boolean {
    if (this.deadline < new Date()) {
      this._status = ChallengeStatus.Overdue;
      return true;
    } else {
      return false;
    }

  }
  updateStatus(status: ChallengeStatus) {
    if(status == ChallengeStatus.Overdue){
      return false
    }
    this._status = status;
    return true
  }
}
