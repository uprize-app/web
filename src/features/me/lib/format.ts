/** "2024.07 가입 · 22개월" 같은 표시. */
export const formatJoinedSince = (createdAtIso: string, now = new Date()) => {
  const created = new Date(createdAtIso);
  if (Number.isNaN(created.getTime())) return "";

  const yyyy = created.getFullYear();
  const mm = String(created.getMonth() + 1).padStart(2, "0");

  const monthsDiff =
    (now.getFullYear() - created.getFullYear()) * 12 +
    (now.getMonth() - created.getMonth());

  const span =
    monthsDiff < 1
      ? `${Math.max(0, Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)))}일`
      : `${monthsDiff}개월`;

  return `${yyyy}.${mm} 가입 · ${span}`;
};

/** "UP-MEM-..." 형태 회원번호 (UUID 앞부분 활용) */
export const formatMemberId = (uuid: string) =>
  `UP-MEM-${uuid.slice(0, 6).toUpperCase()}`;
