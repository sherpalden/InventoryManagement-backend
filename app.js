const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//connect to database
require('./configs/dbconfigs');

const app = express();





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//this is the first middleware - application middleware , all routes hit this middleware first
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
    next(); // next passes to another application middleware 
});

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//database models
require('./models/userModel');
require('./models/activeUserModel');
require('./models/categoryModel');
require('./models/productModel');
require('./models/unitModel');
require('./models/batchModel');
require('./models/customerModel');
require('./models/salesDetailsModel');
require('./models/salesTransactionModel');


//routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/category', categoryRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

const unitRoutes = require('./routes/unitRoutes');
app.use('/unit', unitRoutes);

const batchRoutes = require('./routes/batchRoutes');
app.use('/batch', batchRoutes);

const salesRoutes = require('./routes/salesRoutes');
app.use('/sales', salesRoutes);



//redirect to secure server though tried to access from unsecured server....
app.all('*', (req, res, next) => {
    if(req.secure){
        return next();
    }else{
        res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    }
})

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
