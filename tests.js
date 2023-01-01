const test = require("node:test");
const assert = require("node:assert");
const [isHiveUrl, normalizeHiveUrl] = require("./index.js");

test("isHiveUrl happy path", (t) => {
  assert.strictEqual(
    isHiveUrl("https://www.reverio.io/question/manuphotos/muogh"),
    true
  );
});

test("isHiveUrl negative path", (t) => {
  assert.strictEqual(isHiveUrl("https://www.google.io/what"), false);
});

test("normalizeHiveUrl reverio question", (t) => {
  assert.strictEqual(
    normalizeHiveUrl("https://www.reverio.io/question/manuphotos/muogh"),
    "https://www.reverio.io/@manuphotos/muogh"
  );
});

test("normalizeHiveUrl reverio answer", (t) => {
  assert.strictEqual(
    normalizeHiveUrl("https://www.reverio.io/answer/eturnerx/rpvaynol"),
    "https://www.reverio.io/@eturnerx/rpvaynol"
  );
});

test("normalizeHiveUrl 3Speak", (t) => {
    assert.strictEqual(
      normalizeHiveUrl("https://3speak.tv/watch?v=itstman/jmicmsyo"),
      "https://3speak.tv/@itstman/jmicmsyo"
    );
  });
  
