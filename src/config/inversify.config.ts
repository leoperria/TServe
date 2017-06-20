import {interfaces, TYPE} from 'inversify-express-utils';
import TYPES from '../constants/types';
import TAGS from '../constants/tags';
import {Container} from 'inversify';
import {TodoItemsController} from '../controllers/TodoController';
import {TodoRegistry} from '../services/TodoRegistry';

var appContainer = new Container();

// TodoRegistry will be a signleton to store items from one call to the other
appContainer.bind<TodoRegistry>(TYPES.TodoRegistry).toConstantValue(new TodoRegistry());

appContainer.bind<interfaces.Controller>(TYPE.Controller).to(TodoItemsController).whenTargetNamed(TAGS.TodoItemsController);

export {appContainer};