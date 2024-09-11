import { UrlObject } from '../global/types';

type Props = {
    indexedUrls: UrlObject[]
}

function Dashboard(props: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Long URL</th>
                        <th>Short URL ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.indexedUrls.map((item, index) => (
                            <tr>
                                <th>{index}</th>
                                <td>{item.url}</td>
                                <td>{item.shortenedUrl}</td>
                                <td><button className='link hover:text-error'>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;