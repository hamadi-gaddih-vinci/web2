var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


let tabfilm = [];
let compteurs = [];
app.use((req, res, next) =>{
    let film = req.method + " " + req.path;
    let position = tabfilm.indexOf(film);

    console.log(position);
    if(position === -1){
        tabfilm.push(film);
        compteurs.push(1);
    }
    else{
        compteurs[position] = compteurs[position]+1
    }
    console.log("Request counter : ");
    for(let i = 0; i < tabfilm.length; i++){
        console.log("- "+tabfilm[i] + " : " + compteurs[i]);;
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);

module.exports = app;
