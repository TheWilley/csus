import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Label from '../components/Label.tsx';
import TextInput from '../components/TextInput.tsx';
import Button from '../components/Button.tsx';
import LinkHeader from '../components/LinkHeader.tsx';

function Result() {
  const [copiedText, setCopiedText] = useState('Copy()');
  const [searchParams] = useSearchParams();

  const longUrl = searchParams.get('longUrl');
  const shortUrl = searchParams.get('shortUrl');

  // Sets state to "copied" for 2 seconds and then back to "copy"
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl || '').then(() => {
      setCopiedText('Copied!');
      setTimeout(() => {
        setCopiedText('Copy()');
      }, 1400);
    });
  };

  if (longUrl && shortUrl) {
    return (
      <>
        <LinkHeader
          links={[
            { name: '/home', path: '/' },
            { name: '/dashboard', path: '/dashboard' },
          ]}
        />

        <Label text='[ long_url ]' />
        <TextInput value={longUrl} className='w-full mt-2 mb-5' readOnly />

        <Label text='[ short_url]' />
        <TextInput value={shortUrl} className={'w-full mt-2 mb-5'} readOnly />

        <div className='flex gap-3 mt-3 justify-center'>
          <Button text='Visit()' onClick={() => {}} />
          <Button text={copiedText} onClick={copyToClipboard} />
        </div>
      </>
    );
  }
}

export default Result;
