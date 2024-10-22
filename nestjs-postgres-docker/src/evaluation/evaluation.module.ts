import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EvaluationController } from "./controller/evaluation.controller";
import { EvaluationService } from "./service/evaluation.service";
import { EvaluationRepository } from "./repository/evaluation.repository";
import { EvaluationEntity } from "./entity/evaluation.entity";
import { UserRepository } from "../user/repository/user.repository";
import { UserEntity } from "../user/entity/user.entity";
import { TenantRepository } from "../tenant/repository/tenant.repository";
import { TenantEntity } from "../tenant/entity/tenant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationEntity, UserEntity, TenantEntity])],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationRepository, UserRepository, TenantRepository],
})
export class EvaluationModule {}
