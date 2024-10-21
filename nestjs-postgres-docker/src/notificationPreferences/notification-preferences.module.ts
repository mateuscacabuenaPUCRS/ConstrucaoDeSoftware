import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationPreferencesEntity } from "./entity/notificationPreferences";
import { NotificationPreferencesController } from "./controller/notification-preferences.controller";
import { NotificationPreferencesService } from "./service/notification-preferences.service";
import { NotificationPreferencesRepository } from "./repository/notification-preferences.repository";
import { UserEntity } from "src/user/entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationPreferencesEntity, UserEntity]),
  ],
  controllers: [NotificationPreferencesController],
  providers: [
    NotificationPreferencesService,
    NotificationPreferencesRepository,
  ],
})
export class NotificationPreferencesModule {}
