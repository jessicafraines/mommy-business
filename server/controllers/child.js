'use strict';

var Child = require('../models/child');
   // Mongo   = require('mongodb');

exports.create = function(req, res){
  console.log('RUI', req.user._id);
  console.log('RDB', req.body);
  Child.create(req.user._id, req.body, function(err, child){
    res.send({child:child});
  });
};

exports.index = function(req, res){
  Child.findChild(req.user._id, function(err, children){
    res.send({children:children});
  });
};

