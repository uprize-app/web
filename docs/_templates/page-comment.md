# Page Comment Template

페이지 파일(`page.tsx`) 맨 위에 붙이는 주석 형식.
Claude Code가 파일 열었을 때 컨텍스트를 바로 파악할 수 있게 함.

---

## 템플릿

```typescript
/**
 * @page [PageName]
 * @route [예: /projects | /projects/[id]]
 * @access public | auth-required | admin-only
 * @status mock | partial | connected
 *
 * @description
 * [이 페이지가 무엇을 하는지 2-3줄]
 *
 * @urlParams
 * - id: string — 프로젝트 ID
 *
 * @searchParams
 * - step: string — 위저드 단계
 *
 * @data
 * - projectList: Project[] — TanStack Query (useProjectList)
 * - authUser: User — Zustand (useAuthStore)
 *
 * @mockData ./mocks/projects.json | 없음
 */
```

---

## 작성 예시 — Uprize 페이지

```typescript
/**
 * @page SiteSelectPage
 * @route /projects/new/site
 * @access auth-required
 * @status mock
 *
 * @description
 * 새 프로젝트 생성 위저드 Step 1.
 * 카카오맵 핀 드롭으로 필지를 선택하고 역지오코딩으로 주소를 자동 채운다.
 *
 * @data
 * - selectedSite: Site — Zustand (projectDraftStore)
 * - reverseGeocode: ReverseGeocodeResult — TanStack Query (useReverseGeocode)
 *
 * @mockData ./mocks/site.json
 */

const SiteSelectPage = () => {
  return (...)
}

export default SiteSelectPage
```

```typescript
/**
 * @page ProjectResultPage
 * @route /projects/[id]
 * @access auth-required
 * @status partial
 *
 * @description
 * AI 생성 결과 페이지. FLUX로 합성된 호텔 이미지와 Claude가 생성한
 * 8개 항목 설계안을 함께 보여준다. PDF 다운로드 지원.
 *
 * @urlParams
 * - id: string — 프로젝트 ID
 *
 * @data
 * - project: Project — TanStack Query (useProject)
 * - generation: Generation — TanStack Query (useGeneration)
 *
 * @mockData ./mocks/generation.json
 */
```

---

## 컴포넌트 주석 템플릿

```typescript
/**
 * @component [ComponentName]
 * @description [이 컴포넌트가 렌더링하는 것]
 *
 * @props
 * - site: Site — 표시할 필지 데이터
 * - onConfirm?: (site: Site) => void — 선택 확정 콜백 (선택사항)
 *
 * @usedIn SiteSelectPage, ProjectResultPage
 */
```

### Uprize 예시

```typescript
/**
 * @component KakaoMapView
 * @description 카카오맵 + 핀 드롭 인터페이스. 클릭 시 좌표 저장 + 역지오코딩.
 *
 * @props
 * - initialCenter?: { lat: number; lng: number } — 초기 지도 중심 (기본: 서울시청)
 * - onPinDrop: (coord: { lat: number; lng: number }) => void — 핀 드롭 콜백
 *
 * @usedIn SiteSelectPage
 *
 * @notes
 * - 'use client' 필수 (window.kakao 참조)
 * - 카카오맵 SDK 로딩 완료 후 렌더 (isLoaded 체크)
 */
```

---

## 커스텀 훅 주석 템플릿

```typescript
/**
 * @hook useProjectList
 * @description 내 프로젝트 목록 조회 (TanStack Query)
 *
 * @params
 * - status?: 'draft' | 'completed' — 상태 필터
 *
 * @returns
 * - data: Project[]
 * - isLoading: boolean
 * - error: Error | null
 *
 * @example
 * const { data, isLoading } = useProjectList({ status: 'completed' })
 */
```

### Uprize 예시

```typescript
/**
 * @hook useGenerateImage
 * @description FLUX.1 Kontext로 필지 위 호텔 이미지 합성 (TanStack Query mutation)
 *
 * @params (mutate 호출 시)
 * - siteImageUrl: string — 현장 이미지 URL
 * - style: HotelStyle — 선택된 디자인 스타일
 * - context: string[] — 주변 환경 태그
 *
 * @returns
 * - mutate: (payload) => void
 * - isPending: boolean — 10~30s 동안 true
 * - data: { imageUrl: string } | undefined
 *
 * @example
 * const { mutate, isPending } = useGenerateImage()
 * mutate({ siteImageUrl, style: 'iconic', context: ['역세권', '상업가'] })
 */
```
