import { NextRequest, NextResponse } from 'next/server';
import { analyzeSaju } from '@/lib/claude';
import { SajuResult } from '@/types/saju';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { saju, type } = body;

    if (!saju || !type) {
      return NextResponse.json(
        { error: '사주 정보와 분석 타입을 제공해주세요' },
        { status: 400 }
      );
    }

    const typeLabel = {
      total: '종합운세',
      love: '애정운',
      career: '직업·진로운',
      money: '재물운',
      health: '건강운',
    }[type] || '종합운세';

    const p = saju.pillars;
    const e = saju.elements;

    const prompt = `당신은 전통 명리학 전문가입니다. 아래 사주팔자를 분석하여 ${typeLabel}을 해석해주세요.

사주팔자:
- 년주: ${p[0].stem} ${p[0].branch}
- 월주: ${p[1].stem} ${p[1].branch}
- 일주: ${p[2].stem} ${p[2].branch} (일간이 자신을 나타냄)
- 시주: ${p[3].stem} ${p[3].branch}

오행 분포: 목${e.목}개, 화${e.화}개, 토${e.토}개, 금${e.금}개, 수${e.수}개
성별: ${saju.gender === 'male' ? '남성' : '여성'}

${typeLabel}을 다음 형식으로 해석해주세요:
1. 일간(${p[2].stem})의 특성과 기질 (2-3문장)
2. ${typeLabel} 주요 특징 (3-4문장)
3. 강점과 주의사항 (각 2가지)
4. 올해(2026년) 운세 흐름 (2-3문장)

전통 명리학 용어를 자연스럽게 섞어 전문적이면서도 이해하기 쉽게 서술하세요. 500자 내외로 작성하세요.`;

    const analysis = await analyzeSaju(prompt);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json(
      { error: 'AI 분석에 실패했습니다. API 키를 확인해주세요.' },
      { status: 500 }
    );
  }
}
