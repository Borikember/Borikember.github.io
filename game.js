const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const playerImage = new Image();
playerImage.src = "sprite_sheet.png";
const spriteWidth = 21;
const spriteHeight = 35;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let staggerFrames = 20;
const spriteAnimations = [];
const animationStates = [
    { name: "run", frames: 8 },
    { name: "jump", frames: 2 },
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    };
    for (let j = 0; j < state.frames; j++) {
        frames.loc.push({ x: j * spriteWidth, y: index * spriteHeight });
    }
    spriteAnimations[state.name] = frames;
});
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations["jump"].loc.length;
    frameX = position * spriteWidth;
    ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
