import {Request} from 'express';
import {inject, injectable} from 'inversify';
import TYPES from '../constants/types';
import {Controller, Delete, Get, Post, Put} from 'inversify-express-utils';
import {TodoRegistry} from '../services/TodoRegistry';
import {TodoItem, TodoItemInterface} from '../models/TodoItem';

@injectable()
@Controller('/todo')
export class TodoItemsController {

    constructor(@inject(TYPES.TodoRegistry) private todoRegistry: TodoRegistry) {
    }

    @Get('/')
    public getAllItems(): TodoItemInterface[] {
        return this.todoRegistry.getItems();
    }

    @Get('/:id')
    public getItem(request: Request): TodoItemInterface {
        return this.todoRegistry.getItem(request.params.id);
    }

    @Post('/')
    public newUser(request: Request): TodoItemInterface {
        return this.todoRegistry.addItem(new TodoItem(request.body.title));
    }

    @Put('/:id')
    public updateUser(request: Request): TodoItemInterface {
        return this.todoRegistry.updateItem(request.params.id, request.body);
    }

    @Delete('/:id')
    public deleteUser(request: Request): TodoItemInterface {
        return this.todoRegistry.deleteItem(request.params.id);
    }

}