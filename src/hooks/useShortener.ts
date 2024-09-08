import localforage from 'localforage';
import { ChangeEvent, useState } from 'react';
import { findInForage, forageKey } from '../utils/urlUtils';

/**
 * Generates a random ID based on the current date.
 * @see https://stackoverflow.com/a/53116778
 * @returns A random ID.
 */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Validates a URL in order to check if it's... valid.
 * @param urlString The url to test.
 * @returns If the URL is valid.
 */
function isValidUrl(urlString: string) {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
}

export default function useShortener() {
  const urlSuffix = 'http://localhost:5173/csus/';
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [indexedUrls, setIndexedUrls] = useState<{ url: string; shortenedUrl: string }[]>(
    []
  );
  const [resultIsShown, setResultIsShown] = useState(false);

  /**
   * Shortens a URL.
   */
  const shortenUrl = () => {
    if (isValidUrl(url)) {
      findInForage(url, 'url', (result) => {
        if (!result) {
          const adjustedArray = [...indexedUrls, { url: url, shortenedUrl: uid() }];
          localforage.setItem(forageKey, adjustedArray).then(() => {
            setShortenedUrl(urlSuffix + uid());
            setIndexedUrls(adjustedArray);
          });
        } else {
          setShortenedUrl(result.shortenedUrl);
        }
        setResultIsShown(true);
      });
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  const convertAnother = () => {
    setResultIsShown(false);
  };

  return {
    url,
    handleUrlChange,
    shortenedUrl,
    shortenUrl,
    resultIsShown,
    convertAnother,
  };
}