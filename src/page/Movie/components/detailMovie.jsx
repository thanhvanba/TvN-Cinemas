import React, { useContext, useState } from 'react'
import FormatDataTime from '../../../utils/FormatDataTime'
import getSrcYoutube from '../../../utils/GetSrcYoutube';
import { ChevronDownIcon, MapPinIcon, StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { LoginContext } from '../../../context/LoginContext';
import UserService from '../../../service/UserService';
import Modal from '../../../utils/Modal';
import { useNavigate } from 'react-router-dom';
import ReviewMovie from './reviewMovie';
import Trailer from '../../../components/Trailer';

const DetailMovie = ({ movie }) => {
    const [showTrailer, setShowTrailer] = useState(false);
    const [toggleRV, setToggleRV] = useState(false)
    const openTrailer = () => {
        setShowTrailer(true);
    };
    const handleToggle = () => {
        setToggleRV(!toggleRV)
    }
    const closeTrailer = () => {
        setShowTrailer(false);
    };

    return (
        <div className='flex'>
            {/* product image */}
            <div className='hidden sm:block w-1/3 px-4'>
                <img
                    className='w-full h-5/6'
                    src={movie.poster}
                />
            </div>
            {/* product detail */}
            <div className='w-full sm:w-2/3 px-4 relative'>
                {/* name */}
                <div className='flex items-center'>
                    <h3 className='uppercase text-2xl text-slate-200'>
                        {movie.title}
                    </h3>
                    <span className='text-orange-400 pl-4'>(</span>
                    <div
                        className='flex flex-col group justify-center items-center'
                        onClick={handleToggle}
                    >
                        <StarSolidIcon className='h-8 text-amber-200 group-hover:text-amber-400' />
                        <p className='text-slate-200 group-hover:text-slate-400 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                    </div>
                    <span className='text-orange-400'>)</span>

                    {toggleRV &&
                        <ReviewMovie movie={movie} onToggle={setToggleRV} />
                    }
                </div>
                {/* dec */}
                <div className='pt-4 text-slate-500'>
                    {movie.desc}
                </div>
                {/* info */}
                <ul className='pt-6 pb-4 text-slate-200'>
                    <li className='relative pl-28 pb-5'>
                        <span className='absolute top-0 left-0'>Đạo diễn</span>
                        <span>{movie.director}</span>
                    </li>
                    <li className='relative pl-28 pb-5'>
                        <span className='absolute top-0 left-0'>Diễn viên</span>
                        <span>{movie.actor}</span>
                    </li>
                    <li className='relative pl-28 pb-5'>
                        <span className='absolute top-0 left-0'>Thể loại</span>
                        <span>
                            {
                                movie?.genres?.length !== 0 ?
                                    movie?.genres?.map((genres, index) => (
                                        <span key={index}>{genres.name}{index < movie.genres.length - 1 ? ', ' : ''}</span>
                                    )) :
                                    <span>N/A</span>
                            }</span>
                    </li>
                    <li className='relative pl-28 pb-5'>
                        <span className='absolute top-0 left-0'>Khởi chiếu</span>
                        <span>{FormatDataTime(movie.releaseDate).date}</span>
                    </li>
                    <li className='relative pl-28 pb-5'>
                        <span className='absolute top-0 left-0'>Thời lượng</span>
                        <span>{movie.duration} phút</span>
                    </li>
                    <li className='relative pl-28 pb-5'>
                        <span className='absolute top-0 left-0'>Ngôn ngữ</span>
                        <span>Phim có phụ đề</span>
                    </li>
                </ul>
                {/* button */}
                <div>
                    <Trailer showTrailer={showTrailer} closeTrailer={closeTrailer} movie={movie} />
                    <button
                        className="my-4 border-slate-400 border p-4 text-sm font-bold uppercase rounded-s-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300"
                        type="button"
                        onClick={openTrailer}
                    >
                        Xem trailer
                    </button>

                    {/* Hiển thị video khi showTrailer là true *
                    {showTrailer && (
                        <div className="fixed z-50 top-1/4 left-1/4 w-1/2 h-1/2 bg-black bg-opacity-75 flex items-center justify-center">
                            <div className="relative w-full h-0 pb-[56.25%]">
                                <iframe
                                    title={`${movie.title} Trailer`}
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={getSrcYoutube(movie.trailerLink)}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                                {/* Nút đóng ở góc phải trên của iframe *
                                <button
                                    className="absolute -top-8 -right-8 text-white cursor-pointer"
                                    onClick={closeTrailer}
                                >
                                    <XMarkIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    )} */}
                    <button className="my-4 border-slate-400 border p-4 text-sm font-bold uppercase rounded-e-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300" type='submit'
                    >
                        <a>Mua vé ngay</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailMovie
