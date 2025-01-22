const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, errors } = format;

// Ensure log directories exist
const logTypes = ['access', 'detail', 'level'];
logTypes.forEach(type => {
  const dir = path.join(__dirname, '..', 'logs', type);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Custom format for date
const customTimestamp = format((info) => {
  info.timestamp = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return info;
});

// Define custom log format for access logs
const accessLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

// Define custom log format for detailed logs
const detailLogFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let logMessage = `${timestamp} ${level.toUpperCase()}: ${message}`;
  if (Object.keys(metadata).length) {
    logMessage += ` | ${JSON.stringify(metadata)}`;
  }
  return logMessage;
});

// Create transports for each log type
const createTransport = (type, format) => {
  return new transports.DailyRotateFile({
    filename: path.join(__dirname, '..', 'logs', type, `%DATE% ${type}.log`),
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '200m',
    maxFiles: '14d',
    format: combine(
      customTimestamp(),
      format
    )
  });
};

// Create logger
const logger = createLogger({
  transports: [
    createTransport('access', accessLogFormat),
    createTransport('detail', combine(errors({ stack: true }), detailLogFormat)),
    createTransport('level', printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    }))
  ]
});

// Middleware to log request and response details
logger.requestLogger = (req, res, next) => {
  const { method, url, ip } = req;

  logger.info(`${method} ${url}`, { ip });

  const start = Date.now();
  const originalSend = res.send;

  res.send = function (data) {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusMessage = res.statusMessage;

    logger.info('Outgoing Response', {
      method,
      url,
      status,
      statusMessage,
      duration: `${duration}ms`,
      responseData: data,
      responseHeaders: res.getHeaders()
    });

    return originalSend.call(this, data);
  };

  next();
};

// Set up cron job to rotate logs daily
cron.schedule('0 0 * * *', () => {
  logger.info('Rotating logs for a new day');
  logTypes.forEach(type => {
    const transport = logger.transports.find(t => t.name === 'dailyRotateFile' && t.dirname.includes(type));
    if (transport) {
      transport.rotate();
    }
  });
});

module.exports = logger;


//     Creates a new file daily with the format "DD-MM-YYYY type.log"
// Limits each file to 200MB
// Keeps logs for 14 days
// Automatically creates new parts (e.g., "28-08-2024 detail-1.log") if a file exceeds 200MB

    // 3 level honge, 
    //1 level sent to user that we will sent to user , normal file (name: access.log), all log single line statement 
    //2 level , 2 level sent to all logs but in detail  (name: detail.log)
    // log rotation of both the L1, L3
    // 3 level extra (error.log)


// Numerical         Severity
//              Code

//               0       Emergency: system is unusable
//               1       Alert: action must be taken immediately
//               2       Critical: critical conditions
//               3       Error: error conditions
//               4       Warning: warning conditions
//               5       Notice: normal but significant condition
//               6       Informational: informational messages
//               7       Debug: debug-level messages
