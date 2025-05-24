import { useShortenerContext } from '../components/ShortenerContext.tsx';
import Button from '../components/Button.tsx';
import TextInput from '../components/TextInput.tsx';
import Label from '../components/Label.tsx';
import LinkHeader from '../components/LinkHeader.tsx';

function Shortener() {
  const {
    url,
    shortenUrl,
    errorMessage,
    customUid,
    handleLongUrlChange,
    handleCustomUidChange,
  } = useShortenerContext();

  return (
    <>
      <LinkHeader links={[{ name: '/dashboard', path: '/dashboard' }]} />
      <div>
        <Label text='[ long_url ]' />
        <TextInput
          value={url}
          onChange={handleLongUrlChange}
          placeholder={'insert long link here'}
          className='w-full mt-2 mb-5'
        />
        <Label text='[ custom_id ]' />
        <div className='flex items-center mt-2 mb-5'>
          <TextInput
            placeholder='csus/'
            className='border-dashed w-[65px] mr-2 inline cursor-default focus:bg-opacity-[7%]'
            readOnly
          />
          <TextInput
            value={customUid}
            maxLength={parseInt(import.meta.env.VITE_CUSTOM_UID_CHAR_LIMIT)}
            onChange={handleCustomUidChange}
            className='w-full'
            placeholder='insert custom id here'
          />
        </div>
        <div>
          <p className='text-red-500 mb-5 text-center'> {errorMessage} </p>
        </div>
        <Button
          onClick={shortenUrl}
          disabled={url.length === 0}
          className='w-full bg-green-700'
        >
          Shorten()
        </Button>
      </div>
    </>
  );
}

export default Shortener;
