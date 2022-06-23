const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Model Schema
const userSchema = new Schema({
    userName: String,
    password: String
});

// Read Model Schema
const readSchema = new Schema({
    title: String,
    authors: {
        type: [String],
        default: undefined
    },
    description: String,
    imageLink: String, 
    infoLink: String,
    inProgress: {
        type: Boolean,
        default: false
    },
    isbn13: String,
    date: Date,
});

// Library Model Schema
const librarySchema = new Schema({
    title: String,
    authors: {
        type: [String],
        default: undefined
    },
    description: String,
    imageLink: String, 
    infoLink: String,
    favorited: {
        type: Boolean,
        default: false
    },
    isbn13: String,
    date: Date,
});

// Favorite Model Schema
const favoriteSchema = new Schema({
    title: String,
    authors: {
        type: [String],
        default: undefined
    },
    description: String,
    imageLink: String, 
    infoLink: String,
    date: Date,
});

// Creating model objects
const Read = mongoose.model('Read', readSchema);
const Library = mongoose.model('Library', librarySchema);
const Favorite = mongoose.model('Favorite', favoriteSchema);
const User = mongoose.model('User', userSchema)

// Exporting model objects
module.exports = {
    Read, Library, Favorite, User
};
