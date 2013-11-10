
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.me = function(req, res) {
  res.render('user/user', {user: req.user});
};