import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { format, addDays, parse, isAfter } from 'date-fns';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectMenu from '../SelectMenu/SelectMenu'
import MovieService from '../../service/MovieService';
import UserService from '../../service/UserService';

import ModalComponent from '../../utils/Modal';

import CinemaService from '../../service/CinemaService';
import FormatDataTime from '../../utils/FormatDataTime';

import { LoginContext } from '../../context/LoginContext';

function OrderQuickly() {
    const { SpecialMovieApi, NowPlayingMovieApi, GetOneMovieApi } = MovieService()
    const { getShowtimeByMovieApi, getAllShowtimeApi } = UserService()
    const { getAllCinemaApi } = CinemaService()

    const navigate = useNavigate()

    const [modalStates, setModalStates] = useState(false);
    const { user } = useContext(LoginContext)

    const [toggle, setToggle] = useState(false)
    const [allCinema, setAllCinema] = useState([])
    console.log("🚀 ~ OrderQuickly ~ allCinema:", allCinema)
    const [allShowMovie, setAllShowMovie] = useState([])
    console.log("🚀 ~ OrderQuickly ~ allShowMovie:", allShowMovie)
    const [dateList, setDateList] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
    const [allShowtime, setAllShowtime] = useState([])
    console.log("🚀 ~ OrderQuickly ~ allShowtime:", allShowtime)
    // const [foundShowtime, setFoundShowtime] = useState({
    //     showTimeId: null,
    //     room: {
    //         roomId: null,
    //         cinema: {
    //             cinemaId: null,
    //             location: null,
    //             cinemaName: null,
    //             desc: null,
    //             status: null,
    //             urlLocation: null
    //         },
    //         roomName: null
    //     },
    //     movie: {
    //         movieId: null,
    //         title: null,
    //         director: null,
    //         genres: null,
    //         actor: null,
    //         releaseDate: null,
    //         desc: null,
    //         poster: null,
    //         trailerLink: null,
    //         duration: null,
    //         reviews: null,
    //         rating: null,
    //         delete: null
    //     },
    //     timeStart: null,
    //     timeEnd: null,
    //     status: null,
    //     listTimeShow: [
    //     ],
    //     seats: null,
    //     special: null
    // })
    const [foundShowtime, setFoundShowtime] = useState([])
    console.log("🚀 ~ OrderQuickly ~ foundShowtime:", foundShowtime)
    const [infoOrderQuickly, setInfoOrderQuickly] = useState({
        movieId: "",
        cinemaId: "",
        date: "",
        timeShow: ""
    })

    console.log("🚀 ~ OrderQuickly ~ infoOrderQuickly:", infoOrderQuickly)
    const handleToggle = () => {
        setToggle(!toggle)
    }
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

    const handleGetShowMovie = async () => {

        let resNowPlayMovie = await NowPlayingMovieApi()
        resNowPlayMovie && resNowPlayMovie.data && resNowPlayMovie.data.result &&
            setAllShowMovie(resNowPlayMovie.data.result)

    }

    const handleGetShowtimeByMovie = async (movieId) => {
        console.log("🚀 ~ handleGetShowtimeByMovie ~ movieId:", movieId)
        // let resShowtimes = await getShowtimeByMovieApi(movieId)
        // if (resShowtimes && resShowtimes.data && resShowtimes.data.result) {
        //     setAllShowtime(resShowtimes.data.result)
        // }

        let resShowtimes = await getShowtimeByMovieApi(movieId)
        if (resShowtimes && resShowtimes.data && resShowtimes.data.result) {
            setAllShowtime(resShowtimes.data.result)
        }
    }

    const handleGetAllCinema = async () => {
        let resCinema = await getAllCinemaApi()
        if (resCinema && resCinema.data && resCinema.data.result && resCinema.data.result.content) {
            setAllCinema(resCinema.data.result.content)
        }
    }
    const FoundShowtime = (movieId, cinemaId) => {
        console.log("🚀 ~ FoundShowtime ~ cinemaId:", cinemaId)
        console.log("🚀 ~ FoundShowtime ~ movieId:", movieId)
        const foundShowtime = allShowtime.filter(
            item =>
                item.room.cinema.cinemaId === cinemaId &&
                item.movie.movieId === movieId
        );
        if (foundShowtime) {
            setFoundShowtime(foundShowtime);
        } else {
            setFoundShowtime(foundShowtime);
        }
    }

    const listNameCinema = allCinema.map(item => item.cinemaName)
    const listNameMovie = allShowMovie.map(item => item.title)
    const formattedDates = dateList.map(date => {
        const formattedDate = FormatDataTime(date).date
        const dayOfWeek =
            (FormatDataTime(date).dayOfWeek === 0)
                ? 'CN'
                : 'Th ' + (FormatDataTime(date).dayOfWeek + 1)
        return `${dayOfWeek}: ${formattedDate}`;
    });

    const handleSelectChange = (selectedValue, selectType) => {
        switch (selectType) {
            case 'movie':
                const movie = allShowMovie.find(movie => movie.title === selectedValue)
                const movieId = movie.movieId
                setInfoOrderQuickly({ ...infoOrderQuickly, movieId: movieId })
                handleGetShowtimeByMovie(movieId)
                break;
            case 'cinema':
                const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
                const cinemaId = cinema.cinemaId
                setInfoOrderQuickly({ ...infoOrderQuickly, cinemaId: cinemaId })
                break;
            case 'date':
                FoundShowtime(infoOrderQuickly.movieId, infoOrderQuickly.cinemaId)
                setInfoOrderQuickly({ ...infoOrderQuickly, date: selectedValue })
                setSelectedDateTime({ ...selectedDateTime, date: selectedValue.split(': ')[1].replace('Th ', '') })
                break;
            case 'showtime':

                break;
        };
    }
    const handleModalStates = () => {
        setModalStates(!modalStates);
    };

    useEffect(() => {
        handleGetShowMovie()
        handleGetAllCinema()
        ListDayShowtime()
    }, []);
    let hasShowtimes = false
    return (
        <div className="block h-36 w-full">
            <div className="inline-block md:w-[40%] lg:w-[18%] p-3 items-center justify-between font-bold text-emerald-800">
                <h2 className="uppercase font-bold text-2xl">mua vé <br /> nhanh </h2>
            </div>
            <div className="inline-block md:w-[60%] lg:w-[82%] p-2">
                <div className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-bl-full rounded-r-full text-gray-200 relative h-120 md:w-11/12 lg:w-[44%]">
                    <SelectMenu onSelectChange={(value) => handleSelectChange(value, 'movie')} items={listNameMovie} content={"Chọn phim"} />
                </div>
                <div className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-br-full text-gray-200 relative md:w-11/12 h-12 lg:w-[44%]">
                    <SelectMenu
                        onSelectChange={(value) => handleSelectChange(value, 'cinema')}
                        items={infoOrderQuickly.movieId ? listNameCinema : []}
                        content={"Chọn rạp"}
                    />
                    {/* {!infoOrderQuickly.movieId && <div className='absolute z-50 rounded-xl top-8 px-4 py-2 bg-orange-600 text-slate-900 w-60'>Vui lòng chọn phim</div>} */}
                </div>
                <div className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-tl-full rounded-r-full text-gray-200 relative md:w-11/12  h-12 lg:w-[44%]">
                    <SelectMenu
                        onSelectChange={(value) => handleSelectChange(value, 'date')}
                        items={infoOrderQuickly.cinemaId ? formattedDates : []}
                        content={"Chọn ngày"} />
                </div>
                <div
                    onClick={handleToggle}
                    className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-tr-full text-gray-200 relative h-12 md:w-11/12 lg:w-[44%]"
                >
                    <h3 className='pl-2 pr-8'>Chọn lịch chiếu</h3>
                    <span className='absolute right-2 top-3 '><ChevronUpDownIcon className='h-5 w-5 text-gray-400' /></span>
                </div>

                {toggle &&
                    <div className='bg-slate-100 py-8 absolute right-4 top-32 rounded-xl'>
                        <ul className='px-2 grid grid-cols-4 gap-4 w-80'>
                            {foundShowtime.map((showtimeByRoom, index) => (
                                showtimeByRoom.schedules.map((schedule, index) => {
                                    console.log("🚀 ~ showtimeByRoom.schedules.map ~ schedule:", schedule)
                                    const currentDateTime = new Date();
                                    const dateTime = parse(`${selectedDateTime.date} ${schedule.startTime}`, 'dd/MM/yyyy HH:mm:ss', new Date());
                                    if (FormatDataTime(schedule.date).date === selectedDateTime.date) {
                                        const isTimeInFuture = isAfter(dateTime, currentDateTime);
                                        console.log("🚀 ~ showtimeByRoom.schedules.map ~ isTimeInFuture:", isTimeInFuture)
                                        hasShowtimes = true;
                                        return (
                                            <li key={index}
                                                onClick={() => {
                                                    if (!user.auth) {
                                                        handleModalStates();
                                                    } else if (isTimeInFuture) {
                                                        setSelectedDateTime((prevState) => ({ ...prevState, time: schedule.startTime }));
                                                        const updatedDateTime = {
                                                            ...selectedDateTime, time: schedule.startTime
                                                        };

                                                        console.log("🚀 ~ showtimeByRoom.schedules.map ~ updatedDateTime:", updatedDateTime)
                                                        navigate(`/${showtimeByRoom.showTimeId}/order`, { state: { dateTime: updatedDateTime } });
                                                    }
                                                }}
                                                className={`inline-block ${isTimeInFuture ? 'clickable' : 'unclickable'}`}
                                            >
                                                <a
                                                    className={`block leading-[46px] ${isTimeInFuture ? 'hover:text-white hover:bg-emerald-600' : 'text-gray-500 bg-gray-300'} bg-slate-900 text-center text-xl text-cyan-300`}
                                                    style={{ cursor: isTimeInFuture ? 'pointer' : 'not-allowed' }}
                                                >

                                                    {format(
                                                        parse(`${schedule.startTime}`, 'HH:mm:ss', new Date()),
                                                        "HH:mm"
                                                    )}
                                                </a>
                                            </li>
                                        )
                                    }

                                })
                            ))

                            }
                        </ul>
                        {!hasShowtimes && (
                            <p className='text-xl text-slate-200 text-center'>-- Chưa có lịch chiếu --</p>
                        )}
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
                        title='Đăng nhập để trải nghiệm đặt vé'
                        content='Vui lòng đăng ký nếu như bạn chưa có tài khoản. Hoặc đăng nhập nếu đã có tài khoản bạn nhé. Xin cảm ơn !!!'
                        buttonName='Chuyển đến trang đăng ký/ đăng nhập'
                        buttonCancel='Thoát'
                    />
                )}
            </div>
        </div>
    )
}

export default OrderQuickly
