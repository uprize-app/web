import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("does not cap report body height on mobile", async () => {
  const source = await readFile(
    new URL("./DesignReportDeck.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /max-h-none/);
  assert.match(source, /sm:max-h-\[430px\]/);
  assert.match(source, /text-\[26px\].*sm:text-\[30px\]/s);
  assert.match(source, /min-w-0 break-words/);
  assert.match(source, /hidden border-t border-line.*lg:block/s);
  assert.match(source, /lg:grid-cols-2/);
});

test("renders long report bullets as compact readable cards", async () => {
  const source = await readFile(
    new URL("./DesignReportDeck.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /const MOBILE_BULLET_LIMIT = 4/);
  assert.match(source, /parseReportBullet\(bullet\)/);
  assert.match(source, /split\("\|"\)/);
  assert.match(source, /<dl className="mt-3 grid gap-2 border-t border-line pt-3">/);
  assert.match(source, /전체 \$\{hiddenBulletCount\}개 더 보기/);
});
