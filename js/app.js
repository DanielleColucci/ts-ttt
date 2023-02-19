"use strict";
// constants
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// state variables
let turn, winner, tie, board;
// cached element references 
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const buttonEl = document.getElementById('reset-button');
const boardEl = document.querySelector('.board');
// event handlers
boardEl.addEventListener('click', handleClick);
// functions 
init();
function init() {
    board = new Array(9).fill(0);
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach((sq, idx) => {
        if (sq === 1)
            squareEls[idx].textContent = 'X';
        else if (sq === -1)
            squareEls[idx].textContent = 'O';
        else
            squareEls[idx].textContent = '';
    });
}
function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `player ${turn === 1 ? '1' : '2'}'s turn`;
    }
    else if (!winner && tie) {
        messageEl.textContent = "it's a tie!";
    }
    else {
        messageEl.textContent = `player ${turn === 1 ? '1' : '2'} wins!`;
    }
}
function handleClick(evt) {
    if (!(evt.target instanceof HTMLElement))
        return;
    const sqIdx = parseInt(evt.target.id[2]);
    if (isNaN(sqIdx) || board[sqIdx] || winner)
        return;
    evt.target.classList.add(`${turn === 1 ? 'player1' : 'player2'}`);
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function placePiece(idx) {
    board[idx] = turn;
}
function checkForTie() {
    tie = board.every(sq => {
        return sq;
    });
}
function checkForWinner() {
    winningCombos.forEach(combo => {
        let sum = combo.reduce((acc, sq) => {
            return acc + board[sq];
        }, 0);
        if (Math.abs(sum) === 3) {
            winner = true;
        }
    });
}
function switchPlayerTurn() {
    if (!winner) {
        turn *= -1;
    }
}
