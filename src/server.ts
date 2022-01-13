import 'dotenv/config';
import App from './app';
import TodoController from './app/controllers/todo/todo.controller';

const app = new App(
  [
    new TodoController(),
  ],
);

app.listen();
