const hiveDomains = [
  "peakd.com",
  "ecency.com",
  "hive.blog",
  "leofinance.io",
  "cinetv.blog",
  "splintertalk.io",
  "weedcash.network",
  "splintertalk.io",
  "kolony.org",
  "actifit.io",
  "ctptalk.com",
  "travelfeed.io",
  "hivehustlers.io",
  "hive.blocktunes.net",
  "hivelist.org",
  // Special cases below this line
  "3speak.tv",
  "reverio.io",
];

function isHiveUrl(url) {
  for (const i in hiveDomains) {
    if (url.includes(hiveDomains[i])) {
      return true;
    }
  }
  return false;
}

function parseHiveUrl(hiveLink) {
  if (hiveLink.includes("3speak.tv")) {
    hiveLink = hiveLink.replace("3speak.tv/watch?v=", "3speak.tv/@");
  }
  if (hiveLink.includes("reverio.io/question/")) {
    hiveLink = hiveLink.replace("reverio.io/question/", "reverio.io/@");
  }
  if (hiveLink.includes("reverio.io/answer/")) {
    hiveLink = hiveLink.replace("reverio.io/answer/", "reverio.io/@");
  }

  const parsedUrl = new URL(hiveLink);
  const slug = parsedUrl.pathname.split("@")[1];
  
  let author, permlink;

  if (slug) {
    author = slug.split("/")[0];
    permlink = slug.split("/")[1];
    if (permlink.indexOf("?") != -1) {
      permlink = permlink.split("?")[0];
    }
    permlink = permlink.replaceAll(".", "");
  }

  return { domain: parsedUrl.hostname, author: author, permlink: permlink };
}

module.exports = [isHiveUrl, parseHiveUrl];
