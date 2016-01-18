var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://115.68.30.98:27017/sudda';
//var db;


 
var server = new mongodb.Server(
    '115.68.30.98',
    27017,
    {auto_reconnect:true, poolSize:250});
var db = new mongodb.Db('sudda', server);

exports.connect = function(callback) {
  db.open(function(err, database) {
  if( err ) throw err;
    db = database;
    callback();
  });
}

/*
  
exports.connect = function(callback) {
  
  MongoClient.connect(mongoUrl, function(err, database) {
    if( err ) throw err;
    db = database;
    callback();
  });
};*/

exports.doSomethingWithDatabase = function(callback){
  
  
  db.collection("userList").find({}).toArray(function(err, docs){ 
    callback(docs);
  });

};