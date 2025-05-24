import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Wrapper(props: Props) {
  return (
    <div className='flex bg-[#121212] w-screen min-h-screen text-white font-[JetBrainsMono]'>
      <div className='max-w-6xl ml-auto mr-auto mt-8'>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
