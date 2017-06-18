import 'reflect-metadata';
import {appContainer} from './config/inversify.config';
import {core} from './core/Core';

// Bootstraps the application
core.bootstrap(appContainer);
