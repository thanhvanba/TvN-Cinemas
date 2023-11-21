import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const MovieService = () => {
    const { register, login, logout } = useContext(UserContext);
    const getAllMovieApi = async () => {
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

    return {
        getAllMovieApi, ComingSoonMovieApi, NowPlayingMovieApi, SpecialMovieApi
    }
}

export default MovieService