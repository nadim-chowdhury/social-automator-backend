import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { AIService } from '../ai/ai.service';
import { SocialPostService } from '../social-post/social-post.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private aiService: AIService,
    private socialPostService: SocialPostService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const dueSchedules = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .where('schedule.active = :active', { active: true })
      .andWhere('schedule.nextRun <= :now', { now: new Date() })
      .getMany();

    for (const schedule of dueSchedules) {
      await this.processSchedule(schedule);
      await this.updateNextRun(schedule);
    }
  }

  private async processSchedule(schedule: Schedule) {
    try {
      const content = await this.aiService.generateContent(
        schedule.prompts[Math.floor(Math.random() * schedule.prompts.length)],
        schedule.platforms[0],
      );

      for (const platform of schedule.platforms) {
        await this.socialPostService.postToPlatform(
          platform,
          content.text,
          content.image,
          schedule.user.id,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error processing schedule ${schedule.id}: ${error.message}`,
      );
    }
  }

  private async updateNextRun(schedule: Schedule) {
    // Implement cron pattern calculation for next run
  }
}
