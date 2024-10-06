import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UrlObject } from '../global/types';
import {
  faDownload,
  faExternalLink,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
  indexedUrls: UrlObject[];
  deleteUrl: (uid: string) => void;
  deleteAllUrls: () => void;
  importUrls: (event: React.ChangeEvent<HTMLInputElement>) => void;
  exportUrls: () => void;
};

function Dashboard(props: Props) {
  const handleExternalLink = (uid: string) => {
    window.open(`#${uid}`, '_blank');
  };

  return (
    <>
      {props.indexedUrls.length ? (
        <table className='table' data-testid='dashboard-table'>
          <thead>
            <tr>
              <th>Long URL</th>
              <th>Short URL ID</th>
            </tr>
          </thead>
          <tbody>
            {props.indexedUrls.map((item) => (
              <tr key={item.uid}>
                <td>
                  <input value={item.url} className='bg-base-200 w-full' readOnly />
                </td>
                <td>
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
                    onClick={() => props.deleteUrl(item.uid)}
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
      <div className='flex justify-center mt-5'>
        <div className='grid md:grid-cols-3 gap-3 w-full'>
          <div className='action-item flex items-center'>
            <button
              className='btn w-full btn-error text-white flex-shrink-0 px-4 py-2 rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              onClick={props.deleteAllUrls}
              aria-label='Delete all URLs'
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete All
            </button>
          </div>

          <div className='action-item flex items-center'>
            <button
              className='btn w-full btn-success text-white flex-shrink-0 px-4 py-2 rounded-md transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              onClick={props.exportUrls}
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
                onChange={props.importUrls}
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
