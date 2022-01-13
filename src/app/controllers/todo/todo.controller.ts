import { Request, Response, NextFunction, Router } from 'express';
import ToDoNotFoundException from '../../exceptions/ToDoNotFoundException';
import InternalServerError from '../../exceptions/InternalServerError';
import SuccessResponse from '../../exceptions/SuccessResponse';
import Controller from '../../interfaces/controller.interface';
import ToDo from './todo.interface';
import NewToDo from '../../interfaces/newToDo.interface';
import runQuery from '../../config/Database'

class ToDoController implements Controller {
  public path = '/todo';
  public router = Router();
  private runQuery = runQuery;
  private table = process.env.DB_TODO_TABLE

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllToDos);
    this.router.get(`${this.path}/:id`, this.getToDoById);
    this.router
      .delete(`${this.path}/:id`, this.deleteToDo)
      .put(`${this.path}/:id`, this.modifyToDo)
      .post(this.path, this.createToDo);
  }

  private getAllToDos = async (request: Request, response: Response, next: NextFunction) => {
    const query = `Select * from ${this.table}`;
    const toDos = await this.runQuery(query).catch(err => next(new InternalServerError(err.message)));
    response.send(toDos);
  }

  private getToDoById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const query = `Select * from ${this.table} where id = ${id}`
    const toDo = await this.runQuery(query).catch(err => next(new InternalServerError(err.message)));

    if (toDo && toDo.length > 0) {
      response.send(toDo);
    } else {
      next(new ToDoNotFoundException(id));
    }
  }

  private modifyToDo = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const todoData: ToDo = request.body;

    const tableColumns = ['name', 'status', 'isDeleted']

    const regex = tableColumns.join('|')
    const requiredData = Object.entries(todoData).filter(e => e[0].match(regex))
    const queryString = requiredData.map(e => `${e[0]}='${e[1]}'`).join(', ')
    const query = `update ${this.table}
                  set ${queryString}
                  where id = ${id};`

    const todo = await this.runQuery(query)
      .catch(err => next(new InternalServerError(err.message)))

    if (todo) {
      next(new SuccessResponse())
    } else {
      next(new ToDoNotFoundException(id));
    }
  }

  private createToDo = async (request: NewToDo, response: Response, next: NextFunction) => {
    const toDoData: NewToDo = request.body;
    const query = `INSERT INTO ${this.table} (name) VALUES('${toDoData.name}'); `
    this.runQuery(query)
      .then(data => {
        if (data) {
          next(new SuccessResponse())
        } else {
          next(new InternalServerError());
        }
      })
      .catch(err => next(new InternalServerError(err.message)));
  }

  private deleteToDo = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const query = `update ${this.table}
        set isDeleted = '1'
        where id = ${id}; `

    const successResponse = await this.runQuery(query).catch(err => next(new InternalServerError(err.message)));

    if (successResponse) {
      next(new SuccessResponse())
    } else {
      next(new ToDoNotFoundException(id));
    }
  }
}

export default ToDoController;
