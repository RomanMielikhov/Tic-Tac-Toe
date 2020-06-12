import React from 'react';
import { Cell } from './Cell';

export function Board(props) {
  const renderCell = (index) => {
    let winnerCell =
      props.winner && props.winner.includes(index) ? true : false;
    return (
      <Cell
        onClick={() => props.onClick(index)}
        value={props.squares[index]}
        winnerCell={winnerCell}
      />
    );
  };
  let array = Array(3).fill(null);
  let rows = [];
  array.map((_, index) =>
    rows.push(
      <div className="row" key={index}>
        {array.map((_, idx) => (
          <span key={index * 3 + idx}>{renderCell(index * 3 + idx)}</span>
        ))}
      </div>
    )
  );
  return <React.Fragment>{rows}</React.Fragment>;
}
