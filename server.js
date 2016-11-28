var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require("body-parser"),
    hbs = require('express-handlebars');

//set up my templating engine and views directory
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res, next) {
    res.render('index', { title: "title handled by handlebars", myCondition: true, myArray: [1,3,6,10] });
});

app.get('/test/:id', function(req, res, next) {
   res.end('You accessed this page via a GET request. \n id: ' + req.params.id); 
});

app.post('/test/submit', function(req, res, next) {
    console.log('id: ' + req.body.id);
    var id = req.body.id;
    res.redirect('test/' + id);
});


//404 handling!


app.listen(8080, function() {
    console.log('listening on 8080');
});