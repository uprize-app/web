# Uprize Backend API 명세

> 프론트엔드(`uprize-web`, Next.js 14, Vercel) ↔ 백엔드(`uprize-backend`, Express, Render) 인터페이스 정의서.
> 페이지 단위로 어떤 API 가 필요한지, 프론트/백엔드 책임 분리를 함께 정리합니다.

---

## 1. 책임 분리 (Frontend ↔ Backend)

### 프론트엔드(이 레포)에서 처리하는 것 — 백엔드 작업 불필요

| 기능 | 사용 라이브러리 | 비고 |
|---|---|---|
| 카카오 OAuth 로그인 UI/세션 | `@supabase/supabase-js` | 토큰을 cookie/localStorage 에 저장 |
| 카카오맵 렌더 / 핀 드롭 / 로드뷰 | 카카오맵 JS SDK | JavaScript 앱 키는 공개 OK |
| 폼 검증 | React Hook Form + Zod | |
| 임시저장 (현재 step / 입력 중인 값) | Zustand `persist` | localStorage |
| 데이터 캐싱 / 재요청 / 낙관적 UI | TanStack Query | |
| UI 애니메이션 / 애니메이션 SVG | Tailwind, framer-motion | |

### 백엔드(uprize-backend)가 책임지는 것

| 카테고리 | 이유 |
|---|---|
| Supabase JWT 검증 미들웨어 | 모든 보호 라우트 |
| 카카오 **로컬 REST API** 프록시 | REST 키 노출 방지 |
| VWorld / 공공데이터 호출 | 인증키 노출 방지 + 캐싱 |
| fal.ai FLUX.1 Kontext 호출 | 서버 전용 키 |
| Anthropic API 호출 | 서버 전용 키 |
| 사업성 계산식 / 한도 검증 | 비즈니스 로직 |
| Supabase Postgres CRUD | 모든 데이터 |
| 결제 PG (토스페이먼츠) | 키 보호 + 웹훅 |
| 이메일 발송 (Resend 등) | 키 보호 |

> **원칙**: 클라이언트 번들에 들어가면 안 되는 시크릿이 필요한 호출은 전부 백엔드 경유.

---

## 2. 공통 사항

### 2.1 인증

- 모든 보호 엔드포인트는 헤더 `Authorization: Bearer <Supabase JWT>` 필요
- 백엔드는 Supabase 의 JWT 를 verify 하여 `req.user.id` 를 채움
- 401 응답: 만료/누락 시
- 403 응답: 권한 부족 (다른 사람 프로젝트 접근 등)

### 2.2 Base URL & 응답 포맷

```
Base URL: https://uprize-api.onrender.com/api
Content-Type: application/json
```

```json
// 성공
{ "data": { ... } }

// 페이지네이션
{ "data": [ ... ], "meta": { "page": 1, "perPage": 20, "total": 42 } }

// 에러
{ "error": { "code": "LOT_NOT_FOUND", "message": "필지 정보를 찾을 수 없습니다." } }
```

### 2.3 페이지네이션 / 검색 표준

```
GET /api/...?page=1&perPage=20&q=검색어&sort=updatedAt:desc
```

---

## 3. 페이지별 필요 API

각 페이지에서 어떤 컴포넌트가 어떤 API 를 호출하는지 매핑.

---

### 📄 `/` — 랜딩 페이지

마케팅 페이지. **API 호출 없음.** (모두 정적 텍스트 + 인라인 SVG)

> 추후 "사례 보기" 섹션이 실 데이터화되면 `GET /api/projects/showcase` 추가.

---

### 📄 `/studio/new` — 위저드 (5-step) ★ 핵심

#### Step 1 · 필지 선택

| 컴포넌트 | API | 메서드 | 설명 |
|---|---|---|---|
| AddressSearch (자동완성) | `/api/lots/search` | `GET` | 카카오 로컬 검색 프록시 |
| KakaoMap 핀 드롭 | `/api/lots/reverse-geocode` | `GET` | 좌표 → 지번 |
| 필지 상세 카드 | `/api/lots/info` | `GET` | VWorld 필지 정보 |
| "최근 검색" 리스트 | `/api/me/recent-lots` | `GET` | 사용자 최근 검색 N건 |
| (검색 시) 자동 기록 | `/api/me/recent-lots` | `POST` | 최근 검색 추가 |

