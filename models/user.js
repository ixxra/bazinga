var mongoose = require('mongoose'),
    Schema = require('mongoose').Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
    
    
//mongoose.connect('mongodb://localhost/mongoosetest');


var UserSchema = new Schema({
    username: {type: String, required: false, unique: true}, //For now, we expect login users by email address
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: String,
    surname: String,
    url: String,
    accessToken: String
});


UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt){
        if (err) return next(err);
        
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);
            
            user.password = hash;
            next();
        });
    });    
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                if(err) return cb(err);
                cb(null, isMatch);
        });
};


UserSchema.methods.generateRandomToken = function () {
  var user = this,
      chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      token = new Date().getTime() + '_';
  for ( var x = 0; x < 16; x++ ) {
    var i = Math.floor( Math.random() * 62 );
    token += chars.charAt( i );
  }
  return token;
};














exports.User = mongoose.model('users', UserSchema);