// Winning -board- Combinations
const wCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initial form to start game -- Collect obj data - to reuse throughout
const form = document.getElementById('start-form');

// form - actions - eventlistener
    // obj create/mod -- hide form
form.addEventListener('submit', (e) => {
    // prevent refresh on submit
    e.preventDefault();

    // initialize form data 
    const formData = new FormData(form); // FormData object -( () constructor)- array of arrays-- k/v pairs populate object --- Data manipulation
    const data = Object.fromEntries(formData); // Obj.fromEntries() converts 'FormData' obj into plain obj-- more general use within js
    document.querySelector("#initial-popup").setAttribute("hidden", true);

    initializeGame(data);
});

// Restart btn - reload page
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () => {
    location.reload();
});

const initializeGame = (data) => {
    // initialize game vars
    initializeVars(data);
    // add event listeners - call f()
    addELtoBoard(data)
};

// initialize vars - data == obj -- Add to it, all in one obj that can be called/passed to a f()
const initializeVars = (data) => {
    data.gameFormat = +data.gameFormat; // convert str to int
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.round = 0;
    data.gameOver = false; // return defined in playMove --(when true end)
    data.currentPlayer = data.p1Choice;

    // p2'choice'-- implicit assignment based on p1choice
    let p2Choice = data.p1Choice === 'X' ? 'O' : 'X';
        // define k/v pair within data (obj)
    data.p2Choice = p2Choice;
    console.log(data);
}

// Eventlisteners to each cell -- Linked to playMove (onclick)
const addELtoBoard = (data) => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', (e) => {
            playMove(e.target, data)
        })
    })
}

//  Places currentPLayer into cell (X || O)-- Check game + cell state
    // - Move-actions (cell text and obj property) 
const playMove = (cell, data) => {
    // check if game is over
    if (data.gameOver) {
        return;
    }

    // check if cell has X or O-- when true end (return== do nothing)
    if (data.board[cell.id] === 'X'|| data.board[cell.id] === 'O') {
        return;
    }

    // Player MOVE - X or O insert into cell - adjust DOM
    data.board[cell.id] = data.currentPlayer; // Updates value of obj(data.board) property-- Sets value currentPlayer X||O
    cell.textContent = data.currentPlayer; // Updates cell text content of DOM element(cell) with currentPlayer X||O
    cell.classList.add(data.currentPlayer === 'X' ? 'player1' : 'player2') // classList.add() Adds new class -- Based on if? then '' else '' ---(ternary op)

    // Increase round #
    data.round++;
    console.log(cell, data);

    if (endConditions(data)) {
        return ;
    };

    nextPlayer(data);

}

// Switch currentplayer - based on round++ -- P1 then P2 loop until game endCondition met
const nextPlayer = (data) => {
    data.currentPlayer = data.currentPlayer === 'X' ? 'O' : 'X';
    // DOM update
    const turnDisplay = document.querySelector('.turn');
        // Display turn-- Player # and p_Choice (X||O)
    let currentPlayerName;
    if (data.currentPlayer === data.p1Choice) {
        currentPlayerName = "Player 1";
    } else {
        currentPlayerName = "Player 2";
    }
        //DOM update
    turnDisplay.textContent = `${currentPlayerName} : ${data.currentPlayer} it's your turn!`;

}

// end -- Win-Tie- continue -
const endConditions = (data) => {
    const resultDisplay = document.querySelector('.result');
    if (checkWin(data, data.currentPlayer)) {
        // Update DOM (display) to announce winner
        let currentPlayerName;
        if (data.currentPlayer === data.p1Choice) {
            currentPlayerName = "Player 1";
        } else {
            currentPlayerName = "Player 2";
        }; 
        document.querySelector(".turn").setAttribute("hidden", true);
        resultDisplay.textContent = `${currentPlayerName} : ${data.currentPlayer} is the WINNER!`;
        const cells = document.querySelectorAll('.cell');

        if (checkWin(data, data.currentPlayer)) {
        cells.forEach((cell) => {
            cell.classList.add('disabled');
        });
        };

    } else if (data.round === 9) {
        resultDisplay.textContent = "It's a tie! -- Play again";
        document.querySelector(".turn").setAttribute("hidden", true);
        data.gameOver = true;
        return true;
    };
    return false;
}

// loop through wCombinations to check for win only
const checkWin = (data, player) => {
    let result = false;
    wCombinations.forEach((condition) => {
        if (
            data.board[condition[0]] === player &&
            data.board[condition[1]] === player &&
            data.board[condition[2]] === player
        ) {
            result = true;
        }
    });
    return result;
}
