# Uprize — Frontend

> **Build Before You Build**
> 시행사 대표가 건축사무소 가기 전, AI로 필지 위에 건물을 먼저 올려보는 서비스

Next.js + TypeScript + Tailwind + shadcn/ui 기반 · 레포 분리 구조(`uprize-frontend` / `uprize-backend`)

---

## 프로젝트 개요

| 항목          | 내용                                                                |
| ------------- | ------------------------------------------------------------------- |
| 서비스명      | Uprize (업라이즈)                                                   |
| 슬로건        | Build Before You Build                                              |
| 타겟 유저     | 시행사 대표                                                         |
| 핵심 가치     | 건축사무소 계약 전, 10분 만에 사업 제안용 건물 이미지 + 설계안 생성 |
| 사용 목적     | 금융사 PF 제안, 지자체 인허가 준비, 투자자 프레젠테이션             |
| MVP 건물 용도 | 호텔                                                                |
| 향후 확장     | 오피스텔, 주거복합, 오피스빌딩, 상업시설, 문화시설                  |

---

## 핵심 유저 플로우 (MVP)

```
1. 카카오 로그인 (Supabase OAuth)
2. 카카오맵에서 핀 찍기 → 주소 자동 입력
3. 현장 이미지 확보 — 3단계 자동 분기
   ├─ 로드뷰 캡처 (기본)
   ├─ 직접 업로드 (로드뷰 없음)
   └─ AI 도심 배경 생성 (업로드 없음)
4. 필지 정보 입력 (대지면적, 용적율, 건폐율, 용도지역, 층수)
5. 주변 환경 태그 (산·하천·바다·공원·역세권·상업가 등)
6. 호텔 디자인 스타일 선택 (6종)
7. AI 생성 — FLUX.1 Kontext(이미지) + Claude API(설계 텍스트)
8. 결과 확인 → PDF 저장 + 히스토리 저장
```

자세한 플로우와 외부 서비스 구성은 [docs/architecture.md](./docs/architecture.md) 참조.

---

## 전체 구조

```
uprize-frontend/
├── CLAUDE.md                        ← Claude Code 진입점 (매 세션 자동 로드)
├── package.json                     ← 보안 버전 고정 + 스택 의존성
├── .npmrc                           ← 보안 감사 자동화
│
├── .claude/
│   └── rules/                       ← Claude 행동 규칙 (파일 건드릴 때 lazy-load)
│       ├── typescript.md
│       ├── naming.md
│       └── git.md
│
└── docs/
    ├── architecture.md              ← Uprize 프론트엔드 구조
    └── _templates/
        ├── page-comment.md          ← 페이지/컴포넌트/훅 주석 표준
        └── feature-spec.md          ← 기능 스펙 문서 템플릿
```

---

## 확정 스택 (2026 기준)

| 항목                 | 선택                                | 용도                          |
| -------------------- | ----------------------------------- | ----------------------------- |
| 프레임워크           | Next.js 14+ App Router              | 라우팅, SSR                   |
| 언어                 | TypeScript strict                   | 전체                          |
| 스타일링             | Tailwind CSS + shadcn/ui            | UI                            |
| 서버 상태            | TanStack Query v6                   | API 데이터, 캐싱              |
| 전역 클라이언트 상태 | Zustand                             | 로그인 유저, 위저드 임시 상태 |
| URL 상태             | useSearchParams (Next.js 내장)      | 필터, 페이지네이션            |
| 폼 상태              | React Hook Form + Zod               | 필지 정보 입력 등             |
| 로컬 상태            | useState                            | 드롭다운, 토글                |
| HTTP                 | Axios >=1.15.0                      | API 요청                      |
| Auth / DB            | Supabase (카카오 OAuth)             | 로그인, PostgreSQL, Storage   |
| 지도                 | 카카오맵 / 로드뷰 JS SDK            | 필지 선택, 현장 이미지        |
| 이미지 합성          | fal.ai FLUX.1 Kontext (백엔드 경유) | 호텔 AI 합성                  |
| 설계 텍스트          | Anthropic Claude API (백엔드 경유)  | 8개 항목 설계안               |
| 배포                 | Vercel                              | Frontend                      |

---

## 보안 — 절대 설치 금지 버전

| 패키지 | 금지 버전       | 사유                                               | CVE                        |
| ------ | --------------- | -------------------------------------------------- | -------------------------- |
| axios  | 1.14.1, 0.30.4  | 공급망 해킹 RAT (Sapphire Sleet, 북한, 2026-03-31) | —                          |
| axios  | 1.x < 1.15.0    | SSRF / proxy bypass                                | CVE-2026-40175 (CVSS 9.9)  |
| axios  | 0.x < 0.31.0    | SSRF / proxy bypass                                | CVE-2026-40175 (CVSS 9.9)  |
| react  | 19.0.0 ~ 19.2.3 | 인증 없이 서버 코드 실행 가능                      | CVE-2025-55182 (CVSS 10.0) |
| next   | < 14.2.35       | 위 React RCE Next.js 대응                          | CVE-2025-66478             |

