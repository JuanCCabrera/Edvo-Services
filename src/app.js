import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'babel-polyfill';
import 'react-router';
import auth0Client from './Auth';

//backend info
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var plansRouter = require('./routes/plans');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/plans', plansRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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

//end of backendinfo











const store = configureStore();

class App extends React.Component{
    async componentDidMount() {
        try{
            await auth0Client.silentAuth();
            this.forceUpdate();
        }catch(err){
            if(err.error === 'login_required') return;
            console.log(err.error);
        }
    }

    render() {
            return(
                <Provider store={store}> 
                    <AppRouter/>
                </Provider>
            );
        }

}

ReactDOM.render(<App/>, document.getElementById('root'));




