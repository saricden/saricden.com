import Head from 'next/head';
import {Component} from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dh_yShift: 0
    };

    this.ticker = null;
    this.rollHeading = this.rollHeading.bind(this);
  }

  componentDidMount() {
    this.ticker = setInterval(this.rollHeading, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  rollHeading() {
    const min = 0;
    const max = 4;
    const yShift = 50; // look into a better way of doing this
    let dh_yShift = 0;

    dh_yShift = ((Math.floor(Math.random() * max) + min) * yShift);

    this.setState({ dh_yShift });
  }

  render() {
    const {dh_yShift} = this.state;

    return (
        <main className="content-body">
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <h1 className="dynamic-heading">
            Kirk M. is a(n)
            <div className="dynamic-heading__roller-container">
              <ul className="dynamic-heading__roller" style={{
                transform: `translateY(-${dh_yShift}px)`
              }}>
                <li className="dynamic-heading__roll-item">Software Engineer</li>
                <li className="dynamic-heading__roll-item">Indie Game Developer</li>
                <li className="dynamic-heading__roll-item">Wannabe DJ</li>
                <li className="dynamic-heading__roll-item">Tech Blogger</li>
              </ul>
            </div>
            in Victoria, BC
          </h1>

          <img className="avatar-big" src="/me.png" alt="Kirk M. (@saricden)" />
        </main>
    );
  }
}
