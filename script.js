/**
 * @typedef {IIFE} gameBoard - handles all things related to the gameboard
 */
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
      if (marks[i] === mark && marks[i + 1] === mark && marks[i + 2] === mark) {
        return true;
      }
    }

    return false;
  };

  const _checkBoardVertically = (marks, mark) => {
    for (let i = 0; i < 3; i++) {
      if (marks[i] === mark && marks[i + 3] === mark && marks[i + 6] === mark) {
        return true;
      }
    }

    return false;
  };

  const _checkBoardDiagonally = (marks, mark) => {
    if (
      (marks[0] === mark && marks[4] === mark && marks[8] === mark) ||
      (marks[2] === mark && marks[4] && marks[6] == mark)
    ) {
      return true;
    }

    return false;
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

    if (_cellHasNoMarker(cell) && !game.isGameOver()) {
      _setMarker(cell);

      if (_checkWinner()) {
        game.end();
      } else game.nextPlayer();
    }
  };

  const resetBoard = () => {
    cells.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove('active');
    });
  };

  const setClickListenerToCells = () => {
    cells.forEach(cell => {
      cell.addEventListener('click', _checkCell);
    });
  };

  return {
    setClickListenerToCells,
    resetBoard,
  };
})();

const game = (() => {
  let gameOver = false;
  const players = [];
  let currentPlayer;

  const setPlayers = playersParam => {
    playersParam.forEach(player => players.push(player));
    currentPlayer = players[0];

    players.forEach(player => {
      player.setCard();
    });
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

    const player1 = Player();
    player1.setPlayerNumber(1);
    player1.setName('Ej');
    player1.setMarker('X');
    const player2 = Player();
    player2.setPlayerNumber(2);
    player2.setName('Eric Jay');
    player2.setMarker('O');

    setPlayers([player1, player2]);
  };

  const isGameOver = () => gameOver;

  const _setGameOver = bool => {
    gameOver = bool;
  };

  const end = () => {
    const gameOverButton = document.getElementById('game-over');
    const winner = currentPlayer;
    _setGameOver(true);

    gameOverButton.classList.add('active');
    gameOverButton.addEventListener('click', () => {
      gameOverButton.classList.remove('active');
      _setGameOver(false);
      gameBoard.resetBoard();
    });

    winner.addPoints();
  };

  return {
    isGameOver,
    setPlayers,
    getPlayers,
    nextPlayer,
    getCurrentPlayer,
    setGame,
    end,
  };
})();

const Player = () => {
  let playerNumber;
  let name;
  let marker;
  let points = 0;
  let card;

  const setPlayerNumber = param => {
    playerNumber = param;
  };

  const getPlayerNumber = () => playerNumber;

  const setName = param => {
    name = param;
  };

  const setMarker = param => {
    marker = param;
  };

  const getName = () => name;
  const getMarker = () => marker;
  const addPoints = () => {
    points++;
    card.lastElementChild.innerText = `Wins: ${points}`;
  };

  const setCard = () => {
    if (playerNumber === 1) {
      card = document.getElementById('player1');
      card.firstElementChild.innerText = name;
      card.querySelector(':nth-child(2)').innerText = `[${marker}]`;
    } else {
      card = document.getElementById('player2');
      card.firstElementChild.innerText = name;
      card.querySelector(':nth-child(2)').innerText = `[${marker}]`;
    }
  };

  return {
    setCard,
    addPoints,
    setPlayerNumber,
    getPlayerNumber,
    setName,
    getName,
    setMarker,
    getMarker,
  };
};

game.setGame();
