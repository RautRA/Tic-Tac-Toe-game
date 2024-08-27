const GameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(null);
        }
    }

    const getBoard = function() {
        return board;
    };

    const addMarker = function(row, column, marker) {
        board[row][column] = marker;
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

    const switchPlayerTurn = function() {
        currentPlayerTurn = currentPlayerTurn === player1 ? player2 : player1;
    };

    const getCurrentPlayerTurn = function() {
        return currentPlayerTurn;
    };

    const printNewRound = function() {
        console.log(board);
        console.log(`${getCurrentPlayerTurn().name}'s turn.`);
        playRound();
    };

    const playRound = function() {
        const [playerChoiceRow, playerChoiceColumn] = prompt(`It's ${getCurrentPlayerTurn().name}'s turn! Please specify the row & column no. where you'd like to place your marker?`).split(",");
        if (board[playerChoiceRow][playerChoiceColumn] !== null) {
            console.log("Invalid move! That cell is already taken please select an empty cell.");
            printNewRound();
        } else {
            GameBoard.addMarker(playerChoiceRow, playerChoiceColumn, getCurrentPlayerTurn().marker);
            switchPlayerTurn();
            printNewRound();
        }
    };

    printNewRound();

    return {
        playRound
    };
})("player1", "player2", "X", "O");

GameController.playRound();