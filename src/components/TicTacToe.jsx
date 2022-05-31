import React, { useState } from 'react'
import Board from './Board.jsx'
import './TicTacToe.css'

function TicTacToe() {
  const initializeBoard = () => new Array(3).fill().map(row => new Array(3).fill(0))

  const [board, setBoard] = useState(initializeBoard())
  const [xTurn, setXTurn] = useState(true)
  const [won, setWon] = useState(false)
  const [tie, setTie] = useState(false)

  const checkForWin = (board) => {
    console.log('hello')
    if ((board[0][0] && board[0][0] === board[0][1] && board[0][0] === board[0][2]) ||
      (board[1][0] && board[1][0] === board[1][1] && board[1][0] === board[1][2]) ||
      (board[2][0] && board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
      (board[0][0] && board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
      (board[0][1] && board[0][1] === board[1][1] && board[0][1] === board[2][1]) ||
      (board[0][2] && board[0][2] === board[1][2] && board[0][2] === board[2][2]) ||
      (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
      (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0])) {
        return true
      }
    return false
    }

  const checkForTie = (board) => {
    if (board.flat().filter(x => x == 0).length)
      return false
    return true
  }

  const onClickHandler = (row, col) => {
    const newBoard = board.slice()
      if (xTurn){
        newBoard[row][col] = 'X'
      }
      else {
        newBoard[row][col] = 'O'
      }
      setBoard(newBoard)
      const gameWon = checkForWin(newBoard)
      const gameTie = checkForTie(newBoard)
      if (gameWon)
        setWon(gameWon)
      else if (gameTie)
        setTie(gameTie)
      else
        setXTurn(!xTurn)
  }

  const newGame = () => {
    setBoard(initializeBoard())
    setXTurn(true)
    setWon(false)
    setTie(false)
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <button
        onClick={ newGame }>New Game</button>
      <Board
        tie = { tie }
        won = { won }
        xTurn = { xTurn }
        board = { board }
        onClickHandler = { onClickHandler } />
    </div>
  );
}

export default TicTacToe;
