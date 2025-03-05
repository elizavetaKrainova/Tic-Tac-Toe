import { useState, useMemo } from 'react';
import './styles.css';

const row = {
  display: 'flex',
};

export default function App() {
  const [player, setPlayer] = useState(
    JSON.parse(localStorage.getItem('player')) || 1
  );
  const [chosenCellsFirstPlayer, setChosenCellsFirstPlayer] = useState(
    JSON.parse(localStorage.getItem('chosenCellsFirstPlayer')) || []
  );
  const [chosenCellsSecondPlayer, setChosenCellsSecondPlayer] = useState(
    JSON.parse(localStorage.getItem('chosenCellsSecondPlayer')) || []
  );

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    const isFirstPlayer = player === 1;
    const updatedCells = isFirstPlayer
      ? [...chosenCellsFirstPlayer, index]
      : [...chosenCellsSecondPlayer, index];

    if (isFirstPlayer) {
      setChosenCellsFirstPlayer(updatedCells);
    } else {
      setChosenCellsSecondPlayer(updatedCells);
    }

    const nextPlayer = isFirstPlayer ? 2 : 1;
    setPlayer(nextPlayer);

    localStorage.setItem(
      isFirstPlayer ? 'chosenCellsFirstPlayer' : 'chosenCellsSecondPlayer',
      JSON.stringify(updatedCells)
    );
    localStorage.setItem('player', JSON.stringify(nextPlayer));
  };

  const restartGame = () => {
    setChosenCellsFirstPlayer([]);
    setChosenCellsSecondPlayer([]);
    localStorage.clear();
  };

  const isRestartDisabled = useMemo(() => {
    return (
      chosenCellsFirstPlayer.length === 0 &&
      chosenCellsSecondPlayer.length === 0
    );
  }, [chosenCellsFirstPlayer, chosenCellsSecondPlayer]);

  const winner = useMemo(() => {
    const firstPlayerWins = !!winningCombinations.some((combination) =>
      combination.every((cell) => chosenCellsFirstPlayer.includes(cell))
    );

    const secondPlayerWins = !!winningCombinations.some((combination) =>
      combination.every((cell) => chosenCellsSecondPlayer.includes(cell))
    );

    return firstPlayerWins
      ? 'First Player'
      : secondPlayerWins
      ? 'Second Player'
      : '';
  }, [chosenCellsFirstPlayer, chosenCellsSecondPlayer]);

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
      <div className='GameElements'>
        <div className='MainGrid'>{renderCells}</div>
        <button onClick={() => restartGame()} disabled={isRestartDisabled}>
          Restart
        </button>
        {winner}
      </div>
    </div>
  );
}
