let snake;
let resolution = 20;
let food;
let w;
let h;
let points = 0;

function preload() {
    gameFont = loadFont('flappy.ttf');
    gameMusic = loadSound('gameMusic.wav');
    gameOver = loadSound('gameOver.wav');
    eatFood = loadSound('eatFood.wav');
}

function setup() {
    createCanvas(400, 400);
    gameMusic.loop();
    // Floor gives the variable an integer.
    w = floor(width / resolution);
    h = floor(height / resolution);
    frameRate(5);
    snake = new Snake();
    foodLocation();
}

function foodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW || keyCode == 65) {
        snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW || keyCode == 68) {
        snake.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW || keyCode == 83) {
        snake.setDir(0, 1);
    } else if (keyCode === UP_ARROW || keyCode == 87) {
        snake.setDir(0, -1);
    }
}

function draw() {
    scale(resolution);
    background(220);

    if (snake.eat(food)) {
        eatFood.play();
        foodLocation();
        points++;
    }
    snake.update();
    snake.show();

    textSize(0.8);
    textFont(gameFont);
    text("Score: " + points, 0.25, 1);

    if (snake.endGame()) {
        gameOver.play();
        gameMusic.stop();
        points = 0;
        background(255, 0, 0);
        fill(0);
        textSize(2);
        textAlign(CENTER);
        textFont(gameFont);
        text("GAME OVER :(", 10, 10);
        noLoop();
    }

    noStroke();
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);
}
