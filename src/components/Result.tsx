import {
  faArrowUpRightFromSquare,
  faCopy,
  faLink,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

type Props = {
  url: string;
  shortenedUrl: string;
  convertAnother: () => void;
};

function Result(props: Props) {
  const [copiedText, setCopiedText] = useState('Copy');

  // Sets state to "copied" for 2 seconds and then back to "copy"
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.shortenedUrl).then(() => {
      setCopiedText('Copied!');
      setTimeout(() => {
        setCopiedText('Copy');
      }, 1400);
    });
  };

  return (
    props.shortenedUrl && (
      <div className='text-center p-3'>
        <label className='form-control'>
          <div className='label'>
            <span className='label-text text-xl'>
              {' '}
              <FontAwesomeIcon icon={faLink} /> Long URL:
            </span>
          </div>
          <input
            type='text'
            value={props.url}
            className='input input-bordered'
            readOnly
          />
        </label>
        <label className='form-control'>
          <div className='label'>
            <span className='label-text text-xl'>
              {' '}
              <FontAwesomeIcon icon={faStar} /> Short URL:
            </span>
          </div>
          <input
            type='text'
            value={props.shortenedUrl}
            className='input input-bordered'
            readOnly
          />
        </label>
        <div className='flex gap-3 mt-3 justify-center'>
          <a
            href={props.shortenedUrl}
            target='_blank'
            className='btn btn-primary btn-outline'
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            Visit
          </a>
          <button onClick={copyToClipboard} className='btn btn-primary btn-outline'>
            <FontAwesomeIcon icon={faCopy} />
            {copiedText}
          </button>
        </div>
        <button className='btn btn-primary mt-4' onClick={props.convertAnother}>
          {' '}
          Shorten Another{' '}
        </button>
      </div>
    )
  );
}

export default Result;
