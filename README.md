# Danm Notes — Documentação do Desenvolvimento

## 1. Introdução

O Danm Notes é uma aplicação web desenvolvida para criação, gerenciamento e compartilhamento de anotações. O projeto utiliza HTML, CSS, JavaScript, Node.js, Express e SQLite, integrando o frontend ao backend por meio de requisições HTTP.

Esta documentação apresenta o processo de construção da aplicação, explicando a organização dos arquivos, a configuração das tecnologias utilizadas e a implementação de suas principais funcionalidades.

## 2. Preparação do ambiente de desenvolvimento

O primeiro passo foi preparar o ambiente necessário para o desenvolvimento da aplicação.

Foi utilizado o Visual Studio Code como editor de código, Node.js para executar JavaScript no servidor e npm para gerenciar as dependências do projeto.

Também foi utilizado o Git para controlar as versões do código e o GitHub para armazenar o repositório e acompanhar as alterações realizadas durante o desenvolvimento.

Após instalar o Node.js, foi criado o diretório principal do projeto e inicializado o gerenciamento de dependências com:

```bash
npm init -y
```

Em seguida, foram instaladas as bibliotecas necessárias:

```bash
npm install express better-sqlite3 bcryptjs express-session dotenv
```

Essas dependências foram escolhidas para permitir a criação do servidor, integração com o banco de dados, autenticação de usuários e gerenciamento de sessões.

## 3. Organização inicial do projeto

Após configurar o ambiente, foi realizada a organização dos diretórios e arquivos.

O objetivo foi separar as responsabilidades de cada parte da aplicação, facilitando a manutenção e a compreensão do código.

A estrutura utilizada foi organizada da seguinte maneira:

```text
DI-projeto-final/
├── controllers/
├── database/
├── middleware/
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── routes/
│   └── api/
├── views/
├── .env
├── .gitignore
├── package.json
└── server.js
```

Cada diretório possui uma responsabilidade específica:

- **controllers:** contém as funções responsáveis pela lógica da aplicação.
- **database:** contém a configuração e a conexão com o banco de dados.
- **middleware:** contém funções intermediárias utilizadas no processamento das requisições, como a autenticação.
- **public:** armazena os arquivos estáticos, como CSS, JavaScript e imagens.
- **routes:** organiza as rotas responsáveis por receber as requisições.
- **views:** armazena os arquivos HTML utilizados na apresentação das páginas.

Essa separação permite manter o código organizado, evitando concentrar todas as funcionalidades em um único arquivo.

## 4. Configuração do servidor com Node.js e Express

Com a estrutura criada, o próximo passo foi configurar o servidor utilizando Express.

Foi criado o arquivo `server.js`, responsável por inicializar a aplicação e configurar os middlewares necessários.

Primeiramente, foram configurados os módulos utilizados pelo servidor, além do carregamento das variáveis de ambiente.

Também foram adicionados os middlewares:

- `express.urlencoded()`: permite interpretar dados enviados por formulários HTML.
- `express.json()`: permite interpretar dados enviados no formato JSON.
- `express.static()`: disponibiliza os arquivos estáticos armazenados na pasta public.
- `express-session`: permite gerenciar as sessões dos usuários.

Depois disso, foram importadas e registradas as rotas da aplicação, conectando os diferentes módulos do projeto ao servidor.

Por fim, foi configurada a inicialização do servidor na porta 3000.

## 5. Criação do banco de dados SQLite

Após configurar o servidor, foi implementado o banco de dados utilizando SQLite e a biblioteca better-sqlite3.

Foi criado o arquivo `database.js`, responsável por estabelecer a conexão com o banco e disponibilizar sua utilização pelos controllers.

O banco foi estruturado para armazenar principalmente duas categorias de informações:

- Usuários: informações necessárias para identificar e autenticar cada pessoa cadastrada.
- Notas: informações referentes aos títulos, conteúdos e usuários responsáveis por cada anotação.

A integração com o banco é realizada por meio de comandos SQL.

Para executar as operações, foram utilizados os métodos disponibilizados pelo better-sqlite3:

- `.run()`: utilizado para operações de inserção, atualização e exclusão.
- `.get()`: utilizado para recuperar um único registro.
- `.all()`: utilizado para recuperar vários registros.

Também foram utilizados parâmetros nas consultas SQL para inserir os valores de maneira adequada.

## 6. Desenvolvimento do sistema de autenticação

Depois da configuração do banco de dados, foi desenvolvido o sistema de autenticação.

Essa etapa envolveu a criação das rotas e controllers responsáveis pelo cadastro, login e logout dos usuários.

