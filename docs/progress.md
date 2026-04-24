# Uprize Web — 진행 현황

> 시행사 대표가 건축사무소 가기 전, AI로 필지 위에 건물을 먼저 올려보는 서비스.
> 이 문서는 프론트엔드(`uprize/web`) 진행 상황을 한 곳에서 추적합니다.

**최종 업데이트**: 2026-04-24

---

## 전체 Phase 요약

| Phase | 내용 | 상태 |
|---|---|---|
| A | 기반공사 — 디렉토리 스캐폴드, env, axios, Supabase, Query/Zustand, App Router 재설계, Vitest/MSW | ✅ 완료 |
| B | Dashboard 실데이터 연결 (`/api/projects` CRUD) | ✅ 완료 |
| C | 위저드 6-step (지도/필지정보/주변환경/배경/스타일/리뷰) | ✅ 완료 |
| D | (흡수됨) 프리셋 배경으로 전환되면서 Phase C에 통합 | — |
| E | Generations — FLUX + Claude 생성 트리거 · 폴링 · 진행률 UI | 🕒 백엔드 대기 |
| F | Result · PDF · 이메일 Export | 🕒 백엔드 대기 |
| G | 카카오 OAuth 실연동 · 미들웨어 가드 · Vercel 배포 | 🕒 마지막 단계 |

---

## 주요 제품 결정사항 (2026-04-23 ~ 24)

1. **프리셋 배경 라이브러리 방식 채택** — 로드뷰 자동 캡처/유저 업로드/AI 배경 생성 3단 분기는 제거. 대신 백엔드가 큐레이션한 7개 카테고리(바다/산/시티/공원/시장/강변/근교) 이미지 중에서 유저가 선택.
   - 사유: 로드뷰 정적 이미지 추출 API 부재 + MVP 단순화 + 유저가 사진 찍어 올릴 필요 없음.
2. **카카오 로그인은 마지막(Phase G)**에 붙임 — 개발 내내 `NEXT_PUBLIC_USE_DEV_AUTH=true` + `X-Dev-User-Id` 헤더로 인증 우회.
3. **역지오코딩은 카카오 JS SDK 에서 직접 처리** — 백엔드 `/api/site/reverse-geocode` 사용 안 함.
   - `libraries=services` 로 SDK 로드 → `kakao.maps.services.Geocoder.coord2Address` 사용.
4. **App Router 전면 채택** — Pages Router 미사용. 기존 view-state SPA 프로토타입은 라우트별로 분해.
5. **테스트 프레임워크**: Vitest + MSW + React Testing Library.

---

## Phase A — 기반공사 (완료)

### 파일 구조 스캐폴드
```
src/
├── app/                   # App Router 라우트
│   ├── dashboard/page.tsx
│   ├── gallery/page.tsx
│   ├── login/page.tsx     # Phase G placeholder
│   ├── pricing/page.tsx
│   ├── studio/
│   │   ├── new/page.tsx
│   │   └── [projectId]/
│   │       ├── site/page.tsx         # Phase D/E placeholder
│   │       ├── conditions/page.tsx   # Phase D/E placeholder
│   │       └── result/page.tsx       # Phase F placeholder
│   ├── error.tsx · loading.tsx · not-found.tsx
│   ├── layout.tsx         # QueryProvider + TopBar 래핑
│   └── page.tsx           # Landing adapter
├── features/              # 기능별 모듈
│   ├── project-list/      # Dashboard CRUD
│   ├── project-wizard/    # /studio/new 위저드
│   ├── site-image/        # 배경 프리셋
│   └── site-selection/    # 카카오맵 / 역지오코딩
├── shared/                # 2곳 이상에서 쓰이는 것
│   ├── components/        # TopBar, LoadingOverlay, PlaceholderCard
│   ├── lib/               # env · apiClient · supabaseClient · imageHost
│   ├── providers/         # QueryProvider
│   └── types/             # api · project · siteImage · generation
└── test/                  # vitest setup + MSW handlers
```

