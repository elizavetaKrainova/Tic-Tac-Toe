import { useState, useMemo } from 'react';
import { getFromLocalStorage, setToLocalStorage } from './mixin';
import './styles.css';

export default function App() {
  // STATE
  const [player, setPlayer] = useState(getFromLocalStorage('player') || 1);
  const [chosenCellsFirstPlayer, setChosenCellsFirstPlayer] = useState(
    getFromLocalStorage('chosenCellsFirstPlayer') || []
  );
  const [chosenCellsSecondPlayer, setChosenCellsSecondPlayer] = useState(
    getFromLocalStorage('chosenCellsSecondPlayer') || []
  );

  // STATIC DATA
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

  // GAME ACTIONS
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

    setToLocalStorage(
      isFirstPlayer ? 'chosenCellsFirstPlayer' : 'chosenCellsSecondPlayer',
      updatedCells
    );
    setToLocalStorage('player', nextPlayer);
  };

  const restartGame = () => {
    setChosenCellsFirstPlayer([]);
    setChosenCellsSecondPlayer([]);
    localStorage.clear();
  };

  const moveToPreviousStep = () => {
    const isPlayerTwo = player === 2;

    const setChosenCells = isPlayerTwo
      ? setChosenCellsFirstPlayer
      : setChosenCellsSecondPlayer;
    const nextPlayer = isPlayerTwo ? 1 : 2;

    setChosenCells((prev) => {
      const updatedCells = [...prev];
      updatedCells.pop();
      setToLocalStorage(
        isPlayerTwo ? 'chosenCellsFirstPlayer' : 'chosenCellsSecondPlayer',
        updatedCells
      );
      return updatedCells;
    });

    setPlayer(nextPlayer);
    setToLocalStorage('player', nextPlayer);
  };

  // RECALCULATED VALUES
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
      ? 'First Player won!'
      : secondPlayerWins
      ? 'Second Player won!'
      : '';
  }, [chosenCellsFirstPlayer, chosenCellsSecondPlayer]);

  const amountOfSteps =
    chosenCellsFirstPlayer.length + chosenCellsSecondPlayer.length;

  // INTERFACE ELEMENTS
  const cells = Array.from({ length: 9 }).map((_, index) => (
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
    >
      <span className='material-icons'>
        {chosenCellsFirstPlayer.includes(index)
          ? 'close'
          : chosenCellsSecondPlayer.includes(index)
          ? 'radio_button_unchecked'
          : ''}
      </span>
    </button>
  ));

  const gameSteps = Array.from({
    length: amountOfSteps,
  }).map((_, index) => (
    <button
      className='GameSteps__Button'
      disabled={amountOfSteps - index > 1}
      onClick={() => moveToPreviousStep()}
      key={index}
    >
      {index}
    </button>
  ));

  return (
    <div className='App'>
      <div className='GameElements'>
        <div className='MainGrid'>{cells}</div>

        <button
          className='RestartButton'
          onClick={() => restartGame()}
          disabled={isRestartDisabled}
        >
          Restart
        </button>

        <span className='Winner'>{winner}</span>

        <div className='GameSteps'>{gameSteps}</div>
      </div>
    </div>
  );
}
