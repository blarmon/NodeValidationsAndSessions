var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require("body-parser"),
    hbs = require('express-handlebars'),
    expressSession = require('express-session'),
    expressValidator = require('express-validator');

//set up my templating engine and views directory
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(expressValidator());
app.use(expressSession( { secret: "chris", saveUninitialized: false, resave: false } ));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

app.get('/:email/:password', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors, email: req.params.email, password: req.params.password });
  req.session.errors = null;
});

app.post('/submit', function(req, res, next) {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  var email = req.body.email;
  var password = req.body.password;
  res.redirect('/' + email + '/' + password);
});


//404 handling!

app.use(function(req, res, next) {
    res.status(404);
    res.end('route is not defined, sorry.')
})

app.listen(8080, function() {
    console.log('listening on 8080');
});