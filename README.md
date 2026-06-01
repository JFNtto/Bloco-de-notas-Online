# Bloco de Notas Online Temporário

Um bloco de notas online simples e moderno onde você pode escrever textos e compartilhá-los de forma rápida através de um link único e temporário.

Este projeto foi construído seguindo boas práticas de programação, focando especialmente nos princípios **SOLID** e utilizando uma estrutura de **Arquitetura Limpa (Clean Architecture)**.

---

## 🚀 Tecnologias Utilizadas

- **Backend:** Node.js, Fastify e TypeScript.
- **Banco de Dados & ORM:** SQLite e Prisma.
- **Frontend:** HTML, Tailwind CSS.

---

## 🏗️ Arquitetura e Princípios SOLID

A estrutura do projeto separa rigorosamente a regra de negócios de detalhes de infraestrutura (banco de dados, frameworks web, etc.):

- **`src/domain` (Domínio):** Contém o modelo do negócio (`Note`) e os contratos/interfaces de repositórios (`INoteRepository`). Essa camada não possui dependências de bibliotecas de terceiros (Princípio da Inversão de Dependência).
- **`src/application` (Aplicação):** Contém os casos de uso (`CreateNoteUseCase` e `GetNoteUseCase`).
  - **Single Responsibility (SRP):** Cada caso de uso realiza apenas uma tarefa do sistema.
  - **Expiração / Lazy Deletion:** No `GetNoteUseCase`, se a nota for solicitada após o seu tempo de validade, ela é automaticamente removida do SQLite e uma resposta de "Nota não encontrada" é retornada ao cliente.
- **`src/infrastructure` (Infraestrutura):** Adaptadores de entrada e saída.
  - Aqui fica a implementação real do banco (`PrismaNoteRepository`), os controllers do Fastify (`NoteController`), rotas e a inicialização do servidor.
  - Permite fácil substituição caso você deseje trocar o SQLite por outro banco futuramente (como Redis ou PostgreSQL), bastando criar uma nova classe que implemente `INoteRepository`.

---

## 🕒 Expiração de Notas
No momento do compartilhamento, você pode escolher o tempo limite de vida da nota:
- **1 hora**
- **5 horas**
- **24 horas (máximo)**

O tempo de expiração é validado no servidor e a nota é deletada do banco assim que expirar.

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado na sua máquina.

### Passos para Rodar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Gere os arquivos do Prisma e configure o banco de dados (SQLite):**
   ```bash
   npx prisma db push
   ```

3. **Inicie o servidor em ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   O projeto estará disponível no endereço: [http://localhost:3000](http://localhost:3000)

---

## 📄 Scripts Disponíveis
- `npm run dev`: Inicia o servidor Fastify em modo de monitoramento com `tsx watch`.
- `npm run start`: Inicia o servidor em modo de produção.
