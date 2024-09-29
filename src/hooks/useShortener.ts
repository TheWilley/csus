import localforage from 'localforage';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SaveData, UrlObject } from '../global/types';
import ShortUniqueId from 'short-unique-id';
import validUrl from 'valid-url';

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
  const isValidUrl = validUrl.isUri(urlString);

  // Check if URL is leading to the same domain, thus causing an infinite loop
  const domain = new URL(window.location.href).hostname;
  if (urlString.includes(domain)) {
    return false;
  }

  return isValidUrl;
}

export default function useShortener() {
  const urlSuffix = window.location.href.split('/csus/')[0] + '/csus/';
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [indexedUrls, setIndexedUrls] = useState<UrlObject[]>([]);
  const [dashboardIsShown, setDashboardIsShown] = useState(false);
  const [resultIsShown, setResultIsShown] = useState(false);
  const [useCustomUid, setUseCustomUid] = useState(false);
  const [customUid, setCustomUid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Generates a unqiue ID.
   * @returns A unique ID.
   */
  const generateUniqueId = () => {
    let uniqueId: string;
    let result: boolean;
    do {
      uniqueId = new ShortUniqueId({ length: 8 }).randomUUID();
      result = indexedUrls.some((url) => url.uid === uniqueId);
    } while (result);
    return uniqueId;
  };

  /**
   * Shortens a URL.
   */
  const shortenUrl = () => {
    const addHashToStart = (str: string) => {
      return str.startsWith('#') ? str : '#' + str;
    };

    if (!isValidUrl(url)) {
      setErrorMessage('Invalid URL. Please enter a valid URL.');
      return;
    }

    // Check if the URL already has a shortened version
    const existingUrlObject = indexedUrls.find((urlObject) => urlObject.url === url);
    if (existingUrlObject) {
      // If the URL already exists, use its existing UID (ignore custom UID)
      setShortenedUrl(urlSuffix + addHashToStart(existingUrlObject.uid));
      setResultIsShown(true);
      return;
    }

    // Validate custom UID if provided
    if (useCustomUid) {
      if (!isValidCustomUid(customUid)) {
        setErrorMessage(
          'Invalid custom UID. Only alphanumeric characters, hyphens, and underscores are allowed.'
        );
        return;
      }

      // Check if custom UID already exists
      const existingUid = indexedUrls.some((urlObject) => urlObject.uid === customUid);
      if (existingUid) {
        setErrorMessage('Custom UID already exists. Please enter a different one.');
        return;
      }

      // Check if UID is too long
      if (customUid.length > parseInt(import.meta.env.VITE_CUSTOM_UID_CHAR_LIMIT)) {
        setErrorMessage(
          `Custom UID is too long. Please enter a UID of ${import.meta.env.VITE_CUSTOM_UID_CHAR_LIMIT} characters or less.`
        );
        return;
      }
    }

    // If no existing URL, generate new UID or use custom one
    const uid = customUid || generateUniqueId();
    const updatedUrls = [...indexedUrls, { url, uid }];

    // Store the new URL/UID pair
    localforage.setItem(import.meta.env.VITE_FORAGE_KEY, updatedUrls).then(() => {
      setShortenedUrl(urlSuffix + addHashToStart(uid));
      setIndexedUrls(updatedUrls);
    });

    setResultIsShown(true);
  };

  /**
   * Deletes a URL from the indexedUrls array.
   * @param uid The unique ID of the URL to delete.
   */
  const deleteUrl = (uid: string) => {
    if (confirm('Are you sure you want to delete this URL?')) {
      const adjustedArray = indexedUrls.filter((url) => url.uid !== uid);
      setIndexedUrls(adjustedArray);
    }
  };

  /**
   * Syncs indexedUrls with LocalForage. Called after any changes to indexedUrls.
   *
   * **This method should not be called directly. Set indexedUrls instead to trigger a sync.**
   */
  const syncLocalForage = useCallback(() => {
    localforage.setItem(import.meta.env.VITE_FORAGE_KEY, [...indexedUrls]);
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
    setErrorMessage('');
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

  /**
   * Deletes all URLs from the indexedUrls array and LocalForage.
   */
  const deleteAllUrls = () => {
    if (confirm('Are you sure you want to delete all URLs?')) {
      setIndexedUrls([]);
      syncLocalForage();
    }
  };

  /**
   * Exports the indexedUrls array as a JSON file.
   */
  const exportUrls = () => {
    const saveData: SaveData = {
      id: 'csus-urls',
      data: indexedUrls,
    };
    const data = JSON.stringify(saveData);
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csus-urls.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Imports URLs from a JSON file.
   * @param event The event fired from the file input.
   */
  const importUrls = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (typeof data === 'string') {
          const parsedData = JSON.parse(data) as SaveData;
          if (parsedData.id !== 'csus-urls') {
            return;
          } else {
            setIndexedUrls(parsedData.data);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // Initially syncs indexedUrls with LocalForage
  useEffect(() => {
    localforage.getItem(import.meta.env.VITE_FORAGE_KEY).then((result) => {
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
    errorMessage,
    deleteAllUrls,
    exportUrls,
    importUrls,
    generateUniqueId,
  };
}
