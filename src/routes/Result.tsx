import {
  faArrowUpRightFromSquare,
  faCopy,
  faLink,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Result() {
  const [copiedText, setCopiedText] = useState('Copy');
  const [searchParams] = useSearchParams();

  const longUrl = searchParams.get('longUrl');
  const shortUrl = searchParams.get('shortUrl');

  // Sets state to "copied" for 2 seconds and then back to "copy"
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl || '').then(() => {
      setCopiedText('Copied!');
      setTimeout(() => {
        setCopiedText('Copy');
      }, 1400);
    });
  };

  if (longUrl && shortUrl) {
    return (
      <div className='text-center p-3'>
        <label className='form-control'>
          <div className='label'>
            <span className='label-text text-xl'>
              {' '}
              <FontAwesomeIcon icon={faLink} /> Long URL:
            </span>
          </div>
          <input type='text' value={longUrl} className='input input-bordered' readOnly />
        </label>
        <label className='form-control'>
          <div className='label'>
            <span className='label-text text-xl'>
              {' '}
              <FontAwesomeIcon icon={faStar} /> Short URL:
            </span>
          </div>
          <input type='text' value={shortUrl} className='input input-bordered' readOnly />
        </label>
        <div className='flex gap-3 mt-3 justify-center'>
          <a href={shortUrl} target='_blank' className='btn btn-primary btn-outline'>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            Visit
          </a>
          <button onClick={copyToClipboard} className='btn btn-primary btn-outline'>
            <FontAwesomeIcon icon={faCopy} />
            {copiedText}
          </button>
        </div>
      </div>
    );
  }
}

export default Result;
