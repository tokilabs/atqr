import { SupervisorEnum } from "@atqr/domain";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateSupervisorStatusDto{
  @IsEnum(SupervisorEnum)
  SupervisorEnum: SupervisorEnum

  @IsOptional()
  @IsString()
  supervisorName?: string

  @IsOptional()
  @IsString()
  supervisorEmail?: string

}
