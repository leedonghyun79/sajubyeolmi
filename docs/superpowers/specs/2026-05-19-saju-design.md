# 사주팔자 운세 플랫폼 설계 문서

**작성일**: 2026-05-19  
**프로젝트**: 실제 서비스 수준의 사주팔자 운세 분석 웹사이트  
**기술 스택**: Next.js, Supabase, Claude API (나중에 변경 가능), jsPDF

---

## 1. 프로젝트 개요

기존 `demo.html`의 사주팔자 계산 및 AI 해석 기능을 기반으로, 실제 서비스 수준의 플랫폼으로 확장하는 프로젝트.

### 주요 기능
- 생년월일시 입력 → 사주팔자 자동 계산
- Claude API (또는 대체 API)를 통한 명리학 기반 AI 해석
- 사용자 계정 & 결과 저장 (회원가입/로그인)
- 분석 결과를 PDF로 다운로드
- 유료 프리미엄 기능 (구조 미리 구축, 기능은 나중 정의)

---

## 2. 요구사항

### 기능 요구사항
1. **사주 계산** (기존 demo.html 이식)
   - 양력 생년월일시 입력
   - 년주, 월주, 일주, 시주 자동 계산
   - 오행 분포 분석
   - 십신(십신) 분석
   - 대운(10년 주기 운명) 계산

2. **AI 명리 해석** (Claude API)
   - 종합운, 애정운, 직업운, 재물운, 건강운 다섯 가지 분석
   - 결과 캐싱으로 재계산 방지

3. **사용자 관리**
   - 회원가입/로그인 (이메일 기반, Supabase Auth)
   - 사주 결과 저장 및 조회
   - 마이페이지 (저장된 결과 목록)

4. **PDF 생성**
   - 사주 분석 결과를 PDF 문서로 생성
   - 다운로드 가능

5. **프리미엄 구조** (현재 미정, 구조만 준비)
   - 결제 게이트웨이 준비 (Stripe 등)
   - 프리미엄 기능 플래그 설정

### 제약사항
- 명리학 PDF 참고 자료는 관리자가 수동 업로드 (나중 구현)
- Claude API 비용 최적화 (나중에 다른 API로 교체 가능)
- Supabase 무료 티어 내에서 운영 기본 목표

---

## 3. 시스템 아키텍처

### 기술 스택
- **Frontend**: Next.js 15 (App Router 권장)
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage (PDF)
- **AI API**: Claude API (jsPDF로 로컬 생성, API는 분석용만)
- **PDF 생성**: jsPDF or pdfkit
- **배포**: Vercel (Next.js 최적화)

### 아키텍처 다이어그램
```
┌─────────────────────────────────────────┐
│         Next.js Frontend                │
│  (Pages, Components, Client Logic)      │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼──────┐     ┌────▼────────────┐
   │ Next.js   │     │ Supabase        │
   │ API Routes│     │ (DB + Auth +    │
   │           │     │  Storage)       │
   └────┬──────┘     └─────┬───────────┘
        │                  │
        └────────┬─────────┘
                 │
        ┌────────▼────────┐
        │ Claude API      │
        │ (분석만)        │
        └─────────────────┘
```

---

## 4. 주요 페이지 & 라우트 구조

### Public Routes
- `/` — 메인 페이지 (사주 입력 폼)
- `/auth/login` — 로그인 페이지
- `/auth/signup` — 회원가입 페이지
- `/premium` — 프리미엄 소개 (아직 미정)

### Protected Routes (로그인 필수)
- `/dashboard` — 마이페이지 (저장된 결과 목록)
- `/result/[id]` — 사주 분석 결과 상세 페이지
- `/result/[id]/pdf` — PDF 다운로드 엔드포인트

### API Routes
- `POST /api/calculate` — 사주 계산 (프론트에서 클라이언트 사이드 계산 가능)
- `POST /api/analyze` — AI 분석 (Claude API 호출)
- `POST /api/generate-pdf` — PDF 생성
- `POST /api/auth/[...nextauth]` — Supabase Auth 처리
- `GET|POST /api/results` — 결과 CRUD
- `GET /api/results/[id]` — 특정 결과 조회
- `DELETE /api/results/[id]` — 결과 삭제

