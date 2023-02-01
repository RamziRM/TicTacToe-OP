// Initial form to start game -- Collect obj data - to reuse throughout
const form = document.getElementById('start-form');

// form - actions - eventlistener
form.addEventListener('submit', (e) => {
    // prevent refresh on submit
    e.preventDefault();

    // initialize form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector("#initial-popup").setAttribute("hidden", true);

    initializeGame(data);
});

// Restart btn - reload page
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () => {
    location.reload();
});

// initialize vars - data == obj -- Add to it, all in one obj that can be called/passed to a f()
const initializeVars = (data) => {
    data.gameFormat = +data.gameFormat; // convert str to int
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.round = 0;
    data.gameOver = false;
    data.currentPlayer = data.p1Choice;

}

const initializeGame = (data) => {
    // initialize game vars
    initializeVars(data);
    // add event listeners - call f()
    addELtoBoard(data)
};

// Eventlisteners to each cell -- Linked to playMove (onclick)
const addELtoBoard = (data) => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', (e) => {
            playMove(e.target, data)
        })
    })
}

//  Places userchoice into cell (X || O)- Move -- Check game + cell state
const playMove = (cell, data) => {
    // check if game is over
    if (data.gameOver) {
        return;
    }

    // check if cell has X or O
    if (data.board[cell.id] === 'X'|| data.board[cell.id] === 'O') {
        return;
    }

    // Player MOVE - X or O insert into cell - adjust DOM
    data.board[cell.id] = data.currentPlayer;
    cell.textContent = data.currentPlayer;


    console.log(cell, data);
}