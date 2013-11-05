var mongoose = require('mongoose'),
    Schema = require('mongoose').Schema,
    Author = require('./author').Author;
    
    
//mongoose.connect('mongodb://localhost/mongoosetest');


var ArticleSchema = new Schema({
    title: {type: String, required: true},
    abstract: {type: String, required: true},
    authors: [{type: Schema.ObjectId, required: true}],
    art_type: String,
    category: String,
    url: {type: String, required:true}
});


var Article = mongoose.model('articles', ArticleSchema);


exports.Article = Article;