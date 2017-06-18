import {InversifyExpressServer} from 'inversify-express-utils';
import {Container} from 'inversify';
import * as http from 'http';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as chalk from 'chalk';
import * as helmet from 'helmet';
import {logger} from './Log';
import {serverBanner} from './server_banner';

export class Core {

    public app: express.Application;
    public server: http.Server;
    public inversifyExpressServer: InversifyExpressServer;
    public container: Container;

    public bootstrap(container: Container): void {
        logger.info('Application starting... ');
        this.container = container;
        this.setupServer();
        this.startServer();
    }

    private setupServer() {
        this.app = express();

        //  Uses middlewares
        this.app
            .set('host', 'http://localhost')
            .set('port', 8888)
            .use(helmet())
            .use(helmet.noCache())
            .use(compression())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            // Logging web service requests
            .use(morgan('dev', {
                stream: {
                    write: (message: any, encoding: any): void => {
                        logger.debug(message);
                    }
                }
            }))
            // Serve static assets
            .use(express.static(`${__dirname}/../public`));
    }

    private startServer(): void {

        // Configure InversifyExpressServer
        logger.info('IoC configuration');
        this.inversifyExpressServer = new InversifyExpressServer(this.container, null, {rootPath: '/api/v1'}, this.app);
        try {
            this.app = this.inversifyExpressServer.build();
        } catch (e) {
            logger.error(e.message);
            process.exit(1);
        }

        // Starts the Web service
        logger.info('HTTP Server starting');
        this.server = this.app.listen(this.app.get('port'));

        // Event listeners
        this.server.on('listening', () => {
            this.onStartUp();
        });
        this.server.on('error', (error) => {
            this.onError(error);
        });

    }

    private onStartUp(): void {
        console.log(chalk.blue(serverBanner));
        console.log(chalk.green(`Application is listening ${this.app.get('host')}:${this.app.get('port')}`));
        console.log(chalk.green(`To shut it down, press <CTRL> + C `));
        console.log(``);
    }

    private onError(error: any): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const addr = this.server.address();
        switch (error.code) {
            case 'EACCES':
                logger.error(`${addr} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`Port is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

}

export const core: Core = new Core();

