import '../styles/globals.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faMusic, faNewspaper, faWindowRestore} from '@fortawesome/free-solid-svg-icons';
import {Fragment} from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <nav className="nav-primary">
        <Link href="/">
          <a className="nav-primary__logo">Kirk M. <span className="nav-primary__handle">@saricden</span></a>
        </Link>

        <a className="nav-primary__social-link" href="https://github.com/saricden" target="_blank">
          <FontAwesomeIcon className="nav-primary__social-icon" icon={faGithub} />
        </a>

        <a className="nav-primary__social-link" href="https://www.twitch.tv/saricden" target="_blank">
          <FontAwesomeIcon className="nav-primary__social-icon" icon={faTwitch} />
        </a>

        <a className="nav-primary__social-link" href="https://twitter.com/saricden" target="_blank">
          <FontAwesomeIcon className="nav-primary__social-icon" icon={faTwitter} />
        </a>
      </nav>
      <Component {...pageProps} />
      <nav className="nav-footer">
        <Link href="/blog">
          <a className="nav-footer__link">
            <FontAwesomeIcon className="nav-footer__icon" icon={faNewspaper} />
            <label className="nav-footer__label">
              Blog
            </label>
          </a>
        </Link>

        <Link href="/music">
          <a className="nav-footer__link">
            <FontAwesomeIcon className="nav-footer__icon" icon={faMusic} />
            <label className="nav-footer__label">
              Music
            </label>
          </a>
        </Link>

        <Link href="/projects">
          <a className="nav-footer__link">
            <FontAwesomeIcon className="nav-footer__icon" icon={faWindowRestore} />
            <label className="nav-footer__label">
              Projects
            </label>
          </a>
        </Link>

        <Link href="/contact">
          <a className="nav-footer__link">
            <FontAwesomeIcon className="nav-footer__icon" icon={faEnvelope} />
            <label className="nav-footer__label">
              Contact
            </label>
          </a>
        </Link>
      </nav>
    </Fragment>
  );
}

export default MyApp;