```http
GET /api/lots/search?q=서울 강남구 역삼동 123
→ { data: [{ jibun, address, lat, lng }, ...] }

GET /api/lots/reverse-geocode?lat=37.5&lng=127.0
→ { data: { jibun: "역삼동 123-4", roadAddress: "테헤란로 ..." } }

GET /api/lots/info?jibun=역삼동 123-4
→ { data: {
    jibun, address, jimok, areaSqm, zoning,
    bcrLimit, farLimit, groundLevel, lat, lng
  } }
```

> ⚠️ `/api/lots/info` 는 VWorld 호출 비용/지연 있으므로 **24h 캐시** (Postgres `lots` 테이블 또는 Redis) 권장.

#### Step 2 · 배경 (현장 분위기)

| 컴포넌트 | API | 메서드 | 설명 |
|---|---|---|---|
| BackgroundGrid | `/api/backgrounds` | `GET` | 6+ 큐레이션 배경 메타 |
| 자동 매칭 추천 | `/api/backgrounds/recommend` | `POST` | lot 좌표/용도지역 → 추천 ID |
| (선택) 사용자 업로드 | `/api/uploads/background` | `POST` (multipart) | Supabase Storage 업로드 |

```http
GET /api/backgrounds
→ { data: [{ id: "city", name: "도시 / Urban", tag: "도심",
              imageUrl: "https://.../city.webp", recommended: false }, ...] }

POST /api/backgrounds/recommend
body: { lat, lng, zoning }
→ { data: { recommendedId: "city", reason: "일반상업지역" } }
```

#### Step 3 · 필지 정보 + 자동 계산

| 컴포넌트 | API | 메서드 | 설명 |
|---|---|---|---|
| 자동 계산 카드 | `/api/lots/calc` | `POST` | 면적/객실수/사업비 |

```http
POST /api/lots/calc
body: {
  areaSqm: 1240.5,
  bcr: 60,
  far: 800,
  floorsAbove: 18,
  floorsBelow: 3,
  use: "hotel",
  region: "서울 강남구"  // 단가 산정용
}
→ { data: {
    maxBuildAreaSqm: 744,
    maxFloorAreaSqm: 9924,
    estimatedRoomCount: 198,
    estimatedBudgetEokWon: 328,
    warnings: []   // 한도 초과 등
  } }
```

> 단순 계산이지만 **지역별 단가 / 용도별 모듈 사이즈** 가 백엔드에서 진실의 원천이 되어야 함.

#### Step 4 · 디자인 스타일

| 컴포넌트 | API | 메서드 | 설명 |
|---|---|---|---|
| StyleGrid | `/api/design-styles` | `GET` | 6 스타일 메타 + 레퍼런스 |

```http
GET /api/design-styles?use=hotel
→ { data: [{
    id: "iconic", index: "01", code: "ICONIC",
    name: "아이코닉 랜드마크", reference: "버즈 알 아랍",
    referenceImageUrl: "https://...", description: "..."
  }, ...] }
```

#### Step 5 · AI 생성 & 결과 ★ 가장 복잡

| 컴포넌트 | API | 메서드 | 설명 |
|---|---|---|---|
| 생성 시작 (다음 버튼) | `/api/projects/generate` | `POST` | fal.ai 호출 시작 |
| 진행률 표시 | `/api/projects/:id/progress` | `GET` | polling (or SSE/WebSocket) |
| 결과 갤러리 | `/api/projects/:id` | `GET` | 5컷 URL 포함 |
| PDF / PNG / XLSX 다운로드 | `/api/projects/:id/exports/:type` | `GET` | signed URL 반환 |

```http
POST /api/projects/generate
body: {
  draftId?: "uuid",   // 기존 임시저장이 있으면
  lot: {...}, background: "city", siteInfo: {...},
  designStyle: "iconic", projectName: "역삼 Aurora"
}
→ { data: { id: "uuid", status: "pending", progress: 0 } }

GET /api/projects/:id/progress
→ { data: {
    id, status: "running" | "succeeded" | "failed",
    progress: 64,   // 0-100
    eta: 180,       // 초
    currentStep: "EXTERIOR DAY",
    error: null
  } }

GET /api/projects/:id
→ { data: {
    id, name, status, ...projectFields,
    slides: [
      { index: 1, label: "EXTERIOR DAY", url: "https://.../day.png" },
      ...
    ],
    exports: {
      pdf24p: "https://.../proposal.pdf",
      png4k:  "https://.../render.png",
      xlsx:   "https://.../model.xlsx"
    }
  } }
```

> **추천 패턴**: fal.ai 는 비동기 → 백엔드는 작업을 큐에 넣고 즉시 `id` 반환, 워커가 처리. 프론트는 polling. WebSocket/SSE 도 가능하지만 Render Free 에선 polling 권장.

