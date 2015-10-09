var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require("./models");
var methodOverride = require("method-override");
var morgan = require("morgan");


app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
//server-side logger.  Logs requests to the terminal
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));






    /*****USERS****/

//ROOT
app.get("/", function (req,res){
  db.Todo.find({}, function (err, todos){
  res.render("index", {todos: todos});
  });
});


//CREATE
app.post("/todos", function (req,res){
  var date = new Date();
  db.Todo.create({
    date: date,
    task: req.body.input //grab the form data from the DOM
  });
  db.Todo.find({}, function (err, todos){ 
    res.format({
      'application/json': function(){
        res.send({todos:todos});  //sending back 11am forecast
      },
      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

//EDIT
app.get("/todos/:id/edit", function (req,res){
});

//UPDATE
app.put("/todos/:id", function (req,res){
});

//DESTROY ALL
app.delete("/clear", function (req, res){
  db.Todo.remove({}, function (err, todos){
    if(err){
      console.log(err);
    }
  });
});

//DESTROY
app.delete("/todos/:id", function (req,res){
  // db.Todo.findByIdAndRemove(req.)
});

//CATCH ALL
app.get('*', function(req,res){
  res.render('404');
});


// start the server
app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
  });