type SessionLike = object | null;

const loginHrefFor = (nextPath: string) =>
  `/login?next=${encodeURIComponent(nextPath)}`;

export const isSessionAuthenticated = (session: SessionLike) =>
  Boolean(session);

export const protectedHrefForSession = (
  session: SessionLike,
  protectedPath: string,
) => (isSessionAuthenticated(session) ? protectedPath : loginHrefFor(protectedPath));

export const startHrefForSession = (session: SessionLike) =>
  protectedHrefForSession(session, "/studio/new");

export const accountHrefForSession = (session: SessionLike) =>
  protectedHrefForSession(session, "/mypage");

export const signedOutHref = () => "/";
