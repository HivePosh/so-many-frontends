const test = require("node:test");
const assert = require("node:assert");
const [isHiveUrl, parseHiveUrl] = require("./index.js");

test("isHiveUrl happy path", (t) => {
  assert.strictEqual(
    isHiveUrl("https://www.reverio.io/question/manuphotos/muogh"),
    true
  );
});

test("isHiveUrl negative path", (t) => {
  assert.strictEqual(isHiveUrl("https://www.google.io/what"), false);
});

test("parseHiveUrl reverio question", (t) => {
  assert.deepEqual(
    parseHiveUrl("https://www.reverio.io/question/manuphotos/muogh"),
    { domain: "www.reverio.io", author: "manuphotos", permlink: "muogh" }
  );
});

test("parseHiveUrl reverio answer", (t) => {
  assert.deepEqual(
    parseHiveUrl("https://www.reverio.io/answer/eturnerx/rpvaynol"),
    { domain: "www.reverio.io", author: "eturnerx", permlink: "rpvaynol" }
  );
});

test("parseHiveUrl 3Speak", (t) => {
  assert.deepEqual(
    parseHiveUrl("https://3speak.tv/watch?v=itstman/jmicmsyo"),
    { domain: "3speak.tv", author: "itstman", permlink: "jmicmsyo" }
  );
});

test("parseHiveUrl peakd.com", (t) => {
  assert.deepEqual(
    parseHiveUrl(
      "https://peakd.com/hive-124452/@blackdaisyft/happy-new-year-or-my-first-hpud-post-or-celebrating-1-year-on-the-blockchain-or-hive-highlights-and-reflections"
    ),
    {
      author: "blackdaisyft",
      domain: "peakd.com",
      permlink:
        "happy-new-year-or-my-first-hpud-post-or-celebrating-1-year-on-the-blockchain-or-hive-highlights-and-reflections",
    }
  );
});


test("parseHiveUrl peakd.com with query params", (t) => {
  assert.deepEqual(
    parseHiveUrl(
      "https://peakd.com/hive-124452/@blackdaisyft/happy-new-year-or-my-first-hpud-post-or?node=api.hive.blog"
    ),
    {
      author: "blackdaisyft",
      domain: "peakd.com",
      permlink:
        "happy-new-year-or-my-first-hpud-post-or",
    }
  );
});

test("parseHiveUrl peakd.com with dot in permlink", (t) => {
  assert.deepEqual(
    parseHiveUrl(
      "https://peakd.com/hive-124452/@blackdaisyft/happy.new.year"
    ),
    {
      author: "blackdaisyft",
      domain: "peakd.com",
      permlink:
        "happynewyear",
    }
  );
});

test("parseHiveUrl peakd with a comment", (t) => {
  assert.deepEqual(
    parseHiveUrl(
      "https://peakd.com/hive-124452/@blackdaisyft/happy-new-year-or-my-first-hpud-post-or-celebrating-1-year-on-the-blockchain-or-hive-highlights-and-reflections#@rosmerby/rnu2c2"
    ),
    {
      author: "blackdaisyft",
      domain: "peakd.com",
      permlink:
        "happy-new-year-or-my-first-hpud-post-or-celebrating-1-year-on-the-blockchain-or-hive-highlights-and-reflections",
    }
  )
});