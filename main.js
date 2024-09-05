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

    const switchPlayerTurn = function() {
        currentPlayerTurn = currentPlayerTurn === player1 ? player2 : player1;
    };

    const printNewRound = function() {
        console.log(board);
        console.log(`${currentPlayerTurn.name}'s turn.`);
        playRound();
    };

    const playRound = function() {
        const playerChoice = prompt(`It's ${currentPlayerTurn.name}'s turn! Please choose the position where you'd like to place your marker?`);
        if (board[playerChoice] !== null) {
            console.log("Invalid move! That cell is already taken please select an empty cell.");
            printNewRound();
        } else {
            GameBoard.addMarker(playerChoice, currentPlayerTurn.marker);
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