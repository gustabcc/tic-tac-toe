const boardRegions = document.querySelectorAll('#gameBoard span');
let vBoard = [];
let turnPlayer = '';
document.getElementById('start').addEventListener('click', initializeGame);

function updateTitle() {
    const playerInput = document.getElementById(turnPlayer);
    document.getElementById('turnPlayer').innerText = playerInput.value;
}

function disableRegion(element) {
    element.style.cursor = 'default';
    element.removeEventListener('click', handleBoardClick);
}


function getWinRegions() {
    const winRegions = [];
    
    // Função auxiliar para verificar se três elementos são iguais e não vazios
    function checkThreeElements(a, b, c) {
      return a && a === b && a === c;
    }
  
    // Verificar linhas
    for (let row = 0; row < 3; row++) {
      const region = `${row}.`;
      if (checkThreeElements(vBoard[row][0], vBoard[row][1], vBoard[row][2])) {
        winRegions.push(`${region}0`, `${region}1`, `${region}2`);
      }
    }
  
    // Verificar colunas
    for (let col = 0; col < 3; col++) {
      const region = `.${col}`;
      if (checkThreeElements(vBoard[0][col], vBoard[1][col], vBoard[2][col])) {
        winRegions.push(`0${region}`, `1${region}`, `2${region}`);
      }
    }
  
    // Verificar diagonais
    if (checkThreeElements(vBoard[0][0], vBoard[1][1], vBoard[2][2])) {
      winRegions.push("0.0", "1.1", "2.2");
    }
    if (checkThreeElements(vBoard[0][2], vBoard[1][1], vBoard[2][0])) {
      winRegions.push("0.2", "1.1", "2.0");
    }
  
    return winRegions;
  }
  

function handleWin(regions) {
    regions.forEach(function(region) {
        document.querySelector('[data-region="' + region + '"]').classList.add('win');
    })
    const player = document.getElementById(turnPlayer).value;
    document.querySelector('h2').innerHTML = player + ' Win!';
}

function handleBoardClick(ev) {
    const span = ev.currentTarget;
    const region = span.dataset.region;
    const rowColumnPair = region.split('.');
    const row = rowColumnPair[0];
    const column = rowColumnPair[1];

    if(turnPlayer === 'player1') {
        ev.currentTarget.innerText = 'X'
        vBoard[row][column] = 'X';
    } else {
        span.innerText = 'O';
        vBoard[row][column] = 'O';
    }

    console.clear();
    console.table(vBoard);

    disableRegion(span);

    const winRegions = getWinRegions();
    if(winRegions.length > 0) {
        handleWin(winRegions);        
    } else if(vBoard.flat().includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1';
        updateTitle();
    } else {
        document.getElementById('h2').innerHTML = 'Empate';
    }
}

function initializeGame() {
    vBoard = 
    [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span></h2>'
    updateTitle();
    boardRegions.forEach(function(element) {
        element.classList.remove('win');
        element.innerText = '';
        element.addEventListener('click', handleBoardClick);
    })
}