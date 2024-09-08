import { faArrowUpRightFromSquare, faCopy, faLink, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    url: string,
    shortenedUrl: string,
    convertAnother: () => void
}

function Result(props: Props) {
    return (
        props.shortenedUrl &&
        <div className="text-center p-3">
            <label className="form-control">
                <div className="label">
                    <span className="label-text text-xl"> <FontAwesomeIcon icon={faLink} /> Long URL:</span>
                </div>
                <input type="text" value={props.url} className="input input-bordered" />
            </label>
            <label className="form-control">
                <div className="label">
                    <span className="label-text text-xl"> <FontAwesomeIcon icon={faStar} /> Short URL:</span>
                </div>
                <input type="text" value={props.shortenedUrl} className="input input-bordered" />
            </label>
            <div className='flex gap-3 mt-3 justify-center'>
                <a href={props.shortenedUrl} target='_blank' className='btn btn-primary btn-outline'><FontAwesomeIcon icon={faArrowUpRightFromSquare} />Visit</a>
                <button onClick={() => navigator.clipboard.writeText(props.shortenedUrl)} className='btn btn-primary btn-outline'><FontAwesomeIcon icon={faCopy} />Copy</button>
            </div>
            <button className='btn btn-primary mt-4' onClick={props.convertAnother}> Shorten Another </button>
        </div >
    );
}

export default Result;