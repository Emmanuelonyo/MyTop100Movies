"use strict";

function moviesService({Movies, ipaddress, Discova}){

    const create = async ({title, genre, releasedOn, rating, image}) => {
        if(!title){
            return {
                error: "Title is required"
            }
        }
        
        if(!genre){
            return {
                error: "Genre is required"
            }
           
        }

        if(!releasedOn){
            return {
                error: "ReleasedOn is required"
            }
            
        }

        // check if movie exists

        const find = await Movies.findOne({title, ipaddress});
        
        if(find){
            return {
                error: "Movie already exists"
            }
            
        }

        const create  = await Movies.create({ipaddress, title, genre, releasedOn, rating, image});
        
        return create;
        
    }

    const getMovies = async () => {
        let find ;
        find = await Movies.find({ipaddress})
        
        if(!find){ 
            return []
        };

        return find ;

    }

    const getOneMovie = async ({id}) => {
        let find ;

        find = await Movies.findOne({ipaddress, _id:id})  
        
        if(!find){ 
            return []
        };

        return find ;
    }

    const updateMovie = async ({id, title, genre, releasedOn, rating, image}) => {
        let find ;
        find = await Movies.findOne({ipaddress, _id:id})  
        
        if(!find){
            return {
                error: `a movie with the id: ${id} does not exist`
            }
        }

        find.title = title;
        find.genre = genre;
        find.releasedOn = releasedOn;
        find.rating = rating;
        find.image = image;

        find.save()
        return find;

    }

    const deleteMovie = async ({id}) => {
        let find ;
        find = await Movies.findOneAndDelete({_id:id})  
        
        if(!find){
            return {
                error: `a movie with the id: ${id} does not exist`
            }
        }

        return true;

    } 
    
    const discoverMovies = async ({pageNumber}) => {
        const discover = await new Discova;
        const results = await discover.discover({pageNumber});

        return results;

    }

    return {
        create,
        getMovies,
        getOneMovie,
        updateMovie,
        deleteMovie,
        discoverMovies
    }
}   

module.exports = moviesService;