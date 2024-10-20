import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')  // Mapeia a tabela 'user' no banco de dados
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;
}
