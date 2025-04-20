// instagram.service.ts
import { Injectable } from '@nestjs/common';
import { Instagram } from 'instagram-graph-sdk';

@Injectable()
export class InstagramService {
  async postImage(imageUrl: string, caption: string, accessToken: string) {
    const ig = new Instagram(accessToken);
    const container = await ig.createMediaObject(imageUrl, caption);
    return ig.publishMedia(container.id);
  }
}
