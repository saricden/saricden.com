import Head from 'next/head';
import {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad, faAward, faGlobeAmericas, faMobileAlt, faChevronCircleRight, faDesktop, faGlobe} from '@fortawesome/free-solid-svg-icons';
import {faItchIo, faGithub, faAndroid, faApple} from '@fortawesome/free-brands-svg-icons';

class Projects extends Component {
  render() {
    return (
      <main>
        <Head>
          <title>Projects by Kirk M. (@saricden)</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="inline">
          <div className="column-gallery">
            <div className="col">
              <h1>I work on open and closed source projects using a variety of technologies including JavaScript, Node.js, React, Next.js, Firebase, and Phaser.</h1>
              <p className="text-center">
                <FontAwesomeIcon className="scroll-arrow" icon={faChevronCircleRight} />
                Scroll to View Projects
              </p>
            </div>

            <div className="col project">
              <img src="/project-banners/bombs-away-banner.png" alt="Bombs Away!" />
              <ul className="tags">
                <li>
                  <FontAwesomeIcon icon={faGamepad} />
                  Game
                </li>
                <li>
                  <FontAwesomeIcon icon={faMobileAlt} />
                  Mobile
                </li>
                <li>
                  <FontAwesomeIcon icon={faDesktop} />
                  Desktop
                </li>
                <li>
                  <FontAwesomeIcon icon={faAward} />
                  12th - Trijam 89
                </li>
              </ul>
              <p>
                Bombs Away is a simple puzzle game wherein your job is to guide bombs out of a series of increasingly complex mazes.
              </p>
              <a href="https://saricden.itch.io/bombs-away" target="_blank" className="btn full">
                <FontAwesomeIcon icon={faItchIo} />
                Play on Itch.io
              </a>
              <a href="https://github.com/saricden/trijam89" target="_blank" className="btn full">
                <FontAwesomeIcon icon={faGithub} />
                View Source on GitHub
              </a>
            </div>

            <div className="col project">
              <img src="/project-banners/hot-tots-banner.png" alt="Hot Tots" />
              <ul className="tags">
                <li>
                  <FontAwesomeIcon icon={faGamepad} />
                  Game
                </li>
                <li>
                  <FontAwesomeIcon icon={faDesktop} />
                  Desktop
                </li>
                <li>
                  <FontAwesomeIcon icon={faAward} />
                  9th - Trijam 88
                </li>
              </ul>
              <p>
                Roast some potatoes! You are the flamethrower wielding potato, bent on destroying his own kind.
              </p>
              <a href="https://saricden.itch.io/hot-tots" target="_blank" className="btn full">
                <FontAwesomeIcon icon={faItchIo} />
                Play on Itch.io
              </a>
              <a href="https://github.com/saricden/trijam88" target="_blank" className="btn full">
                <FontAwesomeIcon icon={faGithub} />
                View Source on GitHub
              </a>
            </div>

            <div className="col project">
              <img src="/project-banners/penami-banner.png" alt="PenAmi" />
              <ul className="tags">
                <li>
                  <FontAwesomeIcon icon={faMobileAlt} />
                  App
                </li>
                <li>
                  <FontAwesomeIcon icon={faAndroid} />
                  Android
                </li>
                <li>
                  <FontAwesomeIcon icon={faApple} />
                  iOS
                </li>
              </ul>
              <p>
                Storytelling is better with friends. Write stories collaboratively with groups of friends with this free app. Currently in closed alpha testing.
              </p>
              <a href="https://penami.app" target="_blank" className="btn full">
                <FontAwesomeIcon icon={faGlobeAmericas} />
                Visit Website
              </a>
            </div>

            <div className="col project">
              <img src="/project-banners/internet-science-banner.png" alt="Internet Science" />
              <ul className="tags">
                <li>
                  <FontAwesomeIcon icon={faGlobe} />
                  Website
                </li>
              </ul>
              <p>
                Internet Science is my technical blog where I write modern web dev, including game dev, website dev, hybrid app dev, and databases.
              </p>
              <a href="https://saricden.github.io" target="_blank" className="btn full">
                <FontAwesomeIcon icon={faGlobeAmericas} />
                Visit Website
              </a>
              <a href="https://github.com/saricden/saricden.github.io" target="_blank" className="btn full">
                <FontAwesomeIcon icon={faGithub} />
                View Source on GitHub
              </a>
            </div>

          </div>
        </header>
      </main>
    );
  }
}

export default Projects;