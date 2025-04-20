// schedule.entity.ts
@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cronExpression: string;

  @Column('simple-array')
  platforms: string[];

  @Column('simple-json')
  prompts: string[];

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @Column({ default: true })
  active: boolean;
}
