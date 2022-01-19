const express = require('express')
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    es6Renderer = require('express-es6-template-engine'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const logsRouter = require('./routes/logs');
const myLogsRouter = require('./routes/myLogs');
const myProfileRouter = require('./routes/myprofile');
const chemicalRouter = require('./routes/chemical');

const app = express();

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new FileStore(),
    secret: 'get rad',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logs', logsRouter);
app.use('/myLogs', myLogsRouter);
app.use('/myprofile', myProfileRouter);
app.use('/chemical', chemicalRouter);

module.exports = app;
