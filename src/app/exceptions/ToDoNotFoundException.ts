import HttpException from './HttpException';
import { GenericError } from './../utils/const';

class ToDoNotFoundException extends HttpException {
  constructor(id: string) {
    super(GenericError.NotFoundError.error);
  }
}

export default ToDoNotFoundException;
