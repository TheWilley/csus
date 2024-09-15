import localforage from 'localforage';
import { ChangeEvent, useEffect, useState } from 'react';
import { findInForage, forageKey } from '../utils/urlUtils';
import { UrlObject } from '../global/types';

/**
 * Generates a random ID based on the current date.
 * @see https://stackoverflow.com/a/53116778
 * @returns A random ID.
 */
function uid() {
  // Convert current timestamp to base-36 and take the last 5 characters
  const timePart = Date.now().toString(36).slice(-5);

  // Generate a random number and convert it to base-36, take the first 3 characters
  const randomPart = Math.random().toString(36).substring(2, 5);

  // Concatenate both parts to form an 8-character string
  return timePart + randomPart;
}

/**
 * Generates a unqiue ID.
 * @returns A unique ID.
 */
function generateUniqueId() {
  const uniqueId = uid();
  findInForage(uniqueId, 'uid', (result) => {
    if (result) generateUniqueId();
  });
  return uniqueId;
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
  const [indexedUrls, setIndexedUrls] = useState<UrlObject[]>([]);
  const [dashboardIsShown, setDashboardIsShown] = useState(false);
  const [resultIsShown, setResultIsShown] = useState(false);

  /**
   * Shortens a URL.
   */
  const shortenUrl = () => {
    if (isValidUrl(url)) {
      findInForage(url, 'url', (result) => {
        if (!result) {
          const uid = generateUniqueId();
          const adjustedArray = [...indexedUrls, { url: url, uid }];
          localforage.setItem(forageKey, adjustedArray).then(() => {
            setShortenedUrl(urlSuffix + uid);
            setIndexedUrls(adjustedArray);
          });
        } else {
          setShortenedUrl(urlSuffix + result.uid);
        }
        setResultIsShown(true);
      });
    }
  };

  /**
   * Handles URL text input change.
   * @param event The event fired from the text input.
   */
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  /**
   * Goes back to the homescreen and resets URL text input.
   */
  const convertAnother = () => {
    setResultIsShown(false);
    setUrl('');
  };

  /**
   * Toggles whether the dashboard is shown or not.
   */
  const toggleShowDashboard = () => {
    setDashboardIsShown((prev) => !prev);
  };

  // Initially syncs indexedUrls with LocalForage
  useEffect(() => {
    localforage.getItem(forageKey).then((result) => {
      if (result) {
        setIndexedUrls(result as UrlObject[]);
      }
    });
  }, []);

  return {
    url,
    indexedUrls,
    handleUrlChange,
    shortenedUrl,
    shortenUrl,
    resultIsShown,
    convertAnother,
    dashboardIsShown,
    toggleShowDashboard,
  };
}
