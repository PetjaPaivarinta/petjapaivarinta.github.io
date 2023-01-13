let particles = [];
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Particle {
  constructor(position, radius, color, direction, speed) {
    this.position = position;
    this.color = color;
    this.radius = radius;
    this.direction = direction;
    this.currentRadius = 0;
    this.speed = speed;
  }
}
const canvas = document.getElementById("graphics");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
function canvasMainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((el) => {
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.arc(el.position.x, el.position.y, el.currentRadius, 0, 2 * Math.PI);
    ctx.fill();
    el.position.x += el.direction.x * el.speed;
    el.position.y += el.direction.y * el.speed;
    if (el.currentRadius < el.radius) el.currentRadius += 0.01;
    if (
      el.position.x + el.radius < 0 ||
      el.position.x + el.radius > canvas.width ||
      el.position.y + el.radius < 0 ||
      el.position.y + el.radius > canvas.height
    ) {
      particles = particles.filter((item) => item !== el);
      genRandomParticle(
        getRandomInt(0, canvas.width),
        getRandomInt(0, canvas.height)
      );
    }
  });
}
function canvasInit() {
  for (let i = 0; i < 128; i++) {
    genRandomParticle(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height)
    );
  }
  setInterval(canvasMainLoop, 1);
}
canvasInit();
function genRandomParticle(x, y) {
  let dir = new Vector2(getRandomInt(-1, 1), getRandomInt(-1, 1));
  if (dir.x == 0) dir.x = 1;
  if (dir.y == 0) dir.y == 1;
  addParticle(x, y, getRandomInt(1, 2), dir, null);
}
function addParticle(x, y, r, dir, color) {
  let position = new Vector2(x, y);
  particles.push(
    new Particle(position, r, color, dir, getRandomInt(1, 2) / 35.0)
  );
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
