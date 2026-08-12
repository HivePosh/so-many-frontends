const hiveDomains = [
  "peakd.com",
  "ecency.com",
  "hive.blog",
  "cinetv.blog",
  "actifit.io",
  "travelfeed.io",
  "travelfeed.com",
  "hive.blocktunes.net",
  "hive.ausbit.dev",
  "skatehive.app",
  "liketu.com",
  "stemgeeks.net",
  "hivel.ink",
  "palnet.io",
  "neoxian.city",
  "tribaldex.blog",
  "sloth.buzz",
  "lassecash.com",
  // Special cases below this line
  "leofinance.io",
  "inleo.io",
  "3speak.tv",
  "hivesuite.app",
];

function isHiveUrl(url) {
  for (const i in hiveDomains) {
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (err) {
      return false;
    }

    if (
      parsedUrl.host == hiveDomains[i] ||
      parsedUrl.host == "www." + hiveDomains[i] ||
      parsedUrl.host == "alpha." + hiveDomains[i] ||
      parsedUrl.host == "beta." + hiveDomains[i] ||
      parsedUrl.host == "next." + hiveDomains[i] ||
      parsedUrl.host == "dev." + hiveDomains[i]
    ) {
      return true;
    }
  }
  return false;
}

function parseHiveUrl(hiveLink) {
  const EMPTY_RETURN_VALUE = {
    domain: undefined,
    author: undefined,
    permlink: undefined,
  };

  //For special case sites, we handle them by faking the normal domain.tld/@author/permlink format
  if (hiveLink.includes("leofinance.io/posts/")) {
    hiveLink = hiveLink.replace("leofinance.io/posts/", "leofinance.io/@");
  }
  if (hiveLink.includes("leofinance.io/threads/")) {
    hiveLink = hiveLink.replace(
      "leofinance.io/threads/",
      "leofinance.io/@"
    );
  }
  if (hiveLink.includes("inleo.io/posts/")) {
    hiveLink = hiveLink.replace("inleo.io/posts/", "inleo.io/@");
  }
  if (hiveLink.includes("inleo.io/threads/")) {
    hiveLink = hiveLink.replace(
      "inleo.io/threads/",
      "inleo.io/@"
    );
  }
  if (hiveLink.includes("3speak.tv")) {
    hiveLink = hiveLink.replace("3speak.tv/watch?v=", "3speak.tv/@");
  }

  if (hiveLink.includes("hivesuite.app/post/")) {
    hiveLink = hiveLink.replace("hivesuite.app/post/", "hivesuite.app/@");
  }

  if (!hiveLink.includes("://")) {
    hiveLink = "https://" + hiveLink;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(hiveLink);
  } catch (err) {
    return EMPTY_RETURN_VALUE;
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

function appStringToHiveLink(app, author, permlink) {
  if (app.includes("leothreads")) {
    return `https://inleo.io/threads/${author}/${permlink}`;
  }

  if (app.includes("liketu")) {
    return `https://www.liketu.com/@${author}/${permlink}`;
  }

  if (app.includes("hivesuite")) {
    return `https://hivesuite.app/@${author}/${permlink}`;
  }

  return `https://hivel.ink/@${author}/${permlink}`;
}

module.exports = {
  isHiveUrl,
  parseHiveUrl,
  hiveDomains,
  appStringToHiveLink,
};
