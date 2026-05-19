# 사주팔자 운세 - AI 명리 분석 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4)

생년월일시로 사주팔자를 계산하고, Claude AI가 명리학적으로 해석해주는 웹 서비스입니다.

## ✨ 주요 기능

- **사주팔자 계산**: 양력 생년월일시 입력으로 년주, 월주, 일주, 시주 자동 계산
- **오행 분석**: 목, 화, 토, 금, 수의 오행 분포 시각화
- **십신 분석**: 각 주(柱)의 십신(십신) 의미 해석
- **대운 흐름**: 10년 단위 대운 표시
- **AI 명리 해석**: Claude API로 종합운, 애정운, 직업운, 재물운, 건강운 분석

## 🚀 빠른 시작

### 선행 요구사항
- Node.js 18 이상
- Supabase 계정 (나중 단계용)
- Claude API 키 (명리 분석용)

### 설치

```bash
git clone <repository>
cd saju
npm install
```

### 환경 설정

`.env.local` 파일 생성:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_claude_api_key
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저 열기: http://localhost:3000

## 📁 프로젝트 구조

```
saju/
├── app/
│   ├── api/               # API 라우트 (계산, 분석)
│   ├── layout.tsx         # Root 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 글로벌 스타일
├── components/            # React 컴포넌트
│   ├── SajuForm.tsx
│   ├── ResultDisplay.tsx
│   └── ElementsChart.tsx
├── lib/
│   ├── saju/
│   │   └── calculator.ts  # 사주 계산 로직
│   ├── claude.ts          # Claude API 클라이언트
│   └── supabase.ts        # Supabase 클라이언트
├── types/
│   └── saju.ts            # TypeScript 타입
└── docs/                  # 문서
    └── superpowers/
        ├── specs/         # 설계 문서
        └── plans/         # 구현 계획
```

## 🔄 다음 단계 (Phase 2-4)

- [ ] 사용자 인증 (Supabase Auth)
- [ ] 결과 저장 및 조회 (마이페이지)
- [ ] PDF 생성 및 다운로드
- [ ] 유료 기능 (결제 통합)
- [ ] 명리학 참고 자료 (PDF) 관리자 업로드

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 15, React, TypeScript
- **스타일링**: Tailwind CSS
- **백엔드**: Next.js API Routes
- **데이터베이스**: Supabase (PostgreSQL) - 추후
- **인증**: Supabase Auth - 추후
- **AI**: Claude API (Anthropic)
- **배포**: Vercel

## 📝 라이선스

MIT

## 💬 문의

명리학 알고리즘 관련 문의는 이슈를 통해 남겨주세요.

---

**면책사항**: 본 앱은 전통 명리학을 기반으로 AI가 해석한 결과입니다. 참고용으로만 활용하시고, 중요한 결정은 전문가와 상담하세요.
