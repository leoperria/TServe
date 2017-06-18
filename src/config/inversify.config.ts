import {interfaces, TYPE} from 'inversify-express-utils';
import TYPES from '../constants/types';
import TAGS from '../constants/tags';
import {Container} from 'inversify';
import {HomeController} from '../controllers/HomeController';
import {UserRegistry} from '../services/UserRegistry';
import {EmailMessageService, MessageService} from '../services/MessageService';

var appContainer = new Container();
appContainer.bind<MessageService>(TYPES.MessageService).to(EmailMessageService);
appContainer.bind<UserRegistry>(TYPES.UserRegistry).to(UserRegistry);
appContainer.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);

export {appContainer};