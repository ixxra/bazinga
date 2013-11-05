var mongoose = require ('mongoose');
//    db = mongoose.createConnection('localhost', 'mongoosetest');

mongoose.connect('mongodb://localhost/mongoosetest');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('logged in');
});


var articleSchema = new mongoose.Schema({
        title: String,
        art_type: String,
        category: String,
        authors: [String],
        abstract: String,
        url: String
    });
    

var Articles = db.model('Articles', articleSchema);

module.exports.Articles = Articles;

//var article = new Articles({
//        title: 'Quantum field theory...',
//        artType: 'Divulgacion',
//        artCategory: 'Quantum field theory',
//        authors: ['Rene Israel Garcia Lara']
//});


//article.save(function (err) {
//    console.log('error saving file...', err);
//});
