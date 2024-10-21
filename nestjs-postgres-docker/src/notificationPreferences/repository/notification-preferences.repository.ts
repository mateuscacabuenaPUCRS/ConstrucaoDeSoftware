import { Repository, DeepPartial } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationPreferencesEntity } from '../entity/notificationPreferences';
import { NotificationPreferencesDTO } from '../dto/notification-preferences.dto';

@Injectable()
export class NotificationPreferencesRepository {
    constructor(
        @InjectRepository(NotificationPreferencesEntity)
        private notificationPreferencesRepository: Repository<NotificationPreferencesEntity>,
    ) {}

    private toNotificationPreferencesDTO(notificationPreferences: NotificationPreferencesEntity): NotificationPreferencesDTO {
        const { id, receiveEmail } = notificationPreferences;

        if (!notificationPreferences) {
            return null;
        }

        return {
            id,
            receiveEmail
        };
    }

    private toNotificationPreferencesEntity(notificationPreferencesDTO: NotificationPreferencesDTO): DeepPartial<NotificationPreferencesEntity> {
        const { id, receiveEmail } = notificationPreferencesDTO;

        if (!notificationPreferencesDTO) {
            return null;
        }

        return {
            id,
            receiveEmail
        };
    }

    async setNotificationPreferences(userId: number, preferencesDTO: NotificationPreferencesDTO): Promise<NotificationPreferencesDTO> {
        let preferences = await this.notificationPreferencesRepository.findOne({ where: { id: userId } });

        if (!preferences) {
            preferences = this.notificationPreferencesRepository.create({ id: userId, ...preferencesDTO });
        } else {
            preferences.receiveEmail = preferencesDTO.receiveEmail;
        }

        await this.notificationPreferencesRepository.save(preferences);
        return this.toNotificationPreferencesDTO(preferences);
    }

    async getNotificationPreferences(userId: number): Promise<NotificationPreferencesDTO> {
        const preferences = await this.notificationPreferencesRepository.findOne({ where: { id: userId } });
        return this.toNotificationPreferencesDTO(preferences);
    }
}