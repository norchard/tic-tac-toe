import React, { useState, useEffect } from 'react'
import './Board.css'
import Cell from './Cell.jsx'

function Board(props) {
  const [cellSize, setCellSize] = useState(28)
  let style = {}

  if (props.mines.length > 0){
    style = {
      height: (cellSize + 2) * props.mines.length,
      width: (cellSize + 2) * props.mines.length,
      border: 'solid 1px teal',
      margin: '40px auto'
    }
  }

  let alert = ''
  if (props.mines.length === 0) alert = 'Pick a size'
  else if (props.won) alert = 'You won!'
  else if (props.lost) alert = 'You lost!'
  else alert = 'Mines: ' + props.mineNumber

  return (
    <div>
      <h3>{ alert }</h3>
      <div
        style={style}>
        { props.mines.map( (row, rowIndex) =>
            row.map( (value, colIndex) =>
              <Cell
                cellSize={cellSize}
                lost={props.lost}
                won={props.won}
                rowIndex={rowIndex}
                colIndex={colIndex}
                key={[rowIndex, colIndex]}
                guesses={props.guesses}
                value={ value }
                onClickHandler={props.onClickHandler}
                onLeftClickHandler={props.onLeftClickHandler}
              />
            )
        )}
      </div>
    </div>
  )

}

export default Board
