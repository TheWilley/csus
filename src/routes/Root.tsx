import Shortener from '../components/Shortener';
import useShortener from '../hooks/useShortener';
import Result from '../components/Result';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

function Root() {
  const {
    url,
    indexedUrls,
    handleUrlChange,
    shortenedUrl,
    shortenUrl,
    convertAnother,
    resultIsShown,
    dashboardIsShown,
    toggleShowDashboard,
    deleteUrl,
    customUid,
    handleCustomUidChange,
    adjustUseCustomUid,
    useCustomUid,
    errorMessage,
  } = useShortener();

  return (
    <>
      <div className='mb-2 text-center'>
        <h1 className='text-5xl'>csus</h1>
        <p className='text-slate-500'>Client-Side-Url-Shortener</p>
      </div>
      <div className='bg-base-200 p-3 rounded'>
        {dashboardIsShown ? (
          <Dashboard indexedUrls={indexedUrls} deleteUrl={deleteUrl} />
        ) : resultIsShown ? (
          <Result url={url} shortenedUrl={shortenedUrl} convertAnother={convertAnother} />
        ) : (
          <Shortener
            url={url}
            handleUrlChange={handleUrlChange}
            shortenUrl={shortenUrl}
            customUid={customUid}
            handleCustomUidChange={handleCustomUidChange}
            adjustUseCustomUid={adjustUseCustomUid}
            useCustomUid={useCustomUid}
            errorMessage={errorMessage}
          />
        )}
        <div className='text-center p-3'>
          <button className='link hover:text-primary' onClick={toggleShowDashboard}>
            {dashboardIsShown ? 'Back to home' : "Manage your URL's"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Root;
