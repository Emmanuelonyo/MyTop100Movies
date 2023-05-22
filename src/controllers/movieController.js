"use strict";
const moviesService = require("../services/movie");
const Movies = require("../models/movies");
const Discova = require("../utils/discover");


    const createMovie = async (req, res) => {
        try {
            const ipaddress = req.ip
            const {title, genre, releasedOn, rating, image} = req.body;
            const movies = new moviesService({Movies, ipaddress});
            const create = await movies.create({title, genre, releasedOn, rating, image});
            
            if(create.error) {
                return res.status(400).send({
                    status: "error",
                    message: create.error
                })
            }

            return res.status(201).send({
                status: "success",
                message: "Movie added to list successfully",
                data: create
            })

        } catch (error) {
           return res.status(500).send({
            error: "somthing went wrong"
           })
        }        
    }

    const getAllMovies = async (req, res) => {
        try {
            const ipaddress = req.ip
            const movies = new moviesService({Movies, ipaddress});
            const result = await movies.getMovies();

            if(result.error) {
                return res.status(400).send({
                    status: "error",
                    message: result.error
                })
            }

            return res.status(200).send({
                status: "success",
                message: "Movies retrieved successfully",
                data: result
            })
            
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: "somthing went wrong"
            })
        }
    }

    const getMovie = async (req, res) => {
        try {
            const ipaddress = req.ip
            const id = req.params.id
            const movies = new moviesService({Movies, ipaddress});
            const result = await movies.getOneMovie({id});

            if(result.error) {
                return res.status(400).send({
                    status: "error",
                    message: result.error
                })
            }

            return res.status(200).send({
                status: "success",
                message: "Movies retrieved successfully",
                data: result
            })
            
        } catch (error) {
            return res.status(500).send({
                error: "somthing went wrong"
            })
        }
    }    

    const updateMovie = async (req, res) => {
        try {
            const ipaddress = req.ip
            const id = req.params.id
            const { title, genre, releasedOn, rating, image } = req.body
            const movies = new moviesService({Movies, ipaddress});
            const result = await movies.updateMovie({ id, title, genre, releasedOn, rating, image });

            if(result.error) {
                return res.status(400).send({
                    status: "error",
                    message: result.error
                })
            }

            return res.status(200).send({
                status: "success",
                message: "Movies Updated successfully",
                data: result
            })
            
        } catch (error) {
            return res.status(500).send({
                error: "somthing went wrong"
            })
        }
    }

    const deleteMovie = async (req, res) => {
        try {

            const ipaddress = req.ip
            const id = req.params.id
            const movies = new moviesService({Movies, ipaddress});
            const result = await movies.deleteMovie({id});

            if(result.error) {
                return res.status(400).send({
                    status: "error",
                    message: result.error
                })
            }

            return res.status(200).send({
                status: "success",
                message: "Movies deleted successfully",
                data: result
            })
            
        } catch (error) {
            return res.status(500).send({
                error: "somthing went wrong"
            })
        }
    }


    const suggestMovie = async (req, res) => {

        try {
            const pageNumber = req.params.id || 1;
            const movies = new moviesService({Discova});
            const result = await movies.discoverMovies({pageNumber});

            if(result.error) {
                return res.status(400).send({
                    status: "error",
                    message: result.error
                })
            }

            return res.status(200).send({
                status: "success",
                message: "Movies retrieved successfully",
                data: result
            })
            
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                error: "somthing went wrong"
            })
        }
    }


module.exports = {
        createMovie,
        getMovie,
        getAllMovies,
        updateMovie,
        deleteMovie,
        suggestMovie
    }
