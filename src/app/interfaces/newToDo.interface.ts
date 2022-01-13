import { Request } from 'express';

interface NewToDo extends Request {
  name: string;
}

export default NewToDo;
