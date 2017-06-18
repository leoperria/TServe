import * as winston from 'winston';

export const logger: winston.LoggerInstance = new winston.Logger(<winston.LoggerOptions> {
    exitOnError: false,
    level: 'debug',
    transports: [
        new winston.transports.Console({
            timestamp: true,
            colorize: true
        }),
        new winston.transports.File({filename: './logs/application.log'})
    ]
});

