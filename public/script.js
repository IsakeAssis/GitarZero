const socket = io(); // Conexão com o servidor
let roomId = null;
let gameStarted = false;

// Elementos da interface
const startScreen = document.getElementById('start-screen');
const roomScreen = document.getElementById('room-screen');
const gameScreen = document.getElementById('game');
const startGameBtn = document.getElementById('start-game-btn');
const createRoomBtn = document.getElementById('create-room-btn');
const roomLink = document.getElementById('room-link');
const copyLinkBtn = document.getElementById('copy-link-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const countdownTimer = document.getElementById('countdown-timer');
const rulesBtn = document.getElementById('rules-btn');
const rulesDiv = document.getElementById('rules');
const closeRulesBtn = document.getElementById('close-rules-btn');

// Função para alternar entre telas
function showScreen(screen) {
  [startScreen, roomScreen, gameScreen].forEach((s) => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

// Criar sala
createRoomBtn.addEventListener('click', () => {
  socket.emit('criar_sala');
});

// Resposta do servidor ao criar a sala
socket.on('sala_criada', (link) => {
  roomLink.textContent = link;
  roomId = link.split('/').pop();
  showScreen(roomScreen);
});

// Copiar link da sala
copyLinkBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(roomLink.textContent);
  alert('Link copiado!');
});

// Voltar ao menu
backToMenuBtn.addEventListener('click', () => {
  showScreen(startScreen);
});

// Mostrar regras
rulesBtn.addEventListener('click', () => {
  rulesDiv.classList.remove('hidden');
});

// Fechar regras
closeRulesBtn.addEventListener('click', () => {
  rulesDiv.classList.add('hidden');
});

// Verificar se o jogador entrou com um link de sala
const urlParams = new URLSearchParams(window.location.search);
const joinRoomId = urlParams.get('roomId');
if (joinRoomId) {
  roomId = joinRoomId;
  socket.emit('entrar_sala', roomId);
}

// Jogador 2 entrou na sala
socket.on('playerJoined', () => {
  console.log(`Jogador 2 entrou na sala ${roomId}`);
  if (!gameStarted) {
    socket.emit('iniciar_jogo', roomId);
  }
});

// Iniciar o jogo para ambos os jogadores
socket.on('comecar_jogo', () => {
  if (!gameStarted) {
    showScreen(gameScreen);
    initiateCountdownAndStartGame();
    gameStarted = true;
  }
});

// Função para iniciar a contagem regressiva
function initiateCountdownAndStartGame() {
  let countdown = 5;
  countdownTimer.innerText = countdown;

  const interval = setInterval(() => {
    countdown -= 1;
    countdownTimer.innerText = countdown;

    if (countdown <= 0) {
      clearInterval(interval);
      countdownTimer.innerText = ""; // Limpar o contador após terminar
      startGame();
    }
  }, 1000);
}

// Iniciar o jogo
function startGame() {
  console.log('Jogo iniciado! Implementar lógica do jogo aqui.');
  const gameInstance = new Game();
  gameInstance.startGame();
}

// Classe de Nota
class Note {
  constructor(line, speed) {
    this.line = line;
    this.speed = speed;
    this.element = document.createElement('div');
    this.element.classList.add('note', `note-${this.getLineChar(line)}`);
    this.element.style.top = '-3%';
    this.element.style.left = `${line * 20}%`;
    document.getElementById('game').appendChild(this.element);
  }

  move() {
    const top = parseFloat(this.element.style.top);
    this.element.style.top = `${top + this.speed}%`;

    if (top > 100) {
      this.element.remove();
      return false;
    }

    return true;
  }

  getLineChar(line) {
    return ['a', 's', 'd', 'f', 'g'][line];
  }
}

// Classe do Jogo
class Game {
  constructor() {
    this.notes = [];
    this.noteSpeed = 0.75;
    this.keys = { a: 0, s: 1, d: 2, f: 3, g: 4 };
    this.score = 0;
    this.errors = 0;
    this.failureThreshold = 10;
    this.animationFrameId = null;
    this.spawnTimeoutId = null;
    this.isPaused = false;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e.key));
  }

  startGame() {
    this.isPaused = false;
    this.spawnNotes();
    this.gameLoop();
  }

  handleKeyPress(key) {
    if (this.isPaused) return;

    const line = this.keys[key];
    if (line !== undefined) {
      const hitNotes = this.notes.filter(
        (note) =>
          note.line === line &&
          Math.abs(parseFloat(note.element.style.top) - 85) < 15
      );

      if (hitNotes.length > 0) {
        this.score += 10;
        document.getElementById('score').innerText = `Score: ${this.score}`;
        hitNotes.forEach((note) => note.element.remove());
        this.notes = this.notes.filter((note) => !hitNotes.includes(note));
      } else {
        this.errors += 1;
        document.getElementById('errors').innerText = `Erros: ${this.errors}`;

        if (this.errors >= this.failureThreshold) {
          this.endGame();
        }
      }
    }
  }

  spawnNotes() {
    if (this.isPaused) return;

    const line = Math.floor(Math.random() * 5);
    this.notes.push(new Note(line, this.noteSpeed));
    this.spawnTimeoutId = setTimeout(() => this.spawnNotes(), 2000);
  }

  gameLoop() {
    if (this.isPaused) return;

    this.notes = this.notes.filter((note) => note.move());
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  endGame() {
    this.isPaused = true;
    clearTimeout(this.spawnTimeoutId);
    cancelAnimationFrame(this.animationFrameId);
    alert('Você perdeu! Tente novamente.');
  }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  console.log("Jogo carregado. Aguardando início...");
});
