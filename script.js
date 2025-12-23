const jhumka = document.getElementById("jhumka");
const paddle = document.getElementById("paddle");
const container = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let x = 200;
let y = 100;
let dx = 3;
let dy = 3;
let score = 0;

// Jhumka treated as a CIRCLE
const radius = 22;

// Paddle movement
document.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  paddle.style.left = Math.min(
    container.clientWidth - paddle.offsetWidth,
    Math.max(0, mouseX - paddle.offsetWidth / 2)
  ) + "px";
});

function gameLoop() {
  x += dx;
  y += dy;

  // Wall collision
  if (x <= 0 || x + radius * 2 >= container.clientWidth) dx *= -1;
  if (y <= 0) dy *= -1;

  // Paddle collision (CIRCLE vs RECTANGLE)
  const paddleX = paddle.offsetLeft;
  const paddleY = paddle.offsetTop;
  const paddleWidth = paddle.offsetWidth;
  const paddleHeight = paddle.offsetHeight;

  const closestX = Math.max(paddleX, Math.min(x + radius, paddleX + paddleWidth));
  const closestY = Math.max(paddleY, Math.min(y + radius, paddleY + paddleHeight));

  const distanceX = (x + radius) - closestX;
  const distanceY = (y + radius) - closestY;

  if (distanceX * distanceX + distanceY * distanceY < radius * radius && dy > 0) {
    dy *= -1;
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }

  // Game over
  if (y > container.clientHeight) {
    alert("Game Over! Score: " + score);
    document.location.reload();
  }

  jhumka.style.left = x + "px";
  jhumka.style.top = y + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
