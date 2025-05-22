import { faLink, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useShortenerContext } from './ShortenerContext';

function Shortener() {
  const {
    url,
    handleUrlChange,
    shortenUrl,
    errorMessage,
    customUid,
    handleCustomUidChange,
  } = useShortenerContext();

  return (
    <div className='form-control'>
      <div className='label'>
        <span className='label-text text-xl'>
          <FontAwesomeIcon icon={faLink} className='mr-1' />
          Enter a URL to shorten
        </span>
      </div>
      <input
        value={url}
        onChange={handleUrlChange}
        className='md:hidden input input-primary w-full'
        placeholder='Enter long link here'
      />
      <div className='mt-2 md:mt-0'>
        <input
          value={url}
          onChange={handleUrlChange}
          className='hidden md:block input input-primary w-full mb-2'
          placeholder='Enter long link here'
        />
        <div className='label'>
          <span className='label-text text-xl'>
            <FontAwesomeIcon icon={faPen} className='mr-1' />
            Customize generated link
          </span>
        </div>
        <input
          value={customUid}
          maxLength={parseInt(import.meta.env.VITE_CUSTOM_UID_CHAR_LIMIT)}
          onChange={handleCustomUidChange}
          className='input input-primary mt-2 w-full mb-5'
          placeholder='Enter custom UID here'
        />
        <button
          onClick={shortenUrl}
          className='btn btn-primary rounded-lg block w-full'
          disabled={url.length === 0}
        >
          Shorten
        </button>
      </div>
      <div>
        <p className='text-error mt-3 text-center'> {errorMessage} </p>
      </div>
    </div>
  );
}

export default Shortener;
