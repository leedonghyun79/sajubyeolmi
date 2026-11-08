import { NextRequest, NextResponse } from 'next/server';
import { analyzeSaju } from '@/lib/claude';
import { SajuResult } from '@/types/saju';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { saju, type } = body as { saju: SajuResult; type: string };

    if (!saju || !type) {
      return NextResponse.json(
        { error: '사주 정보와 분석 타입을 제공해주세요' },
        { status: 400 }
      );
    }

    const typeMap: Record<string, string> = {
      total: '종합운세',
      love: '애정운',
      career: '직업·진로운',
      money: '재물운',
      health: '건강운',
    };
    const typeLabel = typeMap[type] || '종합운세';

    const p = saju.pillars;
    const e = saju.elements;

    const prompt = `당신은 명리학을 깊이 연구한 사주 전문가입니다. 아래 사주팔자를 분석하여 '평생 사주'를 해석해주세요.

사주명식:
- 년주: ${p[0].stem} ${p[0].branch}
- 월주: ${p[1].stem} ${p[1].branch}
- 일주: ${p[2].stem} ${p[2].branch} (일간이 자신)
- 시주: ${p[3].stem} ${p[3].branch}

오행 분포: 목${e.목}개, 화${e.화}개, 토${e.토}개, 금${e.금}개, 수${e.수}개
성별: ${saju.gender === 'male' ? '남성' : '여성'}
생년월일: ${saju.year}년 ${saju.month}월 ${saju.day}일

다음의 항목들을 포함하여 상세하게 해석해주세요. 각 항목의 제목을 명확히 적어주세요.
- 평생사주 총평
- 초년운, 중년운, 말년운
- 건강운, 체질운
- 사회운, 사회적성격, 성격운, 타고난 성향, 타고난 인품
- 이성운, 애정운
- 재물운, 재물모으는법, 재물손실 막는법, 재테크비법

전통 명리학 용어를 자연스럽게 섞어 전문적이면서도 이해하기 쉽게 서술하세요. 각 항목마다 3~5문장 정도로 자세히 작성해주세요.`;

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
