const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { xss } = require('express-xss-sanitizer');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');

const config = require('./config/config');
const morgan = require('./config/morgan.config');
const { errorHandler } = require('./middlewares').error;
const router = require('./routes/v1');
const ApiError = require('./utils/ApiError');
const logger = require('./config/winston.config');
const { register } = require('./metrics');

const app = express();
const httpServer = createServer(app);

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// gzip compression
app.use(compression());
// enable cors
app.use(cors());
// set security HTTP headers
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(xss());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// parse json request body
app.use(express.json());

// expose cookies to req.cookies
app.use(cookieParser());

// health check
app.get('/', (_, res) => {
  res.send('Hello World! 🌍');
});

// metrics
app.use('/metrics', async (_, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    logger.error('Exception occurred', err.stack);
    res.status(500).end('An internal server error occurred');
  }
});

// api v1 routes
app.use('/api/v1', router);
// api not found
app.all('*', (req, _, next) => {
  return next(new ApiError(httpStatus.NOT_FOUND, `Not found ${req.method} ${req.url}`));
});

// Errors handler
app.use(errorHandler);

httpServer.listen(config.app.port, () => {
  logger.info(`✨ ${config.app.name} is running at http://localhost:${config.app.port}`);
});
