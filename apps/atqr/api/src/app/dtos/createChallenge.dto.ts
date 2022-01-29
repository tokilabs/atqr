import { IsEmail, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @MaxLength(120)
  challenge: string;

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
}
