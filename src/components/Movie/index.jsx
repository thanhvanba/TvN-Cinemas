import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline"
import "./index.css"

import MovieService from '../../service/MovieService';

const Movie = () => {
    const { GetOneMovie } = MovieService()
    const navigate = useNavigate()

    const { id } = useParams();
    const [movie, setMovie] = useState({})

    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const hadleGetOneMovie = async (movieId) => {
        let res = await GetOneMovie(movieId)
        if (res && res.data && res.data.result) {
            setMovie(res.data.result)
        }
    }

    return (
        <div className='pt-32 h-auto'>
            <div className='max-w-6xl mx-auto pb-4'>
                {/* chi tiết phim */}
                <div onClick={hadleGetOneMovie(id)} className='flex'>
                    {/* product image */}
                    <div className='w-1/3 px-4'>
                        <img
                            className='w-full h-5/6'
                            src={movie.poster}
                        />
                    </div>
                    {/* product detail */}
                    <div className='w-2/3 px-4'>
                        {/* name */}
                        <div>
                            <h3 className='uppercase text-2xl text-slate-200'>
                                {movie.title}
                            </h3>
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
                                <span>{movie.genres}</span>
                            </li>
                            <li className='relative pl-28 pb-5'>
                                <span className='absolute top-0 left-0'>Khởi chiếu</span>
                                <span>{movie.releaseDate}</span>
                            </li>
                            <li className='relative pl-28 pb-5'>
                                <span className='absolute top-0 left-0'>Thời lượng</span>
                                <span>110 phút</span>
                            </li>
                            <li className='relative pl-28 pb-5'>
                                <span className='absolute top-0 left-0'>Ngôn ngữ</span>
                                <span>Phim có phụ đề</span>
                            </li>
                        </ul>
                        {/* button */}
                        <div>
                            <button className="my-4 border-slate-400 border p-4 text-sm font-bold uppercase rounded-s-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300" type='submit'
                            >
                                <a href={movie.trailerLink}>Xem trailer</a>
                            </button>
                            <button className="my-4 border-slate-400 border p-4 text-sm font-bold uppercase rounded-e-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300" type='submit'
                            >
                                <a href="">Mua vé ngay</a>
                            </button>
                        </div>
                    </div>
                </div>
                {/* ds lịch chiếu */}
                <div className='py-8'>
                    {/* Tiêu đề */}
                    <h3 className='uppercase text-2xl text-slate-200 text-center'>
                        Vui lòng chọn thông tin rạp + thời gian
                    </h3>
                    {/* ds */}
                    <div >
                        {/* chọn rạp */}
                        <div className='flex justify-center'>
                            <div className="relative option-style2  inline-block m-2 rounded-t-full shadow-inner shadow-cyan-500 text-gray-200 h-12 w-96">
                                <h3 className="flex uppercase pl-5 pr-8 py-3">Chọn rạp</h3>
                                <span className="absolute right-5 top-4"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
                            </div>
                        </div>
                        {/* ngày chiếu */}
                        <div className='grid grid-cols-6'>
                            <a href="" className='active2 option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                                14/10 <br />
                                <span>Th 7</span>
                            </a>
                            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                                14/10 <br />
                                <span>Th 7</span>
                            </a>
                            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                                14/10 <br />
                                <span>Th 7</span>
                            </a>
                            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                                14/10 <br />
                                <span>Th 7</span>
                            </a>
                            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                                14/10 <br />
                                <span>Th 7</span>
                            </a>
                            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                                14/10 <br />
                                <span>Th 7</span>
                            </a>
                        </div>

                        {/* ds các cụ thể thời gian chiếu */}
                        <div className='relative max-w-5xl mx-auto text-left pt-5'>
                            <div className='relative pl-60 pb-8 mb-8'>
                                {/* vị trí */}
                                <div className='absolute top-0 left-0 bg-slate-700 w-60'>
                                    <div className='p-6'>
                                        <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                                        <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                                    </div>
                                    <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                                    >
                                        <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                                        <a href="" className='pr-8'>Xem vị trí</a>
                                    </button>
                                </div>
                                {/* thời gian */}
                                <div className='block relative'>
                                    <div className='relative pl-28 pt-4'>
                                        <ul className='grid grid-cols-5 gap-4'>
                                            <li onClick={() => changeTab("/order")} className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                            <li className='inline-block'>
                                                <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie