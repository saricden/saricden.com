import Head from 'next/head';
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
        </Head>

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
      </main>
    );
  }
}

export default OpenHaven;