import assert from "node:assert/strict";
import test from "node:test";

import {
  accountHrefForSession,
  signedOutHref,
  startHrefForSession,
} from "./authNavigation.ts";

test("sends unauthenticated users to Kakao login before opening the studio", () => {
  assert.equal(startHrefForSession(null), "/login?next=%2Fstudio%2Fnew");
});

test("sends authenticated users directly to the studio", () => {
  assert.equal(startHrefForSession({ id: "session" }), "/studio/new");
});

test("sends unauthenticated header users to Kakao login before mypage", () => {
  assert.equal(accountHrefForSession(null), "/login?next=%2Fmypage");
});

test("sends signed out users back to the landing page", () => {
  assert.equal(signedOutHref(), "/");
});
