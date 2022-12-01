export enum SupervisorEnum {
    'notInvited',
    'invited',
    'accepted',
    'askedIfTheGoalIsAccomplished',
    'repliedIfTheGoalWasAccomplished',
  }
  
  export enum PaymentMethodEnum {
    'creditCard' = 'creditCard',
    'debitCard' = 'debitCard',
  }
  
  export enum ChallengeStatus {
    Ongoing = 'Ongoing',
    Completed = 'Completed',
    Failed = 'Failed',
    Overdue = 'Overdue',
    Created = 'Created'
  }
  
  export const updateStatus = (id: string, status: ChallengeStatus) => {
    if(status == ChallengeStatus.Overdue){
      return false
    }else{
      return status
    }
    
  }
  export interface IChallenge {
    id: string;
    price: number;
    deadline: Date;
    goal: string;
    status?: ChallengeStatus;
    supervisorName: string;
    supervisorEmail: string;
    player: IPlayer;
    playerName: string
    supervisorStatus: SupervisorEnum;
    updateStatus: ChallengeStatus
  }
  
  export interface IEmailAddress {
    value: string;
  }
  
  export interface IPlayer {
    id: string;
    email: typeEmailAddress;
    challenges: playerChallenges;
    name: string;
  }
  
  export interface PaymentMethodEntity {
    id: string;
    method: PaymentMethodEnum;
    paymentService: `pagar.me` | `pagseguro`;
    token: string;
  }

  export interface CreateChallengeDto {
  goal: string;
  deadline: Date;
  price: number;
  player: IPlayer;
  supervisorName: string;
  supervisorEmail: string;
  // TODO: @yfernandes Resolve with real interface
  paymentMethod?: {
    method: PaymentMethodEnum;
    paymentService: `pagar.me` | `pagseguro`;
    token: string;
  };
  }

  export interface UpdateCreditCardTokenDto {
    challengeId: string;
    // TODO: @yfernandes Validate token type
    creditCardToken: string;
  }
  
  export type typeEmailAddress = IEmailAddress;
  export type typePlayer = IPlayer;
  export type playerChallenges = IChallenge[];
  export type challenge = IChallenge;
 
  export type playerName = '';
  export type paymentMethod = PaymentMethodEntity;
  