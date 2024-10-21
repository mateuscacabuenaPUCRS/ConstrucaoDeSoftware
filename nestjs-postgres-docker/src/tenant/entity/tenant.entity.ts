import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { UserEntity } from "src/user/entity/user.entity";
import { EventEntity } from "src/event/entity/event.entity";

@Entity("tenant")
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  timezone: string;

  @Column()
  currency: string;

  @OneToMany(() => UserEntity, (user) => user.tenantEntity)
  users: UserEntity[];

  @OneToMany(() => EventEntity, (event) => event.tenant)
  events: EventEntity[];
}
