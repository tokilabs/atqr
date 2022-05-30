import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Guid } from '@tokilabs/lang';
import { PaymentMethodEntity } from '@atqr/domain';

export class CreateChallengeDto {
  @IsString()
  @MaxLength(120)
  goal: string;

  @IsDate()
  deadline: Date;

  // This values should come from a .env with other business related values
  @Min(25)
  price: number;

  @MinLength(3)
  playerName: string;

  @IsEmail()
  playerEmail: string;

  @MinLength(3)
  supervisorName: string;

  @IsEmail()
  supervisorEmail: string;

  creditCardToken?: string;
  id: Guid;
  paymentMethod: PaymentMethodEntity;
}
