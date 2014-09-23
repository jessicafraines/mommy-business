'use strict';

var Mongo  = require('mongodb');
  //  _      = require('underscore');

function Child(ownerId,o){
  this.ownerId  = Mongo.ObjectID(ownerId);
  this.name     = o.name;
  this.dob      = (o.dob) ? (new Date(o.dob)) : '';
  this.tob      = o.tob;
  this.pab      = o.pab * 1;
  this.oab      = o.oab * 1;
  this.lab      = o.lab * 1;
  this.moments  = o.moments;
}

Object.defineProperty(Child, 'collection',{
  get: function(){return global.mongodb.collection('children');}
});

Child.create = function(user, o, cb){
  console.log('USER', user);
  console.log('O', o);
  var c = new Child(user, o);
  console.log('C', c);
  Child.collection.save(c, cb);
};

Child.findChild = function(userId, cb){
  Child.collection.find({ownerId:userId}).toArray(cb);
};

Child.all = function(cb){
  Child.collection.find().toArray(cb);
};


module.exports = Child;

