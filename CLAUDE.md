# Uprize (Frontend)

> 시행사 대표가 건축사무소 가기 전, AI로 필지 위에 건물을 먼저 올려보는 서비스
> **"Build Before You Build"**

## Stack

- Next.js 14+ (App Router) · TypeScript strict · Tailwind + shadcn/ui
- 상태: Zustand + TanStack Query + useSearchParams + React Hook Form + Zod
- HTTP: Axios >=1.15.0
- 지도: 카카오맵 / 카카오 로드뷰 JavaScript SDK
- Auth / DB: Supabase (카카오 OAuth)

## Project info

- 레포 구성: `uprize-frontend` (이 레포) + `uprize-backend` (Express, 별도 레포)
- API Base URL: [FILL — 예: https://uprize-api.onrender.com]
- Auth: Supabase 카카오 OAuth → Session JWT → `Authorization: Bearer ...`
- DB: Supabase (PostgreSQL) · Storage는 업로드/생성 이미지용
- 배포: Vercel (Frontend) / Render (Backend)

## Commands

```bash
npm run dev          # 개발 서버
npm run type-check   # 타입 체크
npm run build        # 빌드
npm audit            # 보안 감사
```

## Key rules

- const 화살표 함수만 사용 (클래스 금지, function 지양)
- `any` 타입 절대 금지
- Tailwind만 사용, 인라인 style 금지
- API 응답 데이터는 Zustand 저장 금지 → TanStack Query만
- Server Component 기본, 클라이언트 필요할 때만 `'use client'`

## Project-specific rules

- 카카오맵 / 로드뷰 SDK는 반드시 `'use client'` 컴포넌트에서만 로드 (window 참조 필요)
- fal.ai · Anthropic · Supabase **service role** 키는 서버 전용 → 클라이언트 번들 노출 금지
- AI 이미지 생성은 10~30초 소요 → TanStack Query `useMutation` + 명확한 로딩/진행률 UI 필수
- 외부 이미지 도메인은 `next.config.ts`의 `images.remotePatterns`에 등록
  - fal.ai CDN, Supabase Storage 공개 URL, 카카오 로드뷰 도메인
- 현장 이미지 확보 로직은 3단계 자동 분기 구조 유지 (roadview → upload → ai_generated)
- 건물 용도는 MVP에서 **호텔 고정**이지만, 오피스텔/상업시설 확장을 전제로 union/enum 구조 설계
- 호텔 디자인 스타일 6종(iconic, minimal, biophilic, futurist, heritage, resort)은 상수로 관리

## File location rule

- 한 기능에서만 쓰임 → `features/기능명/`
- 두 곳 이상 쓰임 → `shared/`

## Security — 설치 금지 버전

| 패키지 | 금지 버전      | 사유                           |
| ------ | -------------- | ------------------------------ |
| axios  | 1.14.1, 0.30.4 | 공급망 해킹 RAT (2026-03-31)   |
| axios  | 1.x < 1.15.0   | CVE-2026-40175 SSRF (CVSS 9.9) |
| axios  | 0.x < 0.31.0   | CVE-2026-40175 SSRF (CVSS 9.9) |
| react  | 19.0.0~19.2.3  | CVE-2025-55182 RCE (CVSS 10.0) |
| next   | < 14.2.35      | CVE-2025-66478 RCE             |

## Read more

@.claude/rules/typescript.md
@.claude/rules/naming.md
@.claude/rules/git.md
@docs/architecture.md
