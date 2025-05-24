import { Outlet } from 'react-router-dom';
import { ShortenerProvider } from '../components/ShortenerContext.tsx';
import csus from '../assets/images/csus.png';

function Layout() {
  return (
    <ShortenerProvider>
      <div className='mb-5 text-center text-white w-full'>
        <img src={csus} alt='csus' className='max-w-[200px] m-auto' />
      </div>
      <div className='bg-white bg-opacity-[5%] max-w-[500px] p-3'>
        <Outlet />
      </div>
    </ShortenerProvider>
  );
}

export default Layout;