#### 임시저장

| 시나리오 | API | 메서드 | 설명 |
|---|---|---|---|
| Nav 의 "임시저장" 버튼 | `/api/projects/draft` | `PUT` | 현재 위저드 상태 서버 저장 |
| 위저드 진입 시 복원 | `/api/projects/draft` | `GET` | 마지막 저장된 draft |
| draft → 정식 프로젝트 | (위 `/generate` 가 처리) | | |

```http
PUT /api/projects/draft
body: { step, lot, background, siteInfo, designStyle, projectName }
→ { data: { id: "draft-uuid", updatedAt } }
```

---

### 📄 `/projects` — 프로젝트 리스트

| 컴포넌트 | API | 메서드 | 설명 |
|---|---|---|---|
| 페이지 헤더 stats | `/api/projects/stats` | `GET` | 전체/완료/면적합/사업비합 |
| 필터 + 검색 + 그리드 | `/api/projects` | `GET` | 리스트 |
| 카드 클릭 | `/api/projects/:id` | `GET` | 상세 (위저드와 공용) |
| (호버 메뉴) 삭제 | `/api/projects/:id` | `DELETE` | |
| (호버 메뉴) 복제 | `/api/projects/:id/duplicate` | `POST` | |
| (호버 메뉴) 이름 변경 | `/api/projects/:id` | `PATCH` | |

```http
GET /api/projects?status=done&q=강남&sort=updatedAt:desc&page=1&perPage=12
→ { data: [Project, ...], meta: { page, perPage, total } }

GET /api/projects/stats
→ { data: {
    totalCount: 12,
    doneCount: 8,
    workCount: 2,
    draftCount: 2,
    totalGfaSqm: 142830,
    totalBudgetEokWon: 2840,
    monthlyDelta: 3
  } }
```

---

### 📄 `/mypage` — 5탭

#### Tab 01 · Overview

| 컴포넌트 | API | 비고 |
|---|---|---|
| 사용량 3 bar | `GET /api/me/usage` | 이번 달 |
| 최근 프로젝트 표 | `GET /api/projects?limit=4&sort=updatedAt:desc` | 위 리스트 API 재사용 |
| 현재 플랜 카드 | `GET /api/me/plan` | |

```http
GET /api/me/usage
→ { data: {
    period: { from: "2026-04-01", to: "2026-04-30" },
    project:  { used: 7, limit: 10 },
    render4k: { used: 28, limit: 50 },
    storage:  { usedGb: 38.2, limitGb: 50 }
  } }

GET /api/me/plan
→ { data: {
    planId: "studio", name: "Studio",
    monthlyPriceWon: 990000,
    nextBillingAt: "2026-05-15",
    autoRenew: true,
    features: ["월 10건 프로젝트", "4K 렌더 50회 / 50GB", "24p 설계 제안서"]
  } }
```

#### Tab 02 · Plan

| 컴포넌트 | API | 비고 |
|---|---|---|
| 3 플랜 카드 | `GET /api/plans` | 가격 / feature |
| 플랜 변경 | `POST /api/me/plan/change` | body: `{ planId }` |
| Atelier 상담 신청 | `POST /api/contact/atelier` | body: `{ message, phone }` |

#### Tab 03 · Usage

| 컴포넌트 | API | 비고 |
|---|---|---|
| 4 stat cells | `GET /api/me/usage/summary` | |
| 6개월 bar chart | `GET /api/me/usage/monthly?from=2025-11&to=2026-04` | |

```http
GET /api/me/usage/monthly?from=2025-11&to=2026-04
→ { data: [
    { month: "2025-11", projectCount: 4 },
    { month: "2025-12", projectCount: 6 },
    ...
    { month: "2026-04", projectCount: 12 }
  ] }
```

#### Tab 04 · Billing

| 컴포넌트 | API | 메서드 |
|---|---|---|
| 결제 수단 리스트 | `/api/me/payment-methods` | `GET` |
| 카드 추가 | `/api/me/payment-methods` | `POST` (PG 토큰화 후) |
| 기본 결제수단 변경 | `/api/me/payment-methods/:id/default` | `PATCH` |
| 카드 삭제 | `/api/me/payment-methods/:id` | `DELETE` |
| 청구 정보 조회 | `/api/me/billing-info` | `GET` |
| 청구 정보 수정 | `/api/me/billing-info` | `PATCH` |
| 인보이스 리스트 | `/api/me/invoices?limit=20` | `GET` |
| 인보이스 PDF | `/api/me/invoices/:id/download` | `GET` (signed URL) |

