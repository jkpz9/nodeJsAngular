// neccessary package
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    // expressValidator = require('express-validation'),
    mongoose = require('mongoose'),
    app = express(),
    cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/crud_students');

var db = mongoose.connection;
 db.on('ready',function() {
        console.log('database connected');
    });

// use it before all routes definitions 
app.use(cors({origin: 'http://localhost:4200'}));
// import routes
var index = require('./routes/index'),
    students = require('./routes/students');

// view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// static assets
app.use(express.static(path.join(__dirname, 'client')));

// body Parser setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// allow validate req.body
// app.use(expressValidator);

// use routes
app.use('/', index);
app.use('/api', students);

var port = process.env.PORT || 3000;

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.use((err, req, res, next) => {
  console.log(err.stack || err.message);
  if (res.headersSent)
    return next(err)
  res.status(500).send('Internal Server Error')
});

app.listen(port, function(){
  console.log('Server operating on port '+port);
});
