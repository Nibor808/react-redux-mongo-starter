import moment from 'moment';
import path from 'path';
import winston from 'winston';

const logger = new winston.Logger();

logger.configure({
  exitOnError: false,
  transports: [
    new (winston.transports.Console)({
      level: 'info',
      colorize: true,
    }),
    new (winston.transports.File)({
      filename: path.resolve(__dirname, 'logs/error.log'),
      level: 'error',
      timestamp: () => moment().format('MMM-DD-YYYY HH:mm:ss'),
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ]
});

export default logger;
