let boxes = document.querySelectorAll(".gameBox");
let winMessage = document.querySelector(".win-message");
let msg = document.querySelector(".message");
let btn = document.querySelector(".new-game-btn");
let resetbtn = document.querySelector(".reset-game-btn");
let gameBoard = document.querySelector(".game-board");
let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((gameBox, index) => {
    gameBox.addEventListener("click", () => {
        if (turnO) {
            gameBox.innerText = "O";
            turnO = false;
        } else {
            gameBox.innerText = "X";
            turnO = true;
        }
        gameBox.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    disableBoxes();
    msg.innerText = "Game Draw!";
    gameBoard.classList.add("hide");
    winMessage.classList.remove("hide");
};

const disableBoxes = () => {
    boxes.forEach((gameBox) => {
        gameBox.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((gameBox) => {
        gameBox.disabled = false;
        gameBox.innerText = "";
    });
};

const resetEverything = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    winMessage.classList.add("hide");
    gameBoard.classList.remove("hide");
};

const showWinner = (winnerName) => {
    disableBoxes();
    winMessage.classList.remove("hide");
    gameBoard.classList.add("hide");
    msg.innerText = `Congratulations! The winner is ${winnerName}`;
};

const checkWinner = () => {
    for (let p of winPatterns) {
        let p1value = boxes[p[0]].innerText;
        let p2value = boxes[p[1]].innerText;
        let p3value = boxes[p[2]].innerText;

        if (p1value !== '' && p1value === p2value && p2value === p3value) {
            showWinner(p1value);
            return true;
        }
    }
    return false;
};

btn.addEventListener("click", resetEverything);
resetbtn.addEventListener("click", resetEverything);