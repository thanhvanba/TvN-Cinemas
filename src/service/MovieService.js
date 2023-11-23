import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"

const MovieService = () => {
    const GetAllMovieApi = async () => {
        return await axios.get(
            "http://localhost:8080/api/v1/movies"
        );
    };

    const ComingSoonMovieApi = async () => {
        return await axios.get(
            "http://localhost:8080/api/v1/movies/coming-soon"
        );
    };

    const NowPlayingMovieApi = async () => {
        return await axios.get(
            "http://localhost:8080/api/v1/movies/now-playing"
        );
    };

    const SpecialMovieApi = async () => {
        return await axios.get(
            "http://localhost:8080/api/v1/movies/special-movie"
        );
    };

    const GetOneMovie = async (movieId) => {
        return await axios.get(
            `http://localhost:8080/api/v1/movies/${movieId}`
        );
    };

    return {
        GetAllMovieApi, ComingSoonMovieApi, NowPlayingMovieApi, SpecialMovieApi, GetOneMovie
    }
}

export default MovieService