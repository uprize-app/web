import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("caches started generations in the project generation list", async () => {
  const source = await readFile(
    new URL("./useGeneration.query.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /GENERATION_KEYS\.projectList\(gen\.projectId\)/);
  assert.match(source, /prev\.filter\(\(item\) => item\.id !== gen\.id\)/);
});

test("polls project generation lists while any generation is active", async () => {
  const source = await readFile(
    new URL("./useGeneration.query.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /hasActiveGeneration/);
  assert.match(source, /refetchInterval: \(q\) =>/);
  assert.match(source, /hasActiveGeneration\(q\.state\.data\) \? POLL_INTERVAL_MS : false/);
});
