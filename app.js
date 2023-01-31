// Initial form to start game -- Collect obj data - to reuse throughout
const form = document.getElementById('start-form');

// form - actions - eventlistener
form.addEventListener('submit', (e) => {
    // prevent refresh on submit
    e.preventDefault();
    // initialize form data
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData);
    document.querySelector("#initial-popup").setAttribute("hidden", true);
    // initializeGame(data);
    console.log(dataObj);
});

// Restart btn - reload page
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () => {
    location.reload();
});

// initialize vars - data == obj -- Add to it, all in one obj that can be called/passed to a f()
// const initializeGame = (data) => {
//     data.
// }