'use strict';

var Child = require('../models/child');
   // Mongo   = require('mongodb');

exports.update = function(req, res){
  Child.update(req.body, function(err, child){
      res.status(200).end();
  });
};

exports.show = function(req, res){
  Child.findById(req.params.childId, function(err, child){
    res.send({child:child});
  });
};

exports.create = function(req, res){
  Child.create(req.user._id, req.body, function(err, child){
    res.send({child:child});
  });
};

exports.index = function(req, res){
  Child.findChild(req.user._id, function(err, children){
    res.send({children:children});
  });
};

