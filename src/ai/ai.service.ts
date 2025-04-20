import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async generateContent(
    prompt: string,
    platform: string,
  ): Promise<{ text: string; image?: string }> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    let imageUrl: string;
    if (platform === 'instagram') {
      const image = await this.openai.images.generate({
        prompt: `${prompt} - create social media image`,
        n: 1,
        size: '1024x1024',
      });
      imageUrl = image.data[0].url;
    }

    return {
      text: completion.choices[0].message.content,
      image: imageUrl,
    };
  }
}
