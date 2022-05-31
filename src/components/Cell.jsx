import React from 'react'

function Cell(props) {
  const style = {
    height: '38px',
    width: '38px',
    backgroundColor: 'lightblue',
    border: '1px solid black',
    float: 'left',
    fontFamily: 'Helvetica',
    fontWeight: '600',
    fontSize: '28px',
    lineHeight: '40px'
  }

  if (props.value)
    return (
      <div
      style={style}>
        {props.value}
      </div>
    )
  else if (props.won)
    return (
      <div
      style={style}>
      </div>
    )
  else
    return (
      <div
      style={style}
      onClick={() => props.onClickHandler(props.row, props.col)}>
      </div>
    )
}

export default Cell;
