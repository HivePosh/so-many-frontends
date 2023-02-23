const test = require("node:test");
const assert = require("node:assert");
const [isHiveUrl, parseHiveUrl, hiveDomains, appStringToHiveLink] = require("./index.js");

test("hiveDomains is usable", (t) => {
  assert.ok(typeof hiveDomains === "object");
  assert.ok(hiveDomains.length > 0);
  assert.ok(hiveDomains.includes("hive.blog"));
});

test("isHiveUrl happy path", (t) => {
  assert.strictEqual(
    isHiveUrl("https://www.reverio.io/question/manuphotos/muogh"),
    true
  );
});

test("isHiveUrl happy path 2", (t) => {
  assert.strictEqual(
    isHiveUrl("https://beta.peakd.com/@manuphotos/muogh"),
    true
  );
});

test("isHiveUrl alpha path", (t) => {
  assert.strictEqual(isHiveUrl("https://alpha.leofinance.io/threads"), true);
});

test("isHiveUrl dev path", (t) => {
  assert.strictEqual(isHiveUrl("https://dev.leofinance.io/threads"), true);
});

test("isHiveUrl negative path", (t) => {
  assert.strictEqual(
    isHiveUrl(
      "https://sunbowmarvelarchive.blogspot.com/2023/01/the-mystery-of-time-challengers-1991.html"
    ),
    false
  );
});

test("isHiveUrl invalid URL", (t) => {
  assert.strictEqual(
    isHiveUrl("/r/the-mystery-of-time-challengers-1991.html"),
    false
  );
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
  assert.deepEqual(parseHiveUrl("https://3speak.tv/watch?v=itstman/jmicmsyo"), {
    domain: "3speak.tv",
    author: "itstman",
    permlink: "jmicmsyo",
  });
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
      permlink: "happy-new-year-or-my-first-hpud-post-or",
    }
  );
});

test("parseHiveUrl peakd.com with dot in permlink", (t) => {
  assert.deepEqual(
    parseHiveUrl("https://peakd.com/hive-124452/@blackdaisyft/happy.new.year"),
    {
      author: "blackdaisyft",
      domain: "peakd.com",
      permlink: "happynewyear",
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
  );
});

test("parseHiveUrl peakd.com no permlink", (t) => {
  assert.deepEqual(parseHiveUrl("https://peakd.com/@trending"), {
    author: undefined,
    domain: "peakd.com",
    permlink: undefined,
  });
});

test("parseHiveUrl invalid URL", (t) => {
  assert.deepEqual(
    parseHiveUrl(
      "/r/HopperCodes/comments/10icgcr/hopper_25_credit_250_in_travel_vouchers_code/"
    ),
    {
      author: undefined,
      domain: "r",
      permlink: undefined,
    }
  );
});

test("parse invalid Dbuzz", (t) => {
  assert.deepEqual(
    parseHiveUrl("https://d.buzz/#/@aaliyahholt/r/naq4jloe2l8zofrf8urijb"),
    {
      author: undefined,
      domain: undefined,
      permlink: undefined,
    }
  );
});

test("parse valid Dbuzz", (t) => {
  assert.deepEqual(
    parseHiveUrl("https://d.buzz/#/@aaliyahholt/c/naq4jloe2l8zofrf8urijb"),
    {
      author: "aaliyahholt",
      domain: "d.buzz",
      permlink: "naq4jloe2l8zofrf8urijb",
    }
  );
});

test("missing protocol", (t) => {
  assert.deepEqual(
    parseHiveUrl("d.buzz/#/@aaliyahholt/c/naq4jloe2l8zofrf8urijb"),
    {
      author: "aaliyahholt",
      domain: "d.buzz",
      permlink: "naq4jloe2l8zofrf8urijb",
    }
  );
});

test("parse valid next Dbuzz", (t) => {
  assert.deepEqual(
    parseHiveUrl("https://next.d.buzz/#/@aaliyahholt/c/naq4jloe2l8zofrf8urijb"),
    {
      author: "aaliyahholt",
      domain: "next.d.buzz",
      permlink: "naq4jloe2l8zofrf8urijb",
    }
  );
});

test("parse only Dbuzz", (t) => {
  assert.deepEqual(parseHiveUrl("https://d.buzz"), {
    domain: undefined,
    author: undefined,
    permlink: undefined
  });
});

test("leofinance new UI blog view URL", (t) => {
  assert.deepEqual(parseHiveUrl("https://alpha.leofinance.io/posts/view/idiosyncratic1/proof-of-share-posh-leothreads"), {
    domain: "alpha.leofinance.io",
    author: "idiosyncratic1",
    permlink: "proof-of-share-posh-leothreads"
  });
});


test("leofinance new UI threads view URL", (t) => {
  assert.deepEqual(parseHiveUrl("https://alpha.leofinance.io/threads/view/theycallmedan/re-leothreads-7tyyx8co"), {
    domain: "alpha.leofinance.io",
    author: "theycallmedan",
    permlink: "re-leothreads-7tyyx8co"
  });
});


test("appStringToHiveLink liketu", (t) => {
  assert.deepEqual(appStringToHiveLink("liketu","dkid14","star-wars-shadow-battle"),
    'https://www.liketu.com/@dkid14/star-wars-shadow-battle'
  ); 
});