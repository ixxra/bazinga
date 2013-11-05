//var mongodb = require ('mongodb'),
var    schemas = require('./schemas'),
    fs = require('fs');

var DATA = '/home/ixxra/getabs/meta.json';
var data = null;

fs.readFile(DATA, {encoding: 'utf8'}, function (err, data) {
    if (err) throw err;

    data = this.data;
});

console.log(data);
