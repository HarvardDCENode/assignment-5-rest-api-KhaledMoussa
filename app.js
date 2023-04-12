//app.js

var express = require('express');
var path = require('path');
var url = require('url');
var users = require('./routes/users');
var photos = require('./routes/photos');
var apiphotos = require('./routes/api/api-photos');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//connect to mongoose
mongoose.connect('mongodb+srv://user:pass@project.qp7byej.mongodb.net/test?retryWrites=true&w=majority' , {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
  res.end('Root Requested!');

});

app.use('/users', users);
app.use('/photos', photos);
app.use('/api/photos', apiphotos);





app.use((req, res)=>{
  res.status(404);
  res.redirect('/404page.html')
});




module.exports = app;
