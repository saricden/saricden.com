import '../styles/globals.css';
import {useRouter} from 'next/router';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const activeClass = [
    (router.pathname === '/' ? 'active' : ''),
    (router.pathname === '/open-haven' ? 'active' : ''),
    (router.pathname === '/projects' ? 'active' : '')
  ];

  return (
    <div>
      <nav className="top">
        <Link href="/">
          <a><img src="/me.svg" alt="Kirk M. (@saricden)" /></a>
        </Link>
      </nav>

      <Component {...pageProps} />

      <nav className="bottom">
        <Link href="/">
          <a className={activeClass[0]}>
            <img src="/tv.svg" alt="" />
            <span>Streams</span>
          </a>
        </Link>

        <Link href="/open-haven">
          <a className={activeClass[1]}>
            <img src="/open-haven.svg" alt="" />
            <span>Open Haven</span>
          </a>
        </Link>

        <Link href="/projects">
          <a className={activeClass[2]}>
            <img src="/folder.svg" alt="" />
            <span>Projects</span>
          </a>
        </Link>
      </nav>
    </div>
  );
}

export default MyApp;
