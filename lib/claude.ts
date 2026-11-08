// lib/claude.ts

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeSaju(prompt: string): Promise<string> {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-haiku-20241022', // 기존 sonnet 대비 비용이 약 4~5배 저렴하고 속도가 매우 빠른 모델
      max_tokens: 2000, // 상세한 평생사주 작성을 위해 토큰 여유를 둡니다
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    return textContent.text;
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}
