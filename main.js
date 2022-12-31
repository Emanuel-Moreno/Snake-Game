const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;

let headSnake = new Image();
headSnake.src = "images/head3.png";

let gridSize = 20;

let canvasSize = { x: 20, y: 20 };

canvas.width = canvasSize.x * gridSize;
canvas.height = canvasSize.y * gridSize;

let currentDirection = "right";

let snake = [{ x: 2, y: 2 }];

let xFood = Math.floor(Math.random() * canvasSize.x);
let yFood = Math.floor(Math.random() * canvasSize.y);

let food = {
  x: xFood,
  y: yFood,
};

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function drawSnake() {
  ctx.drawImage(
    headSnake,
    snake[0].x * gridSize,
    snake[0].y * gridSize,
    30,
    30
  );

  for (let i = 1; i < snake.length; i++) {
    ctx.beginPath();
    ctx.arc(
      snake[i].x * gridSize + 30 / 2,
      snake[i].y * gridSize + 30 / 2,
      gridSize / 2,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "#249b04";
    ctx.fill();
  }
}

function drawFood() {
  let apple = new Image();
  apple.src = "images/apple.png";
  ctx.drawImage(apple, food.x * gridSize, food.y * gridSize, 25, 25);
}

function moveSnake() {
  let newHead;
  if (currentDirection === "right") {
    newHead = { x: snake[0].x + 1, y: snake[0].y };
  } else if (currentDirection === "left") {
    newHead = { x: snake[0].x - 1, y: snake[0].y };
  } else if (currentDirection === "up") {
    newHead = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (currentDirection === "down") {
    newHead = { x: snake[0].x, y: snake[0].y + 1 };
  }

  snake.unshift(newHead);

  if (newHead.x !== food.x || newHead.y !== food.y) {
    snake.pop();
  } else {
    food = generateFood();
    eat();
  }
  gameOver();
}

function background() {
  let background = new Image();
  background.src = "images/background.jpg";
  ctx.drawImage(background, 0, 0, 400, 400);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  background();
  drawSnake();
  drawFood();
}

function main() {
  gameInterval = setInterval(function () {
    moveSnake();
    draw();
  }, 100);
}

main();

document.addEventListener("keydown", function (event) {
  if (event.key === 'ArrowLeft' && currentDirection !== "right") {
   
    currentDirection = "left";
    headSnake.src = "images/head4.png";
  } else if (event.key === 'ArrowUp' && currentDirection !== "down") {
    currentDirection = "up";
    headSnake.src = "images/head2.png";
  } else if (event.key === 'ArrowRight' && currentDirection !== "left") {
    currentDirection = "right";
    headSnake.src = "images/head3.png";
  } else if (event.key === 'ArrowDown' && currentDirection !== "up") {
    currentDirection = "down";
    headSnake.src = "images/head1.png";
  }
});

function gameOver() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvasSize.x ||
    snake[0].y < 0 ||
    snake[0].y >= canvasSize.y
  ) {
    alert("☠️ Game over!");
    clearInterval(gameInterval);
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      console.log("Game over!");
      alert("☠️ Game over!");
      clearInterval(gameInterval);
    }
  }
}
function generateFood() {
  let newFood = {
    x: Math.floor(Math.random() * canvasSize.x),
    y: Math.floor(Math.random() * canvasSize.y),
  };

  for (let i = 0; i < snake.length; i++) {
    if (newFood.x === snake[i].x && newFood.y === snake[i].y) {
      return generateFood();
    }
  }

  return newFood;
}

function eat() {
  score += 10;

  let number = document.querySelector(".number");
  number.textContent = `${score}`;
}

function resetGame() {
  clearInterval(gameInterval);
  headSnake.src = "images/head3.png";

  snake = [{ x: 2, y: 2 }];
  currentDirection = "right";
  food = generateFood();
  score = 0;
  let number = document.querySelector(".number");
  number.textContent = `${score}`;

  gameInterval = setInterval(function () {
    moveSnake();
    draw();
  }, 100);
}

document.querySelector(".reset").addEventListener("click", resetGame);

function buttonLeft() {
  if (currentDirection !== "right") {
    currentDirection = "left";
    headSnake.src = "images/head4.png";
  }
}
function buttonRight() {
  if (currentDirection !== "left") {
    currentDirection = "right";
    headSnake.src = "images/head3.png";
  }
}
function buttonUp() {
  if (currentDirection !== "down") {
    currentDirection = "up";
    headSnake.src = "images/head2.png";
  }
}
function buttonDown() {
  if (currentDirection !== "up") {
    currentDirection = "down";
    headSnake.src = "images/head1.png";
  }
}

document.querySelector(".btnLeft").addEventListener("click", buttonLeft);
document.querySelector(".btnRight").addEventListener("click", buttonRight);
document.querySelector(".btnUp").addEventListener("click", buttonUp);
document.querySelector(".btnDown").addEventListener("click", buttonDown);
