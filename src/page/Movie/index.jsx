import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { format, addDays } from 'date-fns';
import { ChevronDownIcon, MapPinIcon, StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon, XMarkIcon } from '@heroicons/react/20/solid';
import SelectMenu from '../../components/SelectMenu/SelectMenu';
import FormatDataTime from '../../utils/FormatDataTime'
import getSrcYoutube from '../../utils/GetSrcYoutube'
import TruncatedContent from '../../utils/TruncatedContent';
import "./index.css"

import ModalComponent from '../../utils/Modal';

import MovieService from '../../service/MovieService';
import CinemaService from '../../service/CinemaService';
import UserService from '../../service/UserService';

import { LoginContext } from '../../context/LoginContext';
import Cinema from '../../components/Cinema';

const Movie = () => {
    const { GetOneMovieApi } = MovieService()
    const { getAllCinemaApi } = CinemaService()
    const { getShowtimeByMovieApi, reviewMovieApi } = UserService()
    const navigate = useNavigate()

    const [modalStates, setModalStates] = useState(false);
    const { user } = useContext(LoginContext)

    const { id } = useParams();
    const [dateList, setDateList] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
    const [movie, setMovie] = useState({})
    const [allCinema, setAllCinema] = useState([])
    const [allShowtime, setAllShowtime] = useState([])
    const [toggleRV, setToggleRV] = useState(false)
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
    const handleToggle = () => {
        setToggleRV(!toggleRV)
    }
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
        if (resMovie && resMovie.data && resMovie.data.result) {
            setMovie(resMovie.data.result)
        }

        let resCinema = await getAllCinemaApi()
        if (resCinema && resCinema.data && resCinema.data.result && resCinema.data.result.content) {
            setAllCinema(resCinema.data.result.content)
        }

        let resShowtime = await getShowtimeByMovieApi(movieId)
        if (resShowtime && resShowtime.data && resShowtime.data.result) {
            setAllShowtime(resShowtime.data.result)
        }
    }

    const handleReviewMovie = async (comment, rating, movieId) => {
        await reviewMovieApi(comment, rating, movieId)
    }
    const FoundShowtime = (cinemaId) => {
        const foundShowtime = allShowtime.find(
            item =>
                item.room.cinema.cinemaId === cinemaId &&
                item.movie.movieId === id
        );
        if (foundShowtime) {
            setFoundShowtime(foundShowtime);
        } else {
            setFoundShowtime(foundShowtime);
        }
    }

    const handleModalStates = () => {
        setModalStates(!modalStates);
    };

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

    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);

    return (
        <div className='pt-32 h-auto'>
            <div className='max-w-6xl mx-auto pb-4'>
                {/* chi tiết phim */}
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
                                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
                                    <div className='absolute top-32 w-1/3 h-3/4'>
                                        <div className='w-full h-full bg-slate-200 bg-cover'>
                                            <button
                                                type="button"
                                                className="absolute -top-8 -right-8"
                                                onClick={handleToggle}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                                            </button>
                                            <img src={movie.poster} className='h-1/2 w-full' />
                                            <h1 className='py-4 text-center font-bold text-lg opacity-70'>{movie.title}</h1>
                                            <div className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] mx-auto border-blue-500 border rounded-full flex flex-col items-center justify-center text-center'>
                                                <div className='flex flex-col justify-center items-center'>
                                                    <StarSolidIcon className='h-8 text-amber-400' />
                                                    <p className={`${movie.rating ? 'text-lg' : 'text-base'} text-slate-700 font-bold`}>{movie.rating ? movie.rating : "N/A"}</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center py-2'>
                                                <div className='grid grid-cols-5 gap-1'>
                                                    <span
                                                        onMouseEnter={() => setHoverRating(1)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setRating(1)}
                                                    >
                                                        <StarOutlineIcon
                                                            className={`flex justify-center h-6 md:h-8 ${hoverRating >= 1 || rating >= 1 ? 'text-amber-300' : 'text-gray-400'}`}
                                                        />
                                                    </span>
                                                    <span
                                                        onMouseEnter={() => setHoverRating(2)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setRating(2)}
                                                    >
                                                        <StarOutlineIcon
                                                            className={`flex justify-center h-6 md:h-8 ${hoverRating >= 2 || rating >= 2 ? 'text-amber-300' : 'text-gray-400'}`}
                                                        />
                                                    </span>
                                                    <span
                                                        onMouseEnter={() => setHoverRating(3)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setRating(3)}
                                                    >
                                                        <StarOutlineIcon
                                                            className={`flex justify-center h-6 md:h-8 ${hoverRating >= 3 || rating >= 3 ? 'text-amber-300' : 'text-gray-400'}`}
                                                        />
                                                    </span>
                                                    <span
                                                        onMouseEnter={() => setHoverRating(4)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setRating(4)}
                                                    >
                                                        <StarOutlineIcon
                                                            className={`flex justify-center h-6 md:h-8 ${hoverRating >= 4 || rating >= 4 ? 'text-amber-300' : 'text-gray-400'}`}
                                                        />
                                                    </span>
                                                    <span
                                                        onMouseEnter={() => setHoverRating(5)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setRating(5)}
                                                    >
                                                        <StarOutlineIcon
                                                            className={`flex justify-center h-6 md:h-8 ${hoverRating >= 5 || rating >= 5 ? 'text-amber-300' : 'text-gray-400'}`}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='w-full bottom-0 absolute md:flex'>
                                                <button
                                                    className="w-1/2 p-4 text-sm bg-slate-300 font-medium uppercase hidden md:block"
                                                    type="button"
                                                    onClick={handleToggle}
                                                >
                                                    Đóng
                                                </button>
                                                <button
                                                    className="w-full md:w-1/2 p-2 md:p-4 text-sm bg-cyan-600 font-medium uppercase" type='submit'
                                                    onClick={() => {
                                                        (!user.auth) ?
                                                            handleModalStates() :
                                                            handleReviewMovie('', rating, movie.movieId)
                                                        handleToggle(!toggleRV)
                                                    }}
                                                >
                                                    <a>Xác nhận</a>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                            className="absolute -top-8 -right-8 text-white cursor-pointer"
                                            onClick={closeTrailer}
                                        >
                                            <XMarkIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
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
                                    <div className='grid grid-cols-6 px-4'>
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
                                        <div className='relative sm:pl-60 pb-4 mb-4 min-h-[200px] px-4'>
                                            {/* vị trí */}
                                            <div className='absolute hidden sm:block top-0 left-4 bg-slate-700 w-60'>
                                                <Cinema cinemaName={foundShowtime.room.cinema.cinemaName} location={foundShowtime.room.cinema.location} urlLocation={foundShowtime.room.cinema.urlLocation} />
                                            </div>
                                            {/* thời gian */}
                                            <div className='block relative'>
                                                <div className='relative sm:pl-28 pt-4'>
                                                    <ul className='grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                                                        {foundShowtime.listTimeShow
                                                            .find((item) => FormatDataTime(item.date).date === selectedDateTime.date)
                                                            ?.time.map((time, index) => {
                                                                const currentDateTime = new Date();
                                                                const currentDate = FormatDataTime(currentDateTime.toISOString()).date
                                                                const currentTime = FormatDataTime(currentDateTime.toISOString()).time

                                                                const isTimeInFuture = selectedDateTime.date > currentDate || (selectedDateTime.date === currentDate && time > currentTime);
                                                                return (
                                                                    <li key={index}
                                                                        onClick={() => {
                                                                            if (!user.auth) {
                                                                                handleModalStates();
                                                                            } else if (isTimeInFuture) {
                                                                                setSelectedDateTime((prevState) => ({ ...prevState, time: time }));
                                                                                const updatedDateTime = { ...selectedDateTime, time: time };
                                                                                navigate(`/${foundShowtime.showTimeId}/order`, { state: { dateTime: updatedDateTime } });
                                                                            }
                                                                        }}
                                                                        className={`inline-block ${isTimeInFuture ? 'clickable' : 'unclickable'}`}
                                                                    >
                                                                        <a
                                                                            className={`block leading-[46px] ${isTimeInFuture ? 'hover:text-white hover:bg-emerald-600' : 'text-gray-500 bg-gray-300'} bg-slate-900 text-center text-xl text-cyan-300`}
                                                                            style={{ cursor: isTimeInFuture ? 'pointer' : 'not-allowed' }}
                                                                        >
                                                                            {time}
                                                                        </a>
                                                                    </li>
                                                                );
                                                            }) || (
                                                                <p className='absolute text-xl text-slate-200'>-- Chưa có lịch chiếu cho ngày hôm nay. Hãy quay lại sau. Xin cảm ơn !!! --</p>
                                                            )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                        }
                    </div>
                    <div>
                        {modalStates && (
                            <ModalComponent
                                isOpen={modalStates}
                                onClose={() => handleModalStates()}
                                onConfirm={() => navigate("/signup")}
                                onCancel={() => handleModalStates()}
                                title='Đăng nhập để trải nghiệm chức năng'
                                content='Vui lòng đăng ký nếu như bạn chưa có tài khoản. Hoặc đăng nhập nếu đã có tài khoản bạn nhé. Xin cảm ơn !!!'
                                buttonName='Chuyển đến trang đăng ký/ đăng nhập'
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Movie