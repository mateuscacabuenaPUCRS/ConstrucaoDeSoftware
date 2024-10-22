import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantController } from "./controller/tenant.controller";
import { TenantService } from "./service/tenant.service";
import { TenantRepository } from "./repository/tenant.repository";
import { TenantEntity } from "./entity/tenant.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { EventEntity } from "src/event/entity/event.entity";
import { TicketEntity } from "src/ticket/entity/ticket.entity";
import { TicketRepository } from "src/ticket/repository/ticket.repository";

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
