var User = require('../models/user').User,
    Author = require('../models/author').Author,
    Article = require('../models/article').Article;

exports.admin = function (req, res) {
  res.render('admin', {user: req.user});  
};


exports.user = function (req, res){
    console.log(req.type);
    
    res.render('user', {user: req.user});
};


exports.authors = {
    get: function (req, res){
        Author.find().sort('surname').execFind(function (err, authors) {    
            if (err) console.error('error:', authors);
            
            res.render('author', {authors: authors, user: req.user}); 
        });
    },
    
    add: function (req, res) {
        console.log(req.body);
        var author = new Author(req.body);
        author.save(function (err) {
            if (err) console.error(err);
        });
        
        res.send(res.redirect('/admin/authors'));
    },
    
    update: function (req, res) {
        console.log(req);
        var id = req.params.id;
    },
    
    delete: function (req, res) {
        
    }
};


exports.users = {
    get: function (req, res){
        User.find().sort('surname').execFind(function (err, users) {    
            if (err) console.error('error:', err);
            
            res.render('user', {users: users, user: req.user}); 
        });
    },
    
    add: function (req, res) {
        console.log(req.body);
        var user = new User(req.body);
        user.save(function (err) {
            if (err) console.error(err);
        });
        
        res.send(res.redirect('/admin/users'));
    },
    
    update: function (req, res) {
        console.log(req);
        var id = req.params.id;
    },
    
    delete: function (req, res) {
        
    }
};


exports.articles = {
  get: function (req, res) {
    Article.find(function (err, articles) {
      if (err) console.error('error:', err);
      
      res.render('admin/articles', {articles: articles, user: req.user});
    });
  }
};

exports.magazine = function(req, res) {
  res.render('admin/magazine', {user: req.user});  
};



