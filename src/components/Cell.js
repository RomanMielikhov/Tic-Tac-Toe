import React from 'react';

export const Cell = (props) => {
  return (
    <button
      className={props.winnerCell ? 'active cell' : 'cell'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
