# NLW Connect Node

Este é um projeto de cadastro de eventos e ranking, desenvolvido com TypeScript, Fastify e outras tecnologias durante a Next Level Week (NLW) da Rocketseat.

## 🚀 Instalação
Siga os passos abaixo para configurar o projeto:

### 1️⃣ Instalar o Docker
Certifique-se de que o Docker está instalado. Você pode verificar executando:

```bash
docker -v
```

Abra o Docker e mantenha-o em execução.

### 2️⃣ Iniciar os serviços do Docker
Dentro da pasta do projeto, execute:

```bash
docker compose up -d
```

### 3️⃣ Instalar dependências
```bash
npm install
```

### 4️⃣ Criar o arquivo .env

No diretório raiz do projeto, crie um arquivo .env com o seguinte conteúdo:

```bash
PORT=3333
WEB_URL="http://localhost:3000"
POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect"
REDIS_URL="redis://localhost:6379"
```

### 5️⃣ Executar as migrações do banco de dados
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 6️⃣ Iniciar a aplicação
```bash
npm run dev
```
Agora o servidor está rodando! 🎉

### 📄 Documentação da API
Com o servidor em execução, acesse a documentação da API em:

http://localhost:3333/docs

(Essa URL só funcionará enquanto a aplicação estiver rodando.)

Pronto! Seu projeto está configurado e pronto para uso. 🚀