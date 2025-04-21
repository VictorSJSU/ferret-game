let ferret;
let ferretY = 300;
let velocity = 0;
let gravity = 1;
let jumpForce = -15;

let bg;
let bgX = 0;

let treats = [];
let score = 0;

let ferretImg;
let bgImg;
let music;

function preload() {
  ferretImg = loadImage('ferret.png');
  bgImg = loadImage('background.png');
  soundFormats('mp3');
  music = loadSound('ferretmisu.mp3');
}

function setup() {
  createCanvas(800, 400);
  ferret = createVector(100, ferretY);
  music.setVolume(0.2);
  music.loop();

  setInterval(() => {
    treats.push(new Treat());
  }, 2000);
}

function draw() {
  background(135, 206, 235); // fallback sky-blue

  // scroll background
  image(bgImg, bgX, 0, width, height);
  image(bgImg, bgX + width, 0, width, height);
  bgX -= 2;
  if (bgX <= -width) {
    bgX = 0;
  }

  // gravity
  ferret.y += velocity;
  velocity += gravity;

  // floor
  if (ferret.y > 300) {
    ferret.y = 300;
    velocity = 0;
  }

  image(ferretImg, ferret.x, ferret.y, 100, 60);

  // draw and check treats
  for (let i = treats.length - 1; i >= 0; i--) {
    treats[i].move();
    treats[i].show();

    if (treats[i].hits(ferret)) {
      score++;
      treats.splice(i, 1);
    } else if (treats[i].offscreen()) {
      treats.splice(i, 1);
    }
  }

  fill(255);
  textSize(20);
  text("Score: " + score, 20, 30);
}

function keyPressed() {
  if (key === ' ' && ferret.y === 300) {
    velocity = jumpForce;
  }
}

class Treat {
  constructor() {
    this.x = width;
    this.y = random(250, 300);
    this.r = 20;
  }

  move() {
    this.x -= 4;
  }

  show() {
    fill(255, 200, 0);
    ellipse(this.x, this.y, this.r);
  }

  hits(f) {
    return dist(this.x, this.y, f.x + 50, f.y + 30) < this.r;
  }

  offscreen() {
    return this.x < -this.r;
  }
}