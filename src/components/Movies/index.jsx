import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MovieService from '../../service/MovieService'
function Movies() {
    const [nowPlayMovie, setNowPlayMovie] = useState({})
    const [comingSoonMovie, setComingSoonMovie] = useState({})
    const [specialMovie, setSpecialMovie] = useState({})

    const { GetAllMovieApi, ComingSoonMovieApi, SpecialMovieApi, NowPlayingMovieApi } = MovieService()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const handleGetItems = async () => {

        let resNowPlaying = await NowPlayingMovieApi()
        if (resNowPlaying && resNowPlaying.data && resNowPlaying.data.result) {
            setNowPlayMovie(resNowPlaying.data.result)
        }
        let resComingSoon = await ComingSoonMovieApi()
        if (resComingSoon && resComingSoon.data && resComingSoon.data.result) {
            setComingSoonMovie(resComingSoon.data.result)
        }

        let resSpecial = await SpecialMovieApi()
        if (resSpecial && resSpecial.data && resSpecial.data.result) {
            setSpecialMovie(resSpecial.data.result)
        }
    }

    useEffect(() => {
        handleGetItems()
    }, []);
    return (
        <div className='pt-32 pb-10'>
            <div className='border-y-[0.05px]'>
                <div className='max-w-6xl mx-auto'>
                    <div className='h-20 flex justify-center items-center'>
                        <h2 className='text-3xl text-slate-200'>Suất chiếu đặc biệt</h2>
                    </div>

                    <div className='pt-8'>
                        <div className="grid grid-cols-5 gap-4 max-w-screen-xl mx-auto">
                            {
                                specialMovie && specialMovie.length > 0 &&
                                specialMovie.map((movie, index) => (
                                    <div key={`movie-${index}-${movie.movieId}`} onClick={() => changeTab(`/movie/${movie.movieId}`)} className="mb-4">
                                        <div className="product-item table border-2 border-slate-600 h-[80%]">
                                            <img
                                                src={movie.poster}
                                                alt=""
                                                className="product-over h-[300px] w-full table-cell"
                                            />
                                        </div>
                                        <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                                            {movie.title}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-y-[0.05px]'>
                <div className='max-w-6xl mx-auto'>
                    <div className='h-20 flex justify-center items-center'>
                        <h2 className='text-3xl text-slate-200'>Phim đang chiếu</h2>
                    </div>

                    <div className='pt-8'>
                        <div className="grid grid-cols-5 gap-4 max-w-screen-xl mx-auto">
                            {
                                nowPlayMovie && nowPlayMovie.length > 0 &&
                                nowPlayMovie.map((movie, index) => (
                                    <div key={`movie-${index}-${movie.movieId}`} onClick={() => changeTab(`/movie/${movie.movieId}`)} className="mb-4">
                                        <div className="product-item table border-2 border-slate-600 h-[80%]">
                                            <img
                                                src={movie.poster}
                                                alt=""
                                                className="product-over h-[300px] w-full table-cell"
                                            />
                                        </div>
                                        <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                                            {movie.title}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-y-[0.05px]'>
                <div className='max-w-6xl mx-auto'>
                    <div className='h-20 flex justify-center items-center'>
                        <h2 className='text-3xl text-slate-200'>Phim sắp chiếu</h2>
                    </div>

                    <div className='pt-8'>
                        <div className="grid grid-cols-5 gap-4 max-w-screen-xl mx-auto">
                            {
                                comingSoonMovie && comingSoonMovie.length > 0 &&
                                comingSoonMovie.map((movie, index) => (
                                    <div key={`movie-${index}-${movie.movieId}`} onClick={() => changeTab(`/movie/${movie.movieId}`)} className="mb-4">
                                        <div className="product-item table border-2 border-slate-600 h-[80%]">
                                            <img
                                                src={movie.poster}
                                                alt=""
                                                className="product-over h-[300px] w-full table-cell"
                                            />
                                        </div>
                                        <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                                            {movie.title}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movies
