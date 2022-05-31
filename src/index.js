import React from 'react'
import ReactDOMClient from 'react-dom/client'
import TicTacToe from './components/TicTacToe.jsx'

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<TicTacToe/>)
