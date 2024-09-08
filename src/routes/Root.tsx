import Shortener from '../components/Shortener';
import useShortener from '../hooks/useShortener';
import Result from '../components/Result';

function Root() {
    const { url, handleUrlChange, shortenedUrl, shortenUrl, convertAnother, resultIsShown } = useShortener();
    return (
        <>
            <div className='mb-2 text-center'>
                <h1 className='text-5xl'>csus</h1>
                <p className='text-slate-500'>Client-Side-Url-Shortener</p>
            </div>
            <div className='bg-base-200 p-3 rounded'>
                {
                    resultIsShown ?
                        <Result url={url} shortenedUrl={shortenedUrl} convertAnother={convertAnother} /> :
                        <Shortener url={url} handleUrlChange={handleUrlChange} shortenUrl={shortenUrl} />
                }
            </div>
        </>
    );
}

export default Root;
