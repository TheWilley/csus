import localforage from 'localforage';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { SaveData, UrlObject } from '../global/types';
import {
  addHashToStart,
  generateUniqueId,
  getUrlSuffix,
  isValidCustomUid,
  isValidUrl,
} from '../utils/urlUtils';
import { useNavigate } from 'react-router-dom';
import {
  CHAR_LIMIT,
  SAVEDATA_FILENAME,
  SAVEDATA_ID,
  SHORTENED_URL_PAIRS_KEY,
} from '../global/globals.ts';

export default function useShortener() {
  const errorMessages = useRef({
    invalidUrl: 'Invalid URL. Please enter a valid URL.',
    invalidCustomUid:
      'Invalid custom UID. Only alphanumeric characters, hyphens, and underscores are allowed.',
    customUidAlreadyExists: 'Custom UID already exists. Please enter a different one.',
    customUidTooLong: `Custom UID is too long. Please enter a UID of ${CHAR_LIMIT} characters or less.`,
    customUidForbidden: 'Custom UID is forbidden.',
  });
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState<string>('');
  const [indexedUrls, setIndexedUrls] = useState<UrlObject[]>([]);
  const [customUid, setCustomUid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [longUrlError, setLongUrlError] = useState(false);
  const [shortUrlError, setShortUrlError] = useState(false);

  const invalidIds = ['dashboard', 'result'];

  const navigateToResult = (shortUrl: string) => {
    const params = new URLSearchParams();
    params.set('longUrl', longUrl);
    params.set('shortUrl', shortUrl);

    navigate(`/result?${params.toString()}`);
  };

  /**
   * Shortens a URL.
   */
  const shortenUrl = () => {
    setLongUrlError(false);
    setShortUrlError(false);
    setErrorMessage('');

    if (!isValidUrl(longUrl)) {
      setErrorMessage(errorMessages.current.invalidUrl);
      setLongUrlError(true);
      return;
    }

    // Check if the URL already has a shortened version
    const existingUrlObject = indexedUrls.find((urlObject) => urlObject.url === longUrl);
    if (existingUrlObject) {
      // If the URL already exists, use its existing UID (ignore custom UID)
      navigateToResult(getUrlSuffix() + addHashToStart(existingUrlObject.uid));
    }

    // Validate custom UID if provided
    if (customUid.length) {
      if (invalidIds.includes(customUid)) {
        setErrorMessage(errorMessages.current.customUidForbidden);
        setShortUrlError(true);
        return;
      }

      if (!isValidCustomUid(customUid)) {
        setErrorMessage(errorMessages.current.invalidCustomUid);
        setShortUrlError(true);
        return;
      }

      // Check if custom UID already exists
      const existingUid = indexedUrls.some((urlObject) => urlObject.uid === customUid);
      if (existingUid) {
        setErrorMessage(errorMessages.current.customUidAlreadyExists);
        setShortUrlError(true);
        return;
      }

      // Check if UID is too long
      if (customUid.length > CHAR_LIMIT) {
        setErrorMessage(errorMessages.current.customUidTooLong);
        setShortUrlError(true);
        return;
      }
    }

    // If no existing URL, generate new UID or use custom one
    const uid = customUid || generateUniqueId(indexedUrls);
    const updatedUrls = [...indexedUrls, { url: longUrl, uid }];

    // Store the new URL/UID pair
    localforage.setItem(SHORTENED_URL_PAIRS_KEY, updatedUrls).then(() => {
      setIndexedUrls(updatedUrls);
      navigateToResult(getUrlSuffix() + addHashToStart(uid));
    });
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
    localforage.setItem(SHORTENED_URL_PAIRS_KEY, [...indexedUrls]);
  }, [indexedUrls]);

  /**
   * Handles URL text input change.
   * @param event The event fired from the text input
   */
  const handleLongUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLongUrl(event.currentTarget.value);
  };

  /**
   * Handles custom UID text input change.
   * @param event The event fired from the text input
   */
  const handleCustomUidChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomUid(event.currentTarget.value.toLowerCase());
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
      id: SAVEDATA_ID,
      data: indexedUrls,
    };
    const data = JSON.stringify(saveData);
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = SAVEDATA_FILENAME;
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
          if (parsedData.id !== SAVEDATA_ID) {
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
    localforage.getItem(SHORTENED_URL_PAIRS_KEY).then((result) => {
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
    url: longUrl,
    indexedUrls,
    shortenUrl,
    handleLongUrlChange,
    deleteUrl,
    customUid,
    handleCustomUidChange,
    errorMessage,
    deleteAllUrls,
    exportUrls,
    importUrls,
    shortUrlError,
    longUrlError,
  };
}
