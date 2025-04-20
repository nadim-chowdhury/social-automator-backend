// generated-content.entity.ts
@Entity()
export class GeneratedContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  platform: string;

  @Column()
  scheduledAt: Date;

  @Column({ default: false })
  posted: boolean;

  @ManyToOne(() => User, (user) => user.generatedContents)
  user: User;
}
