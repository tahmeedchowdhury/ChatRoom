const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const database = require('./src/Config/keys').mongoURI;
const User = require('./src/Models/user');
const mongodb = require('mongodb');
const { request } = require("express");
const Post = require('./src/Models/post');
const post = require("./src/Models/post");

//mongoose connection
mongoose.connect(database).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err);
}); 

//bodyparser
  app.use(bodyParser.json());
  app.use(express.json());

//port listening
app.listen(3000);

//Post method for logging in
app.post("/login", (req,res) => {
  User.findOne({username: req.body.username, password: req.body.password}, (err,doc) => {
    res.json(doc);
  }); 
});


//POST method for registering
app.post("/register", (req,res) => {
  if(req.body.username == ""|| req.body.password == "") {
    res.json(false);
    return;
  }
  User.findOne({username: req.body.username}, (err,doc) => {
    if(err) {
      console.log(err);
    }
    else {
      if(doc == null) {
        User.create({username: req.body.username, password: req.body.password});
        res.json(true);
      }
      else {
        res.json(false)
      }
    }
  })
});

//POST method for posting
app.post("/post", (req,res) => {
  Post.create({username: req.body.username, info: req.body.info, comments: []}).catch((err) => {
    console.log(err);
  });
  res.end();

}); 

app.post("/retrieve", (req,res) => {
  Post.find({username: req.body.username}, (err,docs) => {
    if(err) {
      console.log(err);
    } 
    else {
      res.json(docs);
    }; 
});
});

app.get("/retrieve2", (req,res) => {
  Post.find({},(err,docs) => {
    if(err) {
      console.log(err);
    }
    else {
      res.json(docs);
    }
  });
});

