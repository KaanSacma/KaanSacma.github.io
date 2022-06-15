document.getElementById('score').innerHTML = 0;
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let score = 0;

let x = 100;
let y = 100;
let radius = 10;
let speed = 10;

let xE1 = canvas.width / 2;
let yE1 = canvas.height / 2;
let radiusE1 = 25;
let speedE1 = 15;

let canMoveUpE1 = true;
let canMoveDownE1 = false;

document.getElementById('radius').innerHTML = radius;

let leftPressed = false;
let upPressed = false;
let rightPressed = false;
let downPressed = false;

const background = new Image();
background.src = "img/background.jpg";

const food = new Image();
let foodWidth = 80;
let foodHeight = 80;
food.src = "img/food.png";

let randomX = 0;
let randomY = 0;

let foodAlreadySpawned = false

function gameLoop() {
    requestAnimationFrame(gameLoop);
    drawBackground();
    spawnFood();
    detectMoveInput();
    borderChecker();
    detectEatingFood();
    drawBlob();
    moveEnnemy1();
    isEnnemyCollidePlayer();
    drawEnnemy1();
}

function detectEatingFood() {
    if (foodAlreadySpawned) {
        if ((x >= randomX && x <= randomX + foodWidth)
            && (y >= randomY && y <= randomY + foodHeight)) {
            randomX = Math.random() * canvas.width / 1.5;
            randomY = Math.random() * canvas.height / 1.5;
            radius += 0.5;
            score += 5;
            document.getElementById('score').innerHTML = score;
            document.getElementById('radius').innerHTML = radius;
        }
    }
}

function borderChecker() {
    if (y < radius) {
        y = radius;
    } else if (y > canvas.height - radius) {
        y = canvas.height - radius;
    }
    if (x < radius) {
        x = radius;
    } else if (x > canvas.width - radius) {
        x = canvas.width - radius;
    }
}

function spawnFood() {
    if (foodAlreadySpawned == false) {
        randomX = Math.random() * canvas.width / 1.5;
        randomY = Math.random() * canvas.height / 1.5;
        foodAlreadySpawned = true;
    }
    ctx.drawImage(food, randomX, randomY, foodWidth, foodHeight);    
}

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function isEnnemyCollidePlayer() {
    if ((x >= xE1 && x <= xE1 + radiusE1 / 2)
        && (y >= yE1 && y <= yE1 + radiusE1 / 2)) {
            radius -= 5;
            document.getElementById('radius').innerHTML = radius;
        }
}

function moveEnnemy1() {
    if (yE1 > 0 && canMoveUpE1 == true && canMoveDownE1 == false) {
        yE1 -= speedE1;
        if (yE1 <= 0) {
            canMoveUpE1 = false;
            canMoveDownE1 = true;
        }
    }
    if (yE1 < canvas.height && canMoveDownE1 == true && canMoveUpE1 == false) {
        yE1 += speedE1;
        if (yE1 >= canvas.height) {
            canMoveDownE1 = false;
            canMoveUpE1 = true;
        }
    }
}

function drawEnnemy1() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(xE1, yE1, radiusE1, 0, Math.PI * 2);
    ctx.fill();
}

function drawBlob() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

function detectMoveInput() {
    if (downPressed) {
        y += speed;
    } else if (leftPressed) {
        x -= speed;
    } else if (upPressed) {
        y -= speed;
    } else if (rightPressed) {
        x += speed;
    }
}

function keyDown(event) {
    if (event.code == 'ArrowDown') {
        downPressed = true;
    } else if (event.code == 'ArrowLeft') {
        leftPressed = true;
    } else if (event.code == 'ArrowUp') {
        upPressed = true;
    } else if (event.code == 'ArrowRight') {
        rightPressed = true;
    }
}

function keyUp(event) {
    if (event.code == 'ArrowDown') {
        downPressed = false;
    } else if (event.code == 'ArrowLeft') {
        leftPressed = false;
    } else if (event.code == 'ArrowUp') {
        upPressed = false;
    } else if (event.code == 'ArrowRight') {
        rightPressed = false;
    }
}

gameLoop();
