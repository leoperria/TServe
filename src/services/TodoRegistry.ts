import {injectable} from 'inversify';
import {TodoItemInterface} from '../models/TodoItem';

@injectable()
export class TodoRegistry {

    private todoStorage: TodoItemInterface[] = [];

    public getItems(): TodoItemInterface[] {
        return this.todoStorage;
    }

    public getItem(id: string): TodoItemInterface {
        let result: TodoItemInterface;
        this.todoStorage.map(item => {
            if (item.id === id) {
                result = item;
            }
        });
        return result;
    }

    public addItem(todoItem: TodoItemInterface): TodoItemInterface {
        this.todoStorage.push(todoItem);
        return todoItem;
    }

    public updateItem(id: string, todoItem: TodoItemInterface) {
        this.todoStorage.map((item, index) => {
            if (item.id === id) {
                this.todoStorage[index] = todoItem;
            }
        });
        return todoItem;
    }

    public deleteItem(id: string): TodoItemInterface {
        let itemToBeDeleted=this.getItem(id);
        let updatedStorage: TodoItemInterface[] = [];
        this.todoStorage.map(item => {
            if (item.id !== id) {
                updatedStorage.push(item);
            }
        });
        this.todoStorage = updatedStorage;
        return itemToBeDeleted;
    }

}