import * as React from 'react';
import './Hello.css';

export interface Props {
  name: string;
  level?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Hello({ name, level = 1, onIncrement, onDecrement }: Props) {
  if (level <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Start {name + getExclamationMarks(level)}
      </div>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
