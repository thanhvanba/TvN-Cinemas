import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { RegisterContext } from '../context/RegisterContext'
import { LoginContext } from '../context/LoginContext'

const MovieService = () => {
    console.log("🚀 ~ file: MovieService.js:11 ~ MovieService ~ process.env.REACT_APP_HOST_API_KEY:", process.env.REACT_APP_HOST_API_KEY)

    const GetAllMovieApi = async () => {
        return await axios.get(`${process.env.REACT_APP_HOST_API_KEY}/movies`);
    };

    const ComingSoonMovieApi = async () => {
        return await axios.get(`${process.env.REACT_APP_HOST_API_KEY}/movies/coming-soon`);
    };

    const NowPlayingMovieApi = async () => {
        return await axios.get(`${process.env.REACT_APP_HOST_API_KEY}/movies/now-playing`);
    };

    const SpecialMovieApi = async () => {
        return await axios.get(`${process.env.REACT_APP_HOST_API_KEY}/movies/special-movie`);
    };

    const GetOneMovieApi = async (movieId) => {
        return await axios.get(`${process.env.REACT_APP_HOST_API_KEY}/movies/${movieId}`);
    };

    return {
        GetAllMovieApi, ComingSoonMovieApi, NowPlayingMovieApi, SpecialMovieApi, GetOneMovieApi
    };
};

export default MovieService;
