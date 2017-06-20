import {injectable} from 'inversify';
import uuidv4 = require('uuid/v4');

export interface TodoItemInterface {
    id: string;
    title: string;
    completed: boolean;
}

@injectable()
export class TodoItem {

    public id: string;
    public title: string;
    public completed: boolean;

    constructor(title) {
        this.id = uuidv4();
        this.title = title;
        this.completed = false;
    }
}