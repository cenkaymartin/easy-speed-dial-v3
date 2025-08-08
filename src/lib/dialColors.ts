import { getColorsByShade } from "random-color-library";
import { murmur3_32 } from "random-color-library/dist/utils.js";

const colors: Record<string, string> = {
  "accuweather.com": "#e64a19",
  "ally.com": "#7b1fa2",
  "allrecipes.com": "#e64a19",
  "aol.com": "#0288d1",
  "amazon.": "#ffa000",
  "apartments.com": "#689f38",
  "apple.com": "#616161",
  "bankofamerica.com": "#d32f2f",
  "bbb.org": "#0097a7",
  "bestbuy.com": "#1976d2",
  "bleacherreport.com": "#616161",
  "businessinsider.com": "#0288d1",
  "capitalone.com": "#303f9f",
  "chase.com": "#1976d2",
  "cnet.com": "#d32f2f",
  "cnn.com": "#d32f2f",
  "craigslist.org": "#616161",
  "creditkarma.com": "#388e3c",
  "discover.com": "#f57c00",
  "duolingo.com": "#689f38",
  "ebay.com": "#d32f2f",
  "espn.com": "#d32f2f",
  "facebook.com|fb.com": "#1976d2",
  "fandom.com": "#00796b",
  "foodnetwork.com": "#616161",
  "forbes.com": "#616161",
  "foxnews.com": "#283593",
  "gamepedia.com": "#f57c00",
  "genius.com": "#fbc02d",
  "github.com|github.dev|github.io": "#616161",
  "gitlab.com": "#e64a19",
  "google.": "#689f38",
  "glassdoor.com": "#616161",
  "gmail.com": "#d32f2f",
  "healthline.com": "#0097a7",
  "groupon.com": "#689f38",
  "homedepot.com": "#f57c00",
  "huffpost.com": "#616161",
  "hulu.com": "#689f38",
  "ign.com": "#d32f2f",
  "imdb.com": "#fbc02d",
  "indeed.com": "#0288d1",
  "instagram.com": "#c2185b",
  "investopedia.com": "#616161",
  "lowes.com": "#303f9f",
  "linkedin.com": "#1976d2",
  "lucaseverett.dev": "#f57c00",
  "mapquest.com": "#689f38",
  "mayoclinic.org": "#303f9f",
  "merriam-webster.com": "#0097a7",
  "microsoft.com|live.com|office.com": "#1976d2",
  "mint.com": "#0097a7",
  "mozilla.org": "#0288d1",
  "noaa.gov|weather.gov": "#0288d1",
  "netflix.com": "#d32f2f",
  "nih.gov": "#616161",
  "npr.org": "#0288d1",
  "nytimes.com": "#616161",
  "paypal.com": "#303f9f",
  "pinterest.com": "#d32f2f",
  "quizlet.com": "#1976d2",
  "quora.com": "#d32f2f",
  "reddit.com": "#e64a19",
  "retailmenot.com": "#7b1fa2",
  "rottentomatoes.com": "#d32f2f",
  "spotify.com": "#689f38",
  "steamcommunity.com|steampowered.com": "#455a64",
  "target.com": "#d32f2f",
  "threads.net": "#000",
  "toolbardial.com": "#512da8",
  "tripadvisor.com": "#388e3c",
  "truist.com": "#512da8",
  "twitch.tv": "#512da8",
  "twitter.com": "#0288d1",
  "usnews.com": "#0288d1",
  "usps.com": "#303f9f",
  "yahoo.": "#512da8",
  "yellowpages.com": "#fbc02d",
  "yelp.com": "#d32f2f",
  "youtube.com|youtu.be": "#d32f2f",
  "walmart.com": "#0288d1",
  "washingtonpost.com": "#616161",
  "wayfair.com": "#7b1fa2",
  "weather.com": "#303f9f",
  "webmd.com": "#1976d2",
  "wellsfargo.com": "#d32f2f",
  "wikipedia.org": "#616161",
  "wikihow.com": "#689f38",
  "wiktionary.org": "#616161",
  "wowhead.com": "#616161",
  "x.com": "#000",
  "xfinity.com": "#616161",
  "zillow.com": "#1976d2",
};

/**
 * The purpose of this function is to produce a consistent random number based
 * on a given key. This ensures that the same key will always produce the
 * same pseudo-random number.
 */
function randomIntFromHash(key: string, max: number): number {
  const hash = murmur3_32(key);

  // Normalize the hash value.
  const normalized = hash / 10000000000;

  // Apply a bias to reduce the likelihood of generating red colors.
  const biased = normalized < 0.1 ? normalized * 10 : normalized;

  // Scale the value to the range [0, max).
  const result = Math.floor(biased * max);

  return result;
}

function dialColors(name: string | string[]): string {
  if (Array.isArray(name)) name = name.join(".");

  // If the name matches a key, return the corresponding color.
  const matchedKey = Object.keys(colors).find((key) =>
    new RegExp(`^(.*\\.)?${key.replace(/\./g, "\\.")}`).test(name),
  );
  if (matchedKey) {
    return colors[matchedKey];
  }

  // Otherwise, return a pseudo-random color.
  const colorsFrom700 = getColorsByShade("700");
  const shade = randomIntFromHash(name, colorsFrom700.length);
  return colorsFrom700[shade];
}

export { colors, randomIntFromHash, dialColors };
