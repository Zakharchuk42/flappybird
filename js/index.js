let cvs = document.querySelector("#canvas");
let gmOvr = document.querySelector("#gameover");
let scoreCanva = document.querySelector("#score");
let ctx = cvs.getContext("2d");
let gameOverImg = gmOvr.getContext("2d");
let scoreEnd = scoreCanva.getContext("2d");
// Объявляем переменные нашим объектам
let bird = new Image();
let fon = new Image();
let fon2 = new Image();
let bg = new Image();
let pipeUp = new Image();
let pipeDown = new Image();
let gameOv = new Image();

// Загружаем картинки
bird.src = "img/flappy_bird_bird.png";
fon.src = "img/flappy_bird_bg.png";
fon2.src = "img/flappy_bird_bg2.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeDown.src = "img/flappy_bird_pipeBottom.png";
bg.src = "img/flappy_bird_fg.png";
gameOv.src = "img/game_over.png";

// Создаём препятствие
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0,
};
// Фон
let back = [
    {
        x: 0,
        y: 0,
    },
    {
        x: cvs.width,
        y: 0,
    },
];

let score = 0;
// Позиция птички
let xPos = 50;
let yPos = 150;
gravity = 2;
// Расстояние между трубами
let gap = 100;

// Взлёт птички на пробел
document.addEventListener("keydown", moveUp);

function moveUp(e) {
    if (e.code == "Space") {
        yPos -= 60;
    }
}

function draw() {
    let gameOver = requestAnimationFrame(draw);

    for (let i = 0; i < back.length; i++) {
        // Фон
        ctx.drawImage(fon, back[i].x, back[i].y);
        ctx.drawImage(fon2, back[i].x, back[i].y + back.height);

        back[i].x -= 0.5;
        if (back[i].x == 150) {
            back.push({
                x: cvs.width,
                y: 0,
            });
        }
    }

    // Птичка
    ctx.drawImage(bird, xPos, yPos);
    yPos += gravity;
    // Двигаем препятствие
    for (let i = 0; i < pipe.length; i++) {
        // Трубы
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x -= 3;
        if (pipe[i].x == 150) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            });
        }
        // Земля
        ctx.drawImage(bg, 0, 0 + cvs.height - bg.height);
        // Game Over
        if (
            (xPos + bird.width >= pipe[i].x &&
                xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height ||
                    yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
            yPos + bird.height == cvs.height - bg.height ||
            yPos <= 5
        ) {
            cancelAnimationFrame(gameOver);
            gameOverImg.drawImage(gameOv, 0, 0);
            scoreEnd.fillStyle = "orange";
            scoreEnd.font = "48px Verdana";
            scoreEnd.fillText(`${score}`, 260, 290);
            document.addEventListener("keydown", resetGame);
            function resetGame(e) {
                if (e.code == "Enter") {
                    location.reload();
                }
            }
        }

        if (pipe[i].x == 0) {
            score += 1;
        }
    }

    ctx.fillStyle = "#000";
    ctx.font = "28px Verdana";
    ctx.fillText(`Score: ${score}`, 25, 470);
}

pipeDown.onload = draw;
