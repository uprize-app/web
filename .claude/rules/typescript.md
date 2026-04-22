---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# TypeScript rules

## 함수 선언

- 반드시 const 화살표 함수 사용
- 클래스 사용 금지
- function 선언 지양 (Next.js 특수 파일 default export 제외)

```typescript
// ✅
const MyComponent = () => { ... }
const fetchData = async (): Promise<Data> => { ... }

// ❌
class MyService { ... }
function MyComponent() { ... }
```

## 타입

- `any` 절대 사용 금지 → `unknown` 으로 받고 타입 좁히기
- 추론 불가능한 경우에만 명시적 타입 선언
- `type` 먼저 사용, 확장 필요할 때만 `interface`
- Props 타입은 컴포넌트 바로 위에 선언

```typescript
// ✅
type SiteCardProps = {
  site: Site;
  onSelect: (id: string) => void;
};

// ❌
const data: any = response;
```

## 컴포넌트

- Server Component 기본, 클라이언트 필요할 때만 `'use client'` 추가
- `'use client'` 남발 금지 — 이벤트 핸들러, useState, useEffect 필요할 때만
- 카카오맵 / 로드뷰처럼 `window` 참조가 필요한 컴포넌트는 반드시 `'use client'`
- export default는 파일 맨 아래에

## import 순서

1. React / Next.js
2. 외부 라이브러리
3. `@/features/...`
4. `@/shared/...`
5. `@/lib/...`
6. 상대경로 (같은 폴더)
7. 타입 (type import)
