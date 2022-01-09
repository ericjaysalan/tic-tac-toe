const gameBoard = (() => {
  const board = document.getElementById('game-board');
  const cells = Array.from(board.children);

  const _cellHasNoMarker = (cell) => cell.innerText === '';

  const _setMarker = (cell, player) => {
    const marker = player.getMarker();
    cell.innerText = marker;
    cell.classList.add('active');
    game.nextPlayer();
  };

  const _checkCell = (e) => {
    const cell = e.target;

    if (_cellHasNoMarker(cell)) _setMarker(cell, game.getCurrentPlayer());
    else console.log('nope!');
  };

  const setClickListenerToCells = () => {
    cells.forEach((cell) => {
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

  const setPlayers = (playersParam) => {
    playersParam.forEach((player) => players.push(player));
    currentPlayer = players[0];
  };

  const getPlayers = () => players;

  const nextPlayer = () => {
    const currentPlayerIndex = players.findIndex((player) => player === currentPlayer);
    // Assuming there are 2 players in a game
    if (currentPlayerIndex === 0) currentPlayer = players[1];
    else currentPlayer = players[0];
  };

  const getCurrentPlayer = () => currentPlayer;

  const setGame = () => {
    gameBoard.setClickListenerToCells();
    console.log('game set');
  };

  return {
    setPlayers,
    getPlayers,
    nextPlayer,
    getCurrentPlayer,
    setGame,
  };
})();

const Player = (name, marker) => {
  const setName = (param) => (name = param);
  const getName = () => name;
  const setMarker = (param) => (marker = param);
  const getMarker = () => marker;

  return {
    setName,
    getName,
    setMarker,
    getMarker,
  };
};

const player1 = Player('Eric Jay', 'X');
const player2 = Player('Ej', 'O');
game.setPlayers([player1, player2]);
game.setGame();
