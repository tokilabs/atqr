import { SupervisorEnum } from '@atqr/domain';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateSupervisorDto {
  @IsEnum(SupervisorEnum)
  supervisorStatus: SupervisorEnum;

  @IsOptional()
  supervisorName?: string;

  @IsOptional()
  supervisorEmail?: string;
}
