import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faExternalLink,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { useShortenerContext } from '../components/ShortenerContext.tsx';

function Dashboard() {
  const { indexedUrls, deleteUrl, deleteAllUrls, importUrls, exportUrls } =
    useShortenerContext();

  const handleExternalLink = (uid: string) => {
    window.open(`#${uid}`, '_blank');
  };

  return (
    <>
      {indexedUrls.length ? (
        <table className='table' data-testid='dashboard-table'>
          <thead>
            <tr>
              <th>Long URL</th>
              <th>Short URL ID</th>
            </tr>
          </thead>
          <tbody>
            {indexedUrls.map((item) => (
              <tr key={item.uid}>
                <td>
                  <input value={item.url} className='bg-base-200 w-full' readOnly />
                </td>
                <td className='flex items-center'>
                  <span className='mr-3'>{item.uid}</span>
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className='cursor-pointer'
                    onClick={() => handleExternalLink(item.uid)}
                  />
                </td>
                <td>
                  <button
                    className='btn btn-sm w-full btn-outline btn-error flex-shrink-0 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:!text-white'
                    onClick={() => deleteUrl(item.uid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='p-3 font-bold text-center'> No URLs shortened yet</p>
      )}
      <hr />
      <div className='flex justify-center mt-5 mb-2'>
        <div className='grid md:grid-cols-3 gap-3 w-full'>
          <div className='action-item flex items-center'>
            <button
              className='btn w-full btn-error text-white flex-shrink-0 px-4 py-2 rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              onClick={deleteAllUrls}
              aria-label='Delete all URLs'
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete All
            </button>
          </div>

          <div className='action-item flex items-center'>
            <button
              className='btn w-full btn-success text-white flex-shrink-0 px-4 py-2 rounded-md transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              onClick={exportUrls}
              aria-label='Export URLs'
            >
              <FontAwesomeIcon icon={faUpload} /> Export
            </button>
          </div>

          <div className='action-item flex items-center'>
            <label className='btn w-full px-4 py-2 rounded-md bg-blue-500 text-white transition duration-300 hover:bg-blue-600 cursor-pointer'>
              <FontAwesomeIcon icon={faDownload} /> Import
              <input
                type='file'
                className='hidden'
                onChange={importUrls}
                accept='.json'
                aria-label='Import URLs from JSON'
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
