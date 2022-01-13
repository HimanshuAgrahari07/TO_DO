import HttpException from './HttpException';
import { GenericError } from './../utils/const';

class InternalServerError extends HttpException {
  constructor(message?: string) {
    const msgText = `Something went wrong${message ? ` - ${message}` : ''}`
    super({...GenericError.ServerError.error, message: msgText});
  }
}

export default InternalServerError;
