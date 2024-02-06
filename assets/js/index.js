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

    // use event-delegation to delegate the cell click events to the container
    // grid.addEventListener('click', event => {
    //     if (!board.isGameOver()) {
    //         const row = event.target.dataset.row;
    //         const col = event.target.dataset.col;

    //         if (row && col) {
    //             const guess = board.makeHit(row, col);
    //             if (guess && typeof guess === 'number') {
    //                 // get and add guess value to page
    //                 event.target.innerText = guess;
    //                 event.target.classList.add('hit');
    //                 console.log(event.target.textContent)
    //             } else {
    //                 event.target.classList.add('miss');
    //             }
    //         }
    //     } else {
    //         const h1 = document.getElementsByTagName('h1')[0];
    //         const p = document.createElement('p');
    //         p.innerText = 'YOU WIN!!';
    //         h1.after(p)
    //         setTimeout(() => {
    //             document.body.removeChild(p);
    //         }, 2000)
    //     }
    // })

    grid.addEventListener('click', handleClick)

    document.body.appendChild(grid);

    // click handler
    function handleClick(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;


        if (row && col) {
            const guess = board.makeHit(row, col);
            console.log('GameOVER?', board.isGameOver())
            if (!board.isGameOver()) {
                if (guess && typeof guess === 'number') {
                    // get and add guess value to page
                    event.target.innerText = guess;
                    event.target.classList.add('hit');
                    console.log(event.target.textContent)
                } else {
                    event.target.classList.add('miss');
                }
            } else {
                // display YOU WIN text
                const text = document.createElement('p');
                text.innerText = 'YOU WIN!';

                const h1 = document.getElementsByTagName('h1')[0];
                setTimeout(() => {
                    document.body.removeChild(text);
                }, 3000);
                h1.after(text);

                const cells = document.getElementsByClassName('game-container')[0].childNodes;
                cells.forEach(cell => cell.classList.add('disable'));

                event.currentTarget.classList.add('disable');
                grid.removeEventListener('click', handleClick);
            }
        }
    }
});
