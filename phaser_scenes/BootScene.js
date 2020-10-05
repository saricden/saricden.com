import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super('scene-boot');
  }

  preload() {
    this.load.atlas('me-desk', '/me-desk-blue.png', '/me-desk-blue.json');
  }

  create() {
    
    this.anims.create({
      key: 'typing',
      frames: this.anims.generateFrameNames('me-desk', {prefix: 'frame_', start: 1, end: 3, zeroPad: 5, suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    });

    this.scene.start('scene-main');
  }
}

export default BootScene;