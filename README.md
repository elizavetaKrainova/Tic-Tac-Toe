# Tic Tac Toe with History & State Management

This project is a fully interactive **Tic Tac Toe** game built with **React**. It allows players to play the classic game with an intuitive user interface, while also offering unique features such as game history navigation, pause and resume functionality, and state management through **localStorage**.

## Features:
- **Game History Navigation**: Players can move backward and forward through the game’s history of moves.
- **State Management**: The game uses **localStorage** to persist the game state (such as player moves and whose turn it is), allowing players to resume the game after a page reload.
- **Dynamic Player Turns**: Alternates between two players with automatic turn switching.
- **Game Status**: Displays the status of the game, including who the winner is, or if the game is still ongoing.
- **Restart Game**: Includes a restart button to reset the game once completed.
- **Responsive UI**: Designed for an engaging and intuitive experience.

## Key Concepts:
- **State Management**: The game minimizes complexity by **deriving** most states based on the current player’s moves instead of manually managing every game state. It uses **`useState`** for storing moves, and **`useMemo`** to calculate derived values such as the winner and the restart button state.
  
- **Game History**: The game supports a feature to go back in time to previous steps, allowing players to revisit the moves they made. The history is managed by maintaining the list of moves for each player.

- **Persistence**: The use of **localStorage** ensures that the game state is saved and can be resumed at any time, even if the browser is closed and reopened.

## Features in Action:
1. **Player Turns**: Players take turns marking the grid with their symbol (X or O). The board updates accordingly.
2. **Going Back in Time**: Players can navigate back to previous steps using the history buttons, allowing them to undo moves.
3. **Game Status**: The game displays who’s turn it is, and announces the winner once a player has completed a winning combination.
4. **Restart Game**: Once the game is finished, a restart button becomes available to reset the board and start over.
