import React, { useState, useEffect } from 'react'
import './Minesweeper.css'
import Board from './Board.jsx'

function Minesweeper() {

  const placeMineInRandomEmptyCell = (board) => {
    do {
      var row = Math.floor(Math.random() * board.length)
      var col = Math.floor(Math.random() * board.length)
    } while (board[row][col] != undefined)
    board[row][col] = -1
  }

  const placeMines = (board, mines) => {
    for (let i = 0; i < mines; i++){
      placeMineInRandomEmptyCell(board)
    }
  }

  const countNeighboringMines = (board, row, col) => {
    var count = 0
    // look from one row below to one row above
    for (var compareRow = row - 1; compareRow <= row + 1; compareRow++){
      // look from one column below to one column above
      for (var compareCol = col - 1; compareCol <= col + 1; compareCol++){
        // make sure the cell you are looking for is on the board
        if (compareRow >= 0 && compareRow < board.length &&
            compareCol >= 0 && compareCol < board.length &&
            board[compareRow][compareCol] == -1) // check if the cell is a mine
          count += 1
      }
    }
    return count
  }

  const fillBoard = (board) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board.length; col++) {
        if (board[row][col] == undefined)
          board[row][col] = countNeighboringMines(board, row, col)
      }
    }
  }

  const makeSquareBoard = (size, value) => {
    return Array(size).fill().map(() => new Array(size).fill(value))
  }

  const initializeMines = (size, mines) => {
    // use map to fill each row array with a *unique* column array
    const mineBoard = makeSquareBoard(size)
    placeMines(mineBoard, mines)
    fillBoard(mineBoard)
    return mineBoard
  }

  const initializeGuesses = (size) => {
    return makeSquareBoard(size, 0)
  }

  const guessNeighbors = (newGuess, row, col) => {
    for (var checkRow = row - 1; checkRow <= row + 1; checkRow++){
      for (var checkCol = col - 1; checkCol <= col + 1; checkCol++){
        if (checkRow < 0 || checkRow >= newGuess.length
            || checkCol < 0 || checkCol >= newGuess.length)
            continue

        if (newGuess[checkRow][checkCol] == 0){
          newGuess[checkRow][checkCol] = 1
          if (mines[checkRow][checkCol] == 0) {
            guessNeighbors(newGuess, checkRow, checkCol)
          }
        }
      }
    }
  }

  const gameIsWon = (mines, guesses) => {
    for (let row=0; row < mines.length; row++){
      for (let col=0; col < mines.length; col++){
        // if an unguessed cell is not a mine (-1) you have not won => return early
        if (!guesses[row][col] && mines[row][col] >= 0) return false
      }
    }
    return true
  }

  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)
  const [mines, setMines] = useState([])
  const [guesses, setGuesses] = useState([])
  const [mineNumber, setMineNumber] = useState(0)

  const onClickHandler = (row, col) => {
    if (mines[row][col] == -1) {
      setLost(true)
      setGuesses(makeSquareBoard(mines.length, 1)) // guess all
      return
    }
    const newGuess = guesses.slice()
    if (mines[row][col] == 0) {
      guessNeighbors(newGuess, row, col)
    } else {
      newGuess[row][col] = 1
    }
    setWon(gameIsWon(mines, newGuess)) // check if game is won
    setGuesses(newGuess)
  }

  const onLeftClickHandler = (e, row, col) => {
    e.preventDefault()
    const newGuess = guesses.slice()
    if (guesses[row][col] == 0){
      newGuess[row][col] = 2
      setMineNumber(mineNumber - 1)
    } else if (guesses[row][col] == 2){
      newGuess[row][col] = 0
      setMineNumber(mineNumber + 1)
    }
    setGuesses(newGuess)
  }

  const newGame = (size, num) => {
    setLost(false)
    setWon(false)
    setGuesses(initializeGuesses(size))
    setMines(initializeMines(size, num))
    setMineNumber(num)
  }

  return (
    <div>
      <h1>Minesweeper</h1>
      <button onClick={ () => newGame(8, 10) }> Small </button>
      <button onClick={ () => newGame(10, 15) }> Medium </button>
      <button onClick={ () => newGame(12, 20) }> Large </button>
      <Board
        lost={lost}
        won={won}
        mines={mines}
        guesses={guesses}
        mineNumber={mineNumber}
        onClickHandler={onClickHandler}
        onLeftClickHandler={onLeftClickHandler}
        />
    </div>
    )
}

export default Minesweeper
