import { NextRequest, NextResponse } from 'next/server';
import { calculateSaju } from '@/lib/saju/calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, month, day, hour, gender } = body;

    if (!year || !month || !day || hour === undefined || !gender) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요' },
        { status: 400 }
      );
    }

    const result = calculateSaju(
      parseInt(year),
      parseInt(month),
      parseInt(day),
      parseInt(hour),
      gender as 'male' | 'female'
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Calculate error:', error);
    return NextResponse.json(
      { error: '사주 계산에 실패했습니다' },
      { status: 500 }
    );
  }
}
