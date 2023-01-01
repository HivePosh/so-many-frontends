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
  "travelfeed.io",
  //Special cases on the below line
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

function sanitizeHiveUrl(hiveLink)  {
  if (hiveLink.includes("3speak.tv")) {
    hiveLink = hiveLink.replace("3speak.tv/watch?v=", "@");
  }
  if (hiveLink.includes("reverio.io/question/")) {
    hiveLink = hiveLink.replace("reverio.io/question/", "@");
  }
  if (hiveLink.includes("reverio.io/answer/")) {
    hiveLink = hiveLink.replace("reverio.io/answer/", "@");
  }

  return hiveLink;
}

module.exports = [hiveDomains, isHiveUrl];
