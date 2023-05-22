"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new mongoose.Schema({
    ipaddress: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    genre: {
        type: String,
        required: true 
    },
    releasedOn: {
        type: String,
        required: true 
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movies', MovieSchema);