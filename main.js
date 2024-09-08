const GameBoard = (function() {
    const board = [];

    for(let i = 0; i < 9; i++) {
        board.push(null);
    }

    const getBoard = function() {
        return board;
    };

    const addMarker = function(pos, marker) {
        board[pos] = marker;
        return board;
    }

    return {
        getBoard,
        addMarker
    };
})();

const Player = function(name, marker) {
    return {
        name,
        marker
    }
};

const GameController = (function (playerOneName, playerTwoName, playerOneMarker, playerTwoMarker) {
    const player1 = Player(playerOneName, playerOneMarker);
    const player2 = Player(playerTwoName, playerTwoMarker);
    const board = GameBoard.getBoard();
    let currentPlayerTurn = player1;
    let gameOver = false;

    const switchPlayerTurn = function() {
        currentPlayerTurn = currentPlayerTurn === player1 ? player2 : player1;
    };

    const checkWinner = function(currentPlayerMarker) {
        if (board[0] === currentPlayerMarker && board[0] === board[1] && board[1] === board[2]) {
            return true;
        } else if (board[3] === currentPlayerMarker && board[3] === board[4] && board[4] === board[5]) {
            return true;
        } else if (board[6] === currentPlayerMarker && board[6] === board[7] && board[7] === board[8]) {
            return true;
        } else if (board[0] === currentPlayerMarker && board[0] === board[3] && board[3] === board[6]) {
            return true;
        } else if (board[1] === currentPlayerMarker && board[1] === board[4] && board[4] === board[7]) {
            return true;
        } else if (board[2] === currentPlayerMarker && board[2] === board[5] && board[5] === board[8]) {
            return true;
        } else if (board[0] === currentPlayerMarker && board[0] === board[4] && board[4] === board[8]) {
            return true;
        } else if (board[2] === currentPlayerMarker && board[2] === board[4] && board[4] === board[6]) {
            return true;
        } else {
            return false;
        }
    };

    const checkTie = function() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                return false;
            } else {
                if (i === 8) {
                    return true;
                }
            }
        }
    };

    const printNewRound = function() {
        console.log(board);
        console.log(`${currentPlayerTurn.name}'s turn.`);
        playRound();
    };

    const playRound = function() {
        if (gameOver) {
            return;
        }
        const playerChoice = prompt(`It's ${currentPlayerTurn.name}'s turn! Please choose the position where you'd like to place your marker?`);
        if (board[playerChoice] !== null) {
            console.log("Invalid move! That cell is already taken please select an empty cell.");
            printNewRound();
        } else {
            GameBoard.addMarker(playerChoice, currentPlayerTurn.marker);
            if (checkWinner(currentPlayerTurn.marker)) {
                gameOver = true;
                console.log(`${currentPlayerTurn.name} is the winner`);
            } else if (checkTie()) {
                gameOver = true;
                console.log("It's a tie!");
            } else {
                switchPlayerTurn();
                printNewRound();
            }
        }
    };

    printNewRound();

    return {
        playRound
    };
})("player1", "player2", "X", "O");

GameController.playRound();