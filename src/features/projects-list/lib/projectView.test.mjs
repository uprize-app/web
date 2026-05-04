import assert from "node:assert/strict";
import test from "node:test";

import { resolveProjectListStatus, toUiStatus } from "./projectView.ts";

test("maps backend generated projects to the completed filter", () => {
  assert.equal(toUiStatus("generated"), "done");
});

test("keeps unfinished backend project statuses in the in-progress filter", () => {
  assert.equal(toUiStatus("ready"), "work");
  assert.equal(toUiStatus("draft"), "work");
});

test("treats a completed generation as completed even before the project status catches up", () => {
  assert.equal(
    resolveProjectListStatus("ready", [
      {
        status: "completed",
        createdAt: "2026-05-04T12:00:00.000Z",
      },
    ]),
    "done",
  );
});

test("treats active generation work as in progress", () => {
  assert.equal(
    resolveProjectListStatus("ready", [
      {
        status: "running",
        createdAt: "2026-05-04T12:00:00.000Z",
      },
    ]),
    "work",
  );
});
