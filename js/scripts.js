console.log("Tic Tac Toe");

let audioTurn = new Audio("assets/tap.mp3");
let audiogameover = new Audio("assets/gameover.mp3");
let turn = "X";
let gameover = false;
let mode = "friend"; // default mode

// Change Turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Computer Move (Random)
function computerMove() {
    if (gameover) return;

    let boxtext = document.querySelectorAll(".boxtext");
    let emptyBoxes = [];

    boxtext.forEach((b, index) => {
        if (b.innerText === "") emptyBoxes.push(index);
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxtext[randomIndex].innerText = "O";
    boxtext[randomIndex].classList.add("o-color");
    boxtext[randomIndex].classList.remove("x-color");

    let compSound = audioTurn.cloneNode();
    compSound.play();

    checkwin();
    if (!gameover) {
        turn = "X";
        document.querySelector('.info').innerText = turn + "'s Turn";
    }
}

// Win Check
const checkwin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Win Check
    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText !== "" &&
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameover = true;
            document.querySelector('.imgbox img').style.width = "150px";
            audiogameover.play();

            e.forEach(i => {
                document.getElementsByClassName("box")[i].classList.add("winner");
            });
        }
    });

    //  Tie Condition
    if (!gameover) {
        let filledCells = 0;
        for (let i = 0; i < boxtext.length; i++) {
            if (boxtext[i].innerText !== "") filledCells++;
        }

        if (filledCells === 9) {
            document.querySelector('.info').innerText = "It's a Tie!";
            audiogameover.play();
            gameover = true;
        }
    }
};


// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');

    element.addEventListener('click', () => {
        if (gameover || boxtext.innerText !== '') return;

        // Always print the current turn symbol
        boxtext.innerText = turn;

        if (turn === "X") {
            boxtext.classList.add("x-color");
            boxtext.classList.remove("o-color");
        } else {
            boxtext.classList.add("o-color");
            boxtext.classList.remove("x-color");
        }

        audioTurn.currentTime = 0;
        audioTurn.play();

        checkwin();

        if (!gameover) {
            if (mode === "friend") {
                // Normal turn switching
                turn = changeTurn();
                document.querySelector('.info').innerText = turn + "'s Turn";
            }
            else if (mode === "computer") {
                // Player always X, Computer always O
                turn = "O";
                document.querySelector('.info').innerText = "Computer's Turn...";
                setTimeout(computerMove, 300);
            }
        }
    });
});

// Reset Game
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    boxtext.forEach(element => {
        element.innerText = "";
        element.classList.remove("x-color", "o-color");
    });

    turn = "X";
    gameover = false;
    document.querySelector('.info').innerText = turn + "'s Turn";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    document.querySelectorAll(".box").forEach(b => {
        b.classList.remove("winner");
    });
});

// Mode Buttons
const friendBtn = document.getElementById("friendMode");
const computerBtn = document.getElementById("computerMode");

function updateModeUI() {
    friendBtn.classList.remove("active");
    computerBtn.classList.remove("active");

    if (mode === "friend") {
        friendBtn.classList.add("active");
    } else {
        computerBtn.classList.add("active");
    }
}

friendBtn.addEventListener("click", () => {
    mode = "friend";
    reset.click();
    updateModeUI();
});

computerBtn.addEventListener("click", () => {
    mode = "computer";
    reset.click();
    updateModeUI();
});

// set default
updateModeUI();

