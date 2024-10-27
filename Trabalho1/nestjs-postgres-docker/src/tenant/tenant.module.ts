import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantController } from "./controller/tenant.controller";
import { TenantService } from "./service/tenant.service";
import { TenantRepository } from "./repository/tenant.repository";
import { TenantEntity } from "./entity/tenant.entity";
import { UserEntity } from "../user/entity/user.entity";
import { EventEntity } from "../event/entity/event.entity";
import { TicketEntity } from "../ticket/entity/ticket.entity";
import { TicketRepository } from "../ticket/repository/ticket.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TenantEntity,
      UserEntity,
      EventEntity,
      TicketEntity,
    ]),
  ],
  controllers: [TenantController],
  providers: [TenantService, TenantRepository, TicketRepository],
})
export class TenantModule {}
