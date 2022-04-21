const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    isbn13: Number,
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
    isbn13: Number,
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

// Exporting model objects
module.exports = {
    Read, Library, Favorite
};