Para proteger as senhas, foi utilizada a biblioteca bcryptjs, responsável por gerar hashes e verificar se uma senha informada corresponde ao hash armazenado no banco.

Também foi implementado o gerenciamento de sessões utilizando express-session.

Quando um usuário realiza login corretamente, seu identificador é armazenado na sessão por meio de `req.session.userId`.

Dessa maneira, o servidor consegue identificar o usuário nas próximas requisições.

Além disso, foi criado o arquivo `authMiddleware.js`, responsável por verificar se existe uma sessão autenticada antes de permitir o acesso às páginas e funcionalidades protegidas.

## 7. Desenvolvimento das rotas e controllers

Com o sistema de autenticação implementado, foram organizadas as rotas responsáveis pelas diferentes páginas e funcionalidades.

As rotas foram separadas em dois grupos principais:

**Rotas de páginas:** responsáveis por disponibilizar os arquivos HTML ou fragmentos utilizados na interface.

**Rotas da API:** responsáveis por receber requisições e retornar dados no formato JSON.

Os controllers foram utilizados para concentrar a lógica de cada funcionalidade, evitando que as operações do banco de dados ficassem diretamente nas definições das rotas.

Essa organização também permitiu separar a apresentação das páginas das operações realizadas sobre os dados.

## 8. Desenvolvimento do frontend

Após estruturar o backend, foi desenvolvido o frontend utilizando HTML, CSS e JavaScript.

O HTML foi utilizado para criar a estrutura das páginas, enquanto o CSS e o Tailwind CSS foram utilizados para definir a aparência dos elementos.

O Tailwind CSS foi integrado utilizando sua versão 4 pelo Browser CDN durante o desenvolvimento.

A biblioteca Lucide também foi adicionada para disponibilizar ícones utilizados nos botões e elementos de navegação.

A interface foi organizada em diferentes páginas, cada uma com uma finalidade específica:

- Login: acesso à aplicação.
- Home: visualização de notas criadas por outros usuários.
- Notes: gerenciamento das notas pessoais.
- Profile: apresentação das informações do usuário e seu histórico.
- Requirements: apresentação do carrossel de imagens.

## 9. Implementação da navegação dinâmica

Uma das etapas importantes do desenvolvimento foi implementar a navegação dinâmica entre as páginas.

Em vez de recarregar toda a aplicação a cada mudança de página, foi criada uma estrutura principal contendo a barra lateral e uma área destinada à apresentação do conteúdo.

O arquivo `navigation.js` ficou responsável por controlar essa navegação.

Para carregar os conteúdos, foi utilizada a função `fetch()`, que realiza uma requisição ao servidor e recupera o HTML correspondente à página solicitada.

Depois de receber a resposta, o conteúdo é inserido na área principal por meio da manipulação do DOM.

Dessa maneira, a barra lateral permanece na tela enquanto o conteúdo principal é atualizado.

Também foi necessário organizar a inicialização das funcionalidades JavaScript após a inserção dos novos conteúdos, garantindo que os formulários, cartões e demais elementos funcionassem corretamente.

## 10. Implementação do gerenciamento de notas

Com a navegação funcionando, foi desenvolvido o sistema de gerenciamento de anotações.

Essa funcionalidade utiliza a comunicação entre o frontend, a API e o banco de dados.

Foram implementadas operações utilizando os seguintes métodos HTTP:

- **GET:** recupera as notas armazenadas.
- **POST:** cria uma nova anotação.
- **PUT:** atualiza uma anotação existente.
- **DELETE:** exclui uma anotação.

A página Home apresenta as notas criadas por outros usuários, enquanto a página Notes apresenta as anotações pertencentes ao usuário autenticado.

Para criar e atualizar notas, foram desenvolvidos formulários que permitem informar o título e o conteúdo da anotação.

Também foram implementadas funcionalidades de exclusão, incluindo uma confirmação antes de remover o registro.

Uma parte importante dessa implementação foi a verificação de propriedade das anotações no backend. Dessa forma, somente o usuário responsável por uma nota pode atualizá-la ou excluí-la, mesmo que outras pessoas consigam visualizar seu conteúdo.

## 11. Implementação da página de perfil

Após implementar o gerenciamento de notas, foi desenvolvida a página Profile.

Essa página utiliza uma requisição à API para recuperar as informações do usuário autenticado.

O nome de usuário é apresentado na interface, juntamente com o histórico de anotações criadas por ele.

Dessa maneira, o usuário consegue visualizar suas próprias atividades dentro da aplicação.

## 12. Implementação do carrossel de imagens

