import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Label from '../components/Label.tsx';
import TextInput from '../components/TextInput.tsx';
import Button from '../components/Button.tsx';
import LinkHeader from '../components/LinkHeader.tsx';
import ctc from '../utils/ctc.ts';

function Result() {
  const [copiedText, setCopiedText] = useState('Copy()');
  const [searchParams] = useSearchParams();

  const longUrl = searchParams.get('longUrl');
  const shortUrl = searchParams.get('shortUrl');

  const sadCat =
    '　　        　 ／＞　　フ\n' +
    '　　        　 | 　_　 _ l\n' +
    ' 　        　 ／` ミ＿xノ\n' +
    '　           /　　　 　 |\n' +
    '　        　 /　 ヽ　　 ﾉ\n' +
    '　          │　　| | |';

  // Sets state to "copied" for 2 seconds and then back to "copy"
  const copy = () => {
    ctc(shortUrl || '', () => {
      setCopiedText('Copied!');
      setTimeout(() => {
        setCopiedText('Copy()');
      }, 1400);
    });
  };

  const visit = () => {
    window.open(longUrl || '', '_blank');
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
          <Button
            onClick={() => {
              visit();
            }}
          >
            Visit()
          </Button>
          <Button onClick={copy}>{copiedText}</Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <LinkHeader links={[{ name: '/home', path: '/' }]} />
        <p className='text-center'>"I call it my billion-dollar mistake."</p>
        <i>- Tony Hoare</i>
        <br />
        <br />
        <pre>{sadCat}</pre>
      </>
    );
  }
}

export default Result;
