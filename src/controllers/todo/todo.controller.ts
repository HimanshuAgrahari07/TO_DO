import { Request, Response, NextFunction, Router } from 'express';
import { SuccessResponse, GenericError } from '../../utils/const';
import HttpException from '../../exceptions/HttpException';
import TodoErrors from '../../errors/error';
import NewToDo from '../../interfaces/newToDo.interface'
import ToDoServices from '../../services/todo.service'

class ToDoController {
  private table = process.env.DB_TODO_TABLE
  private services = new ToDoServices(this.table);

  getAllToDos = async (request: Request, response: Response, next: NextFunction) => {
    const toDos = await this.services.getAllToDos().catch(err => next(new HttpException(err.message)));

    SuccessResponse(request, response, toDos)
  }

  getToDoById = async (request: Request, response: Response, next: NextFunction) => {
    const id = Number(request.params.id);
    const toDo = await this.services.getToDoById(id).catch(err => next(new HttpException({ ...GenericError.ServerError.error, message: err.message })));

    if (toDo && toDo.length > 0) {
      SuccessResponse(request, response, toDo)
    } else {
      next(new TodoErrors(GenericError.NotFoundError.error));
    }
  }

  modifyToDo = async (request: Request, response: Response, next: NextFunction) => {
    const id = Number(request.params.id);
    const todoData = request.body;

    const todo = await this.services.modifyToDo(id, todoData).catch(err => next(new HttpException({ ...GenericError.ServerError.error, message: err.message })))

    if (todo) {
      SuccessResponse(request, response, todo)
    } else {
      next(new HttpException(GenericError.NotFoundError.error));
    }
  }

  createToDo = async (request: NewToDo, response: Response, next: NextFunction) => {
    const toDoData: NewToDo = request.body;
    const responseFromDB = await this.services.createToDo(toDoData).catch(err => next(new HttpException({ ...GenericError.ServerError.error, message: err.message })));

    if (responseFromDB) {
      SuccessResponse(request, response, responseFromDB)
    } else {
      next(new HttpException(GenericError.NotFoundError.error));
    }
  }

  deleteToDo = async (request: Request, response: Response, next: NextFunction) => {
    const id = Number(request.params.id);
    const successResponse = await this.services.deleteToDo(id).catch(err => next(new HttpException({ ...GenericError.ServerError.error, message: err.message })));

    if (successResponse) {
      SuccessResponse(request, response, successResponse)
    } else {
      next(new HttpException(GenericError.NotFoundError.error));
    }
  }
}

export default ToDoController;
