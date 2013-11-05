var passport = require('passport');
var User = require('./../models/user').User;


exports.index = function(req, res){
  res.render('index', { title: 'Abstraction & Application', user: req.user });
};


exports.app = function(req, res) {
  res.render('app', {user: req.user});
};


exports.signinForm = function (req, res){
  res.render('signin', {user: req.user, message: req.session.messages});
};


exports.signin = function(req, res, next){
  console.log(req.body);
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};


exports.signupForm = function(req, res) {
  res.render('signup');
};

exports.signup = function (req, res) {
  console.log(req.body);
  var user = new User(req.body);
  user.save(function (error) {
    if (error){
      res.redirect('/signup');  
    } else {
      res.redirect('/login');
    }
  });
};

exports.signout = function(req, res){
  req.logout();
  res.redirect('/');
}

