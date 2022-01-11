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
        cells[i].classList.add('match');
        cells[i + 1].classList.add('match');
        cells[i + 2].classList.add('match');
        return true;
      }
    }

    return false;
  };

  const _checkBoardVertically = (marks, mark) => {
    for (let i = 0; i < 3; i++) {
      if (marks[i] === mark && marks[i + 3] === mark && marks[i + 6] === mark) {
        cells[i].classList.add('match');
        cells[i + 3].classList.add('match');
        cells[i + 6].classList.add('match');
        return true;
      }
    }

    return false;
  };

  const _checkBoardDiagonally = (marks, mark) => {
    if (marks[0] === mark && marks[4] === mark && marks[8] === mark) {
      cells[4].classList.add('match');
      cells[8].classList.add('match');
      cells[0].classList.add('match');
      return true;
    } else if (marks[2] === mark && marks[4] === mark && marks[6] === mark) {
      cells[2].classList.add('match');
      cells[4].classList.add('match');
      cells[6].classList.add('match');
      return true;
    }

    return false;
  };

  const _noWinner = () => {
    return cells.every(cell => cell.innerText !== '');
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
    else return false;
  };

  const _cellHasNoMarker = cell => cell.innerText === '';

  const _checkCell = e => {
    const cell = e.target;

    if (_cellHasNoMarker(cell) && !game.isOver()) {
      const previousPlayer = game.getCurrentPlayer();
      const gameOverButton = document.getElementById('game-over');
      const buttonText = `Game Over!\n`;
      _setMarker(cell);

      if (_checkWinner()) {
        const winner = game.getCurrentPlayer();
        winner.addPoints();
        gameOverButton.innerText = `${buttonText}${winner.getName()} wins!`;
        game.nextPlayer(); // Whoever loses gets to go first.
        game.end();
      } else if (_noWinner()) {
        gameOverButton.innerText = `${buttonText}No Winner!`;
        game.end();
      } else {
        game.nextPlayer();
      }

      game.toggleHighlight(game.getCurrentPlayer());
      game.toggleHighlight(previousPlayer);
    }
  };

  const resetBoard = () => {
    cells.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove('active');
      cell.classList.remove('match');
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
  const gameOverButton = document.getElementById('game-over');
  const players = [];
  let currentPlayer;
  let gameOver = false;

  const _getUserInfo = () => {
    let userInfo = [{}, {}];
    for (let i = 0; i < 2; i++) {
      userInfo[i].name = prompt(`Player ${i + 1} name: `);
      userInfo[i].marker = prompt(`Player ${i + 1} marker: `);
    }

    return userInfo;
  };

  const _setGameOver = bool => (gameOver = bool);

  const toggleHighlight = player => {
    const card = player.getCard();
    card.classList.toggle('active');
  };

  const setPlayers = playersParam => {
    playersParam.forEach(player => players.push(player));
    currentPlayer = players[0];

    players.forEach(player => {
      player.setCard();
    });

    toggleHighlight(currentPlayer);
  };

  const setGame = () => {
    const input = _getUserInfo();

    const player1 = Player();
    player1.setPlayerNumber(1);
    player1.setName(input[0].name || 'Player 1');
    player1.setMarker(input[0].marker || 'X');

    const player2 = Player();
    player2.setPlayerNumber(2);
    player2.setName(input[1].name || 'Player 2');
    player2.setMarker(input[1].marker || 'O');

    setPlayers([player1, player2]);

    gameBoard.setClickListenerToCells();
  };

  const nextPlayer = () => {
    const currentPlayerIndex = players.findIndex(player => player === currentPlayer);
    // Assuming there are 2 players in a game
    if (currentPlayerIndex === 0) currentPlayer = players[1];
    else currentPlayer = players[0];
  };

  const getPlayers = () => players;

  const getCurrentPlayer = () => currentPlayer;

  const isOver = () => gameOver;

  const end = () => {
    _setGameOver(true);
    gameOverButton.classList.add('active');
  };

  gameOverButton.addEventListener('click', () => {
    gameOverButton.classList.remove('active');
    gameOverButton.innerText = 'Game Over!';
    _setGameOver(false);
    gameBoard.resetBoard();
  });

  return {
    isOver,
    setPlayers,
    getPlayers,
    nextPlayer,
    getCurrentPlayer,
    toggleHighlight,
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

  const setName = param => {
    name = param;
  };

  const setMarker = param => {
    marker = param;
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

  const addPoints = () => {
    points++;
    card.lastElementChild.innerText = `Wins: ${points}`;
  };

  const setPlayerNumber = param => {
    playerNumber = param;
  };

  const getPlayerNumber = () => playerNumber;

  const getName = () => name;

  const getMarker = () => marker;

  const getCard = () => card;

  return {
    setPlayerNumber,
    setName,
    setMarker,
    setCard,
    addPoints,
    getPlayerNumber,
    getName,
    getMarker,
    getCard,
  };
};

game.setGame();
