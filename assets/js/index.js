import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const gameDiv = document.createElement('div');
    gameDiv.setAttribute('class', 'game-container');

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);

            gameDiv.appendChild(cell)
        }
    }
    document.body.appendChild(gameDiv);

    gameDiv.addEventListener('click', event => {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        console.log(row, col)
        if (row && col) {
            const hit = board.makeHit(row, col);
            if (!hit) {
                // event.target.style.background= 'red';
                event.target.classList.add('miss');
                console.log(event.target.classList)
            } else {
                event.target.innerText = hit.toString();
                event.target.classList.add('hit');
            }
        }
    })
})
