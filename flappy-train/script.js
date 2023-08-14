const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const updateCounter = 1; // Start with 1, increment this number every time you update
const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33A1FF"];


let train = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    velocityY: 0,
};

let tunnels = [];
const tunnelWidth = 75;
const tunnelGap = 100;

let smokes = [];

let score = 0;  // New score variable
let isGameOver = false;  // New game over flag

function drawTrain() {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("\uD83D\uDE82", -train.x, train.y);
    ctx.restore();
}

function spawnTunnel() {
    const gapPosition = Math.random() * (canvas.height - tunnelGap);
    const tunnel = {
        x: canvas.width,
        gapPosition: gapPosition,
        scored: false  // Add this line
    };
    tunnels.push(tunnel);
}


function updateTunnels() {
    for (let i = 0; i < tunnels.length; i++) {
        tunnels[i].x -= 2;

        if (tunnels[i].x + tunnelWidth < train.x && !tunnels[i].scored) {
            score++;
            tunnels[i].scored = true;  // Mark this tunnel as scored
        }

        // Remove the tunnel if it's off the screen, and adjust the loop counter
        if (tunnels[i].x < -tunnelWidth) {
            tunnels.splice(i, 1);
            i--;  // Adjust index after removing an item from the array
        }
    }
}




function drawTunnels() {
    ctx.fillStyle = "#8B4513";
    for (let tunnel of tunnels) {
        ctx.fillRect(tunnel.x, 0, tunnelWidth, tunnel.gapPosition);
        ctx.fillRect(tunnel.x, tunnel.gapPosition + tunnelGap, tunnelWidth, canvas.height);
    }
}

function addSmoke() {
    let smoke = {
        x: train.x + 15,  // Add 15 pixels to position to try to align smoke puffs with smokestack
        y: train.y - 40,  // Subtract 40 pixels to position the smoke above the train
        opacity: 1
    };
    smokes.push(smoke);
}

function updateSmokes() {
    for (let i = 0; i < smokes.length; i++) {
        smokes[i].y -= 2;
        smokes[i].opacity -= 0.02;

        if (smokes[i].opacity <= 0 || smokes[i].y < 0) {
            smokes.splice(i, 1);
            i--;
        }
    }
}

function drawSmokes() {
    for (let smoke of smokes) {
        ctx.globalAlpha = smoke.opacity;
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("\u2601", smoke.x, smoke.y);
    }
    ctx.globalAlpha = 1;
}

function checkCollisions() {
    if (train.y < 0 || train.y > canvas.height) {
        isGameOver = true;
    }

    for (let tunnel of tunnels) {
        if (train.x < tunnel.x + tunnelWidth && train.x > tunnel.x &&
            (train.y < tunnel.gapPosition || train.y > tunnel.gapPosition + tunnelGap)) {
            isGameOver = true;
        }
    }

    if (isGameOver) {
        console.log("Game Over!");
        // Additional game over handling can be added here if needed
    }
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 10, 30);
}

canvas.addEventListener("click", function() {
    train.velocityY = -5;
    addSmoke();
});

function gameLoop() {
    if (!isGameOver) {  // Only update and draw if the game isn't over
        updateGame();
        drawGame();
    }
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    train.y += train.velocityY;
    train.velocityY += 0.5;

    if (frameCount % 150 === 0) {
        spawnTunnel();
    }

    updateTunnels();
    updateSmokes();
    checkCollisions();  // Check for collisions
    frameCount++;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTunnels();
    drawTrain();
    drawSmokes();
    drawScore();
}

let frameCount = 0;

gameLoop();

// Color indicator logic
const currentUpdateColor = colors[updateCounter % colors.length];
document.getElementById("colorIndicator").style.backgroundColor = currentUpdateColor;