> `package.json`의 `overrides` 필드에서 의존성 트리 전체 강제 차단 중

---

## 폴더 구조 설계 원칙

```
src/
├── app/              라우팅 전용 (로직 최소화)
├── features/         기능별 비즈니스 로직 (kebab-case)
│   ├── auth/
│   ├── site-selection/          ← Step 1 필지 선택
│   ├── site-image/              ← Step 2 현장 이미지 (로드뷰/업로드/AI)
│   ├── site-info/               ← Step 3 필지 정보 입력
│   ├── context-tags/            ← Step 4 주변 환경 태그
│   ├── style-selection/         ← Step 5 호텔 스타일
│   ├── image-generation/        ← FLUX 호출
│   ├── design-proposal/         ← Claude 설계안
│   └── project-result/          ← 결과 + PDF
├── shared/           2개+ 기능 공통 사용
│   ├── components/   Button, Modal, 위저드 프레임 등
│   ├── hooks/
│   └── utils/        formatArea 등
└── lib/              외부 라이브러리 설정
    ├── supabase/     클라이언트/서버 분리
    ├── kakao/        지도/로드뷰 로더
    └── axios.ts      인터셉터 (JWT 주입)
```

**파일 위치 결정 기준:**

- 한 기능에서만 쓰임 → `features/기능명/`
- 두 곳 이상 쓰임 → `shared/`
- 모르겠으면 → 일단 `features/`에 두고 나중에 올리기

---

## 상태 관리 원칙

```
서버 상태   → TanStack Query     features/*/hooks/use*.query.ts
전역 상태   → Zustand            features/*/store.ts
URL 상태    → useSearchParams    필터, 페이지네이션
폼 상태     → React Hook Form    features/*/components/*Form.tsx
로컬 상태   → useState           드롭다운, 토글
```

> **핵심 규칙:** API 응답 데이터는 절대 Zustand에 저장하지 않는다.
> TanStack Query 캐시가 서버 데이터의 단일 진실 공급원.
>
> **Uprize 예외 메모:** 위저드(Step 1~6) 임시 입력값은 서버 상태가 아니므로
> `projectDraft.store.ts` (Zustand persist)로 관리한다. 최종 생성 요청 시에만
> 백엔드로 전송 → 응답은 TanStack Query로 관리.

---

## 코드 규칙 요약

### 함수 선언

```typescript
// ✅ 항상 const 화살표 함수
const SiteCard = () => { ... }
const fetchProjects = async (): Promise<Project[]> => { ... }

// ❌ 클래스 금지
class ProjectService { ... }
```

### 타입

```typescript
// ✅
type SiteCardProps = { site: Site };

// ❌ any 절대 금지
const data: any = response;
```

### 스타일링

```typescript
// ✅ Tailwind + cn()
<div className={cn('flex items-center', isSelected && 'bg-primary')}>

// ❌ 인라인 style 금지
<div style={{ color: 'red' }}>
```

---

## 네이밍 규칙 요약

```
use*.query.ts        TanStack Query 훅 (mutation 포함)
use*.ts              일반 커스텀 훅
*.store.ts           Zustand store
*.types.ts           타입 정의
*Form.tsx            폼 컴포넌트
handleXxx            이벤트 핸들러
isXxx / hasXxx       boolean 변수
MAX_UPLOAD_MB        상수 (UPPER_SNAKE_CASE)
features/[kebab]/    폴더명 (kebab-case)
```

---

## Git 커밋 형식

```
feat     새 기능
fix      버그 수정
refactor 코드 개선
style    포맷 변경
docs     문서 수정
chore    빌드/설정 변경
```

```
feat: 카카오맵 핀 드롭 + 역지오코딩 연동
feat: FLUX.1 Kontext 이미지 합성 mutation 추가
fix: 로드뷰 커버리지 없을 때 업로드 플로우 fallback
chore: axios 1.15.0으로 버전 업
```

---

## 새 기능 시작 체크리스트

- [ ] `docs/_templates/feature-spec.md` 복사 → `docs/features/기능명.md` 작성
- [ ] 스펙에 Routes / Components / State / API / Types / AC 채우기
- [ ] Claude Code에 "이 스펙 보고 구현해줘"
- [ ] 페이지 파일 맨 위에 `docs/_templates/page-comment.md` 주석 형식 적용
- [ ] PR 전 `npm run type-check` + `npm audit` 통과
