# Gitar Zero 🎸
Gitar Zero é um jogo inspirado no famoso jogo Guitar Hero. O projeto oferece uma experiência interativa para jogadores, seja competindo em multiplayer ou jogando individualmente. Desenvolvido com Node.js, HTML, CSS e JavaScript, este jogo combina tecnologias modernas para criar uma plataforma divertida e intuitiva.

🛠️ Tecnologias Utilizadas
Node.js: Back-end para lidar com comunicação em tempo real e gerenciamento de salas multiplayer.
Socket.IO: Comunicação em tempo real entre os jogadores.
UUID: Geração de identificadores únicos para salas multiplayer.
HTML: Estrutura do jogo e interface do usuário.
CSS: Estilização do jogo para torná-lo visualmente atraente.
JavaScript: Lógica do jogo, movimentação das notas e interações com o jogador.

📂 Estrutura do Projeto
O projeto é organizado em pastas para facilitar o desenvolvimento e a manutenção:
Gitar Zero  
├── public/  
│   ├── index.html       # Página inicial do jogo  
│   ├── style.css        # Estilo da interface 
│   ├── script.js        # Lógica do front-end   
├── server.js            # Servidor Node.js  
├── package.json         # Gerenciador de dependências e configurações do projeto  

🖧 Servidor e Funcionalidade Multiplayer
A funcionalidade multiplayer do Gitar Zero foi projetada utilizando Node.js com o pacote socket.io para comunicação em tempo real entre os jogadores. Abaixo, explicamos como o servidor e o multiplayer funcionam.

⚙️ Configuração do Servidor
O servidor utiliza o módulo http integrado do Node.js e o socket.io para gerenciar conexões e salas de jogo.

Servidor HTTP
O servidor foi configurado para servir os arquivos estáticos da pasta public, onde o jogo está localizado. Ele é iniciado na porta 3003 e exibe a URL para acesso:
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

server.listen(3003, () => {
  console.log('Servidor rodando em http://localhost:3003');
});

Gerenciamento de Salas Multiplayer
Cada sala é identificada por um ID único gerado pelo pacote uuid. Uma sala pode conter até dois jogadores, sendo que o servidor gerencia as seguintes etapas:

Criar uma sala:
Um jogador cria uma sala e recebe um link único para convidar o segundo jogador.

socket.on('createRoom', () => {
  const roomId = uuidv4(); // Gera um ID único
  rooms[roomId] = { players: [] }; // Registra a sala no servidor
  socket.join(roomId); // Adiciona o jogador à sala
  rooms[roomId].players.push(socket.id);
  socket.emit('roomCreated', roomId); // Envia o ID ao cliente
});

Entrar em uma sala existente:
O segundo jogador pode se conectar à sala pelo link fornecido. Quando os dois jogadores estiverem conectados, o jogo começa.

socket.on('joinRoom', (roomId) => {
  if (rooms[roomId] && rooms[roomId].players.length < 2) {
    socket.join(roomId);
    rooms[roomId].players.push(socket.id);
    io.to(roomId).emit('bothPlayersReady'); // Notifica que os dois estão prontos
  } else {
    socket.emit('roomFull'); // Sala cheia
  }
});

Gerenciamento de desconexões:
Se um jogador sair da sala, ele é removido da lista de jogadores, e a sala é apagada se estiver vazia.
socket.on('disconnect', () => {
  for (const roomId in rooms) {
    rooms[roomId].players = rooms[roomId].players.filter(id => id !== socket.id);
    if (rooms[roomId].players.length === 0) delete rooms[roomId]; // Remove sala vazia
  }
});


🚀 Como Rodar o Projeto
1️⃣ Pré-requisitos
Certifique-se de que você tenha o Node.js instalado em sua máquina.

2️⃣ Instale as Dependências
No diretório do projeto, execute o seguinte comando no terminal:

bash
Copiar código
npm install

3️⃣ Inicie o Servidor
Para iniciar o servidor e rodar o jogo, execute:
node server.js
O servidor estará disponível em: http://localhost:3000.

4️⃣ Acesse o Jogo
Abra seu navegador e acesse o endereço fornecido acima.


🎮 Como Jogar
Acesse a tela inicial e clique em "Start Game" para jogar sozinho ou em "Criar Sala" para iniciar uma partida multiplayer.
No modo multiplayer:
Um link será gerado para a sala criada. Compartilhe com o outro jogador.
Quando ambos os jogadores estiverem conectados, o jogo começará automaticamente após uma contagem regressiva.
Pressione as teclas correspondentes (A, S, D, F, G) para acertar as notas no tempo certo.
Evite erros! Caso o limite de erros ou a pontuação negativa seja atingida, o jogo terminará.


🏆 Destaques do Projeto
Multiplayer em Tempo Real: Dois jogadores podem competir em uma partida simultânea.
Ajuste de Dificuldade: A velocidade das notas aumenta conforme o jogador obtém pontuações mais altas.
Contagem Regressiva: O jogo começa com um timer para preparar os jogadores.
Interface Simples e Intuitiva: Design inspirado em Guitar Hero, com comandos diretos.

📥 Instalação de Dependências Adicionais
Este projeto utiliza o pacote UUID para geração de identificadores únicos de sala. Caso precise instalá-lo manualmente, execute:
npm install uuid

🛠️ Usando o ngrok para Testes Remotos
O ngrok é uma ferramenta que cria um túnel seguro para expor servidores locais à internet, permitindo que você acesse seu servidor de desenvolvimento (como o localhost) em qualquer lugar. Isso é útil para testar o jogo multiplayer em diferentes dispositivos ou para mostrar o projeto para outras pessoas, sem precisar de um servidor de produção.

Como usar o ngrok:
Instale o ngrok:
Acesse o site oficial do ngrok e baixe a versão apropriada para o seu sistema operacional. Após o download, extraia o arquivo e mova o executável para um diretório de sua escolha.

Inicie o ngrok:
Abra um terminal e execute o seguinte comando para expor o servidor local:

bash
Copiar código
ngrok http 3003
Isso criará um túnel que expõe sua aplicação local na URL gerada pelo ngrok, como https://1234abcd.ngrok.io. Essa URL pode ser compartilhada com outras pessoas para jogar o Gitar Zero remotamente.

Teste o Jogo:
Após iniciar o ngrok, use a URL gerada para acessar o jogo em diferentes dispositivos ou compartilhe com seu amigo para jogarem juntos.

Agora você pode testar o jogo em tempo real em qualquer lugar, sem precisar de um servidor online!


🌟 Contribua
Se você encontrou bugs ou deseja sugerir melhorias, abra uma issue ou envie um pull request. Toda contribuição é bem-vinda!

Divirta-se jogando Gitar Zero! 🎶

Nomes                                   RGM
Alexandre Teles Barbosa                 30296781
Isake Assis Abreu Molina                30260671
Diogo Santiago Coutinho                 35983451
Pedro Castro Barros                     29546923
Matheus Rodrigues de Farias             30566452
Gustavo Gomes da Nobrega                30587620
Gabriel Oliveira dos Santos             30592682