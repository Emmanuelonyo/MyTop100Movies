"use strict";
const express = require('express');
const router = express.Router();
const { createMovie, getMovie, updateMovie, deleteMovie, suggestMovie, getAllMovies } = require('../controllers/movieController');

router.route('/movies')
    .get(getAllMovies)
    .post(createMovie)

router.route('/movies/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)

router.get("/discover/page/:id", suggestMovie)

module.exports = router
