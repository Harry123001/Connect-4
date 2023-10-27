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
//Starts the game here 
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]; //Columns starts at 5

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
     // basically shifts 
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
    for (let x = 0; x < columns; x++) {
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

