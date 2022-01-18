import { Request, Response, NextFunction, Router } from 'express';
import { SuccessResponse, GenericError } from '../../utils/const';
import HttpException from '../../exceptions/HttpException';
import TodoErrors from '../../errors/error';
import NewToDo from '../../interfaces/newToDo.interface';
import runQuery from '../../configs/Database'

class ToDoController {
  private runQuery = runQuery;
  private table = process.env.DB_TODO_TABLE

  getAllToDos = async (request: Request, response: Response, next: NextFunction) => {
    const query = `Select * from ${this.table}`;
    const toDos = await this.runQuery(query).catch(err => next(new HttpException(err.message)));
    SuccessResponse(request, response, toDos)
  }

  getToDoById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const query = `Select * from ${this.table} where id = ${id}`
    const toDo = await this.runQuery(query).catch(err => next(new HttpException({...GenericError.ServerError.error, message: err.message})));

    if (toDo && toDo.length > 0) {
      SuccessResponse(request, response, toDo)
    } else {
      next(new TodoErrors(GenericError.NotFoundError.error));
    }
  }

  modifyToDo = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const todoData = request.body;
    const tableColumns = ['name', 'status', 'isDeleted']

    const regex = tableColumns.join('|')
    const requiredData = Object.entries(todoData).filter(e => e[0].match(regex))
    const queryString = requiredData.map(e => `${e[0]}='${e[1]}'`).join(', ')
    const query = `update ${this.table}
                  set ${queryString}
                  where id = ${id};`

    const todo = await this.runQuery(query).catch(err => next(new HttpException({...GenericError.ServerError.error, message: err.message})))

    if (todo) {
      SuccessResponse(request, response, todo)
    } else {
      next(new HttpException(GenericError.NotFoundError.error));
    }
  }

  createToDo = async (request: NewToDo, response: Response, next: NextFunction) => {
    const toDoData: NewToDo = request.body;
    const query = `INSERT INTO ${this.table} (name) VALUES('${toDoData.name}'); `
    const responseFromDB = this.runQuery(query).catch(err => next(new HttpException({...GenericError.ServerError.error, message: err.message})));
    if (responseFromDB) {
      SuccessResponse(request, response, responseFromDB)
    } else {
      next(new HttpException(GenericError.NotFoundError.error));
    }
  }

  deleteToDo = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const query = `update ${this.table}
        set isDeleted = '1'
        where id = ${id}; `

    const successResponse = await this.runQuery(query).catch(err => next(new HttpException({...GenericError.ServerError.error, message: err.message})));

    if (successResponse) {
      SuccessResponse(request, response, successResponse)
    } else {
      next(new HttpException(GenericError.NotFoundError.error));
    }
  }
}

export default ToDoController;
