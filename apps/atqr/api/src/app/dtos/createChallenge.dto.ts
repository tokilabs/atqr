import { EmailAddress, PaymentMethodEnum, Player } from '@atqr/domain';
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
  supervisorEmail: EmailAddress;

  // TODO: @yfernandes Resolve with real interface
  paymentMethod?: {
    method: PaymentMethodEnum;
    paymentService: `pagar.me` | `pagseguro`;
    token: string;
  };
}