Na página Requirements, foi implementado um carrossel de imagens utilizando HTML e JavaScript.

As imagens foram armazenadas no diretório `public/images`, permitindo que fossem acessadas por meio das rotas de arquivos estáticos do Express.

No frontend, foram criados botões para avançar e retornar entre as imagens.

O JavaScript controla a imagem atualmente apresentada utilizando um índice, que é atualizado a cada interação do usuário.

Quando o índice chega ao final da lista, a navegação retorna à primeira imagem. O mesmo acontece no sentido contrário.

## 13. Implementação da barra lateral

A barra lateral foi desenvolvida para organizar os caminhos de navegação da aplicação.

Além dos botões responsáveis por acessar as páginas, foi implementada uma funcionalidade que permite expandir e recolher o menu.

Essa interação foi desenvolvida utilizando JavaScript e CSS, alterando as classes dos elementos para controlar suas dimensões, visibilidade e animações.

Também foram utilizados ícones da biblioteca Lucide para facilitar a identificação das opções disponíveis.

## 14. Implementação do modo claro e escuro

Outra funcionalidade implementada foi a alternância entre os temas claro e escuro.

Para isso, foi criado o arquivo `theme.js`, responsável por controlar a mudança de tema.

A funcionalidade utiliza a classe `dark` no elemento HTML principal, permitindo que as classes do Tailwind CSS alterem as cores dos componentes.

O estado escolhido pelo usuário é armazenado no `localStorage` do navegador.

Assim, quando a aplicação é atualizada, o JavaScript verifica a preferência armazenada e aplica o tema correspondente.

Foram definidos estilos específicos para os dois modos, preservando a identidade visual da aplicação.

## 15. Responsividade e ajustes da interface

Durante o desenvolvimento, também foram realizados ajustes para permitir a utilização da aplicação em diferentes tamanhos de tela.

Foram utilizadas classes responsivas do Tailwind CSS para modificar dimensões, espaçamentos e organização dos elementos conforme o tamanho do dispositivo.

Os cartões, formulários, títulos e botões foram adaptados para melhorar a visualização em dispositivos móveis.

Também foram realizados ajustes na barra lateral e na área principal para evitar problemas de dimensionamento e rolagem horizontal.

## 16. Testes e correções

Após implementar as principais funcionalidades, foram realizados testes para verificar o funcionamento da aplicação.

Foram testadas operações como cadastro, login, logout, criação de notas, atualização, exclusão e visualização de conteúdos.

Também foram verificados os comportamentos da navegação dinâmica, do carrossel, da barra lateral e da alternância entre os temas.

Durante essa etapa, foram identificados e corrigidos problemas relacionados aos caminhos dos arquivos, carregamento de páginas, atualização dos elementos do DOM e funcionamento dos eventos JavaScript.

Esse processo foi importante para garantir que as diferentes partes da aplicação funcionassem corretamente em conjunto.

## 17. Controle de versões e publicação do código

Durante o desenvolvimento, foi utilizado Git para registrar as alterações realizadas no projeto.

O GitHub foi utilizado para armazenar o repositório remoto, permitindo acompanhar o histórico de desenvolvimento e manter uma cópia do código.

O repositório pode ser acessado pelo seguinte endereço:

https://github.com/Dan1Ems/DI-projeto-final

## 18. Como executar o projeto

Para executar o Danm Notes localmente, é necessário possuir Node.js e npm instalados.

Primeiramente, clone o repositório:

```bash
git clone https://github.com/Dan1Ems/DI-projeto-final.git
```

Acesse o diretório:

```bash
cd DI-projeto-final
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto e configure a variável de ambiente:

```env
SESSION_SECRET=sua_chave_secreta
```

Por fim, inicie o servidor:

```bash
node server.js
```

Depois de iniciar o servidor, acesse a aplicação pelo navegador:

```text
http://localhost:3000
```

## 19. Considerações finais

O desenvolvimento do Danm Notes permitiu aplicar conhecimentos de desenvolvimento frontend e backend, integração com banco de dados, autenticação, gerenciamento de sessões e manipulação dinâmica de páginas.

A separação do projeto em diferentes diretórios e arquivos facilitou a organização das funcionalidades e a manutenção do código.

Além disso, a implementação de recursos como gerenciamento de notas, navegação dinâmica, carrossel de imagens e alternância entre temas contribuiu para construir uma aplicação com diferentes funcionalidades integradas.

O projeto também proporcionou a oportunidade de compreender melhor como as tecnologias utilizadas no desenvolvimento web trabalham em conjunto para formar uma aplicação completa.