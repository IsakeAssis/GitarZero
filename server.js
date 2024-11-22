const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const rooms = {};

io.on('connection', (socket) => {
  console.log('Novo jogador conectado:', socket.id);

  // Criar sala
  socket.on('createRoom', () => {
    const roomId = uuidv4();
    rooms[roomId] = { players: [] };
    socket.join(roomId);
    rooms[roomId].players.push(socket.id);
    socket.emit('roomCreated', roomId);
  });

  // Entrar na sala
  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId] && rooms[roomId].players.length < 2) {
      socket.join(roomId);
      rooms[roomId].players.push(socket.id);
      io.to(roomId).emit('bothPlayersReady');
    } else {
      socket.emit('roomFull');
    }
  });

  // Sincronizar notas acertadas
  socket.on('noteHit', (data) => {
    socket.broadcast.to(data.roomId).emit('noteHit', data);
  });

  // Gerenciar desconexões
  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter(id => id !== socket.id);
      if (rooms[roomId].players.length === 0) delete rooms[roomId];
    }
  });
});

server.listen(3003, () => {
  console.log('Servidor rodando em http://localhost:3003');
});
