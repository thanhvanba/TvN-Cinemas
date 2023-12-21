import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline"
import SelectMenu from '../SelectMenu/SelectMenu';
import FormatDataTime from '../../utils/FormatDataTime'
import getSrcYoutube from '../../utils/GetSrcYoutube'
import TruncatedContent from '../../utils/TruncatedContent';
import "./index.css"

import MovieService from '../../service/MovieService';
import CinemaService from '../../service/CinemaService';
import UserService from '../../service/UserService';

const Movie = () => {
    const { GetOneMovieApi } = MovieService()
    const { getAllCinemaApi } = CinemaService()
    const { getShowtimeByMovieApi, getAllShowtimeApi } = UserService()
    const navigate = useNavigate()


    const { id } = useParams();
    const [dateList, setDateList] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
    console.log("🚀 ~ file: index.jsx:26 ~ Movie ~ selectedDateTime:", selectedDateTime)
    const [movie, setMovie] = useState({})
    const [allCinema, setAllCinema] = useState([])
    const [allShowtime, setAllShowtime] = useState([])
    const [foundShowtime, setFoundShowtime] = useState({
        showTimeId: null,
        room: {
            roomId: null,
            cinema: {
                cinemaId: null,
                location: null,
                cinemaName: null,
                desc: null,
                status: null,
                urlLocation: null
            },
            roomName: null
        },
        movie: {
            movieId: null,
            title: null,
            director: null,
            genres: null,
            actor: null,
            releaseDate: null,
            desc: null,
            poster: null,
            trailerLink: null,
            duration: null,
            reviews: null,
            rating: null,
            delete: null
        },
        timeStart: null,
        timeEnd: null,
        status: null,
        listTimeShow: [
        ],
        seats: null,
        special: null
    })
    const [showTrailer, setShowTrailer] = useState(false);

    const openTrailer = () => {
        setShowTrailer(true);
    };

    const closeTrailer = () => {
        setShowTrailer(false);
    };

    const ListDayShowtime = () => {
        const currentDate = new Date();

        // Tạo danh sách 6 ngày liên tiếp
        const sixDayList = Array.from({ length: 6 }, (_, index) => {
            const date = addDays(currentDate, index);
            return date.toISOString();
        });

        // Cập nhật state với danh sách ngày
        setDateList(sixDayList);
        setSelectedDateTime({ ...selectedDateTime, date: FormatDataTime(sixDayList[0]).date });
    }
    const hadleGetItem = async (movieId) => {
        let resMovie = await GetOneMovieApi(movieId)
        let resCinema = await getAllCinemaApi()
        let resShowtime = await getAllShowtimeApi()
        if (resMovie && resMovie.data && resMovie.data.result) {
            setMovie(resMovie.data.result)
        }
        if (resCinema && resCinema.data && resCinema.data.result && resCinema.data.result.content) {
            setAllCinema(resCinema.data.result.content)
        }
        if (resShowtime && resShowtime.data && resShowtime.data.result && resShowtime.data.result.content) {
            setAllShowtime(resShowtime.data.result.content)
        }
    }

    const FoundShowtime = (cinemaId) => {
        const foundShowtime = allShowtime.find(
            item =>
                item.room.cinema.cinemaId === cinemaId &&
                item.movie.movieId === id
        );
        if (foundShowtime) {
            setFoundShowtime(foundShowtime);
            console.log("🚀 ~ file: index.jsx:117 ~ FoundShowtime ~ foundShowtime:", foundShowtime)
        } else {
            setFoundShowtime(foundShowtime);
            console.log("🚀 ~ file: index.jsx:117 ~ FoundShowtime ~ foundShowtime:", foundShowtime)
            console.log("No showtimes found for the selected cinema and movie.");
        }
    }
    useEffect(() => {
        hadleGetItem(id)
        ListDayShowtime()
    }, [id]);

    const listNameCinema = allCinema.map(item => item.cinemaName)
    const handleSelectChange = (selectedValue) => {
        const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
        const selectedId = cinema.cinemaId
        FoundShowtime(selectedId)
    };
    console.log("🚀 ~ file: index.jsx:117 ~ FoundShowtime ~ foundShowtime:", foundShowtime)
    return (
        <div className='pt-32 h-auto'>
            <div className='max-w-6xl mx-auto pb-4'>
                {/* chi tiết phim */}
                <div className='flex'>
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
                            <button
                                className="my-4 border-slate-400 border p-4 text-sm font-bold uppercase rounded-s-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300"
                                type="button"
                                onClick={openTrailer}
                            >
                                Xem trailer
                            </button>

                            {/* Hiển thị video khi showTrailer là true */}
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
                                        {/* Nút đóng ở góc phải trên của iframe */}
                                        <button
                                            className="absolute -top-7 -right-3 text-white cursor-pointer"
                                            onClick={closeTrailer}
                                        >
                                            <span role="img" aria-label="Close" className="text-2xl">×</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button className="my-4 border-slate-400 border p-4 text-sm font-bold uppercase rounded-e-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300" type='submit'
                            >
                                <a>Mua vé ngay</a>
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
                            <div className="relative h-10 w-96 px-4 pt-2 option-style2 inline-block m-2 rounded-t-full shadow-inner shadow-cyan-500 text-gray-200">

                                <SelectMenu onSelectChange={handleSelectChange} items={listNameCinema} content={"--------Select--------"} />
                            </div>
                        </div>
                        {
                            !foundShowtime || !foundShowtime.showTimeId ?
                                <p className='text-2xl text-slate-200 text-center pt-4'>-- Chưa có thông tin lịch chiếu cho bộ phim này !!! --</p> :
                                <div>
                                    {/* ngày chiếu */}
                                    <div className='grid grid-cols-6'>
                                        {dateList.map((date, index) => (
                                            <a
                                                key={index}
                                                className={`px-8 border border-slate-400 text-center text-slate-200 ${FormatDataTime(date).date === selectedDateTime.date ? 'selected' : ''
                                                    }`}
                                                onClick={() => setSelectedDateTime({ ...selectedDateTime, date: FormatDataTime(date).date })}
                                            >
                                                {FormatDataTime(date).day} <br />
                                                <span>
                                                    {FormatDataTime(date).dayOfWeek === 0
                                                        ? 'CN'
                                                        : 'Th ' + (FormatDataTime(date).dayOfWeek + 1)}
                                                </span>
                                            </a>
                                        ))}

                                    </div>
                                    {/* ds các cụ thể thời gian chiếu */}
                                    <div className='relative max-w-5xl mx-auto text-left pt-5'>
                                        <div className='relative pl-60 pb-8 mb-8 h-36'>
                                            {/* vị trí */}
                                            <div className='absolute top-0 left-0 bg-slate-700 w-60'>
                                                <div className='p-6'>
                                                    <h4 className='uppercase font-bold text-lg text-slate-200'>{foundShowtime.room.cinema.cinemaName}</h4>
                                                    <p className='text-slate-500'><TruncatedContent content={foundShowtime.room.cinema.location} maxLength={50} /></p>
                                                </div>
                                                <button
                                                    className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                                                    onClick={() => window.open(foundShowtime.room.cinema.urlLocation, '_blank')}
                                                >
                                                    <span className="absolute right-12 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                                                    <a href={foundShowtime.room.cinema.urlLocation} className='pr-8'>Xem vị trí</a>
                                                </button>
                                            </div>
                                            {/* thời gian */}
                                            <div className='block relative'>
                                                <div className='relative pl-28 pt-4'>
                                                    <ul className='grid grid-cols-5 gap-4'>
                                                        {
                                                            foundShowtime.listTimeShow
                                                                .find((item) => FormatDataTime(item.date).date === selectedDateTime.date)
                                                                ?.time.map((time, index) => (
                                                                    <li key={index} onClick={() => {
                                                                        setSelectedDateTime(prevState => ({ ...prevState, time: time }));
                                                                        const updatedDateTime = { ...selectedDateTime, time: time };
                                                                        navigate(`/${foundShowtime.showTimeId}/order`, { state: { dateTime: updatedDateTime } });
                                                                    }
                                                                    } className='inline-block'>
                                                                        <a
                                                                            className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'
                                                                        >
                                                                            {time}
                                                                        </a>
                                                                    </li>
                                                                )) || (
                                                                <p className='absolute text-xl text-slate-200'>-- Chưa có lịch chiếu cho ngày hôm nay. Hãy quay lại sau. Xin cảm ơn !!! --</p>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Movie