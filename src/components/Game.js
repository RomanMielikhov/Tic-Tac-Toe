import React, { useState } from 'react';
import { Board } from './Board';

export function Game() {
  const [log, setLog] = useState([
    { squares: Array(9).fill(null), location: [0, 0] },
  ]);
  const [isX, setIsX] = useState(true);
  const [step, setStep] = useState(0);
  const [sortToggle, setSortToggle] = useState(true);

  const handleClick = (index) => {
    const history = log.slice(0, step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (win(squares) || squares[index]) {
      return;
    }
    squares[index] = isX ? 'X' : 'O';
    setLog(
      history.concat({
        squares: squares,
        location: [Math.floor((index % 3) + 1), Math.floor(index / 3 + 1)],
      })
    );
    setStep(history.length);
    setIsX(!isX);
  };

  const jumpTo = (step) => {
    setStep(step);
    setIsX(step % 2 === 0);
  };

  const history = log.slice(0, step + 1);
  const current = history[history.length - 1];
  const winner = win(current.squares);
  const moves = history.map((st, move) => {
    const desc = move
      ? `Go to move # ${move}   |  x:${st.location[0]},y:${st.location[1]}`
      : 'Go to game start';
    return (
      <li key={move}>
        <button
          className={step === move ? 'active log-buttons' : 'log-buttons'}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (step >= 9) {
    status = 'The draw';
  } else if (winner) {
    status = 'Winner: ' + winner.winner;
  } else {
    status = 'Next player: ' + (isX ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="game-conteiner">
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            winner={winner && winner.winnerLine}
          />
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{sortToggle ? moves : moves.reverse()}</ol>
        <button
          className="log-buttons sort"
          onClick={() => setSortToggle(!sortToggle)}
        >
          Sort log
        </button>
      </div>
    </div>
  );
}

function win(squares) {
  const combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < combination.length; i++) {
    const [a, b, c] = combination[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerLine: combination[i] };
    }
  }
  return null;
}
