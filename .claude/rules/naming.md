---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Naming rules

## 파일명

```
# 컴포넌트
KakaoMapView.tsx
ProjectResultPage.tsx

# 훅
useProjectList.ts          # 일반 커스텀 훅
useProjectList.query.ts    # TanStack Query 훅
useGenerateImage.query.ts  # mutation도 .query.ts 로 통일

# 스토어
auth.store.ts              # Zustand store
projectDraft.store.ts      # 위저드 임시 상태

# 타입
project.types.ts
site.types.ts

# 폼 컴포넌트
SiteInfoForm.tsx

# 유틸
formatArea.ts              # 평↔㎡ 변환 등
```

## 변수 / 함수

```typescript
const projectList = []; // 배열은 복수형
const isLoading = false; // boolean → is / has / can 접두사
const handleSubmit = () => {}; // 이벤트 핸들러 → handle 접두사
const fetchProjects = () => {}; // API 호출 → fetch / get / create / update / delete
const generateImage = () => {}; // AI 생성 → generate 접두사
```

## 컴포넌트 / 타입

```typescript
const SiteCard = () => {}; // 컴포넌트 → PascalCase
type SiteCardProps = {}; // Props 타입 → 컴포넌트명 + Props
type ApiResponse<T> = {}; // 제네릭 타입 → PascalCase
```

## 훅

```typescript
const useProjectList = () => {}; // 훅 → use 접두사 + camelCase
const useAuthStore = () => {}; // Zustand 훅 → use + 스토어명 + Store
```

## 상수

```typescript
const MAX_UPLOAD_MB = 10        // 상수 → UPPER_SNAKE_CASE
const FLUX_TIMEOUT_MS = 60000
const HOTEL_STYLES = [...] as const
```

## 폴더명

```
features/site-selection/        # 폴더 → kebab-case
features/image-generation/
features/project-result/
shared/components/
```
