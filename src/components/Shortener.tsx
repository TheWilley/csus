import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent } from 'react';

type Props = {
    url: string,
    handleUrlChange: (url: ChangeEvent<HTMLInputElement>) => void,
    shortenUrl: () => void
}

function Shortener(props: Props) {
    return (
        <div className='w-[32em] form-control'>
            <div className="label">
                <span className="label-text text-xl"><FontAwesomeIcon icon={faLink} />Enter a URL to shorten</span>
            </div>
            <div className="join">
                <input value={props.url} onChange={props.handleUrlChange} className="input input-primary join-item w-full" placeholder="Enter long link here" />
                <button onClick={props.shortenUrl} className="btn btn-primary join-item rounded-r-full">Shorten</button>
            </div>
        </div>
    );
}

export default Shortener;