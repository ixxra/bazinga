var mongoose = require('mongoose'),
    Schema = require('mongoose').Schema,
    UserSchema = require('./user').UserSchema;
    
    
//mongoose.connect('mongodb://localhost/mongoosetest');


var AuthorSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    institution: {
        type: String,
        required: true
    },
    
    url: String,
    
    user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});


exports.Author = mongoose.model('authors', AuthorSchema);