import {Scene} from 'phaser';

class MainScene extends Scene {
  constructor() {
    super('scene-main');
  }

  create() {
    this.me = this.add.sprite(
      (this.scale.width / 2),
      (this.scale.height),
      'me-desk'
    );
    this.me.anims.play('typing', true);

    this.scale.on('resize', this.resize, this);
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    const {width, height} = gameSize;

    this.cameras.resize(width, height);
    this.me.setPosition(
      (width / 2),
      (height)
    );
  }
}

export default MainScene;