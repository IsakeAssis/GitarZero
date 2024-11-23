const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuração do WebSocket
const salas = {};

io.on('connection', (socket) => {
  console.log('Um usuário se conectou.');

  // Criar sala
  socket.on('criar_sala', () => {
    const roomId = Math.random().toString(36).substring(2, 9);
    salas[roomId] = [socket.id];
    socket.join(roomId);
    socket.emit('sala_criada', `https://7625-170-233-245-105.ngrok-free.app/?roomId=${roomId}`);
    console.log(`Sala criada: ${roomId}`);
  });

  // Entrar em uma sala
  socket.on('entrar_sala', (roomId) => {
    if (salas[roomId] && salas[roomId].length === 1) {
      salas[roomId].push(socket.id);
      socket.join(roomId);
      io.to(roomId).emit('playerJoined'); // Notificar ambos os jogadores
      console.log(`Jogador entrou na sala: ${roomId}`);
    } else {
      socket.emit('erro', 'Sala cheia ou inexistente.');
    }
  });

  // Iniciar jogo
  socket.on('iniciar_jogo', (roomId) => {
    io.to(roomId).emit('comecar_jogo');
    console.log(`Jogo iniciado na sala: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('Um usuário desconectou.');
  });
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});
