import Head from 'next/head';
import {Component} from 'react';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      untilNextStream: {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
      }
    };

    this.canvasRef = null;
    this.containerRef = null;

    this.timer = null;

    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  setCanvasRef(element) {
    this.canvasRef = element;
  }

  setContainerRef(element) {
    this.containerRef = element;
  }

  getNextStreamInterval() {
    const now = DateTime.local();
    console.log(now.ts);
    const start = DateTime.local()
  }

  async componentDidMount() {
    const dayIndex = 5; // Friday
    const nextFriday = new Date();

    const nextStreamUTC = new Date();
    nextStreamUTC.setUTCDate(nextStreamUTC.getDate() + (dayIndex - nextFriday.getDay() + 7) % 7);
    nextStreamUTC.setUTCHours(23, 0, 0, 0); // 11pm UTC = 4pm PDT

    const now = (new Date().getTime() / 1000);
    const streamTime = (nextStreamUTC.getTime() / 1000);
    let seconds = streamTime - now;

    this.timer = setInterval(() => {
      const days        = Math.floor(seconds/24/60/60);
      const hoursLeft   = Math.floor((seconds) - (days*86400));
      const hours       = Math.floor(hoursLeft/3600);
      const minutesLeft = Math.floor((hoursLeft) - (hours*3600));
      const minutes     = Math.floor(minutesLeft/60);
      const remainingSeconds = Math.floor(seconds % 60);

      const untilNextStream = {
        days,
        hours,
        minutes,
        seconds: remainingSeconds
      };

      this.setState({ untilNextStream });

      if (seconds === 0) {
        clearInterval(countdownTimer);
        console.log('DONE');
      } else {
        seconds--;
      }
    }, 1000);

    

    if (this.canvasRef && this.containerRef && typeof window !== 'undefined') {
      const Phaser = (await import('phaser')).default;
      const BootScene = (await import('../phaser_scenes/BootScene')).default;
      const MainScene = (await import('../phaser_scenes/MainScene')).default;
      const {Game} = Phaser;

      const config = {
        type: Phaser.WEB_GL,
        scale: {
          mode: Phaser.Scale.RESIZE,
          parent: this.containerRef,
          width: '100%',
          height: '100%'
        },
        canvas: this.canvasRef,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 400 },
            debug: true
          }
        },
        backgroundColor: '#88CCF3',
        pixelArt: true,
        scene: [
          BootScene,
          MainScene
        ]
      };

      const game = new Game(config);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const {untilNextStream} = this.state;
    const {days, hours, minutes, seconds} = untilNextStream;

    const counterVisible = (days !== null && hours !== null && minutes !== null && seconds !== null);

    return (
      <main>
        <Head>
          <title>Kirk M. (@saricden) - Game Dev Streamer</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
        </Head>

        

        <div className="canvas-con" ref={this.setContainerRef}>
          <canvas ref={this.setCanvasRef}>Need JS</canvas>
        </div>

        <header>
          <h1>Kirk M. (@saricden) is a game dev streamer on Twitch.tv</h1>
          <p style={{
            visibility: (counterVisible ? 'visible' : 'hidden')
          }}>
            <span>Live in</span>
            <span><strong>{days}</strong>d</span>
            <span><strong>{hours}</strong>h</span>
            <span><strong>{minutes}</strong>m</span>
            <span><strong>{seconds}</strong>s</span>
          </p>
          <a className="btn" href="https://twitch.tv/saricden" target="_blank">
            <i className="fa fa-twitch" />
            Follow on Twitch
          </a>
          <a>Learn More</a>
        </header>

        <section>
          <div className="about">
            <h2>
              Hi, my name is Kirk, and I like to make open source video games and stream about it on Twitch.
            </h2>
            <div className="social-links">
              <a href="https://www.twitch.tv/saricden" target="_blank">
                <i className="fa fa-twitch" />
              </a>
              <a href="https://www.youtube.com/channel/UCKcZ5BgUNa40bEBt08LAfMg" target="_blank">
                <i className="fa fa-youtube-play" />
              </a>
              <a href="https://github.com/saricden" target="_blank">
                <i className="fa fa-github" />
              </a>
              <a href="https://stackoverflow.com/users/1705378/saricden?tab=profile" target="_blank">
                <i className="fa fa-stack-overflow" />
              </a>
              <a href="https://twitter.com/saricden" target="_blank">
                <i className="fa fa-twitter" />
              </a>
              <a href="https://www.instagram.com/saricden" target="_blank">
                <i className="fa fa-instagram" />
              </a>
            </div>
          </div>

          <div className="videoflex">
            <div className="videobox">
              <iframe src="https://www.youtube.com/embed/ePMMP0naNLk" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Home;