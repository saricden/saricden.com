import Head from 'next/head';
import Link from 'next/link';
import {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord} from '@fortawesome/free-brands-svg-icons';

class OpenHaven extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discordJSON: null
    };
  }

  async componentDidMount() {
    const discordURL = 'https://discordapp.com/api/guilds/524995423127994370/widget.json';

    const res = await fetch(discordURL);
    const discordJSON = await res.json();

    this.setState({ discordJSON });
  }

  render() {
    const {discordJSON} = this.state;

    return (
      <main>
        <Head>
          <title>Open Haven - The Open Source Discord Community</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
        </Head>

        <nav className="top">
          <Link href="/">
            <a><img src="/me.svg" alt="Kirk M. (@saricden)" /></a>
          </Link>
        </nav>

        <header className="inline">
          <div className="centerbox">
            <h1>Open Haven is an online community of creators who believe in the awesomeness of open source technology.</h1>

            <div className="discord-userbox">
              {
                discordJSON !== null
                ? <Fragment>
                    {
                      discordJSON.members.map((member, i) => {
                        const {avatar_url, username} = member;

                        return (
                          <img key={"dmem"+i} src={avatar_url} alt={username} title={username} />
                        );
                      })
                    }
                  </Fragment>
                : null
              }
            </div>

            {
              discordJSON !== null
              ? <a className="btn martop" href={discordJSON.instant_invite} target="_blank">
                  <FontAwesomeIcon icon={faDiscord} />
                  Join on Discord
                </a>
              : null
            }
          </div>
        </header>

        <nav className="bottom">
          <Link href="/">
            <a>
              <img src="/tv.svg" alt="" />
              <span>Streams</span>
            </a>
          </Link>

          <Link href="/open-haven">
            <a>
              <img src="/open-haven.svg" alt="" />
              <span>Open Haven</span>
            </a>
          </Link>

          <Link href="/projects">
            <a>
              <img src="/folder.svg" alt="" />
              <span>Projects</span>
            </a>
          </Link>
        </nav>
      </main>
    );
  }
}

export default OpenHaven;