```http
GET /api/me/payment-methods
→ { data: [{
    id, brand: "VISA", last4: "4827",
    expires: "09/28", isDefault: true,
    holderName: "박상호"
  }, ...] }

GET /api/me/invoices?limit=20
→ { data: [{
    id: "UP-INV-2604-0412",
    item: "Studio 플랜 · 2026.04",
    paidAt: "2026-04-15",
    amountWon: 990000,
    status: "paid",
    pdfUrl: "https://..."
  }, ...] }
```

#### Tab 05 · Account

| 컴포넌트 | API | 메서드 |
|---|---|---|
| 프로필 폼 | `/api/me` | `GET`, `PATCH` |
| 알림 토글 4종 | `/api/me/notifications` | `GET`, `PATCH` |
| 2FA 활성화 | `/api/me/security/2fa` | `POST` (활성), `DELETE` (해제) |
| 비밀번호 변경 | `/api/me/password` | `PATCH` |
| 로그인 알림 토글 | `/api/me/security/login-alert` | `PATCH` |
| 계정 삭제 (30일 유예) | `/api/me` | `DELETE` |

```http
PATCH /api/me
body: { name, role, company, email, phone }
→ { data: User }

GET /api/me/notifications
→ { data: {
    projectComplete: true,
    paymentReminder: true,
    weeklyUsage: false,
    newStyle: true
  } }

PATCH /api/me/notifications
body: { weeklyUsage: true }
→ { data: { ... } }
```

---

## 4. 외부 통합 (백엔드가 호출)

| 외부 API | 어떤 엔드포인트에서 사용 | 환경변수 |
|---|---|---|
| 카카오 로컬 REST | `/api/lots/search`, `/api/lots/reverse-geocode` | `KAKAO_REST_API_KEY` |
| VWorld / 공공데이터 | `/api/lots/info` | `VWORLD_API_KEY` |
| fal.ai FLUX.1 Kontext | `/api/projects/generate` (워커) | `FAL_KEY` |
| Anthropic API (선택) | `/api/backgrounds/recommend`, 설계 제안서 텍스트 생성 | `ANTHROPIC_API_KEY` |
| Supabase Postgres | 전체 DB | `SUPABASE_SERVICE_ROLE_KEY` |
| Supabase Storage | 결과물 업로드 / signed URL | 위와 동일 |
| 토스페이먼츠 (또는 PG) | 결제 / 정기결제 | `TOSS_SECRET_KEY` |
| Resend (또는 SES) | 인보이스 / 알림 메일 | `RESEND_API_KEY` |

---

## 5. 데이터 모델 초안 (Postgres / Supabase)

```sql
-- 사용자 프로필 (Supabase auth.users 와 1:1)
profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text,
  role text,                -- "대표"
  company text,
  email text,
  phone text,
  plan_id text REFERENCES plans(id) DEFAULT 'sketch',
  notification_settings jsonb DEFAULT '{}',
  two_factor_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz   -- 30일 유예
)

-- 플랜 정의 (관리자 시드)
plans (
  id text PRIMARY KEY,        -- "sketch" | "studio" | "atelier"
  name text,
  monthly_price_won int,
  project_quota int,
  render_quota int,
  storage_gb int,
  features jsonb
)

-- 필지 캐시 (VWorld 호출 결과 24h)
lots (
  id uuid PRIMARY KEY,
  jibun text UNIQUE,
  address text,
  jimok text,
  area_sqm numeric,
  zoning text,
  bcr_limit int,
  far_limit int,
  ground_level text,
  lat numeric, lng numeric,
  cached_at timestamptz
)

-- 프로젝트 (draft 도 동일 테이블, status 로 구분)
projects (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  name text,
  status text,              -- "draft" | "running" | "done" | "failed"
  step int,                 -- 1..5 (위저드 임시저장)
  lot_id uuid REFERENCES lots(id),
  background_id text,
  site_info jsonb,
  design_style_id text,
  generation_id uuid,
  created_at timestamptz,
  updated_at timestamptz
)

-- 생성 작업 (fal.ai 큐)
generations (
  id uuid PRIMARY KEY,
  project_id uuid REFERENCES projects(id),
  status text,              -- "pending" | "running" | "succeeded" | "failed"
  progress int,             -- 0-100
  fal_request_id text,
  slides jsonb,             -- [{ label, url }, ...]
  exports jsonb,            -- { pdf24p, png4k, xlsx }
  started_at timestamptz,
  completed_at timestamptz,
  error_message text
)

-- 사용량 로그 (월별 집계용)
usage_logs (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  type text,                -- "project_created" | "render_4k" | "storage_used"
  amount numeric,
  occurred_at timestamptz DEFAULT now()
)

-- 인보이스
invoices (
  id text PRIMARY KEY,      -- "UP-INV-2604-0412"
  user_id uuid REFERENCES profiles(id),
  plan_id text,
  period text,              -- "2026-04"
  amount_won int,
  status text,              -- "paid" | "failed" | "pending"
  paid_at timestamptz,
  pdf_url text
)

-- 결제 수단 (PG 토큰만 저장, 카드번호 직접 저장 X)
payment_methods (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  brand text,               -- "VISA" | "CORP"
  last4 text,
  expires text,             -- "09/28"
  is_default boolean,
  pg_token text,            -- 토스페이먼츠 빌링키
  holder_name text
)

-- 청구 정보
billing_info (
  user_id uuid PRIMARY KEY REFERENCES profiles(id),
  company_name text,
  business_number text,
  representative text,
  tax_invoice_auto boolean,
  receipt_email text
)

-- 최근 검색
recent_lot_searches (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  jibun text,
  tag text,                 -- "HOTEL · 32F"
  searched_at timestamptz DEFAULT now()
)
```