### 설정/환경
- `.env.example` · `.env.local` 생성 (gitignore 포함)
- `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY`, `NEXT_PUBLIC_KAKAO_JS_KEY`, `NEXT_PUBLIC_USE_DEV_AUTH`, `NEXT_PUBLIC_DEV_USER_ID`
- `src/shared/lib/env.ts` — Zod 파싱, 런타임 검증
- `next.config.ts` — fal.ai · Supabase Storage · 카카오 CDN 이미지 도메인 등록

### 인프라
- `apiClient.ts` — axios 인스턴스, envelope 언랩(`{ status, data }` / `{ status, message }`), 인증 헤더 주입(`X-Dev-User-Id` 또는 Supabase JWT), `ApiError` 정규화
- `supabaseClient.ts` · `supabaseServer.ts` — 브라우저/RSC 클라이언트 분리
- `QueryProvider` — TanStack Query v5 (`staleTime: 60s`, `retry: 1`)
- `projectDraft.store.ts` — Zustand persist (`skipHydration` 수동 rehydrate)
- 공통 타입: `api.types.ts`, `project.types.ts`, `siteImage.types.ts`, `generation.types.ts`

### 테스트
- `vitest.config.ts` + `src/test/setup.ts` + MSW handlers
- `constants.test.ts` — 3 passed (스타일 6종 · 호텔 enabled · 상수 비어있지 않음)

### App Router 재설계
- 기존 `src/app/page.tsx` 의 view-state SPA 로직 완전 제거
- `src/components/Dashboard.tsx`, `TopBar.tsx`, `LoadingOverlay.tsx` 삭제 (shared/features 로 이관)
- 남은 레거시: `Landing.tsx`, `Studio.tsx`, `Result.tsx`, `Gallery.tsx`, `Pricing.tsx`, `src/lib/data.ts` — Phase E/F 에서 분해 예정

---

## Phase B — Dashboard 실데이터 (완료)

### 백엔드 OpenAPI 동기화
백엔드 스펙 확인 결과, 프론트 타입을 flat 구조로 재정렬:
- `Project`: `address / roadAddress / latitude / longitude / siteImageUrl / siteArea / far / bcr / zoning / floorsAbove / floorsBelow / surroundings[] / buildingType / designStyle / status`
- `status`: `draft | ready | generated`
- `buildingType`: `hotel` 고정 (MVP)
- `designStyle`: `iconic / minimal / biophilic / futurist / heritage / resort`

### Query/Mutation 훅
- `useProjectList` (GET `/api/projects`)
- `useProjectDetail` (GET `/api/projects/:id`)
- `useCreateProject` (POST)
- `useUpdateProject` (PATCH)
- `useDeleteProject` (DELETE)
- `useSiteImageList` (GET `/api/site-images?category=...`)

### Dashboard 분해
`src/features/project-list/components/`
- `DashboardView` · `DashboardHeader` · `ProjectFilterBar` · `ProjectListGrid` · `ProjectCard` · `ProjectListStates`(loading/empty/error)

필터: `all / draft / ready / generated`. 검색: address · roadAddress · zoning.

### 방어 코드
- `src/shared/lib/imageHost.ts` — `isAllowedImageUrl()` 화이트리스트. `next/image` 에 미등록 호스트 URL 이 들어와도 placeholder 로 폴백 (백엔드 seed `example.com/site.jpg` 같은 더미 URL 대응).

---

## Phase C — 위저드 6-step (완료)

### 스텝 구성 (`src/features/project-wizard/config/steps.ts`)
| # | ID | 제목 | 비고 |
|---|---|---|---|
| 1 | map | 사업 위치 | 주소 검색 + 카카오맵 핀 드롭 |
| 2 | site-info | 필지 정보 | RHF + Zod |
| 3 | surroundings | 주변 환경 | 다중선택 태그 |
| 4 | background | 배경 선택 | `/api/site-images` 카탈로그 |
| 5 | style | 디자인 스타일 | 호텔 6종 |
| 6 | review | 확인 · 생성 | POST `/api/projects` |

