import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
window.addEventListener('DOMContentLoaded', () => {
    const BOARDSIZE = board.grid.length;

    const grid = document.createElement('div');
    grid.setAttribute('class', 'game-container');
    for (let row = 0; row < BOARDSIZE; row++) {
        for (let col = 0; col < BOARDSIZE; col++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);

            grid.appendChild(cell)
        }
    }

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset Game';
    const h1 = document.getElementsByTagName('h1')[0];
    h1.after(resetButton)

    // use event-delegation to delegate the cell click events to the container
    grid.addEventListener('click', handleClick);

    document.body.appendChild(grid);

    // button click handler
    resetButton.addEventListener('click', event => {
        event.preventDefault();

        board = new Board();
        const cells = document.getElementsByClassName('game-container')[0].childNodes;
        cells.forEach(cell => {
            cell.innerText = '';
            if (cell.classList.contains('miss')) cell.classList.remove('miss');
            if (cell.classList.contains('hit')) cell.classList.remove('hit');
            if (cell.classList.contains('disable')) cell.classList.remove('disable');
        });
        if (grid.classList.contains('disable')) grid.classList.remove('disable');

        const text = document.getElementsByTagName('p')[0];
        if (text) document.body.removeChild(text);

        grid.addEventListener('click', handleClick);
    })
    // click handler
    function handleClick(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (row && col) {
            const guess = board.makeHit(row, col);
            if (!board.isGameOver()) {
                if (guess && typeof guess === 'number') {
                    // get and add guess value to page
                    event.target.innerText = guess;
                    event.target.classList.add('hit');
                } else {
                    event.target.classList.add('miss');
                }
            } else {
                // display YOU WIN text
                const text = document.createElement('p');
                text.innerText = 'YOU WIN!';

                resetButton.after(text);

                const cells = document.getElementsByClassName('game-container')[0].childNodes;
                cells.forEach(cell => cell.classList.add('disable'));

                event.currentTarget.classList.add('disable');
                grid.removeEventListener('click', handleClick);
            }
        }
    }
});