---

## 6. 구현 우선순위

### P0 — MVP (위저드 한 사이클이 끝까지 동작)

```
[ ] Supabase JWT 검증 미들웨어
[ ] GET  /api/lots/search           (카카오 프록시)
[ ] GET  /api/lots/reverse-geocode  (카카오 프록시)
[ ] GET  /api/lots/info             (VWorld 프록시 + 캐시)
[ ] GET  /api/backgrounds           (Storage URL 리스트)
[ ] GET  /api/design-styles
[ ] POST /api/lots/calc
[ ] PUT  /api/projects/draft        (임시저장)
[ ] GET  /api/projects/draft
[ ] POST /api/projects/generate     (fal.ai 시작)
[ ] GET  /api/projects/:id/progress
[ ] GET  /api/projects/:id          (결과 + slides + exports)
```

### P1 — 리스트/마이페이지 골격

```
[ ] GET  /api/projects               (필터/검색/페이징)
[ ] GET  /api/projects/stats
[ ] DELETE /api/projects/:id
[ ] GET  /api/me                     (프로필)
[ ] PATCH /api/me
[ ] GET  /api/me/usage
[ ] GET  /api/me/plan
[ ] GET  /api/me/recent-lots
[ ] POST /api/me/recent-lots
[ ] POST /api/backgrounds/recommend  (자동 매칭)
```

### P2 — 결제 / 운영

```
[ ] GET  /api/plans
[ ] POST /api/me/plan/change
[ ] CRUD /api/me/payment-methods
[ ] CRUD /api/me/billing-info
[ ] GET  /api/me/invoices
[ ] GET  /api/me/invoices/:id/download
[ ] PATCH /api/me/notifications
[ ] POST /api/me/security/2fa
[ ] PATCH /api/me/password
[ ] DELETE /api/me                   (30일 유예)
[ ] POST /api/contact/atelier
```

### P3 — 확장

```
[ ] POST /api/uploads/background     (사용자 업로드)
[ ] POST /api/projects/:id/duplicate
[ ] GET  /api/me/usage/monthly       (6개월 차트)
[ ] 다중 스타일 비교 렌더링
[ ] 프로젝트 공유 링크
[ ] 팀 워크스페이스 (Atelier)
```

---

## 7. 스펙 외 합의사항

- **에러 코드 규약**: `LOT_NOT_FOUND`, `QUOTA_EXCEEDED`, `GENERATION_FAILED`, `INVALID_BCR_FAR` 등 식별 가능한 코드 → 프론트가 사용자 메시지 매핑
- **Rate limit**: 사용자당 분당 60req (무거운 generate 는 동시 1건)
- **CORS**: `https://uprize.app`, `https://*.vercel.app`, `http://localhost:3000`
- **로깅**: 모든 외부 API 호출(카카오/VWorld/fal.ai) 비용 추적 가능하도록 구조화 로깅
- **환경**: `NODE_ENV=development | staging | production` 별 Supabase 프로젝트 분리

---

## 8. 변경 이력

| 일자 | 내용 |
|---|---|
| 2026-04-29 | 초안 작성 (4개 페이지 mock 기반 도출) |