### 핵심 컴포넌트
- `WizardShell` — sticky stepper, 카드 헤더, `--topbar-h` CSS 변수 기반 여백
- `WizardStepper` — 완료된 단계 클릭으로 점프 가능, 현재 step 강조
- `WizardNav` — 이전/다음 + Draft 초기화 후 대시보드 복귀
- `useCanAdvanceStep` — 단계별 필수값 검증
- `MapStep` — 주소 검색 중심 UX (기존 핀드롭 위주에서 UX 개선)
  - `AddressSearch` — `kakao.maps.services.Geocoder.addressSearch` 결과 드롭다운
  - `KakaoMapView` — SDK 로더 싱글톤 + 마커 + 클릭 핀드롭
  - `useReverseGeocode` — `coord2Address` Promise 래퍼
- `SiteInfoForm` — siteArea/far/bcr/zoning/floorsAbove/floorsBelow
- `SurroundingsField` — 주변환경 다중선택 pill
- `BackgroundPicker` — 카테고리 탭(전체 + 7종) + 카드 그리드
- `StyleSelector` — 호텔 스타일 6종 카드
- `ReviewStep` — 요약 + 제출 + `useCreateProject`
- `buildCreatePayload` — draft → POST 페이로드, 누락 필드 검증(`DraftIncompleteError`)

### 카카오맵 SDK
- `libraries=services` 로 로드 → `addressSearch` / `coord2Address` 둘 다 브라우저에서 처리
- `src/features/site-selection/types/kakao.types.ts` — `any` 없이 완전 타입화
- 카카오 개발자 콘솔에 **JavaScript SDK 도메인**으로 `http://localhost:3000` 등록 필수

---

## 디자인 시스템 정합

