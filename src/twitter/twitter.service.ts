// twitter.service.ts
import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService {
  async post(content: string, imageBuffer: Buffer, accessToken: string) {
    const client = new TwitterApi(accessToken);

    if (imageBuffer) {
      const mediaId = await client.v1.uploadMedia(imageBuffer, {
        mimeType: 'image/jpeg',
      });
      return client.v2.tweet({
        text: content,
        media: { media_ids: [mediaId] },
      });
    }

    return client.v2.tweet(content);
  }
}

