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
  speed : 10,
}

let rect2 = {
  x : 20,
  y : innerHeight / 2 - 100,
  height: 100,
  speed: 10,
  width: 10,
}

let circ = {
  x : innerWidth / 2,
  y : innerHeight / 2,
  radius : 10,
  vx : 5,
  vy : 5,
}

function update() {
    board.clearRect(0, 0, innerWidth, innerHeight);
    draw(react1);
    draw(react2);
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
