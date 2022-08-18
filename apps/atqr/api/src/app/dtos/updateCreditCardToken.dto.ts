import { IsDefined, IsUUID } from 'class-validator';

export class UpdateCreditCardTokenDto {
  @IsUUID()
  challengeId: string;

  // TODO: @yfernandes Validate token type
  @IsDefined()
  creditCardToken: string;
}
