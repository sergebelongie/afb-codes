const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let train = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    velocityY: 0,
};

function drawTrain() {
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("\uD83D\uDE82", train.x, train.y);
}

canvas.addEventListener("click", function() {
    train.velocityY = -5; // This value determines how high the train "puffs" up
});

function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    train.y += train.velocityY;
    train.velocityY += 0.5; // Gravity pulling the train down
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawTrain();
}

gameLoop(); // Start the game loop
