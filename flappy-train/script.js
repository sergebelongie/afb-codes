const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let train = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    velocityY: 0,
};

let tunnels = [];
const tunnelWidth = 75; // Width of the tunnel
const tunnelGap = 100;  // Gap height where the train will pass through

function drawTrain() {
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("\uD83D\uDE82", train.x, train.y);
}

function spawnTunnel() {
    const gapPosition = Math.random() * (canvas.height - tunnelGap); // Random position for the gap
    const tunnel = {
        x: canvas.width,
        gapPosition: gapPosition
    };
    tunnels.push(tunnel);
}

function updateTunnels() {
    for (let i = 0; i < tunnels.length; i++) {
        tunnels[i].x -= 2; // Move tunnel to the left

        // Remove the tunnel if it's off the screen
        if (tunnels[i].x < -tunnelWidth) {
            tunnels.splice(i, 1);
            i--; // Adjust index after removing an item from the array
        }
    }
}

function drawTunnels() {
    ctx.fillStyle = "#8B4513"; // Brown color for the tunnels
    for (let tunnel of tunnels) {
        // Draw upper part of the tunnel
        ctx.fillRect(tunnel.x, 0, tunnelWidth, tunnel.gapPosition);
        // Draw lower part of the tunnel
        ctx.fillRect(tunnel.x, tunnel.gapPosition + tunnelGap, tunnelWidth, canvas.height);
    }
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

    // Every 150 frames, spawn a new tunnel
    if (frameCount % 150 === 0) {
        spawnTunnel();
    }

    updateTunnels();
    frameCount++;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawTunnels();
    drawTrain();
}

let frameCount = 0; // Add a frameCount variable

gameLoop(); // Start the game loop
