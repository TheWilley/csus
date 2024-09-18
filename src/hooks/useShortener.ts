import localforage from 'localforage';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { findInForage } from '../utils/urlUtils';
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
 * Validates a custom UID.
 * @param uid The custom UID to validate.
 * @returns True if the UID is valid, false otherwise.
 */
function isValidCustomUid(uid: string) {
  const uidPattern = /^[a-zA-Z0-9_-]+$/;
  return uidPattern.test(uid);
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
  const [useCustomUid, setUseCustomUid] = useState(false);
  const [customUid, setCustomUid] = useState('');

  /**
   * Shortens a URL.
   */
  const shortenUrl = () => {
    if (isValidUrl(url)) {
      // Check if the custom UID is valid
      if (useCustomUid && !isValidCustomUid(customUid)) {
        alert(
          'Invalid custom UID. Please use only alphanumeric characters, hyphens, and underscores.'
        );
        return;
      }

      // Check if the URL is already in the indexedUrls array
      findInForage(url, 'url', (result) => {
        if (!result) {
          const uid = customUid || generateUniqueId();
          const adjustedArray = [...indexedUrls, { url: url, uid }];

          // If the URL is not in the indexedUrls array, add it
          localforage.setItem(import.meta.env.BASE_URL, adjustedArray).then(() => {
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
   * Deletes a URL from the indexedUrls array.
   * @param uid The unique ID of the URL to delete.
   */
  const deleteUrl = (uid: string) => {
    if (confirm('Are you sure you want to delete this URL?')) {
      const adjustedArray = indexedUrls.filter((url) => url.uid !== uid);
      setIndexedUrls(adjustedArray);
      syncLocalForage();
    }
  };

  /**
   * Syncs indexedUrls with LocalForage. Called after any changes to indexedUrls.
   */
  const syncLocalForage = useCallback(() => {
    localforage.setItem(import.meta.env.BASE_URL, [...indexedUrls]);
  }, [indexedUrls]);

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
    setUseCustomUid(false);
    setCustomUid('');
  };

  /**
   * Toggles whether the dashboard is shown or not.
   */
  const toggleShowDashboard = () => {
    setDashboardIsShown((prev) => !prev);
  };

  /**
   * Toggles whether to use a custom UID or not.
   */
  const adjustUseCustomUid = (value: boolean) => {
    setUseCustomUid(value);
  };

  /**
   * Handles custom UID text input change.
   * @param event The event fired from the text input.
   */
  const handleCustomUidChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomUid(event.currentTarget.value);
  };

  // Initially syncs indexedUrls with LocalForage
  useEffect(() => {
    localforage.getItem(import.meta.env.BASE_URL).then((result) => {
      if (result) {
        setIndexedUrls(result as UrlObject[]);
      }
    });
  }, []);

  // Sync upon indexedUrls change
  useEffect(() => {
    syncLocalForage();
  }, [indexedUrls, syncLocalForage]);

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
    deleteUrl,
    useCustomUid,
    adjustUseCustomUid,
    customUid,
    handleCustomUidChange,
  };
}
