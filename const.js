const canvas = document.querySelector("#game");
const StartButton = document.querySelector("#start_game");
const InstructionButton = document.querySelector("#instruction");
const RestartButton = document.querySelector("#restart_game");
const GameOverScreen = document.querySelector("#game_over");
const ScoreDisplay = document.querySelector("#final_score");
const MainMenu = document.querySelector("#main_menu");
const HowToPlayScreen = document.querySelector("#how_to_play");
canvas.width = 650;
canvas.height = 400;
canvas.style.width = canvas.width * 2 + "px";
canvas.style.height = canvas.height * 2 + "px";
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const spriteWidth = 21;
const spriteHeight = 35;
const PLAYER_W = spriteWidth * 2;
const PLAYER_H = spriteHeight * 2;
const gravity = 0.3;
const secs = 100 * 60;
let gameSpeed = 2;

const playerImage = new Image();
playerImage.src = "sprite_sheet.png";

const animationStates = [
    { name: "run", frames: 8, startFrame: 0, row: 0 },
    { name: "jump", frames: 1, startFrame: 0, row: 1 },
    { name: "landing", frames: 1, startFrame: 1, row: 1 },
];

const spriteAnimations = {};

const floor = new Floor(2070, CANVAS_HEIGHT / 3);

const layer1img = new Image(); layer1img.src = "plx-1.png";
const layer2img = new Image(); layer2img.src = "plx-2.png";
const layer3img = new Image(); layer3img.src = "plx-3.png";
const layer4img = new Image(); layer4img.src = "plx-4.png";
const layer5img = new Image(); layer5img.src = "plx-5.png";

const layer1 = new Layer(layer1img, 0.2,CANVAS_WIDTH, CANVAS_HEIGHT, 0.2);
const layer2 = new Layer(layer2img, 0.4, CANVAS_WIDTH, CANVAS_HEIGHT, 0.4);
const layer3 = new Layer(layer3img, 0.6, CANVAS_WIDTH, CANVAS_HEIGHT, 0.6);
const layer4 = new Layer(layer4img, 0.8, CANVAS_WIDTH, CANVAS_HEIGHT, 0.8);
const layer5 = new Layer(layer5img, 1.0, CANVAS_WIDTH, CANVAS_HEIGHT, 1.0);

const gameLayers = [layer1, layer2, layer3, layer4, layer5];
const coin = new Image();
coin.src = "coin2.png";
const coiny = new Coin(0, 0, coin, gameSpeed, CANVAS_WIDTH);
const events = {
    listeners: {},
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    },
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
};
