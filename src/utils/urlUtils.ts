import localforage from 'localforage';
import { UrlObject } from '../global/types';
import { LoaderFunctionArgs } from 'react-router-dom';

/**
 * Finds either a URL or shortened URL from the localForage database. 
 * @param query The search query.
 * @param type The type of data to be returned from the query.
 * @param callback Callback function with the result of the query.
 */
export function findInForage(
  query: string,
  type: 'url' | 'uid',
  callback: (result: UrlObject | undefined) => void
) {
  localforage
    .getItem<{ url: string; uid: string }[]>(import.meta.env.BASE_URL)
    .then((result) => {
      const found = result?.find((object) => {
        if (type === 'url') return object.url === query;
        else return object.uid === query;
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
    findInForage(urlId, 'uid', (result) => {
      if (result) {
        window.location.replace(result.url);
      } else {
        window.location.replace('app');
      }
    });
  }
  return null;
}
