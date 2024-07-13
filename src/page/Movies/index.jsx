import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import MovieService from '../../service/MovieService'
import UserService from '../../service/UserService';
import TruncatedContent from '../../utils/TruncatedContent';
import Loading from '../../components/Loading'
import { StarIcon } from '@heroicons/react/20/solid';
import MovieSlider from '../../components/Slider2';

function Movies() {
    const { keyWord } = useParams()

    const [nowPlayMovie, setNowPlayMovie] = useState([])
    const [comingSoonMovie, setComingSoonMovie] = useState([])
    const [specialMovie, setSpecialMovie] = useState([])
    const [listMovieFound, setListMovieFound] = useState([])
    const [loading, setLoading] = useState(false);

    const { GetAllMovieApi, ComingSoonMovieApi, SpecialMovieApi, NowPlayingMovieApi } = MovieService()
    const { searchMovieApi } = UserService()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const handleGetItems = async () => {
        setLoading(true)
        let resNowPlaying = await NowPlayingMovieApi()
        if (resNowPlaying && resNowPlaying.data && resNowPlaying.data.result) {
            setNowPlayMovie(resNowPlaying.data.result)
        }
        setLoading(false)
        let resComingSoon = await ComingSoonMovieApi()
        if (resComingSoon && resComingSoon.data && resComingSoon.data.result) {
            setComingSoonMovie(resComingSoon.data.result)
        }

        let resSpecial = await SpecialMovieApi()
        if (resSpecial && resSpecial.data && resSpecial.data.result) {
            setSpecialMovie(resSpecial.data.result)
        }
    }

    const handleSearchMovie = async (keyWord) => {
        let resMovie = await searchMovieApi(keyWord)
        if (resMovie && resMovie.data && resMovie.data.result) {
            setListMovieFound(resMovie.data.result)
        }
    }
    useEffect(() => {
        keyWord === undefined &&
            handleGetItems()
    }, []);

    useEffect(() => {
        keyWord !== undefined &&
            handleSearchMovie(keyWord)
    }, [keyWord])
    return (
        <div>
            {
                loading ?
                    <div className='h-screen'>
                        <Loading />
                    </div> :
                    <div className='pt-32 pb-10' >
                        {(listMovieFound.length !== 0) && keyWord != undefined ?
                            <div className='border-y-[0.05px]'>
                                <div className='max-w-6xl mx-auto'>
                                    <div className='border-b'>
                                        <h2 className='text-center pt-4 text-5xl text-slate-200'>Tìm kiếm</h2>
                                        <p className='text-center py-4 text-xl text-slate-200'>Theo từ khóa <span>'{keyWord}'</span></p>
                                    </div>

                                    <div className='pt-8'>
                                        <div className={`${listMovieFound.length > 5 ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-4" : "flex justify-center"} px-4 gap-4 rounded-xl`}>
                                            {
                                                listMovieFound && listMovieFound.length > 0 &&
                                                listMovieFound.map((movie, index) => (
                                                    <div key={`movie-${index}-${movie.movieId}`} onClick={() => changeTab(`/movie/${movie.movieId}`)} className="mb-4">
                                                        <div className="relative product-item table border-2 border-slate-600 h-[80%]">
                                                            <img
                                                                src={movie.poster}
                                                                alt=""
                                                                className="product-over h-[300px] w-[200px] table-cell"
                                                            />
                                                            <div className="absolute top-0 right-0 bg-black bg-opacity-40 z-10 rounded-bl-full">
                                                                <div className='flex justify-center items-center p-2'>
                                                                    <StarIcon className='h-6 text-amber-400 px-4' />
                                                                    <p className=' text-slate-200 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                                                            <TruncatedContent content={movie.title} maxLength={18} />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div>
                                {specialMovie.length !== 0 &&
                                    <div className='border-y-[0.05px]'>
                                        <div className='max-w-7xl mx-auto'>
                                            <div className='h-20 flex justify-center items-center'>
                                                <h2 className='text-3xl text-slate-200'>Suất chiếu đặc biệt</h2>
                                            </div>
                                            <div className='mb-8'>
                                                <MovieSlider movies={specialMovie} />
                                            </div>
                                        </div>
                                    </div>
                                }

                                {nowPlayMovie.length !== 0 &&
                                    <div className='border-y-[0.05px]'>
                                        <div className='max-w-7xl mx-auto'>
                                            <div className='h-20 flex justify-center items-center'>
                                                <h2 className='text-3xl text-slate-200'>Phim đang chiếu</h2>
                                            </div>
                                            <div className='mb-8'>
                                                <MovieSlider movies={nowPlayMovie} />
                                            </div>
                                        </div>
                                    </div>
                                }

                                {comingSoonMovie.length !== 0 &&
                                    <div className='border-y-[0.05px]'>
                                        <div className='max-w-7xl mx-auto'>
                                            <div className='h-20 flex justify-center items-center'>
                                                <h2 className='text-3xl text-slate-200'>Phim sắp chiếu</h2>
                                            </div>
                                            <div className='mb-8'>
                                                <MovieSlider movies={comingSoonMovie} />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default Movies
