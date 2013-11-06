
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  api = require('./routes/api'),
  admin = require('./routes/admin'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  MongoStore = require('connect-mongo')(express);


var db = mongoose.connect('mongodb:ixxra@feisty13//paulo.mongohq.com:10050/abstractionapplication');
//var db = mongoose.connect('mongodb://localhost/mongoosetest');

var User = require('./models/user').User;


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//
//   Both serializer and deserializer edited for Remember Me functionality
passport.serializeUser(function(user, done) {
  var createAccessToken = function () {
      var token = user.generateRandomToken();
      User.findOne( { accessToken: token }, function (err, existingUser) {
        if (err) { return done( err ); }
        if (existingUser) {
          createAccessToken(); // Run the function again - the token has to be unique!
        } else {
          user.set('accessToken', token);
          user.save( function (err) {
            if (err) return done(err);
            return done(null, user.get('accessToken'));
          })
        }
      });
    };
  
    if ( user._id ) {
      createAccessToken();
    }

//  done(null, user.id);  
});

passport.deserializeUser(function(token, done){
  User.findOne({accessToken: token}, function(err, user){
    done(err, user);
  });
  //User.findOne({
  //  _id: id
  //}, function(err, user){
  //  done(err, user);  
  //});
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
 
  function (email, password, done) {
    User.findOne({email: email}, function (err, user) {
      if (err) return done(err);
      
      if (!user) {
        return done(null, false, {message: 'Unknown user ' + email});
      }
      
      user.comparePassword(password, function (err, isMatch) {
        if (err) return done(err);
        
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  } 
  //function(email, password, done) {
  //  User.findOne({
  //    email: email  
  //  }, function(err, user){
  //    if (err) return done(err);
  //    
  //    if (!user) {
  //      return done(null, false, {
  //        message: 'Unknown user'  
  //      });
  //    }
  //    
  //    if (!user.authenticate(password)) {
  //      return done(null, false, {
  //        message: 'Invalid password'  
  //      });
  //    }
  //    
  //    return done(null, user);
  //  });
  //  
  //}
));


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


var app = express();

app.set('showStackError', true);
app.locals.pretty = true;
app.use(express.compress({
  filter: function(req, res) {
    return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));  
  },
  
  level: 9
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.cookieParser());

app.use(express.bodyParser());
app.use(express.methodOverride());


app.use(express.session(
{
  secret: 'BAZINGA',
  store: new MongoStore({
    db: db.connection.db,
    collection: 'sessions'
  })
}));

// Remember Me middleware
app.use( function (req, res, next) {
  if ( req.method == 'POST' && req.url == '/login' ) {
    if ( req.body.rememberme ) {
      req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
    } else {
      req.session.cookie.expires = false;
    }
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (error, req, res, next) {
  if (~err.message.indexOf('not found')) return next();
  
  console.log(err.stack);
  
  res.status(500).render('500', {
    error: err.stack  
  });
});

app.use(function (req, res, next) {
  res.status(404).render('404', {
    url: req.originalUrl,
    error: 'Not found'
  });  
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/app', routes.app);

app.get('/login', routes.signinForm);
app.post('/login', routes.signin) //This is more ellaborated than passport-local doc... why?

//app.post('/login', passport.authenticate('local', {
//  successRedirect: '/',
//  failureRedirect: '/login',
//  failureFlash: true
//}));

app.get('/logout', routes.signout);

app.get('/signup', routes.signupForm);
app.post('/signup', routes.signup);

app.get('/users', user.list);
app.get('/api/v1/magazine', api.magazine);
app.get('/admin', admin.admin);

app.get('/admin/authors', admin.authors.get);
app.post('/admin/authors', admin.authors.add);
app.put('/admin/authors/:id', admin.authors.update);

app.get('/admin/users', admin.users.get);
app.post('/admin/users', admin.users.add);
app.put('/admin/users/:id', admin.users.update);

app.get('/admin/articles', admin.articles.get);


app.get('/admin/magazine', admin.magazine);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('open your browser at http://localhost:3000');
});
