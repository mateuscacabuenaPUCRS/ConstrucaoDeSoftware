import { Injectable } from "@nestjs/common";
import { NotificationPreferencesDTO } from "../dto/notification-preferences.dto";
import { NotificationPreferencesRepository } from "../repository/notification-preferences.repository";

@Injectable()
export class NotificationPreferencesService {
  constructor(
    private readonly notificationPreferencesRepository: NotificationPreferencesRepository
  ) {}

  async setNotificationPreferences(
    userId: number,
    preferencesDTO: NotificationPreferencesDTO
  ): Promise<NotificationPreferencesDTO> {
    return this.notificationPreferencesRepository.setNotificationPreferences(
      userId,
      preferencesDTO
    );
  }

  async getNotificationPreferences(
    userId: number
  ): Promise<NotificationPreferencesDTO> {
    return this.notificationPreferencesRepository.getNotificationPreferences(
      userId
    );
  }
}
