import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NotificationPreferencesService } from "../service/notification-preferences.service";
import { NotificationPreferencesDTO } from "../dto/notification-preferences.dto";

@ApiTags("notification-preferences")
@Controller("notification-preferences")
export class NotificationPreferencesController {
  constructor(
    private readonly notificationPreferencesService: NotificationPreferencesService
  ) {}

  @Post(":userId")
  async setNotificationPreferences(
    @Param("userId") userId: number,
    @Body() preferencesDTO: NotificationPreferencesDTO
  ): Promise<NotificationPreferencesDTO> {
    try {
      if (!preferencesDTO) {
        throw new HttpException(
          "Preferences data is required",
          HttpStatus.BAD_REQUEST
        );
      }
      return await this.notificationPreferencesService.setNotificationPreferences(
        userId,
        preferencesDTO
      );
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
      throw new HttpException(
        "Failed to set notification preferences",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":userId")
  async getNotificationPreferences(
    @Param("userId") userId: number
  ): Promise<NotificationPreferencesDTO> {
    try {
      const preferences =
        await this.notificationPreferencesService.getNotificationPreferences(
          userId
        );
      if (!preferences) {
        throw new HttpException(
          "Notification preferences not found",
          HttpStatus.NOT_FOUND
        );
      }
      return preferences;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        "Failed to get notification preferences",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
