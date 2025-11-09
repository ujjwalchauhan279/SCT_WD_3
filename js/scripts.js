console.log("Tic Tac Toe")
let audioTurn = new Audio("assets/tap.mp3")
let audiogameover = new Audio("assets/gameover.mp3")
let turn = "X"
let gameover = false;

//function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

//function to check for win
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

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText !== "" &&
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameover = true;
            audiogameover.play();

            // highlight winning boxes
            e.forEach(i => {
                document.getElementsByClassName("box")[i].classList.add("winner");
            });
        }
    });
}

//game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (gameover) return;
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            // Color based on player
            if (turn === "X") {
                boxtext.classList.add("x-color");
                boxtext.classList.remove("o-color");
            } else {
                boxtext.classList.add("o-color");
                boxtext.classList.remove("x-color");
            }
            turn = changeTurn();
            audioTurn.currentTime = 0;  // rewind sound to start
            audioTurn.play();
            checkwin();
            if (!gameover) {
                document.getElementsByClassName("info")[0].innerText = turn + "'s turn";
            }
        }
    })
})

//add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    boxtext.forEach(element => element.innerText = "");

    turn = "X";
    gameover = false;
    document.querySelector('.info').innerText = turn + "'s turn";

    // remove highlight from all boxes
    document.querySelectorAll(".box").forEach(b => {
        b.classList.remove("winner");
    });
});
