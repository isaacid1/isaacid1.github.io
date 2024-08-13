var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

// Snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// Food
var foodX;
var foodY;

// Score
var score = 0;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Used for drawing on the board
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); // 100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score += 100; // Update score by 100
        placeFood(); // Reposition the food
        flashBoard(); // Make the board flash
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Display the score
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);

    // Game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            endGame();
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    // Random co-ordinates for food
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function flashBoard() {
    // Flash the board by changing the color temporarily
    context.fillStyle = "yellow";
    context.fillRect(0, 0, board.width, board.height);
    setTimeout(() => {
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);
    }, 100); // Flash for 100 milliseconds
}

function endGame() {
    gameOver = true;
    showModal();
}

function showModal() {
    let modal = document.getElementById('gameOverModal');
    document.getElementById('finalScore').textContent = score;
    modal.style.display = 'flex';

    // Add event listener for any key press to restart the game
    document.addEventListener('keydown', restartGame, { once: true });
}

function restartGame() {
    // Hide the modal
    let modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';
    
    // Reset game variables
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    gameOver = false;

    placeFood();
}
