var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var data = require('./movies.js');

app.use('/',() => {
    console.log('Hello World');
    return 'HELLO WELCOME'
});

app.use('/movies',data);

app.listen(8080, () => {
    console.log('app listening at PORT 8080')
});
