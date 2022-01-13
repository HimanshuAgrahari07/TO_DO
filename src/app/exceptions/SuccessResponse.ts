import HttpException from './HttpException';
import { SucessResponse } from './../utils/const';

class SuccessResponse extends HttpException {
  constructor() {
    super(SucessResponse.Sucess.error);
  }
}

export default SuccessResponse;
