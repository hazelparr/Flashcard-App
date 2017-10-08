const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//creating the express app
const app = express();


//to set the view engine to pug
app.set('view engine', 'pug');
const port = process.env.PORT || 3000;



//to use the body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

const mainRoutes = require('./routes'); //no need to type in index.js because that's the default file
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes);


app.use(function(req, res, next){
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    //res.locals.error = err; //another way to set err so the template has access
    res.status(err.status);
    res.render('error', {error: err});
});





//set up the server
app.listen(port, function(){
    console.log("Application is running on localhost:3000");
});