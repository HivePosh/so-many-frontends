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
  "hive.ausbit.dev",
  "skatehive.app",
  // Special cases below this line
  "3speak.tv",
  "reverio.io",
  "d.buzz"
];

function isHiveUrl(url) {
  for (const i in hiveDomains) {

    let parsedUrl
    try {
      parsedUrl = new URL(url);
    } catch(err) {
      return false;
    }

    if (
      parsedUrl.host == hiveDomains[i] ||
      parsedUrl.host == "www." + hiveDomains[i] ||
      parsedUrl.host == "beta." + hiveDomains[i]
    ) {
      return true;
    }
  }
  return false;
}

function parseHiveUrl(hiveLink) {
  //For special case sites, we handle them by faking the normal domain.tld/@author/permlink format
  if (hiveLink.includes("3speak.tv")) {
    hiveLink = hiveLink.replace("3speak.tv/watch?v=", "3speak.tv/@");
  }
  if (hiveLink.includes("reverio.io/question/")) {
    hiveLink = hiveLink.replace("reverio.io/question/", "reverio.io/@");
  }
  if (hiveLink.includes("reverio.io/answer/")) {
    hiveLink = hiveLink.replace("reverio.io/answer/", "reverio.io/@");
  }
  if (hiveLink.includes("d.buzz")){
    const almostSlug = hiveLink.split("@")[1];
    const splitAlmostSlug = almostSlug.split("/");
    if (splitAlmostSlug[1] !== "c"){
      // Dbuzz posts follow d.buzz/#/@author/c/permlink
      return { domain: undefined, author: undefined, permlink: undefined };
    }
    hiveLink = `https://d.buzz/@${splitAlmostSlug[0]}/${splitAlmostSlug[2]}`;
  }

  if (!hiveLink.includes("://")){
    hiveLink = "https://" + hiveLink;
  }

  let parsedUrl
  try {
    parsedUrl = new URL(hiveLink);
  } catch (err) {
    return { domain: undefined, author: undefined, permlink: undefined };
  }

  const slug = parsedUrl.pathname.split("@")[1];

  let author, permlink;

  if (slug && slug.includes("/")) {
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
