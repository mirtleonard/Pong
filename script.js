let canvas = document.querySelector('canvas');
let width = canvas.width = 700;
let height = canvas.height = 700;
let board = canvas.getContext('2d');
let player1 = 0, player2 = 0;
board.strokeStyle = 'white';
board.fillStyle = 'white';
let gameOver = false;

let rect1 = {
  x : width - 30,
  y : height / 2 - 100,
  height : 100,
  width : 10,
  speed : 0,
}

let rect2 = {
  x : 20,
  y : height / 2 - 100,
  height: 100,
  speed: 5,
  width: 10,
}

let circ = {
  x : width / 2,
  y : height / 2,
  radius : 10,
  vx : 5,
  vy : 5,
}

start();

function start() {
  circ.x = width / 2;
  circ.y = height / 2;
  let dir = 1;
  if (Math.random() >= 0.5)
    dir = -1;
  circ.vx = (5 + Math.random() * 5) * dir;
  circ.vy = 0;
  gameOver = false;
  move();
}

function collision(obj) {
    let dx = Math.max(obj.x, Math.min(circ.x, obj.x + obj.width)) - circ.x;
    let dy = Math.max(obj.y, Math.min(circ.y, obj.y + obj.height)) - circ.y;
    if (dx * dx + dy * dy > circ.radius * circ.radius)
      return false;
    let collidePoint = circ.y - (obj.y + obj.height / 2)
    collidePoint = collidePoint / (obj.height / 2);
    const angle = collidePoint * Math.PI / 4;
    dir = 1;
    if (obj.x > circ.x)
      dir *= -1;
    circ.vx = Math.cos(angle) * 10 * dir;
    circ.vy = Math.sin(angle) * 10 * dir;
}

function move() {
  update();
	if (circ.radius + circ.x > width) {
    player1++;
    gameOver = true;
    document.querySelector('h3').innerHTML = 'Score ' + player1 + ' - ' + player2;
  }
	if (circ.x - circ.radius < 0) {
    player2++;
    gameOver = true;
    document.querySelector('h3').innerHTML = 'Score ' + player1 + ' - ' + player2;
  }
  if (!collision(rect1))
    collision(rect2);
	if (circ.y + circ.radius > height)
		circ.vy = -circ.vy;
	if (circ.y - circ.radius < 0)
		circ.vy = -circ.vy;
	circ.x = circ.x + circ.vx;
	circ.y = circ.y + circ.vy;
  if (rect1.speed > 0)
    rect1.y = Math.min(rect1.y + rect1.speed, height - rect1.height);
  else
    rect1.y = Math.max(rect1.y + rect1.speed, 0);
  if (circ.y > rect2.y + rect2.height / 2)
    rect2.y = Math.min(rect2.y + rect2.speed, height - rect2.height);
  else if (circ.y < rect2.y)
    rect2.y = Math.max(rect2.y - rect2.speed, 0);
  if (!gameOver)
    requestAnimationFrame(move);
}

function update() {
    board.clearRect(0, 0, width, height);
    draw(rect1);
    draw(rect2);
    draw(circ);
}

function draw(coord) {
    board.beginPath();
    if (coord.radius)
      board.arc(coord.x, coord.y, coord.radius, 0, Math.PI * 2);
    else
      board.rect(coord.x, coord.y, coord.width, coord.height);
    board.stroke();
    board.fill();
    board.closePath();
}

document.addEventListener('keydown', start_moving);
document.addEventListener('keyup', stop_moving);

function start_moving(event) {
    if (gameOver) {
      start();
    }
    if (event.key == 'ArrowDown')
      rect1.speed = 10;
    else if (event.key == 'ArrowUp')
      rect1.speed = -10;
}

function stop_moving(event) {
  if (event.key == 'ArrowUp' || event.key == 'ArrowDown')
    rect1.speed = 0;
}
