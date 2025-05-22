import { Outlet } from 'react-router-dom';
import { ShortenerProvider } from '../components/ShortenerContext.tsx';

function Layout() {
  return (
    <ShortenerProvider>
      <div className='mb-2 text-center'>
        <h1 className='text-5xl'>csus</h1>
        <p className='text-slate-500'>Client-Side-Url-Shortener</p>
      </div>
      <div className='bg-base-200 p-3 rounded'>
        <Outlet />
      </div>
    </ShortenerProvider>
  );
}

export default Layout;
