// https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

// ====================START==> Middle ware for Any Unmatched Routes =================
// app.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found IN SERVER JS'})
// });
app.get('*', (req, res)=>{
    res.status(404).send({url: req.originalUrl + ' not found'})
})

// ==================== Middle ware for Any Unmatched Routes END=================
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
