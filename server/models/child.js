'use strict';

var Mongo  = require('mongodb'),
    fs     = require('fs'),
    path   = require('path'),
    _      = require('underscore');

function Child(mommyId,o){
  this.mommyId    = Mongo.ObjectID(mommyId);
  this.name       = o.name;
  this.dob        = (o.dob) ? (new Date(o.dob)) : '';
  this.tob        = o.tob;
  this.pab        = o.pab * 1;
  this.oab        = o.oab * 1;
  this.lab        = o.lab * 1;
  this.growth     = [];
  this.milestones = [];
  this.appts      = [];
}

Object.defineProperty(Child, 'collection',{
  get: function(){return global.mongodb.collection('children');}
});

Child.create = function(user, o, cb){
  var c = new Child(user, o);
  Child.collection.save(c, cb);
};

Child.update = function(child, cb){
  child._id = Mongo.ObjectID(child._id);
  console.log('CHILD', child);
  child.mommyId = Mongo.ObjectID(child.mommyId);
  child.dob = (child.dob) ? (new Date(child.dob)) : '';
  Child.collection.save(child, cb);
};

Child.findChild = function(userId, cb){
  Child.collection.find({mommyId:userId}).toArray(cb);
};

Child.all = function(cb){
  Child.collection.find().toArray(cb);
};

Child.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Child.collection.findOne({_id:_id}, function(err, obj){
    var child = Object.create(Child.prototype);
    child = _.extend(child, obj);
    cb(err, child);
  });
};

// HELPER FUNCTIONS

Child.prototype.stashPhoto = function(file){

  if(!file.size){return;}

  var stashDir  = __dirname + '/../public/img/',
      ext       = path.extname(file.path),
      name      = this._id + ext,
      stashPath = stashDir + name;

  fs.renameSync(file.path, stashPath);
  return stashPath;
};

module.exports = Child;

