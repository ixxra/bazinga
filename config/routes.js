var routes = require('./../routes'),
    user = require('./../routes/user'),
    api = require('./../routes/api'),
    admin = require('./../routes/admin'),
    _u = require('underscore');


function requireRole(role) {
    return function(req, res, next) {
        if(req.user && _u.contains(req.user.roles, role))
            next();
        else
            res.send(403, 'User not allowed');
    }
}


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


module.exports = function (app) {
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
    app.get('/me', ensureAuthenticated, user.me);
    
    app.get('/api/v1/magazine', api.magazine);
    
    app.all('/admin', ensureAuthenticated, requireRole('admin'));
    
    app.get('/admin', admin.admin);
    
    app.get('/admin/authors', admin.authors.get);
    app.post('/admin/authors', admin.authors.add);
    app.put('/admin/authors/:id', admin.authors.update);
    
    app.get('/admin/users', admin.users.get);
    app.post('/admin/users', admin.users.add);
    app.put('/admin/users/:id', admin.users.update);
    
    app.get('/admin/articles', admin.articles.get);
    app.get('/admin/articles/:id', admin.articles.getById);
    app.post('/admin/articles', admin.articles.post);
    app.put('/admin/articles/:id', admin.articles.put);
    
    
    app.get('/admin/magazine', admin.magazine);
}