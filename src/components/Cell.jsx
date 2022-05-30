import React from 'react'
import './Cell.css'

function Cell(props) {
  const guessed = props.guesses[props.rowIndex][props.colIndex] == 1
  const style = {
      height: props.cellSize,
      width: props.cellSize,
      fontSize: props.cellSize * .7,
      lineHeight: '1.5em',
    }

  if (guessed)
    return (
      <div
        style={style}
        className='cell guessed'>
        { ["💣", props.lost ? "💥" : "🌾",1,2,3,4,5,6,7,8][props.value + 1] }
      </div>
    )
  else if (props.won)
    return (
      <div
        style={style}
        className='cell guessed'>
        { ["🐶","🐸","🐱","🦊","🐵","🐷","🐹","🐼","🐨","🐻"][Math.floor(Math.random() * 10)] }
      </div>
    )
  else if ( props.guesses[props.rowIndex][props.colIndex] == 2 )
    return (
      <div
        style={style}
        className="cell"
        onContextMenu={(e) => props.onLeftClickHandler(e, props.rowIndex, props.colIndex)}>
        🔒
      </div>)
  else
    return(
      <div
        style={style}
        className='cell clickable'
        onClick={() => props.onClickHandler(props.rowIndex, props.colIndex)}
        onContextMenu={(e) => props.onLeftClickHandler(e, props.rowIndex, props.colIndex)}>
      </div>
    )
}

export default Cell
