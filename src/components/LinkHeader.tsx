import { Link } from 'react-router-dom';

type Props = {
  links: {
    name: string;
    path: string;
  }[];
};

function LinkHeader(props: Props) {
  return (
    <>
      <div className='flex gap-5 items-center justify-center text-blue-400'>
        {props.links.map((link) => (
          <Link key={link.name} to={link.path} className='hover:underline'>
            {link.name}
          </Link>
        ))}
      </div>
      <hr className='bg-transparent border border-dashed opacity-20 mb-3 mt-3' />
    </>
  );
}

export default LinkHeader;
