import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

function Wrapper(props: Props) {
    return (
        <div className='flex'>
            <div className='m-auto p-3'>
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;