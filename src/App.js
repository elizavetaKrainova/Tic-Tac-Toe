import { useState } from 'react';
import './styles.css';

const row = {
  display: 'flex',
};

export default function App() {
  const [player, setPlayer] = useState(1);
  const [chosenCellsFirstPlayer, setChosenCellsFirstPlayer] = useState([]);
  const [chosenCellsSecondPlayer, setChosenCellsSecondPlayer] = useState([]);

  const handleClick = (index) => {
    if (player === 1) {
      setChosenCellsFirstPlayer([...chosenCellsFirstPlayer, index]);
      setPlayer(2);
    } else {
      setChosenCellsSecondPlayer([...chosenCellsSecondPlayer, index]);
      setPlayer(1);
    }
  };

  const renderCells = Array.from({ length: 9 }).map((_, index) => (
    <button
      className={`MainGrid__Button ${
        chosenCellsFirstPlayer.includes(index)
          ? '--blue'
          : chosenCellsSecondPlayer.includes(index)
          ? '--red'
          : '--white'
      }`}
      onClick={() => handleClick(index)}
      key={index}
    ></button>
  ));

  return (
    <div className='App'>
      <div className='MainGrid'>{renderCells}</div>
    </div>
  );
}
