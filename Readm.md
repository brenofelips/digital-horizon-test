# Desafio Técniao Digital Horizon

## Objetivo

1. Descrição do projeto: Crie uma API REST que permita aos usuários postar, atualizar e excluir mensagens em um mural online. A API deve fornecer as seguintes operações:

2. Criar uma nova mensagem: A API deve permitir que os usuários criem uma nova mensagem no mural, fornecendo um título e uma descrição.

3. Atualizar uma mensagem existente: A API deve permitir que os usuários atualizem uma mensagem existente no mural, fornecendo o ID da mensagem e o novo título e/ou descrição.

4. Excluir uma mensagem existente: A API deve permitir que os usuários excluam uma mensagem existente no mural, fornecendo o ID da mensagem. Listar todas as mensagens:

5. A API deve permitir que os usuários obtenham uma lista de todas as mensagens no mural. Obter uma mensagem específica: A API deve permitir que os usuários obtenham detalhes sobre uma mensagem específica, fornecendo o ID da mensagem.

## Executando o projeto

```bash
# Faça o clone do projeto
git clone https://github.com/brenofelips/digital-horizon-test.git

# Acesse a pasta frontend
cd frontend
npm install
npm run dev

# Acesse a pasta backend
cd backend
docker-compose -d up # É necessário rodar esse comando antes do backend

npm install
npm run dev

# Para rodar os testes
npm run test
```
