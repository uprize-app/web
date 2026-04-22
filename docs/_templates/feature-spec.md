# Feature Spec Template

새 기능 개발 시작 전 이 템플릿 복사해서 `docs/features/[기능명].md` 로 저장.
Claude Code한테 "이 스펙 보고 구현해줘" 하면 맥락 없이 바로 개발 가능.

---

## 템플릿

```markdown
# [기능명]

## Overview

[이 기능이 무엇을 하는지 2-3줄]

## Routes

| 경로    | 설명   |
| ------- | ------ |
| /[경로] | [설명] |

## Components

| 컴포넌트 | 위치                          | 설명   |
| -------- | ----------------------------- | ------ |
| [이름]   | features/[기능명]/components/ | [설명] |

## State

| 상태   | 종류                                  | 설명   |
| ------ | ------------------------------------- | ------ |
| [이름] | TanStack Query / Zustand / URL / Form | [설명] |

## API

| Method | Endpoint    | 설명   |
| ------ | ----------- | ------ |
| GET    | /api/[경로] | [설명] |

## Types

\`\`\`typescript
type [TypeName] = {
id: string
// ...
}
\`\`\`

## Acceptance Criteria

- [ ] [완료 조건 1]
- [ ] [완료 조건 2]

## Mock Data

[목업 데이터 위치 또는 예시]

## Notes

[특이사항, 주의점, 외부 API 제한 등]
```

---

## 작성 예시 — Uprize "필지 선택" 기능

```markdown
# 필지 선택 (Site Selection)

## Overview

새 프로젝트 생성 위저드의 Step 1. 카카오맵 위에 핀을 찍으면 역지오코딩으로 주소·좌표를 자동 채운다.
선택한 필지 정보는 이후 단계(현장 이미지 확보, 필지 정보 입력)로 전달된다.

## Routes

| 경로               | 설명                               |
| ------------------ | ---------------------------------- |
| /projects/new/site | 위저드 Step 1 — 지도에서 필지 선택 |

## Components

| 컴포넌트         | 위치                                | 설명                                       |
| ---------------- | ----------------------------------- | ------------------------------------------ |
| SiteSelectPage   | app/projects/new/site/              | 페이지 컨테이너                            |
| KakaoMapView     | features/site-selection/components/ | 카카오맵 렌더링 + 핀 드롭 (`'use client'`) |
| SelectedSiteCard | features/site-selection/components/ | 선택된 주소·좌표 미리보기 카드             |
| NextStepButton   | features/site-selection/components/ | 다음 단계 이동 (Zustand에 저장 후)         |

## State

| 상태           | 종류                        | 설명                                     |
| -------------- | --------------------------- | ---------------------------------------- |
| selectedSite   | Zustand (projectDraftStore) | { address, lat, lng } — 위저드 전역 공유 |
| mapCenter      | useState                    | 지도 중심 좌표 (로컬)                    |
| reverseGeocode | TanStack Query              | 좌표 → 주소 변환 결과                    |

## API

| Method | Endpoint                       | 설명                                                 |
| ------ | ------------------------------ | ---------------------------------------------------- |
| GET    | /api/geocode/reverse?lat=&lng= | 좌표 → 주소 역지오코딩 (백엔드에서 카카오 REST 호출) |

## Types

\`\`\`typescript
type Site = {
address: string // "서울특별시 강남구 테헤란로 123"
roadAddress?: string // 도로명 주소
jibunAddress?: string // 지번 주소
lat: number
lng: number
}
\`\`\`

## Acceptance Criteria

- [ ] 지도 중심은 최초 진입 시 서울시청으로 설정
- [ ] 지도 클릭 시 해당 위치에 핀 드롭 + 좌표 저장
- [ ] 핀 이동 시 역지오코딩 API 호출 (디바운스 300ms)
- [ ] 주소 변환 중 skeleton 표시
- [ ] 필지 선택 완료 전까지 "다음" 버튼 비활성화
- [ ] 새로고침해도 Zustand persist로 선택 상태 유지

## Mock Data

./mocks/site.json — 테헤란로 샘플 좌표/주소

## Notes

- 카카오맵 JS SDK는 `<Script strategy="afterInteractive">` 로 로드
- SDK 로딩 전 지도 컴포넌트 렌더링 금지 (`window.kakao` 존재 확인)
- 카카오맵은 도메인 등록된 키만 동작 → 배포 시 Vercel 도메인 추가 필수
- 로드뷰 커버리지 여부는 다음 Step(현장 이미지)에서 확인 — 여기선 좌표만 확정
```
