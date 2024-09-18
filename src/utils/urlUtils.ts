import localforage from 'localforage';
import { UrlObject } from '../global/types';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

/**
 * Finds either a URL or shortened URL from the localForage database.
 * @param query The search query.
 * @param type The type of data to be returned from the query.
 * @param callback Callback function with the result of the query.
 */
export function findInForage(
  query: string,
  type: 'url' | 'uid'
): Promise<UrlObject | undefined> {
  return new Promise((resolve) => {
    localforage
      .getItem<{ url: string; uid: string }[]>(import.meta.env.BASE_URL)
      .then((result) => {
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
      return redirect(result.url);
    }
  }
  return redirect('/app');
}
