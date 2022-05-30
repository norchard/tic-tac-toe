import React from 'react'
import ReactDOMClient from 'react-dom/client'
import Minesweeper from './components/Minesweeper.jsx'

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Minesweeper/>)
