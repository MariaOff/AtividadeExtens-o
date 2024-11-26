# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

Aplicativo de Gerenciamento de Produtos

Este aplicativo permite gerenciar um estoque de produtos, com funcionalidades para adicionar, editar e remover produtos, além de alertas quando o estoque de um produto estiver baixo.

Funcionalidades
1.	Listagem de Produtos:
o	Exibe todos os produtos cadastrados no banco de dados SQLite, mostrando nome, quantidade e preço.
o	Os produtos com estoque baixo (quantidade menor que 5) geram um alerta na tela.

2.	Adicionar ou Editar Produto:
o	É possível adicionar um novo produto ou editar a quantidade e o preço de um produto existente.
o	Ao inserir um produto, ele é adicionado à lista e ao banco de dados.

3.	Remover Produto:
o	É possível remover um produto da lista e do banco de dados com um simples clique no ícone de lixeira.

4.	Alerta de Estoque Baixo:
o	Caso algum produto tenha menos de 5 unidades em estoque, um alerta é exibido na parte inferior da tela, indicando o nome do produto com o estoque baixo.

5.	Gerenciamento de Banco de Dados:
o	O banco de dados SQLite é utilizado para armazenar informações de produtos.
o	Ao inicializar o aplicativo, o banco de dados é verificado e, se necessário, migrado para a versão mais recente. Isso garante que a tabela de produtos seja criada corretamente e que o banco de dados esteja sempre atualizado.

Detalhes:
o	A função migrateDbIfNeeded é responsável por verificar e criar a tabela produto, caso ela ainda não exista, além de garantir que o banco de dados esteja na versão correta.
o	A versão do banco de dados é armazenada e, ao iniciar o app, é verificado se há necessidade de migração.

Tecnologias Usadas
•	React Native: Framework para construir a interface do aplicativo.
•	React Native Paper: Biblioteca de componentes UI para facilitar o design.
•	SQLite: Banco de dados local para armazenar informações sobre os produtos.
•	Expo: Framework para facilitar o desenvolvimento e deploy do aplicativo.
•	Expo Font: Para carregar fontes customizadas no aplicativo.
•	Expo Router: Para o gerenciamento de rotas e navegação entre as telas do aplicativo.

Como Funciona a Navegação e o Carregamento

1.	Navegação: O aplicativo usa o expo-router para gerenciar as rotas e telas. A tela principal é carregada utilizando o componente Stack.Screen, e a navegação é configurada para esconder o cabeçalho por padrão.

2.	Splash Screen: O aplicativo usa uma Splash Screen (tela de carregamento) que não é escondida até que todos os recursos, como fontes personalizadas, sejam carregados. Quando as fontes estão carregadas, a splash screen é ocultada.

3.	Banco de Dados: Quando o aplicativo é iniciado, ele garante que o banco de dados esteja configurado corretamente e, se necessário, faz a migração para a versão mais recente.


Estrutura do Projeto:

projeto-produtos/
│
├── assets/               # Arquivos estáticos, como ícones
├── node_modules/         # Dependências do projeto
├── src/                  # Código-fonte do aplicativo
│   ├── models/           # Modelos de dados, como ProdutoModel
│   └── screens/          # Telas do aplicativo, incluindo HomeScreen
├── package.json          # Dependências e scripts do projeto
└── README.md             # Este arquivo

Licença
Este projeto está licenciado sob a MIT License.
