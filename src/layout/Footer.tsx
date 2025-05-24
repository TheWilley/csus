import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className='text-center mt-5 text-slate-500'>
      <span>
        <span className='mr-3'>You can also self-host the app! (GitHub)</span>
        <a href='https://github.com/TheWilley/csus?tab=readme-ov-file' target='_blank'>
          <FontAwesomeIcon icon={faExternalLink} className='cursor-pointer' />
        </a>
      </span>
    </footer>
  );
}

export default Footer;
