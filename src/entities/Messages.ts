import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  text: string;

  @CreateDateColumn()
  date: Date;
}
