import { UrlObject } from '../global/types';

type Props = {
    indexedUrls: UrlObject[]
    deleteUrl: (uid: string) => void
}

function Dashboard(props: Props) {
    return (
        props.indexedUrls.length ?
            <div className="overflow-x-auto">
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
                                    <td>{item.url}</td>
                                    <td>{item.uid}</td>
                                    <td><button className='link hover:text-error' onClick={() => props.deleteUrl(item.uid)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div> : (
                <p className='p-3 font-bold'> No URL's shortened yet</p>
            )
    );
}

export default Dashboard;