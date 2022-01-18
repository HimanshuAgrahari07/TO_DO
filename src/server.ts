import 'dotenv/config';
import App from './app';
import ToDoRoutes from './routes/Todo'

const app = new App([
    new ToDoRoutes()
]);

app.listen();
