// BG Console
var site_console = document.getElementById("console");
function log(m) {
  site_console.innerHTML += "<br />"+m;
}

// Phaser Scene
var jelly = kaboom = kirk = null;

var getRandomSafePosition = function() {
  var xpos = ypos = 0;
  var headerBox = document.querySelector("header.primary").getBoundingClientRect();
  
  var regenCount = 0;
  
  do {
    xpos = Math.random() * window.innerWidth;
    ypos = Math.random() * window.innerHeight;
    regenCount++;
  }
  while (
    (xpos - (jelly.width / 2)) < (kirk.x + kirk.width) &&
    (ypos + (jelly.height / 2)) > (kirk.y - kirk.height)
    ||
    ((xpos - (jelly.width / 2)) < headerBox.right) &&
    ((ypos - (jelly.height / 2)) < headerBox.bottom)
  );
  
  if (regenCount > 1)
    log("Generated jelly position (" + xpos.toFixed(0) + ", " + ypos.toFixed(0) + ") in "+ regenCount+ " tries.");
  else
    log("Generated jelly position ("+ xpos.toFixed(0) + ", " + ypos.toFixed(0) + ") in "+ regenCount+ " try.");
  
  return [xpos, ypos];
};

var hideKaboom = function() {
  kaboom.setVisible(false);
  log("Hide kaboom.");
};

var showJelly = function() {
  jelly.setVisible(true);
  log("Show jelly.");
};

var hideJelly = function() {
  jelly.setVisible(false);
  log("Hide jelly.");
};

var revealJelly = function() {
  var randomPosition = getRandomSafePosition();
  var xpos = randomPosition[0];
  var ypos = randomPosition[1];

  jelly.setPosition(xpos, ypos);
  kaboom.setPosition(xpos, ypos);
  kaboom.setVisible(true);

  kaboom.anims.play('kaboom');
  log("Play kaboom.");
  
  this.time.addEvent({
    delay: 300,
    callback: showJelly,
    callbackScope: this
  });
};

var explodeJelly = function() {
  kaboom.setVisible(true);
  kaboom.anims.play('kaboom');
  log("Explode jelly.");
  this.time.addEvent({
    delay: 400,
    callback: hideJelly,
    callbackScope: this
  });
};

var moveJelly = function() {
  this.time.addEvent({
    delay: 0,
    callback: explodeJelly,
    callbackScope: this
  });

  this.time.addEvent({
    delay: 2000,
    callback: revealJelly,
    callbackScope: this
  });
}

var preload = function() {
  this.load.spritesheet('jelly', '/src/img/sprites/Jellyfish.png', {
    frameWidth: 250, frameHeight: 250
  });
  this.load.spritesheet('kaboom', '/src/img/sprites/KaBoom.png', {
    frameWidth: 250, frameHeight: 250
  });
  this.load.spritesheet('kirk', '/src/img/sprites/Kirk.png', {
    frameWidth: 250, frameHeight: 250
  });

  document.querySelector("canvas.primary").style.display = "block";

  var currentFile = "";

  this.load.on('progress', function (value) {
    log("Preloading " + (value*100).toFixed(2) + "% complete...");
  });
              
  this.load.on('fileprogress', function (file) {
    log("Preloading file: " + file.src + "...");
  });
  
  this.load.on('complete', function () {
    log('Preloading complete.');
  });

};

var create = function() {

  log("Create scene.");
  
  // Add sprites
  kirk = this.add.sprite(10, window.innerHeight-10, 'kirk');
  kirk.setOrigin(0, 1);
  kirk.setScale(0.75);

  var xpos = kirk.x + kirk.width + 20;
  var ypos = kirk.y - (kirk.height / 2);

  jelly = this.physics.add.sprite(xpos, ypos, 'jelly');
  jelly.body.setAllowGravity(false);
  jelly.setScale(0.25);

  kaboom = this.add.sprite(xpos, ypos, 'kaboom');
  kaboom.setScale(0.75);
  kaboom.setVisible(false);
  kaboom.on('animationcomplete', hideKaboom, this);

  
  // Create animations
  this.anims.create({
    key: 'jiggle',
    frames: this.anims.generateFrameNumbers('jelly', { start: 0, end: 2 }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: 'kaboom',
    frames: this.anims.generateFrameNumbers('kaboom', { start: 0, end: 7 }),
    frameRate: 9,
    repeat: 0
  });

  this.anims.create({
    key: 'kirk-typing',
    frames: this.anims.generateFrameNumbers('kirk', { start: 0, end: 2}),
    frameRate: 6,
    repeat: -1
  });
  
  // Fiddle about
  jelly.anims.play('jiggle');
  kirk.anims.play('kirk-typing');

  this.time.addEvent({
    delay: 6000,
    callback: moveJelly,
    callbackScope: this,
    repeat: -1
  });
};

var update = function() {

};

var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  backgroundColor: '#FEF24E',
  canvas: document.querySelector("canvas.primary")
});