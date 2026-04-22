---
paths:
  - "**/.git/*"
---

# Git rules

## 커밋 메시지 형식

```
<type>: <무엇을 했는지 한 줄로>

# type 종류
feat     새 기능 추가
fix      버그 수정
refactor 기능 변경 없는 코드 개선
style    포맷, 공백 등 코드 의미 없는 변경
docs     문서 수정
chore    빌드, 설정 파일 변경
```

## 커밋 예시

```
feat: 카카오맵 핀 드롭 + 역지오코딩 연동
feat: FLUX.1 Kontext 이미지 합성 mutation 추가
fix: 로드뷰 커버리지 없을 때 업로드 플로우 fallback
refactor: 위저드 상태를 projectDraft.store로 분리
docs: Uprize 아키텍처 문서 초안 추가
chore: axios 1.15.0으로 버전 업
```

## 브랜치 전략

```
main                → 운영 배포 (Vercel production)
dev                 → 개발 통합
feat/기능명          → 기능 개발 (예: feat/site-selection, feat/flux-integration)
fix/이슈명           → 버그 수정 (예: fix/roadview-fallback)
```

## 규칙

- 커밋은 하나의 변경 단위로 (기능 + 버그픽스 같이 커밋 금지)
- 커밋 메시지는 한국어로 통일 (프로젝트 내 일관성)
- PR 전 반드시 `npm run type-check` 통과 확인
- 민감 정보 (API 키, 비밀번호) 절대 커밋 금지 → `.env.local` 사용
  - 특히 주의: `SUPABASE_SERVICE_ROLE_KEY`, `KAKAO_REST_API_KEY`, fal.ai/Anthropic 키
- `.env.local` 은 반드시 `.gitignore` 에 포함
