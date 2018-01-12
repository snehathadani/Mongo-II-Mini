const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models.js');

const port = process.env.PORT || 3000;

const server = express();
require('./db/connection.js');

// error status code constants
const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

// Your API will be built out here. write a 'get' request to '/users' that simply returns all the peopel.

server.get('/users', (req, res) => {
Person.find({})
.then ((users) =>{
  res.json(users);
})
.catch((error) => {
  res.status(STATUS_SERVER_ERROR).json({'Error getting your users' : error});
  return;
})
});
/*server.get('/users', function(req,res){
  Person.find().then(function(users){
    res.status(200).json(users);
  });
});*/

server.get('/users/:direction', (req, res)=> {
  const { direction } = req.params;// asc or desc
  Person.find({})
  .sort({'firstName':direction})
  .exec((err, sortedUsers)=> {
  if (err) {
    res.status(STATUS_USER_ERROR).json({'Error getting/ sorting your users: ' :err});
    return;
  }
  res.json(sortedUsers);
  });
});

server.get('/user-get-friends/:id', (req, res)=>{
const { id } = req.params;
Person.findById(id)
  .select('friends')
  .exec((err, friends)=> {
    if (err) {
      res.status(422).json({ 'Could not find any user by that data' : err});
      return;
    }
    res.json(friends);

  });
});
server.put ('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  console.log (req.body);
  Person.findByIdAndUpdate(id, {firstName, lastName})
  .exec((err, updatedUser) => {
    if (err) {
      res.status(422).json ({'Could not find user by that id: ' : err});
      return;
    }
    res.json(updatedUser);
  
  });
});

/* eslint no-console: 0 */

    server.listen(port, ()=> console.log('API running'));
   