import { IsDefined, IsUUID } from 'class-validator';

export class UpdateCreditCardTokenDto {
  @IsUUID()
  challengeId: string;

  @IsDefined()
  creditCardToken: string;
}
