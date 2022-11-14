import {  IsUUID } from 'class-validator';

export class UpdateCreditCardTokenDto {
  @IsUUID()
  challengeId: string;


}
