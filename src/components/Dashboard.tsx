import { UrlObject } from '../global/types';
import { Helmet } from 'react-helmet';

type Props = {
    indexedUrls: UrlObject[]
    deleteUrl: (uid: string) => void
}

function Dashboard(props: Props) {
    return (
        <>
        <Helmet>
            <title>Dashboard - csus</title>
        </Helmet>
            {props.indexedUrls.length ?
                <table className="table">
                    <thead>
                        <tr>
                            <th>Long URL</th>
                            <th>Short URL ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.indexedUrls.map((item) => (
                                <tr>
                                    <td><input value={item.url} className='bg-base-200 w-full' readOnly /></td>
                                    <td>{item.uid}</td>
                                    <td><button className='link hover:text-error' onClick={() => props.deleteUrl(item.uid)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                : (
                    <p className='p-3 font-bold'> No URL's shortened yet</p>
                )}
        </>
    );
}

export default Dashboard;