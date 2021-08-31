let canvas = document.querySelector('canvas');
let width = canvas.width = innerWidth;
let height = canvas.height = innerHeight;

let board = canvas.getContext('2d');
board.fillStyle = 'white';
board.strokeStyle = 'white';

let rect1 = {
  x : innerWidth - 30,
  y : innerHeight / 2 - 100,
  height : 100,
  width : 10,
  speed : 0,
}

let rect2 = {
  x : 20,
  y : innerHeight / 2 - 100,
  height: 100,
  speed: 5,
  width: 10,
}

let circ = {
  x : innerWidth / 2,
  y : innerHeight / 2,
  radius : 10,
  vx : 5,
  vy : 5,
}

move();

function move() {
  requestAnimationFrame(move);
  update();
	if (circ.radius + circ.x > innerWidth)
		circ.vx = 0 - circ.vx;
	if (circ.x - circ.radius < 0)
		circ.vx = 0 - circ.vx;
	if (circ.y + circ.radius > innerHeight)
		circ.vy = 0 - circ.vy;
	if (circ.y - circ.radius < 0)
		circ.vy = 0 - circ.vy;
	circ.x = circ.x + circ.vx;
	circ.y = circ.y + circ.vy;
  if (rect1.speed > 0)
    rect1.y = Math.min(rect1.y + rect1.speed, innerHeight - rect1.height);
  else
    rect1.y = Math.max(rect1.y + rect1.speed, 0);
  if (circ.y > rect2.y)
    rect2.y = Math.min(rect2.y + rect2.speed, innerHeight - rect2.height);
  else
    rect2.y = Math.max(rect2.y - rect2.speed, 0);
}

function update() {
    board.clearRect(0, 0, innerWidth, innerHeight);
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
    if (event.key == 'ArrowDown')
      rect1.speed = 10;
    else if (event.key == 'ArrowUp')
      rect1.speed = -10;
}

function stop_moving(event) {
  if (event.key == 'ArrowUp' || event.key == 'ArrowDown')
    rect1.speed = 0;
}
