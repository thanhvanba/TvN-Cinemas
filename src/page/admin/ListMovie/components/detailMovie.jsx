import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import UserService from '../../../../service/UserService';
import FormatDataTime from '../../../../utils/FormatDataTime';
import Loading from '../../../../components/Loading';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { FilmIcon } from '@heroicons/react/20/solid';

const DetailMovie = () => {
    const { getOneMovieApi } = UserService()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        actor: "",
        genres: [],
        desc: "",
        releaseDate: "",
        poster: {},
        trailerLink: "",
        duration: "",
        reviews: [],
        rating: "0",
        delete: false
    })

    const hadleGetOneMovie = async () => {
        let resMovie = await getOneMovieApi(movieId)
        if (resMovie && resMovie.data && resMovie.data.result) {
            setMovie(resMovie.data.result)
        }
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        movieId && hadleGetOneMovie()
    }, []);
    return (
        <div className='px-4 relative' >
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 onClick={() => { changeTab("/admin/list-movie") }} className='cursor-pointer font-medium text-2xl flex items-center'>
                        <FilmIcon className='h-10 w-10 mr-1 text-emerald-600' />
                        Phim
                    </h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    <h2 className='cursor-default text-xl'>Chi tiết phim</h2>
                </div>
            </div>
            <div className='pt-8'>
                <div className='absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                    {loading && <Loading />}
                </div>
                {!loading && <div className='border py-8 px-4'>
                    <div className='flex'>
                        <div>
                            <div className='border'>
                                <img
                                    className='w-80 h-[420px]'
                                    src={movie.poster}
                                />
                            </div>
                        </div>

                        <div className='px-4 w-[80%]'>
                            <div className="mb-4">
                                <div>
                                    <h3 className='uppercase text-2xl text-emerald-600 font-bold'>
                                        {movie.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="my-4">
                                <div className='text-slate-500'>
                                    {movie.desc}
                                </div>
                            </div>
                            <ul className='pt-3 pb-4 text-gray-900'>
                                <li className='relative pl-28 pb-3'>
                                    <span className='absolute font-bold top-0 left-0'>Đạo diễn</span>
                                    <span>{movie.director}</span>
                                </li>
                                <li className='relative pl-28 pb-3'>
                                    <span className='absolute font-bold top-0 left-0'>Diễn viên</span>
                                    <span>{movie.actor}</span>
                                </li>
                                <li className='relative pl-28 pb-3'>
                                    <span className='absolute font-bold top-0 left-0'>Thể loại</span>
                                    <span>
                                        {
                                            movie?.genres.length !== 0 ?
                                                movie?.genres.map((genres, index) => (
                                                    <span key={index}>{genres.name}{index < movie.genres.length - 1 ? ', ' : ''}</span>
                                                )) :
                                                <span>N/A</span>
                                        }
                                    </span>
                                </li>
                                <li className='relative pl-28 pb-3'>
                                    <span className='absolute font-bold top-0 left-0'>Khởi chiếu</span>
                                    <span>{FormatDataTime(movie.releaseDate).date}</span>
                                </li>
                                <li className='relative pl-28 pb-3'>
                                    <span className='absolute font-bold top-0 left-0'>Thời lượng</span>
                                    <span>{movie.duration} phút</span>
                                </li>
                                <li className='relative pl-28 pb-3'>
                                    <span className='absolute font-bold top-0 left-0'>Ngôn ngữ</span>
                                    <span>Phim có phụ đề</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}
            </div>
        </div >
    )
}
export default DetailMovie