import React, { useState } from "react";
import { Link } from "react-router-dom"

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay, winner, sideLength }) {

  function handleClick(i) {
    if (squares[i] || winner) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    onPlay(nextSquares)
  }
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`

  const squareDoms = squares.map((square, index) => {
    return (<Square value={square} onSquareClick={() => handleClick(index)} key={index} />)
  })
  return (
    <React.Fragment>
      <Link to="/">戻る</Link>
      <div className="status">{status}</div>
      {[...Array(sideLength).keys()].map(row => {
        return (
          <div className="board-row" key={row}>
            {squareDoms.slice(row * sideLength, (row + 1) * sideLength)}
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default function Game() {
  const sideLength = 4
  const [history, setHistory] = useState([Array(sideLength * sideLength).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const winner = calculateWinner(currentSquares)

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }
  const moves = history.map((squares, move) => {
    let description = move > 0 ? `Go to move #${move}` : `Go to game start`
    const gotoButton = (<button onClick={() => jumpTo(move)}>{description}</button>)
    return (
      <li key={move}>
        {move === currentMove ? (<p>{`You are at move #${move}`}</p>) : gotoButton}
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winner={winner} sideLength={sideLength} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
  function calculateWinner(squares) {
    const allLineIndexes = [
      ...[...Array(sideLength).keys()].map(row => {
        return [...Array(sideLength).keys()].map(column => column + row * sideLength)
      }),
      ...[...Array(sideLength).keys()].map(column => {
        return [...Array(sideLength).keys()].map(row => column + row * sideLength)
      }),
      [...Array(sideLength).keys()].map(row => {
        const column = row
        return column + row * sideLength
      }),
      [...Array(sideLength).keys()].map(row => {
        const column = (sideLength - 1) - row
        return column + row * sideLength
      }),
    ]
    const lines = allLineIndexes.map(eachLineIndexes => eachLineIndexes.map(index => squares[index]))
    const completedLine = lines.find(line => {
      return line[0] && line.every(square => square === line[0])
    })
    return completedLine ? completedLine[0] : null
  }
}
