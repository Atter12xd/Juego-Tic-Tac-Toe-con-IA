const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let userCanClick = true;

const statusDisplay = document.querySelector('.status');
const cells = document.querySelectorAll('.cell');
const difficultySelect = document.getElementById('difficulty');

// Cargar los sonidos
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
const loseSound = document.getElementById('loseSound');

// Actualizar el estado de turno
function updateStatus() {
    if (gameActive) {
        statusDisplay.innerHTML = `Turno de ${currentPlayer}`;
    }
}
// Manejar clic en la celda
function handleCellClick(event) {
    if (!userCanClick || !gameActive) return; // Bloquear clics durante el turno de la IA

    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (board[clickedCellIndex] !== '') {
        return;
    }

    clickSound.play();  // Reproducir sonido de clic al seleccionar una celda

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    
    checkResult();

    if (gameActive) {
        currentPlayer = 'O'; // Cambiar al jugador IA
        updateStatus();
        userCanClick = false; // Desactivar clics mientras juega la IA
        handleAIMove(); // Hacer movimiento IA
    }
}
// Movimiento de la IA
function handleAIMove() {
    setTimeout(() => {
        let bestMove;

        if (difficultySelect.value === 'easy' && Math.random() < 0.5) {
            // Movimiento aleatorio en modo fácil
            const availableMoves = board.reduce((acc, val, index) => val === '' ? acc.concat(index) : acc, []);
            bestMove = { index: availableMoves[Math.floor(Math.random() * availableMoves.length)] };
        } else {
            // Movimiento óptimo usando minimax en modo difícil
            bestMove = minimax(board, 'O');
        }

        board[bestMove.index] = 'O';
        cells[bestMove.index].innerHTML = 'O';
        
        checkResult();
        if (gameActive) {
            currentPlayer = 'X';
            updateStatus();
        }
        userCanClick = true; // Volver a habilitar clics después del turno de la IA
    }, 500); // Añadir retraso para simular "pensamiento" de la IA
}