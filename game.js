const canvas = document.querySelector("#game");
canvas.width = 380;
canvas.height = 400;
let gameover = false;
canvas.style.width = canvas.width * 2 + "px";
canvas.style.height = canvas.height * 2 + "px";
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
        velocityY = -10  // ugrás ereje
        isJumping = true;
        playerState = "jump";
    }
});

let velocityY = 0;
let isJumping = false;
let gameSpeed = 2;
const playerImage = new Image();
playerImage.src = "sprite_sheet.png";

const spriteWidth = 21;
const spriteHeight = 35;
const gravity = 0.4;
let gameFrame = 0;
let staggerFrames = 20;
let playerState = "run"; // <-- ide írd, melyik animáció fusson

const spriteAnimations = [];
const animationStates = [
    { name: "run", frames: 8, startFrame: 0, row: 0 },
    { name: "jump", frames: 1, startFrame: 0, row: 1 },
    { name: "landing", frames: 1, startFrame: 1, row: 1 },
];

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
const floor = new Floor(2070, CANVAS_HEIGHT / 3);
const layer1img = new Image();
layer1img.src = "plx-1.png";
const layer2img = new Image();
layer2img.src = "plx-2.png";
const layer3img = new Image();
layer3img.src = "plx-3.png";
const layer4img = new Image();
layer4img.src = "plx-4.png";
const layer5img = new Image();
layer5img.src = "plx-5.png";
const layer1 = new Layer(layer1img, 0.2);
const layer2 = new Layer(layer2img, 0.4);
const layer3 = new Layer(layer3img, 0.6);
const layer4 = new Layer(layer4img, 0.8);
const layer5 = new Layer(layer5img, 1);
const gameLayers = [layer1, layer2, layer3, layer4, layer5];
const floorY = CANVAS_HEIGHT- floor.height;
let playerY = floorY - spriteHeight * 2;
const obstacle = new Obstacle(CANVAS_WIDTH,CANVAS_HEIGHT - floor.height - spriteHeight * 2 + 10 , "spikes.png");
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    velocityY += gravity;
    playerY += velocityY;
    const groundY = CANVAS_HEIGHT - floor.height - spriteHeight * 2;
    if (playerY >= groundY) {
        playerY = groundY;
        velocityY = 0;

        if (isJumping) {
            playerState = "landing";
            setTimeout(() => {
                playerState = "run";
                isJumping = false;
            }, 100); // rövid landing animáció után visszaáll
        }
    }
    gameLayers.forEach((layer) => {
        layer.update();
        layer.draw();
    });
    const animation = spriteAnimations[playerState];
    let position = Math.floor(gameFrame / staggerFrames) % animation.loc.length;
    let frameX = animation.loc[position].x;
    let frameY = animation.loc[position].y;
    obstacle.update();
    obstacle.draw();
    floor.draw();
    ctx.drawImage(
    playerImage,
    frameX, frameY,
    spriteWidth, spriteHeight,
    spriteWidth, playerY,
    spriteWidth*2, spriteHeight*2
);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
