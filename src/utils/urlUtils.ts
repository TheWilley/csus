import localforage from 'localforage';
import { UrlObject } from '../global/types';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import ShortUniqueId from 'short-unique-id';
import validUrl from 'valid-url';

export function getUrlSuffix() {
  return window.location.href.split('/csus/')[0] + '/csus/';
}

/**
 * Finds either a URL or shortened URL from the localForage database.
 * @param query The search query.
 * @param type The type of data to be returned from the query.
 */
function findInForage(
  query: string,
  type: 'url' | 'uid'
): Promise<UrlObject | undefined> {
  return new Promise((resolve) => {
    localforage.getItem<UrlObject[]>(SHORTENED_URL_PAIRS_KEY).then((result) => {
      const found = result?.find((object) => {
        if (type === 'url') return object.url === query;
        else return object.uid === query;
      });
      resolve(found);
    });
  });
}

/**
 * Redirects to a URL based from a shortened URL.
 * @param param0 Arguments passed to the loaderFunction.
 * @returns A null placeholder.
 */
export async function urlIdLoader({ params }: LoaderFunctionArgs) {
  const { urlId } = params;
  if (urlId) {
    const result = await findInForage(urlId, 'uid');
    if (result) {
      // Add to statistic here
      return redirect(result.url);
    }
  }
  return redirect('/result');
}

/**
 * Generates a unique ID.
 * @param urls A list of urls adhering to the `urlObject` type
 * @returns A unique ID
 */
export const generateUniqueId = (urls: UrlObject[]) => {
  let uniqueId: string;
  let result: boolean;
  do {
    uniqueId = new ShortUniqueId({ length: 8 }).randomUUID();
    result = urls.some((url) => url.uid === uniqueId);
  } while (result);
  return uniqueId;
};

/**
 * Adds a '#' to the start of the string.
 * @param str The string on which the '#' will be added
 */
export function addHashToStart(str: string) {
  return str.startsWith('#') ? str : '#' + str;
}

/**
 * Validates a URL in order to check if it's... valid.
 * @param urlString The url to test.
 * @returns If the URL is valid.
 */
export function isValidUrl(urlString: string) {
  const isValidUrl = validUrl.isUri(urlString);

  // Check if URL is leading to the same domain, thus causing an infinite loop
  const domain = new URL(window.location.href).hostname;
  if (urlString.includes(domain)) {
    return false;
  }

  return isValidUrl;
}

/**
 * Validates a custom UID.
 * @param uid The custom UID to validate.
 * @returns True if the UID is valid, false otherwise.
 */
export function isValidCustomUid(uid: string) {
  const uidPattern = /^[a-zA-Z0-9_-]+$/;
  return uidPattern.test(uid);
}
