const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');

const inventoryRouter = require('./routes/inventoryRoutes');
const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');
const supplierRouter = require('./routes/supplierRoutes');
const viewRouter = require('./routes/viewRoutes');
const clientRouter = require('./routes/clientRoutes');
const projectManagerRouter = require('./routes/projectManagerRoute');
const siteManagerRouter = require('./routes/siteManagerRoutes');
const historyRouter = require('./routes/historyRoutes');
const projectRouter = require('./routes/projectRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.use(helmet({ contentSecurityPolicy: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'thickness',
      'quantity',
      'length',
      'width',
      'finish',
      'grain',
      'area',
    ],
  }),
);

app.use('/', viewRouter);
app.use('/api/v1/inventory', inventoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/suppliers', supplierRouter);
app.use('/api/v1/client', clientRouter);
app.use('/api/v1/projectManager', projectManagerRouter);
app.use('/api/v1/siteManager', siteManagerRouter);
app.use('/api/v1/history', historyRouter);
app.use('/api/v1/projects', projectRouter);

// Middleware to ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.all('*', (req, res, next) => {
  const throwing = new AppError(
    `Cannot find ${req.originalUrl} on the server.`,
    404,
  );
  next(throwing);
});

app.use(globalErrorHandler);

module.exports = app;
