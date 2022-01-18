import { Router } from 'express';
import RoutersI from '../interfaces/router.interface';
import TodoController from './../controllers/todo/todo.controller';

class ToDoRoutes implements RoutersI {
    public router: Router;
    public path = '/todo';
    private todoController = new TodoController();
    private getAllToDos = this.todoController.getAllToDos;
    private getToDoById = this.todoController.getToDoById;
    private deleteToDo = this.todoController.deleteToDo;
    private modifyToDo = this.todoController.modifyToDo;
    private createToDo = this.todoController.createToDo;

    constructor() {
        this.router = Router()
        this.initRoute();
    }

    private initRoute() {
        this.router.get(this.path, this.getAllToDos);
        this.router.get(`${this.path}/:id(\\d+)`, this.getToDoById);
        this.router
            .delete(`${this.path}/:id(\\d+)`, this.deleteToDo)
            .put(`${this.path}/:id(\\d+)`, this.modifyToDo)
            .post(this.path, this.createToDo);
    }
}

export default ToDoRoutes;