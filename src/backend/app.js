var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql2 = require('mysql2')
var checkParam = require('./routes/checkParam')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');

var app = express();

// 引入路由
var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var userRouter = require('./routes/users')
var projectRouter = require('./routes/project')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 允许所有来源的请求
app.use(cors());

// 其他服务器配置

// 启动服务器
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

// 配置路由
app.use('/', indexRouter)
app.use('/main', indexRouter)
app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/project', checkParam("project"))

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;