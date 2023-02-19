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
]

// state variables
let turn: number, winner: boolean, tie: boolean, board: number[]

// cached element references 
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const buttonEl = document.getElementById('reset-button')

// functions 

init()

function init(): void {
  board = new Array(9).fill(0)
  turn = 1
  winner = false
  tie = false
  updateBoard()
}

function updateBoard(): void {
  board.forEach((sq, idx) => {
    if (sq === 1) squareEls[idx].textContent = 'X'
    else if (sq === -1) squareEls[idx].textContent = 'O'
    else squareEls[idx].textContent = ''
  })
}