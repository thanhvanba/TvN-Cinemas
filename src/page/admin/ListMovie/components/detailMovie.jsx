import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import UserService from '../../../../service/UserService';
import FormatDataTime from '../../../../utils/FormatDataTime';
import Loading from '../../../../components/Loading';

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
        genres: "",
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
            <div className='pt-8'>
                <div className='absolute mx-auto top-80 right-1/2 z-50'>
                    {loading && <Loading />}
                </div>
                {!loading && <div className='border py-8 px-4'>
                    <div className='flex'>
                        <div>
                            <div className='my-4 border'>
                                <img
                                    className='w-96 h-[500px]'
                                    src={movie.poster}
                                />
                            </div>
                        </div>

                        <div className='px-4 w-[80%]'>
                            <div className="mb-4">
                                <div>
                                    <h3 className='uppercase text-2xl text-gray-900'>
                                        {movie.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="my-4">
                                <div className='pt-4 text-slate-500'>
                                    {movie.desc}
                                </div>
                            </div>
                            <ul className='pt-6 pb-4 text-gray-900'>
                                <li className='relative pl-28 pb-5'>
                                    <span className='absolute font-bold top-0 left-0'>Đạo diễn</span>
                                    <span>{movie.director}</span>
                                </li>
                                <li className='relative pl-28 pb-5'>
                                    <span className='absolute font-bold top-0 left-0'>Diễn viên</span>
                                    <span>{movie.actor}</span>
                                </li>
                                <li className='relative pl-28 pb-5'>
                                    <span className='absolute font-bold top-0 left-0'>Thể loại</span>
                                    <span>{movie.genres}</span>
                                </li>
                                <li className='relative pl-28 pb-5'>
                                    <span className='absolute font-bold top-0 left-0'>Khởi chiếu</span>
                                    <span>{FormatDataTime(movie.releaseDate).date}</span>
                                </li>
                                <li className='relative pl-28 pb-5'>
                                    <span className='absolute font-bold top-0 left-0'>Thời lượng</span>
                                    <span>{movie.duration} phút</span>
                                </li>
                                <li className='relative pl-28 pb-5'>
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