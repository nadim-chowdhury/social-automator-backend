// social-account.entity.ts
@Entity()
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: string;

  @Column()
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
