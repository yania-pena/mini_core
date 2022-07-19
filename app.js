var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conexion  = require('./config/conexion');

var indexRouter= require('./routes/index');
var usuarioRouter = require('./routes/usuarios');
var pasesRouter = require('./routes/pases');
var tiposRouter = require('./routes/tipos');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash());
//app.use(expressValidator());
app.use('',indexRouter);
app.use('/usuarios',usuarioRouter);
app.use('/pases',pasesRouter);
app.use('/tipos',tiposRouter);
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
 // next(createError(404));
//});
// error handler
const PORT = process.env.PORT || 4000 
app.listen(PORT, function() {
  console.log("Servidor escuchando en el puerto",PORT)
 });
module.exports = app;