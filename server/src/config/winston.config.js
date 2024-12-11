const { createLogger, format, transports } = require('winston');
const { combine, colorize, timestamp, label, printf, splat } = format;

const config = require('./config');

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    const stack = info.stack.split('\n').slice(0, 3);
    info = { ...info, message: stack };
  }
  return info;
});

const formatLog = printf(({ level, message, label, timestamp }) => {
  return `[ ${timestamp} ] [ ${label} ] [ ${level} ] : ${message}`;
});

const logger = createLogger({
  level: config.app.env === 'development' ? 'debug' : 'info',
  format: format.combine(
    label({ label: 'common' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    enumerateErrorFormat(),
    splat(),
    formatLog
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
      format: combine(colorize(), formatLog)
    })
  ]
});

module.exports = logger;
