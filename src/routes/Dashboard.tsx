import { useShortenerContext } from '../components/ShortenerContext.tsx';
import Button from '../components/Button.tsx';
import TextInput from '../components/TextInput.tsx';
import LinkHeader from '../components/LinkHeader.tsx';
import { useRef } from 'react';

function Dashboard() {
  const { indexedUrls, deleteUrl, deleteAllUrls, importUrls, exportUrls } =
    useShortenerContext();
  const importRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    importRef.current?.click();
  };

  return (
    <>
      <input
        ref={importRef}
        type='file'
        className='hidden'
        onChange={importUrls}
        accept='.json'
      />
      <LinkHeader links={[{ name: '/home', path: '/' }]} />

      {indexedUrls.length ? (
        <div className='max-h-[400px] overflow-y-auto mb-4'>
          <table
            className='w-full text-white border-separate border-spacing-y-2'
            data-testid='dashboard-table'
          >
            <thead className='sticky top-0 bg-[#1e1e1e]'>
              <tr className='text-left'>
                <th>Long URL</th>
                <th>URL ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {indexedUrls.map((item) => (
                <tr key={item.uid} className='bg-white bg-opacity-[5%]'>
                  <td>
                    <TextInput value={item.url} readOnly className='w-full p-3' />
                  </td>
                  <td className='p-2'>
                    <div className='flex items-center'>
                      <a
                        className='text-blue-400 hover:underline cursor-pointer'
                        href={'#' + item.uid}
                        target='_blank'
                      >
                        {item.uid}
                      </a>
                    </div>
                  </td>
                  <td>
                    <Button onClick={() => deleteUrl(item.uid)}>Delete()</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='p-3 font-bold text-center'>no urls shortened</p>
      )}

      <div className='grid md:grid-cols-3 gap-3 w-full mt-5'>
        <Button onClick={deleteAllUrls}>Clear()</Button>
        <Button onClick={exportUrls}>Export()</Button>
        <Button onClick={handleImport}>Import()</Button>
      </div>
    </>
  );
}

export default Dashboard;
