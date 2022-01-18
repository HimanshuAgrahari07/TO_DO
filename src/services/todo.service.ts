import runQuery from '../database/Database'
import NewToDo from '../interfaces/newToDo.interface';

class ToDoServices {
  private table: string;

  constructor(table?: string) {
    this.table = table || process.env.DB_TODO_TABLE
  }

  private query = async (query: string): Promise<any> => {
    return await runQuery(query)
  }

  getAllToDos = async () => {
    const query = `Select * from ${this.table}`;
    return await this.query(query)
  }

  getToDoById = async (id: number) => {
    const query = `Select * from ${this.table} where id = ${id}`
    return await this.query(query)
  }

  modifyToDo = async (id: number, todoData: any) => {
    const tableColumns = ['name', 'status', 'isDeleted']

    const regex = tableColumns.join('|')
    const requiredData = Object.entries(todoData).filter(e => e[0].match(regex))
    const queryString = requiredData.map(e => `${e[0]}='${e[1]}'`).join(', ')
    const query = `update ${this.table}
                    set ${queryString}
                    where id = ${id};`

    return await this.query(query)
  }

  createToDo = async (toDoData: NewToDo) => {
    const query = `INSERT INTO ${this.table} (name) VALUES('${toDoData.name}');`

    return await this.query(query)
  }

  deleteToDo = async (id: number) => {
    const query = `update ${this.table}
          set isDeleted = '1'
          where id = ${id}; `

    return await this.query(query);
  }
}

export default ToDoServices;