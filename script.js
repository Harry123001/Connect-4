let playerRed = "R";
let playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;

let rows = 6;
let columns = 7;
let currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let x = 0; x < columns; x++) {
            row.push(' ');
            // HTML updates to <div id='0-0' class= 'tile'></div>
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + x.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let i = parseInt(coords[0]);
    let x = parseInt(coords[1]);

    // figure out which row the current column should be on
    i = currColumns[x]; 

    if (i < 0) { 
        return;
    }

    board[i][x] = currPlayer; //update JS board
    let tile = document.getElementById(i.toString() + "-" + x.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    i -= 1; //update the row height for that column
    currColumns[x] = i; //update the array

    checkWinner();
}

function checkWinner() {
    // Used sliding window algo
     // horizontal
       for (let i = 0; i < rows; i++) {
         for (let x = 0; x < columns - 3; x++){
            if (board[i][x] != ' ') {
                if (board[i][x] == board[i][x+1] && board[i][x+1] == board[i][x+2] && board[i][x+2] == board[i][x+3]) {
                    setWinner(i, x);
                    return;
                }
            }
         }
    }

    // vertical
    for (let i = 0; i < columns; i++) {
        for (let i = 0; i < rows - 3; i++) {
            if (board[i][x] != ' ') {
                if (board[i][x] == board[i+1][x] && board[i+1][x] == board[i+2][x] && board[i+2][x] == board[i+3][x]) {
                    setWinner(i, x);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let i = 0; i < rows - 3; i++) {
        for (let x = 0; x < columns - 3; x++) {
            if (board[i][x] != ' ') {
                if (board[i][x] == board[i+1][x+1] && board[i+1][x+1] == board[i+2][x+2] && board[i+2][x+2] == board[i+3][x+3]) {
                    setWinner(i, x);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let i = 3; i < rows; i++) {
        for (let x = 0; x < columns - 3; x++) {
            if (board[i][x] != ' ') {
                if (board[i][x] == board[i-1][x+1] && board[i-1][x+1] == board[i-2][x+2] && board[i-2][x+2] == board[i-3][x+3]) {
                    setWinner(i, x);
                    return;
                }
            }
        }
    }
}

function setWinner(i, x) {
    let winner = document.getElementById("winner");
    if (board[i][x] == playerRed) {
        winner.innerText = "Red Wins the game";             
    } else {
        winner.innerText = "Yellow wins the game";
    }
    gameOver = true;
}


















// const statusDisplay = document.querySelector(".game--status");

// let gameActive = true;
// let currentPlayer = "Red";
// let gameState = ["", "", "", "", "", "", "", "", "",
//                  "", "", "", "", "", "", "", "", "",
//                  "", "", "", "", "", "", "", "", "",
//                  "", "", "", "", "", "", "", "", "",
//                  "", "", "", "", "", ""];

// const winningMessage = () => `Player ${currentPlayer} has won!`;
// const drawMessage = () => "Game ended in a draw";
// const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

// statusDisplay.innerText = currentPlayerTurn();

// const winningConditions = [
//     [ 36,37,38.39], [ 37,38,39,40], [39,40,41,42],
//     [38,39,40,41], [29,30,31,32], [30,31,32,33],
//     [31,32,33,34], [32,33,34,35], [22,23,24,25],
//     [23,24,25,26], [24,25,26,27], [25,26,27,28],
//     [15,16,17,18], [16,17,18,19], [17,18,19,20],
//     [18,19,20,21], [8,9,10,11], [9,10,11,12],
//     [10,11,12,13], [11,12,13,14], [1,2,3,4],
//     [2,3,4,5], [3,4,5,6], [4,5,6,7],
//     [1,8,15,22], [6,13,20,27], [15,22,29,36],
//     [2,9,10,23], [16,23,30,37], [3,10,17,24],
//     [17,24,31,38], [4,11,18,25], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
//     [         ], [         ], [        ],
// ];

// function handleCellPlayed(clickedCell, i) {
//   gameState[i] = currentPlayer;
//   clickedCell.innerText = currentPlayer;
// }

// function handlePlayerChange() {
//   currentPlayer = currentPlayer == "Red" ? "Yellow" : "Red";
//   statusDisplay.innerHTML = currentPlayerTurn();
// }

// function handleResultValidation() {
//   let roundWon = false;

//   for (let i = 0; i < winningConditions.length; i++) {
//     const winningCondition = winningConditions[i];

//     let a = gameState[winningCondition[0]];
//     let b = gameState[winningCondition[1]];
//     let x = gameState[winningCondition[2]];
//     let d = gameState[winningCondition[3]];
    
//     if (a === "" || b === "" || x === "" || d === "") {
//       continue;
//     }

//     if (a === b && b === x && x === d) {
//       roundWon = true;
//       break;
//     }
//   }

//   if (roundWon) {
//     statusDisplay.innerHTML = winningMessage();
//     gameActive = false;
//     return;
//   }

//   let roundDraw = !gameState.includes("");
//   if (roundDraw) {
//     statusDisplay.innerHTML = drawMessage();
//     gameActive = false;
//     return;
//   }

//   handlePlayerChange();
// }

// function handleCellClick(e) {
//   const clickedCell = e.target;
//   const index = parseInt(clickedCell.dataset.index);

//   if (gameState[index] !== "" || !gameActive) {
//     return;
//   }

//   handleCellPlayed(clickedCell, index);
//   handleResultValidation();
// }

// function handleRestartGame() {
//   gameActive = true;
//   currentPlayer = "Red";
//   let gameState = ["", "", "", "", "", "", "", "", "",
//                    "", "", "", "", "", "", "", "", "",
//                    "", "", "", "", "", "", "", "", "",
//                    "", "", "", "", "", "", "", "", "",
//                    "", "", "", "", "", ""];  
//   statusDisplay.innerHTML = currentPlayerTurn();
//   document.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));
// }

// document
//   .querySelectorAll(".cell")
//   .forEach((cell) => cell.addEventListener("click", handleCellClick));

// document
//   .querySelector(".game--restart")
//   .addEventListener("click", handleRestartGame);












