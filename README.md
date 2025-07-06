# RideBro - Frontend

<br />

<div align="center">
    <img src="https://ik.imagekit.io/eduardotosta/carona_spring/ridebro%20new%20logo?updatedAt=1751636783269" title="RideBro Logo" width="50%"/>
</div>

<br /><br />

## 1. Descrição

O **RideBro - Frontend** é a interface web responsiva do sistema de caronas RideBro. Ele foi desenvolvido com React, TypeScript e Tailwind para consumir a API Java Spring Boot e oferecer uma experiência amigável para motoristas e passageiros gerenciarem suas viagens, veículos e perfis.

---

## 2. Recursos

1. Tela inicial com navegação intuitiva
2. Cadastro e listagem de viagens, veículos e usuários
3. Integração completa com a API RideBro via requisições HTTP
4. Filtros e buscas por ID, placa, destino e distância
5. Responsividade e experiência de usuário fluida com TailwindCSS
6. Organização modular com componentes reutilizáveis e contexto global

---

## 3. Protótipo e Capturas de Tela

<div align="center">
    <img src="https://ik.imagekit.io/eduardotosta/carona_spring/PRINT%20MENU.png?updatedAt=1751809242828" title="Captura de Tela" width="50%"/>
</div>
<div align="center">
    <img src="https://ik.imagekit.io/eduardotosta/carona_spring/PRINT%20VEICULOS.png?updatedAt=1751809175314" title="Captura de Tela" width="50%"/>
</div>
<div align="center">
    <img src="https://ik.imagekit.io/eduardotosta/carona_spring/PRINT%20VEICULOS.png?updatedAt=1751809175314" title="Captura de Tela" width="50%"/>
</div>

<br />

<a href="https://www.figma.com/design/GiiGNRpB2PkbyPbM3sfWhw/RideBro?node-id=0-1&p=f&t=WSy0iwYnDoPvhqhz-0"><img src="https://i.imgur.com/vK8ulM5.png" title="Figma" width="3%"/>Clique aqui para vizualizar nosso protótipo no Figma</a>

---

## 4. Tecnologias

| Item                         | Descrição    |
| ---------------------------- | ------------ |
| **Servidor**                 | Node.js      |
| **Linguagem de programação** | TypeScript   |
| **Biblioteca**               | React JS     |
| **Build Tool**               | Vite         |
| **Framework de Estilização** | Tailwind CSS |

---

## 5. Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16+)
- [yarn](https://yarnpkg.com/)
- Backend RideBro com Spring Boot ([Repositório da API](link do repositório da api))

---

## 6. Configuração e Execução

1. Clone o repositório do Projeto:

   ```bash
   git clone https://github.com/seu-usuario/ridebro-frontend.git
   ```

2. Instale as dependências:

   ```bash
   yarn
   ```

3. Clone o repositório do Backend RideBro: [Link](link do repositório do Backend)

4. Siga as instruções do README do backend para iniciar a API

5. Configure o endereço da API no arquivo `.env`:

   ```env
   VITE_API_URL=http://localhost:8080
   ```

6. Inicie a aplicação React:

   ```bash
   yarn dev
   ```

7. A aplicação estará disponível em:
   ```bash
   http://localhost:5173
   ```

---

## 7. Estrutura do Projeto

```plaintext
src/
│
├── components/       # Componentes reutilizáveis
├── contexts/         # Gerenciamento de estado global (ex: autenticação)
├── models/           # Estrutura de dados da aplicação
├── pages/            # Páginas da aplicação
├── services/         # Integração com a API (requisições HTTP)
├── utils/            # Funções auxiliares (alerts, formatadores)
└── App.tsx           # Componente principal da aplicação
```

---

## 8. Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch com a sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'feat: adiciona nova funcionalidade'
   ```
4. Faça push para a branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request

---

## 9. Repositórios

- [RideBro - Backend (Java Spring)](https://carona-spring.onrender.com/swagger-ui/index.html#/)
- [RideBro - Frontend (React)](https://github.com/Grupo04TurmaJava82/carona_spring)
