import React from 'react'
import Cell from './Cell.jsx'

function Board(props) {

  const player = props.xTurn ? 'X' : 'O'

  console.log(props.board)

  return (
    <div>
      <h2>{ props.won ? `${player} Won!` : (props.tie ? `Tie Game!` : `Turn: ${player}`) }</h2>
      <div
        style={{
          textAlign: 'center',
          display: 'inline-block',
          width: '120px',
          margin: '0 auto',
          border: '1px solid teal'
        }}>
        { props.board.map( (row, rowIndex) => {
          return row.map( (value, colIndex) => {
            return <Cell
              tie = {props.tie}
              won = {props.won}
              onClickHandler = {props.onClickHandler}
              row = {rowIndex}
              col = {colIndex}
              value = {value}
            />
          })
        })}
      </div>
    </div>
  );
  }

  export default Board;
