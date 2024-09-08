import localforage from 'localforage';
import { UrlObject } from '../global/types';
import { LoaderFunctionArgs } from 'react-router-dom';

// The key which identifies the list of URL's
export const forageKey = 'indexedUrls';

/**
 * Finds either a URL or shortened URL from the localForage database. 
 * @param query The search query.
 * @param type The type of data to be returned from the query.
 * @param callback Callback function with the result of the query.
 */
export function findInForage(
  query: string,
  type: 'url' | 'shortenedUrl',
  callback: (result: UrlObject | undefined) => void
) {
  localforage
    .getItem<{ url: string; shortenedUrl: string }[]>(forageKey)
    .then((result) => {
      const found = result?.find((object) => {
        if (type === 'url') return object.url === query;
        else return object.shortenedUrl === query;
      });
      callback(found);
    });
}

/**
 * Redirects to a URL based from a shortened URL.
 * @param param0 Arguments passed to the loaderFunction.
 * @returns A null placeholder.
 */
export function urlIdLoader({ params }: LoaderFunctionArgs) {
  const { urlId } = params;
  if (urlId) {
    findInForage(urlId, 'shortenedUrl', (result) => {
      if (result) {
        window.location.replace(result.url);
      } else {
        window.location.replace('app');
      }
    });
  }
  return null;
}