---

## 5. 데이터 모델 (Supabase PostgreSQL)

### users (Supabase Auth 자동 생성)
```sql
id (UUID, PK)
email (VARCHAR)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### user_profiles (추가 사용자 정보)
```sql
id (UUID, PK)
user_id (UUID, FK → users.id)
name (VARCHAR)
bio (TEXT, nullable)
premium_status (BOOLEAN, default=false)
premium_expiry (TIMESTAMP, nullable)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### saju_results (사주 계산 결과)
```sql
id (UUID, PK)
user_id (UUID, FK → users.id)

-- 입력 정보
year (INT)
month (INT)
day (INT)
hour (INT)
gender (VARCHAR: 'male' | 'female')

-- 계산된 사주팔자
pillars (JSONB) {
  year: {stem, branch, element},
  month: {stem, branch, element},
  day: {stem, branch, element},
  hour: {stem, branch, element}
}

-- 오행 분석
elements (JSONB) {
  목: {count, percentage, 강약평가},
  화: {count, percentage, 강약평가},
  토: {count, percentage, 강약평가},
  금: {count, percentage, 강약평가},
  수: {count, percentage, 강약평가},
  dominant_element: STRING
}

-- 십신 분석
ten_gods (JSONB) {
  year_god: {name, meaning, desc},
  month_god: {name, meaning, desc},
  day_god: {name, meaning, desc},
  hour_god: {name, meaning, desc}
}

-- 대운 (10년 주기)
da_yun (JSONB) [{age, stem, branch, element, fortune_desc}, ...]

-- AI 분석
ai_analysis (JSONB) {
  total: STRING,
  love: STRING,
  career: STRING,
  money: STRING,
  health: STRING,
  analyzed_at: TIMESTAMP,
  model_version: STRING
}

-- PDF 정보
pdf_info (JSONB, nullable) {
  generated_at: TIMESTAMP,
  file_path: STRING,
  expires_at: TIMESTAMP
}

created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### payments (유료 기능, 구조만 미리 구축)
```sql
id (UUID, PK)
user_id (UUID, FK → users.id)
product_id (VARCHAR)
amount (DECIMAL)
status (VARCHAR: 'pending' | 'completed' | 'failed')
stripe_payment_id (VARCHAR, nullable)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

---

## 6. 주요 기능 플로우

### 6-1. 사주 계산 및 분석 플로우
```
1. 사용자가 메인 페이지(/})에서 생년월일시 입력
2. "사주팔자 보기" 버튼 클릭
3. 프론트엔드: 
   - 클라이언트 사이드에서 사주 계산 (JS 로직, demo.html 이식)
   - 결과를 상태에 저장
4. AI 분석 요청:
   - POST /api/analyze로 사주 정보 전송
   - 백엔드에서 Claude API 호출
   - 응답 캐싱 (같은 사주는 재계산 안 함)
5. 결과 페이지 렌더링
   - 사주팔자, 오행, 십신, 대운 표시
   - AI 해석 탭 (종합, 애정, 직업, 재물, 건강)
6. 로그인된 사용자: 결과 저장 옵션
   - POST /api/results로 사주 결과 저장
   - Supabase에 저장
7. PDF 다운로드:
   - POST /api/generate-pdf 호출
   - jsPDF로 PDF 생성
   - Supabase Storage에 저장 (선택사항)
   - 다운로드 링크 제공
```

### 6-2. 사용자 인증 플로우
```
1. 회원가입 (/auth/signup)
   - 이메일, 비밀번호 입력
   - Supabase Auth 호출
   - user_profiles 자동 생성
2. 로그인 (/auth/login)
   - 이메일, 비밀번호 입력
   - Supabase Auth 세션 생성
3. 마이페이지 (/dashboard)
   - 저장된 사주 결과 목록 조회 (GET /api/results)
   - 각 결과 상세 보기 가능
```

### 6-3. 결과 관리 플로우
```
1. 저장된 결과 조회
   - GET /api/results → 사용자의 모든 결과
   - GET /api/results/[id] → 특정 결과
2. 결과 삭제
   - DELETE /api/results/[id]
3. 결과 상세 페이지 (/result/[id])
   - 저장된 사주 정보 재표시
   - PDF 다시 다운로드 가능
```

