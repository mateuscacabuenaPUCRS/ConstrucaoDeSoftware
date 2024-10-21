import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantController } from "./controller/tenant.controller";
import { TenantService } from "./service/tenant.service";
import { TenantRepository } from "./repository/tenant.repository";
import { TenantEntity } from "./entity/tenant.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { EventEntity } from "src/event/entity/event.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantEntity, UserEntity, EventEntity]),
  ],
  controllers: [TenantController],
  providers: [TenantService, TenantRepository],
})
export class TenantModule {}
