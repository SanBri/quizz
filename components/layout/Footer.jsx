import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className='line'></div>
      <div className='footer'>
        <div className='footer__signature'>
          <p>
            <Link href='http://www.sanb.fr'>
              <a target='_blank' rel='noopener noreferrer'>
                Site Web par Sandro Brignoli 💭
              </a>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
