const gameBoard = (() => {
  const board = document.getElementById('game-board');
  const cells = Array.from(board.children);

  const _setMarker = cell => {
    const marker = game.getCurrentPlayer().getMarker();
    cell.innerText = marker;
    cell.classList.add('active');
  };

  const _checkBoardHorizontally = (marks, mark) => {
    for (let i = 0; i <= marks.length - 3; i += 3) {
      if (marks[i] === mark && marks[i + 1] === mark && marks[i + 2] === mark) return true;
    }

    return false;
  };

  const _checkBoardVertically = (marks, mark) => {
    for (let i = 0; i < 3; i++) {
      if (marks[i] === mark && marks[i + 3] === mark && marks[i + 6] === mark) return true;
    }

    return false;
  };

  const _checkBoardDiagonally = (marks, mark) => {
    if (
      (marks[0] === mark && marks[4] === mark && marks[8] === mark) ||
      (marks[2] === mark && marks[4] && marks[6])
    )
      return true;
    else return false;
  };

  const _checkWinner = () => {
    const currentPlayer = game.getCurrentPlayer();
    const marks = cells.map(cell => cell.innerText);
    const mark = currentPlayer.getMarker();

    if (
      _checkBoardVertically(marks, mark) ||
      _checkBoardHorizontally(marks, mark) ||
      _checkBoardDiagonally(marks, mark)
    )
      return true;
  };

  const _cellHasNoMarker = cell => cell.innerText === '';

  const _checkCell = e => {
    const cell = e.target;

    if (_cellHasNoMarker(cell)) {
      _setMarker(cell);

      if (_checkWinner()) game.end();
      else game.nextPlayer();
    }
  };

  const setClickListenerToCells = () => {
    cells.forEach(cell => {
      cell.addEventListener('click', _checkCell);
    });
  };

  return {
    setClickListenerToCells,
  };
})();

const game = (() => {
  const players = [];
  let currentPlayer;

  const setPlayers = playersParam => {
    playersParam.forEach(player => players.push(player));
    currentPlayer = players[0];
  };

  const getPlayers = () => players;

  const nextPlayer = () => {
    const currentPlayerIndex = players.findIndex(player => player === currentPlayer);
    // Assuming there are 2 players in a game
    if (currentPlayerIndex === 0) currentPlayer = players[1];
    else currentPlayer = players[0];
  };

  const getCurrentPlayer = () => currentPlayer;

  const setGame = () => {
    gameBoard.setClickListenerToCells();
    console.log('game set');
  };

  const end = () => {
    console.log(currentPlayer.getName());
  };
  return {
    setPlayers,
    getPlayers,
    nextPlayer,
    getCurrentPlayer,
    setGame,
    end,
  };
})();

const Player = (name, marker) => {
  const setName = param => (name = param);
  const getName = () => name;
  const setMarker = param => (marker = param);
  const getMarker = () => marker;

  return {
    setName,
    getName,
    setMarker,
    getMarker,
  };
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
game.setPlayers([player1, player2]);
game.setGame();
