const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const pizzaRouter = require('./routes/pizzas');
const filmsRouter = require('./routes/films');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const tabfilm = [];
const compteurs = [];
app.use((req, res, next) =>{
    const film = `${req.method  } ${  req.path}`;
    const position = tabfilm.indexOf(film);

    // eslint-disable-next-line no-console
    console.log(position);
    if(position === -1){
        tabfilm.push(film);
        compteurs.push(1);
    }
    else{
        // eslint-disable-next-line operator-assignment
        compteurs[position] = compteurs[position]+1
    }
    // eslint-disable-next-line no-console
    console.log("Request counter : ");
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < tabfilm.length; i++){
        console.log(`- ${tabfilm[i]  } : ${  compteurs[i]}`);;
    }
    next();
});

app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/films', filmsRouter);

module.exports = app;
