let canvas = document.querySelector('canvas');
let width = canvas.width = 700;
let height = canvas.height = 700;
let board = canvas.getContext('2d');
let player1 = 0, player2 = 0;
board.strokeStyle = 'white';
board.fillStyle = 'white';
let gameOver = false;

let paddle1 = {
  x : width - 30,
  y : height / 2 - 100,
  height : 100,
  width : 10,
  speed : 0,
}

let paddle2 = {
  x : 20,
  y : height / 2 - 100,
  height: 100,
  speed: 5,
  width: 10,
}

let ball = {
  x : width / 2,
  y : height / 2,
  radius : 10,
  vx : 5,
  vy : 5,
}

start();

function start() {
  ball.x = width / 2;
  ball.y = height / 2;
  let dir = 1;
  if (Math.random() >= 0.5)
    dir = -1;
  ball.vx = (5 + Math.random() * 5) * dir;
  ball.vy = 0;
  gameOver = false;
  move();
}

function collision(obj) {
    let dx = Math.max(obj.x, Math.min(ball.x, obj.x + obj.width)) - ball.x;
    let dy = Math.max(obj.y, Math.min(ball.y, obj.y + obj.height)) - ball.y;
    if (dx * dx + dy * dy > ball.radius * ball.radius)
      return false;
    let collidePoint = ball.y - (obj.y + obj.height / 2)
    collidePoint = collidePoint / (obj.height / 2);
    const angle = collidePoint * Math.PI / 4;
    dir = 1;
    if (obj.x > ball.x)
      dir *= -1;
    ball.vx = Math.cos(angle) * 10 * dir;
    ball.vy = Math.sin(angle) * 10 * dir;
    return true;
}

function move() {
  update();
	if (ball.radius + ball.x > width) {
    player1++;
    gameOver = true;
    document.querySelector('h3').innerHTML = 'Score ' + player1 + ' - ' + player2;
  }
	if (ball.x - ball.radius < 0) {
    player2++;
    gameOver = true;
    document.querySelector('h3').innerHTML = 'Score ' + player1 + ' - ' + player2;
  }
  if (!collision(paddle1))
    collision(paddle2);
	if (ball.y + ball.radius > height)
		ball.vy = -ball.vy;
	if (ball.y - ball.radius < 0)
		ball.vy = -ball.vy;
	ball.x = ball.x + ball.vx;
	ball.y = ball.y + ball.vy;
  if (paddle1.speed > 0)
    paddle1.y = Math.min(paddle1.y + paddle1.speed, height - paddle1.height);
  else
    paddle1.y = Math.max(paddle1.y + paddle1.speed, 0);
  if (ball.y > paddle2.y + paddle2.height / 2)
    paddle2.y = Math.min(paddle2.y + paddle2.speed, height - paddle2.height);
  else if (ball.y < paddle2.y)
    paddle2.y = Math.max(paddle2.y - paddle2.speed, 0);
  if (!gameOver)
    requestAnimationFrame(move);
}

function update() {
    board.clearRect(0, 0, width, height);
    draw(paddle1);
    draw(paddle2);
    draw(ball);
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
    if (event.key == 'ArrowDown')
      paddle1.speed = 10;
    else if (event.key == 'ArrowUp')
      paddle1.speed = -10;
    if (gameOver)
      start();
}

function stop_moving(event) {
  if (event.key == 'ArrowUp' || event.key == 'ArrowDown')
    paddle1.speed = 0;
}
