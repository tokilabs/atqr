import { PaymentEntity, Player } from '@atqr/domain';
import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @MaxLength(120)
  goal: string;

  @IsDate()
  deadline: Date;

  // TODO This values should come from a .env with other business related values
  @Min(25)
  price: number;

  @MinLength(3)
  player: Player;

  @MinLength(3)
  supervisorName: string;

  @IsEmail()
  supervisorEmail: string;

  // TODO: @yfernandes Resolve with real interface
  paymentMethod?: {
    method: PaymentEntity; // paymentMethodEnum wasnt right/used in the payment entity @rai changed it
    paymentService: `pagar.me` | `pagseguro`;
    token: string;
  };
}
