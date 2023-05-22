"use strict";
const fetch = require('node-fetch');
const Config = require("../../config");
const fs = require('fs');

function themoviedb({} = {}) {

    const discover = async ({pageNumber}) => {
        const config = Config();
        const baseUrl = config.themoviedb.baseurl;
        const apiKey = config.themoviedb.apiKey;
        const url = `${baseUrl}/discover/movie?include_adult=true&include_video=true&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
        };
        
        try {
            const response = await fetch(url, options)
            const result = await response.json();
            result.results.map((res) => {
                res.poster = `https://www.themoviedb.org/t/p/w220_and_h330_face${res.poster_path}`;
            })
            
            return result;

        } catch (error) {
            console.error(error + url);
            return [];
        }

    }

    return {
        discover
    }
}


module.exports = themoviedb;
