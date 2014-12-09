'use strict';

var Mongo  = require('mongodb'),
    fs     = require('fs'),
    path   = require('path'),
    _      = require('underscore');

function Child(mommyId, o, files){
  this._id        = new Mongo.ObjectID();
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
  this.photo      = stashPhoto(files, this._id);
}

Object.defineProperty(Child, 'collection',{
  get: function(){return global.mongodb.collection('children');}
});

Child.create = function(fields, files, cb){
  var c = new Child(fields, files);
  Child.collection.save(c, cb);
};

Child.update = function(child, cb){
  child._id = Mongo.ObjectID(child._id);
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

Child.prototype.save = function(fields, file, cb){
  var properties = Object.keys(fields),
      self       = this;
  properties.firEach(function(property){
    switch(property){
      case 'photo':
        self.photo = stashPhoto(file, self._id);
        break;
      default:
        self[property] = fields[property];
    }
  });
  this._id      = Mongo.ObjectID(this._id);
  this.mommyId  = Mongo.ObjectID(this.mommyId);
  this.dob     = (this.dob) ? (new Date(this.dob)) : '';
  Child.collection.save(this, cb);
};
// HELPER FUNCTIONS

function stashPhoto(files, childId){
  if(files.file){
    var tempPath  = files.file[0].path,
      relDir      = '/img/',
                  absDir      = __dirname + '/../public' + relDir,
                  ext         = path.extname(tempPath),
                  name        = childId + ext,
                  absPath     = absDir + name,
                  relPath     = relDir + name;

    fs.renameSync(tempPath, absPath);
    return relPath;
  } else{
    return ('');
  }
}


module.exports = Child;

