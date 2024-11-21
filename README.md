# Guitar Zero 🎸
Guitar Zero é um jogo inspirado no famoso jogo Guitar Hero. O projeto oferece uma experiência interativa para jogadores, seja competindo em multiplayer ou jogando individualmente. Desenvolvido com Node.js, HTML, CSS e JavaScript, este jogo combina tecnologias modernas para criar uma plataforma divertida e intuitiva.

🛠️ Tecnologias Utilizadas
Node.js: Back-end para lidar com comunicação em tempo real e gerenciamento de salas multiplayer.
Socket.IO: Comunicação em tempo real entre os jogadores.
UUID: Geração de identificadores únicos para salas multiplayer.
HTML: Estrutura do jogo e interface do usuário.
CSS: Estilização do jogo para torná-lo visualmente atraente.
JavaScript: Lógica do jogo, movimentação das notas e interações com o jogador.

📂 Estrutura do Projeto
O projeto é organizado em pastas para facilitar o desenvolvimento e a manutenção:
Guitar Zero  
├── public/  
│   ├── index.html       # Página inicial do jogo  
│   ├── style.css        # Estilo da interface 
│   ├── script.js        # Lógica do front-end   
├── server.js            # Servidor Node.js  
├── package.json         # Gerenciador de dependências e configurações do projeto  

🖧 Servidor e Funcionalidade Multiplayer
A funcionalidade multiplayer do Guitar Zero foi projetada utilizando Node.js com o pacote socket.io para comunicação em tempo real entre os jogadores. Abaixo, explicamos como o servidor e o multiplayer funcionam.

⚙️ Configuração do Servidor
O servidor utiliza o módulo http integrado do Node.js e o socket.io para gerenciar conexões e salas de jogo.

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
O servidor estará disponível em: http://localhost:3003.

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



🌟 Contribua
Se você encontrou bugs ou deseja sugerir melhorias, abra uma issue ou envie um pull request. Toda contribuição é bem-vinda!

Divirta-se jogando Guitar Zero! 🎶


