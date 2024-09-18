import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent } from 'react';
import { Helmet } from 'react-helmet';

type Props = {
    url: string,
    handleUrlChange: (url: ChangeEvent<HTMLInputElement>) => void,
    shortenUrl: () => void
    useCustomUid: boolean,
    handleCustomUidChange: (uid: ChangeEvent<HTMLInputElement>) => void,
    customUid: string,
    adjustUseCustomUid: (value: boolean) => void
}

function Shortener(props: Props) {
    return (
        <>
        <Helmet>
            <title>Home - csus</title>
        </Helmet>
            <div className='form-control'>
                <div className="label">
                    <span className="label-text text-xl"><FontAwesomeIcon icon={faLink} />Enter a URL to shorten</span>
                </div>
                <div className="join">
                    <input value={props.url} onChange={props.handleUrlChange} className="input input-primary join-item w-full" placeholder="Enter long link here" />
                    <select
                        className="select select-primary join-item"
                        onChange={(e) => props.adjustUseCustomUid(e.target.value === 'Yes')}
                        value={props.useCustomUid ? 'Yes' : 'No'}
                    >
                        <option disabled>Custom UID</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <button onClick={props.shortenUrl} className="btn btn-primary join-item rounded-r-full">Shorten</button>
                </div>
                {props.useCustomUid && (
                    <>
                        <span className='text-slate-600 mt-3 text-md'> Enter a custom UID for your shortened URL</span>
                        <input value={props.customUid} onChange={props.handleCustomUidChange} className="input input-primary mt-2" placeholder="Enter custom UID here" />
                    </>
                )}
            </div>
        </>
    );
}

export default Shortener;