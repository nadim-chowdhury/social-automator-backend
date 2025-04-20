// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SocialAccount } from './social-account.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => SocialAccount, (account) => account.user)
  accounts: SocialAccount[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];
}
