import Head from 'next/head';
import Link from 'next/link';
import {Component} from 'react';

class Home extends Component {

  constructor(props) {
    super(props);

    this.canvasRef = null;
    this.containerRef = null;

    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  setCanvasRef(element) {
    this.canvasRef = element;
  }

  setContainerRef(element) {
    this.containerRef = element;
  }

  async componentDidMount() {
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

  render() {
    return (
      <main>
        <Head>
          <title>Kirk M. (@saricden) - Game Dev Streamer</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
        </Head>

        <nav className="top">
          <Link href="/">
            <a><img src="/me.svg" alt="Kirk M. (@saricden)" /></a>
          </Link>
        </nav>

        <div className="canvas-con" ref={this.setContainerRef}>
          <canvas ref={this.setCanvasRef}>Need JS</canvas>
        </div>

        <header>
          <h1>Kirk M. (@saricden) is a game dev streamer on Twitch.tv</h1>
          <p>
            <span>Live in</span>
            <span><strong>4</strong> days</span>
            <span><strong>3</strong> hours</span>
            <span><strong>34</strong> seconds</span>
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

        <nav className="bottom">
          <Link href="/streams">
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

export default Home;