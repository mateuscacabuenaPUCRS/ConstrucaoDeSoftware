import { ApiProperty } from "@nestjs/swagger";

export class NotificationPreferencesDTO {
	@ApiProperty()
	id: number;

	@ApiProperty({
		description: 'Does the user want to receive email notifications?',
		default: true
	})
	receiveEmail: boolean;
}