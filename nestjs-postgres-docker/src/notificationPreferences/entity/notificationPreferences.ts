import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { UserEntity } from 'src/user/entity/user.entity';

@Entity('notificationPreferences')
export class NotificationPreferencesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    receiveEmail: boolean;

    @OneToOne(() => UserEntity, (userEntity) => userEntity.notificationPreferences )
    user: UserEntity;
}