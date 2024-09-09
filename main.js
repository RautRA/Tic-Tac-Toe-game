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


const renderDom = (function() {
    const gameBoard = document.querySelector(".game-board");
    const gameStatus = document.querySelector(".game-status");
    let gameStatusMsg = "";

    const renderGameBoard = function(board, gameStatusMsg) {
        gameBoard.innerHTML = "";
        gameStatus.innerHTML = gameStatusMsg;

        board.forEach((cell, index) => {
            gameBoard.innerHTML += `<div class="cell ${cell === "X" ? "cell-x" : cell === "O" ? "cell-o" : ""}" id=cell-${index}>${cell || ""}</div>`;
        });

        const cells = gameBoard.querySelectorAll(".cell");

        cells.forEach(cell => cell.addEventListener("click", e => {
            GameController.playRound(e.target.id);
        }));
    };

    return {
        renderGameBoard,
        gameStatusMsg,
    }
})();

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
        gameStatusMsg = `${currentPlayerTurn.name}'s turn.`;
        renderDom.renderGameBoard(board, gameStatusMsg);
    };

    const playRound = function(playerChoice) {
        if (gameOver) {
            return;
        }

        playerChoice = playerChoice.charAt(5);

        if (board[playerChoice] !== null) {
            gameStatusMsg = "Invalid move! That cell is already taken please select an empty cell.";
            renderDom.renderGameBoard(board, gameStatusMsg);
            setTimeout(printNewRound, 1000);
        } else {
            GameBoard.addMarker(playerChoice, currentPlayerTurn.marker);
            if (checkWinner(currentPlayerTurn.marker)) {
                gameOver = true;
                gameStatusMsg = `${currentPlayerTurn.name} is the winner. Please refresh the page to play again.`;
                renderDom.renderGameBoard(board, gameStatusMsg);
            } else if (checkTie()) {
                gameOver = true;
                gameStatusMsg = "It's a tie! Please refresh the page to play again.";
                renderDom.renderGameBoard(board, gameStatusMsg);
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
})("Player1", "Player2", "X", "O");