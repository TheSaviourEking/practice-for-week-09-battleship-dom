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

    // use eventd-delegation to delegate the cell click events to the container
    grid.addEventListener('click', event => {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (row && col) {
            const guess = board.makeHit(row, col);
            if (guess && typeof guess === 'number') {
                // get and add guess value to page
                event.target.innerText = guess;
                event.target.classList.add('hit');
                console.log(event.target.textContent)
            } else {
                event.target.classList.add('miss');
            }
        }

        // console.log(row, col)
        // const hit = board.makeHit(row, col);
    })

    document.body.appendChild(grid);
});

// function 
