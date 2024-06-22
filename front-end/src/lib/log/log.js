// logger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
require('dotenv').config();
require('colors');
const config = require('./log.config.js');

// Custom formatter function
function formatMessage(info) {
  let message = info.message;
  if (info.level === 'error' && info.stack) {
    message = `${info.message} | [DETAILS]: ${info.details && info.details.length ? info.details : 'No specific details'}`;
    const stackLines = info.stack.split('\n').slice(1).join('\n');
    message += stackLines.length > 0 ? `\n${stackLines}` : '';
  }
  return `${info.timestamp} - [${info.level.toUpperCase().padEnd(5)}]: ${message}`;
}

// Color formatter based on level
function colorizeMessage(level, message) {
  switch (level) {
    case 'error': return message.red;
    case 'warn': return message.yellow;
    case 'info': return message.blue;
    default: return message;
  }
}

// Console transport format
const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(info => {
    const formattedMessage = formatMessage(info);
    return colorizeMessage(info.level, formattedMessage);
  }),
  winston.format.colorize(),
  winston.format.align(),
);

// File transport format
const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// Daily rotate file transport
const dailyRotateFileTransport = new DailyRotateFile({
  filename: 'logs/%DATE%-app.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: jsonFormat
});

// Determine log level from environment
const environment = config[process.env.NODE_ENV] ? process.env.NODE_ENV : 'development';
const level = config[environment].console;

// Create and export logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level, format: consoleFormat }),
    dailyRotateFileTransport,
  ],
});

module.exports = logger;
