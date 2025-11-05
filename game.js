let gameFrame = 0;
let staggerFrames = 20;
let playerState = "run";
let velocityY = 0;
let isJumping = false;
let gameover = false;
let gameStarted = false;
let score = 0;
let playerX = spriteWidth;
let playerY = CANVAS_HEIGHT* (2/3) - PLAYER_H;
let timer1 = null;
let timer2= null;
let minutes = 0;
let seconds = 0;
events.on("coinCollected", (coiny) => {
    score++;
    coiny.x = CANVAS_WIDTH + Math.random() * 1000;
    coiny.y = Math.random() * (CANVAS_HEIGHT*(2/3) - coiny.height);
    /*console.log("Coin collected! Score:", score);*/
});
const obstacle = new Obstacle(
    CANVAS_WIDTH,
    CANVAS_HEIGHT - (CANVAS_HEIGHT / 3) - PLAYER_H + 10,
    "spikes.png",
    gameSpeed,
    CANVAS_WIDTH
);
animationStates.forEach((state) => {
    let frames = { loc: [] };
    for (let j = 0; j < state.frames; j++) {
        frames.loc.push({
            x: (state.startFrame + j) * spriteWidth,
            y: state.row * spriteHeight,
        });
    }
    spriteAnimations[state.name] = frames;
});
function renderGame() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameLayers.forEach(layer => {
        layer.update(gameSpeed);
        layer.draw(ctx);
    });
    obstacle.draw(ctx);
    floor.draw(ctx, CANVAS_HEIGHT);
    coiny.draw(ctx);
    drawPlayer();
}
function applyGravity() {
    velocityY += gravity;
    playerY += velocityY;

    const groundY = CANVAS_HEIGHT*(2/3) - PLAYER_H;
    if (playerY >= groundY) {
        playerY = groundY;
        velocityY = 0;
        if (isJumping) {
            playerState = "landing";
            setTimeout(() => {
                playerState = "run";
                isJumping = false;
            }, 100);
        }
    }
}
function updateGameState() {
    applyGravity();
    gameLayers.forEach(layer => layer.update(gameSpeed));
    obstacle.update();
    coiny.update();
    gameSpeed += 0.0005;
    checkCollision();
}
function drawPlayer() {
    const animation = spriteAnimations[playerState];
    const position = Math.floor(gameFrame / staggerFrames) % animation.loc.length;
    const frameX = animation.loc[position].x;
    const frameY = animation.loc[position].y;

    ctx.drawImage(
        playerImage,
        frameX, frameY,
        spriteWidth, spriteHeight,
        playerX, playerY,
        PLAYER_W, PLAYER_H
    );
}
function checkCollision() {
    if (AABBCollision(
        playerX, playerY, PLAYER_W, PLAYER_H,
        obstacle.x, obstacle.y, obstacle.width, obstacle.height
    )) {
        events.emit("gameOver");
    }
    if (AABBCollision(playerX, playerY, PLAYER_W, PLAYER_H, coiny.x, coiny.y, coiny.width, coiny.height)) {
        events.emit("coinCollected", coiny);
    }
}
events.on("gameOver", () => {
    gameover = true;
    ScoreDisplay.appendChild(document.createTextNode("Final Score: " + score));
    ScoreDisplay.appendChild(document.createElement("br"));
    ScoreDisplay.appendChild(document.createTextNode("Time Survived: " + minutes + ":" + seconds.toString().padStart(2, "0")));
    clearInterval(timer1);
    clearInterval(timer2);
});
function animate() {
    if (!gameStarted) return;
    updateGameState();
    renderGame();
    gameFrame++;
    if (!gameover) requestAnimationFrame(animate);
    else {
        GameOver();
    }
    drawScore(score);
    drawTimer(timer2);
}
function GameOver() {
    GameOverScreen.style.display = "flex";
    canvas.style.display = "none";
}
function drawScore(score) {
  ctx.font = "bold 24px 'Press Start 2P', monospace";
  ctx.fillStyle = "#00FFAA";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.shadowColor = "black"; 
  ctx.shadowBlur = 4;
  ctx.fillText("COINS: " + score, 10, CANVAS_HEIGHT* (2/3) + 40);
  ctx.shadowBlur = 0; 
}

function drawTimer() {
  ctx.font = "bold 24px 'Press Start 2P', monospace";
  ctx.fillStyle = "#00FFAA";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 4;
  const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  ctx.fillText(formatted, 10, CANVAS_HEIGHT* (2/3) +70);
  ctx.shadowBlur = 0;
}
function AABBCollision(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by;
}
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
        velocityY = -10;
        isJumping = true;
        playerState = "jump";
    }
});
function Restart() {
    MainMenu.style.display = "flex";
    GameOverScreen.style.display = "none";
}
document.body.addEventListener("click", (event) => {
    switch (event.target.id) {
        case "start_game":
            StartGame();
            break;
        case "restart_game":
            Restart();
            ResetGame();
            break;
        case "instruction":
            HowToPlay();
            break;
        case "back_to_menu":
            BackToMenu();
            break;
    }
});
function BackToMenu() {
    MainMenu.style.display = "flex";
    HowToPlayScreen.style.display = "none";
}
function HowToPlay() {
    MainMenu.style.display = "none";
    HowToPlayScreen.style.display = "flex";
}
function StartGame() {
    MainMenu.style.display = "none";
            canvas.style.display = "block";
            canvas.style.border = "2px solid black";
            gameStarted = true;
            timer1 = setInterval(function() {
                if(!gameStarted) return;
                gameSpeed += 0.01;
                console.log("Game speed increased to: " + gameSpeed);
            }, secs);
            timer2 = setInterval(function() {
                if(!gameStarted) return;
                seconds++;
                if (seconds >= 60) {
                    minutes++;
                    seconds = 0;
                }
            }, 1000);
            requestAnimationFrame(animate);
}
function ResetGame() {
    gameover = false;
    gameStarted = false;
    isJumping = false;
    velocityY = 0;
    playerState = "run";
    gameFrame = 0;
    gameSpeed= 2;
    score = 0;
    ScoreDisplay.innerHTML = "";
    playerY = CANVAS_HEIGHT*(2/3) - PLAYER_H;
    obstacle.x = CANVAS_WIDTH;
}