### globals.css 디자인 토큰 (Tailwind v4 `@theme` 매핑)
- 배경: `bg-bg` (#ECEAE4), `bg-paper` (#F5F3EE), `bg-bg-2` (#E2DFD8)
- 잉크: `text-ink` (#15140F), `text-ink-2`, `text-ink-soft`, `text-ink-faint`, `text-ink-decorative`
- 선: `border-line`, `border-line-strong`
- 브랜드: `text-brand` (#E85420), `text-brand-deep`

### 폰트
- `font-display` (Instrument Serif) — 대제목, 수치 강조
- `font-sans` (Space Grotesk / Pretendard) — 본문
- `font-mono` (JetBrains Mono) — 라벨, 좌표 등 수치

### 폰트 일관성 규칙 (Phase C 에서 정립)
- **폼 라벨**: `font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft` — 랜딩 `.field-lbl` 과 동일
- **단위 표기**: `font-display italic text-[15px] text-ink-faint`
- **대제목**: `font-display text-3xl/md:text-5xl text-ink leading-[1.1]`
- **값 내용**: sans-serif 기본, `break-words` 로 긴 한글 자연 줄바꿈

### TopBar (광역 규칙)
- `.topbar { position: fixed; height: var(--topbar-h); background: var(--bg); z-index: 100 }` — 완전 불투명
- `--topbar-h: 64px` (모바일) / `72px` (≥900px)
- 경로별 이중 모드:
  - 마케팅 모드 (`/`, `/gallery`, `/pricing`) — 전체 메뉴 + 시작하기 CTA
  - 앱 모드 (`/dashboard`, `/studio/*`, `/login`) — 로고 + 상황별 액션 1개
- `/studio/*` 의 stepper 는 **sticky** (TopBar 바로 아래 찰싹), 스크롤해도 겹침 없음

### 넘침/폰트 안전장치
- flex/grid 자식에 `min-w-0` 강제 → 긴 placeholder / 주소가 박스 깨뜨리지 않음
- `break-keep` 대신 body 기본 `overflow-wrap: anywhere` 에 의존 + 필요시 `break-words`
- next/image 는 허용 호스트 (`isAllowedImageUrl`) 아니면 placeholder 폴백

---

## 환경변수 현황

`.env.local` (gitignored)
| 키 | 값 | 상태 |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:4000` | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://qmcrulhmhfsngdnydjdg.supabase.co` | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 설정됨 | ✅ |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | 설정됨 | ✅ (도메인 등록 완료) |
| `NEXT_PUBLIC_USE_DEV_AUTH` | `true` | ✅ (Phase G 에서 false) |
| `NEXT_PUBLIC_DEV_USER_ID` | 설정됨 | ✅ |

---

## 의존 백엔드 엔드포인트

| Phase | 기능 | 엔드포인트 | 상태 |
|---|---|---|---|
| B | 프로젝트 CRUD | `GET/POST /api/projects`, `GET/PATCH/DELETE /api/projects/:id` | ✅ 동작 확인 |
| C | 배경 카탈로그 | `GET /api/site-images?category=...` | ✅ 동작 확인 |
| E | 생성 트리거/상태 | `POST /api/projects/:id/generations` 등 | 🕒 백엔드 테스트 중 |
| F | PDF/이메일 export | `/api/exports*` | 🕒 미착수 |
| G | Supabase Kakao OAuth | Supabase 대시보드 + 콜백 | 🕒 최종 단계 |

백엔드 CORS 는 `http://localhost:3000` 에 대해 `cors` 미들웨어로 허용 처리됨 (Phase B 직전 이슈 해결).

---

## 알려진 이슈 · TODO

- [ ] `src/components/Landing|Studio|Result|Gallery|Pricing.tsx` 와 `src/lib/data.ts` 는 레거시 목업. Phase E/F 에서 features 로 분해하며 제거 예정
- [ ] `SiteInfoForm` 의 `register("zoning")` + 별도 `setValue` 중복 코드 제거 (동작엔 문제없음)
- [ ] `BackgroundPicker` 선택 상태 강조에 brand orange accent 고려 (`/colorize` 커맨드 예정)
- [ ] `ReviewStep` 레이아웃 — 이미지 preview / summary 좌우 비율 및 제출 버튼 위치 미세 조정
- [ ] `/studio/[id]/site|conditions|result` placeholder 카피 정비 (지금은 "Phase D" 같은 개발자 용어)
- [ ] Phase G 진입 시 `NEXT_PUBLIC_USE_DEV_AUTH=false` 전환 + Supabase Auth Kakao provider 활성화
- [ ] Vercel 배포 시 카카오 콘솔 JavaScript SDK 도메인에 production URL 추가

---

## 검증 체크리스트 (현재)

- `npm run type-check` ✅
- `npm test` ✅ (3 passed)
- `npm run build` ✅ (10 라우트 빌드 성공)
- 브라우저 수동 확인:
  - `/` 랜딩 렌더
  - `/dashboard` 실데이터 1건 표시
  - `/studio/new` 위저드 6 step 전체 진행 가능
  - 주소 검색 · 카카오맵 핀드롭 · 역지오코딩 동작
  - 배경 프리셋 카탈로그 로드

---

## 다음 작업 후보

1. **Phase E 착수** — 백엔드 Generations 엔드포인트 테스트 완료되는 대로 `useStartGeneration` + 폴링 UI
2. **디자인 폴리시** — `/polish`, `/colorize`, `/arrange` 로 세부 정렬·브랜드 accent·Review 레이아웃 다듬기
3. **레거시 목업 컴포넌트 분해** — Landing 을 제외한 `src/components/*` 를 `features/*` 로 이전
4. **E2E 테스트** — Playwright 기반 2 시나리오 (프로젝트 생성 전체 플로우 · 에러 복구)
