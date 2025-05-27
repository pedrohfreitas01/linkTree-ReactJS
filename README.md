# Linkoofee - Linktree Clone

Este é um projeto baseado na ideia do Linktree, desenvolvido com React.js, Tailwind CSS e Firebase. O sistema inclui roteamento de páginas, banco de dados, sistema de login e um painel de administrador.



## Tecnologias Utilizadas


- React.js - Biblioteca para construção da interface
- Tailwind CSS - Estilização rápida e responsiva
- Firebase - Autenticação, banco de dados e hospedagem



### Funcionalidades

- Cadastro e Login

    - Autenticação via Firebase Authentication

    - Login com email/senha

- Gerenciamento de Links

    - Adicionar, editar e remover links

    - Personalização do perfil

- Painel de Admin

    - Controle total sobre os links cadastrados

    - Configuração do tema e design

### InstalaçãO
 1. Clone o repositório:

        
        git clone https://github.com/pedrohfreitas01/linkTree-ReactJS


2. Instale as dependências:

        
        cd linktree
        npm install

3. Configure o Firebase:

    - Crie um projeto no Firebase

    - Ative Authentication e Firestore

    - Adicione suas credenciais no arquivo .env.local:

        ```
        VITE_FIREBASE_API_KEY=XXXXXXX
        VITE_FIREBASE_AUTH_DOMAIN=XXXXXXX
        VITE_FIREBASE_PROJECT_ID=XXXXXXX
        VITE_FIREBASE_STORAGE_BUCKET=XXXXXXX
        VITE_FIREBASE_MESSAGING_SENDER_ID=XXXXXXX
        VITE_FIREBASE_APP_ID=XXXXXXX
        ```
4. Inicie o projeto:
 npm run dev
