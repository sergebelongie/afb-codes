const tunnels = [];
const tunnelWidth = 75; // Width of the tunnel
const tunnelGap = 100;  // Gap height where the train will pass through

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
    ctx.font = "75px Arial";
    ctx.textAlign = "center";
    for (let tunnel of tunnels) {
        // Draw upper part of the tunnel
        ctx.fillText("\uD83D\uDE87", tunnel.x, tunnel.gapPosition / 2);
        // Draw lower part of the tunnel
        ctx.fillText("\uD83D\uDE87", tunnel.x, tunnel.gapPosition + tunnelGap + (canvas.height - tunnel.gapPosition - tunnelGap) / 2);
    }
}

// Modify the updateGame function to spawn tunnels periodically and update their positions
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

// Modify the drawGame function to draw the tunnels
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawTunnels();
    drawTrain();
}

// Add a frameCount variable to keep track of the number of frames
let frameCount = 0;
