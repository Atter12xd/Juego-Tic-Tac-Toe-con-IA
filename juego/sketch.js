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
