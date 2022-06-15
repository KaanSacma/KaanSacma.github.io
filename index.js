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
}

function detectEatingFood() {
    if (foodAlreadySpawned) {
        if ((x  >= randomX && x <= randomX + foodWidth)
            && (y >= randomY && y <= randomY + foodHeight)) {
            randomX = Math.random() * canvas.width / 1.5;
            randomY = Math.random() * canvas.height / 1.5;
            radius += 0.5
            score += 5;
            document.getElementById('score').innerHTML = score;
            document.getElementById('radius').innerHTML = radius;
        }
    }
}

function borderChecker() {
    if (y < radius - (radius / 2)) {
        y = radius - (radius / 2);
    } else if (y > canvas.height - (radius - (radius / 2))) {
        y = canvas.height - (radius - (radius / 2));
    }
    if (x < radius - (radius / 2)) {
        x = radius - (radius / 2);
    } else if (x > canvas.width - (radius - (radius / 2))) {
        x = canvas.width - (radius - (radius / 2));
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
