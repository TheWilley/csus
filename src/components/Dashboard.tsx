import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UrlObject } from '../global/types';
import { Helmet } from 'react-helmet';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

type Props = {
  indexedUrls: UrlObject[];
  deleteUrl: (uid: string) => void;
};

function Dashboard(props: Props) {
  const handleExternalLink = (uid: string) => {
    window.open(`#${uid}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - csus</title>
      </Helmet>
      {props.indexedUrls.length ? (
        <table className='table'>
          <thead>
            <tr>
              <th>Long URL</th>
              <th>Short URL ID</th>
            </tr>
          </thead>
          <tbody>
            {props.indexedUrls.map((item) => (
              <tr>
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
                    className='link hover:text-error'
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
        <p className='p-3 font-bold text-center'> No URL's shortened yet</p>
      )}
    </>
  );
}

export default Dashboard;
