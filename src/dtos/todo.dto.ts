import { IsNumber, IsString } from 'class-validator';

class CreateToDo {
  @IsString()
  public name: string;

  @IsString()
  public status: string;

  @IsNumber()
  public isDeleted: string;
}

export default CreateToDo;