---

## 7. PDF 생성 전략

### 구현 방식
- **라이브러리**: jsPDF (또는 pdfkit)
- **생성 시점**: 사용자가 "PDF 다운로드" 버튼 클릭 시
- **콘텐츠**: 사주팔자, 오행, 십신, 대운, AI 분석 결과 포함
- **저장**: 선택사항 (Supabase Storage 또는 클라이언트 다운로드만)

### PDF 레이아웃
```
┌─────────────────────────────────┐
│   사주팔자 운세 분석 결과        │
│   생년월일시: 1990년 1월 15일   │
├─────────────────────────────────┤
│ 사주팔자          │ 오행 분포    │
│ 년주: 경오        │ 목: 2개 25%  │
│ 월주: 정축        │ 화: 1개 12%  │
│ 일주: 을해        │ 토: 2개 25%  │
│ 시주: 무자        │ 금: 2개 25%  │
│                   │ 수: 1개 12%  │
├─────────────────────────────────┤
│ AI 명리 해석                     │
│ [종합운, 애정운, ... 내용]      │
├─────────────────────────────────┤
│ 분석일시: 2026-05-19            │
│ 면책사항: 참고용으로만...        │
└─────────────────────────────────┘
```

---

## 8. 기술 선택 & 고려사항

### API 선택 (Claude API 나중에 변경 가능)
- **현재**: Claude API (sonnet-4 또는 haiku, 비용 고려)
- **나중 대체 옵션**: Naver/Kakao AI API, 오픈소스 LLM 등
- **구조**: API 호출 로직을 별도 함수로 분리 → 교체 용이

### 명리학 PDF 참고 자료 (나중 구현)
- 관리자가 Supabase Storage에 업로드
- 사주 분석 시 RAG(Retrieval-Augmented Generation)로 활용
- Claude API의 Files API 또는 프롬프트 컨텍스트에 포함

### 보안
- Supabase Auth로 사용자 인증 관리
- RLS (Row Level Security) 정책으로 데이터 접근 제어
- API Routes에서 인증 토큰 검증
- 민감한 API 키는 환경변수 관리 (.env.local)

### 성능 최적화
- 사주 계산은 클라이언트 사이드 처리 (JS)
- AI 분석 결과 캐싱 (같은 사주 재분석 방지)
- ISR (Incremental Static Regeneration) 활용 (공개 페이지)
- 이미지/폰트 최적화

### 확장성
- 유료 기능 플래그 (premium_status) 미리 구축
- 결제 API 통합 준비 (Stripe 스키마)
- 관리자 페이지 구조 (나중 확장)

---

## 9. 개발 마일스톤

### Phase 1: MVP (2-3주)
- [x] 프로젝트 기획 & 설계
- [ ] Next.js 프로젝트 초기화
- [ ] Supabase 연결 & 인증 구현
- [ ] 사주 계산 로직 이식 (demo.html → TS)
- [ ] 메인 페이지 & 사주 입력 폼
- [ ] Claude API 통합 & 해석
- [ ] 결과 표시 페이지
- [ ] 기본 스타일링 (frontend-design 스킬)

### Phase 2: 사용자 기능 (2주)
- [ ] 회원가입/로그인 페이지
- [ ] 마이페이지 (결과 목록)
- [ ] 결과 저장/조회/삭제
- [ ] 결과 상세 페이지

### Phase 3: PDF & 배포 (1주)
- [ ] PDF 생성 기능
- [ ] Vercel 배포 설정
- [ ] 환경변수 관리
- [ ] 성능 측정 & 최적화

### Phase 4: 프리미엄 & 확장 (나중)
- [ ] 유료 기능 정의
- [ ] Stripe 결제 통합
- [ ] 명리학 PDF 자료 관리
- [ ] 관리자 대시보드

---

## 10. 다음 단계

이 설계가 승인되면:
1. writing-plans 스킬로 상세한 구현 계획 수립
2. Next.js 프로젝트 초기화 및 폴더 구조 생성
3. Supabase 프로젝트 생성 및 테이블 생성
4. Phase 1 구현 시작 (사주 계산 → 사주팔자 표시)
