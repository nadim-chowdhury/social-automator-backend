import { Injectable } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { InstagramService } from './instagram.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneratedContent } from '../entities/generated-content.entity';

@Injectable()
export class SocialPostService {
  constructor(
    private twitterService: TwitterService,
    private instagramService: InstagramService,
    @InjectRepository(GeneratedContent)
    private contentRepository: Repository<GeneratedContent>,
  ) {}

  async postToPlatform(
    platform: string,
    text: string,
    image: string,
    userId: number,
  ) {
    const content = this.contentRepository.create({
      content: text,
      imageUrl: image,
      platform,
      user: { id: userId },
      scheduledAt: new Date(),
    });

    try {
      switch (platform) {
        case 'twitter':
          await this.twitterService.post(text, image);
          break;
        case 'instagram':
          await this.instagramService.postImage(image, text);
          break;
        // Add other platforms
      }

      content.posted = true;
    } catch (error) {
      content.posted = false;
    } finally {
      await this.contentRepository.save(content);
    }
  }
}
