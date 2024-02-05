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
    console.log(gameDiv)
    document.body.appendChild(gameDiv);

    gameDiv.addEventListener('click', gameDivClick)

    function gameDivClick(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        if (!board.isGameOver()) {
            if (row && col) {
                const hit = board.makeHit(row, col);
                if (!hit) {
                    event.target.classList.add('miss');
                } else {
                    event.target.innerText = hit;
                    event.target.classList.add('hit');
                }
            }
        } else {
            const h1 = document.getElementsByTagName('h1')[0];
            const winText = document.createElement('p');
            winText.setAttribute('id', 'winText');
            winText.innerText = 'YOU WIN!';

            h1.after(winText);
            setTimeout(() => {
                document.body.removeChild(winText);

                // setTimeout()
                createButton(h1);
            }, 3000, h1)
            gameDiv.removeEventListener('click', gameDivClick)
        }
    }

    function createButton(h1) {
        const button = document.createElement('button');
        button.innerText = 'Reset Game';

        h1.after(button)

        button.addEventListener('click', event => {
            event.preventDefault();

            // board.populateGrid();
            board = new Board();

            resetBoard(board);
        })
    }
})

function resetBoard() {
    const gameDiv = document.getElementById('game-container')
    // for (let row = 0; row < 9; row++) {
    //     for (let col = 0; col < 9; col++) {

    //     }
    // }
    for (const child of gameDiv.children) {
        child.innerText = '';
        child.classList.remove('miss', 'hit');
    }
}
