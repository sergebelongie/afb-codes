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

let smokes = [];

function drawTrain() {
    ctx.save(); // Save the current state
    ctx.scale(-1, 1); // Flip the x-axis
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("\uD83D\uDE82", -train.x, train.y); // Notice the negative value for x
    ctx.restore(); // Restore the original state
}

function spawnTunnel() {
    const gapPosition = Math.random() * (canvas.height - tunnelGap);
    const tunnel = {
        x: canvas.width,
        gapPosition: gapPosition
    };
    tunnels.push(tunnel);
}

function updateTunnels() {
    for (let i = 0; i < tunnels.length; i++) {
        tunnels[i].x -= 2;

        if (tunnels[i].x < -tunnelWidth) {
            tunnels.splice(i, 1);
            i--;
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
        x: train.x,
        y: train.y,
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

canvas.addEventListener("click", function() {
    train.velocityY = -5;
    addSmoke();
});

function gameLoop() {
    updateGame();
    drawGame();
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
    frameCount++;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTunnels();
    drawTrain();
    drawSmokes();
}

let frameCount = 0;

gameLoop();
