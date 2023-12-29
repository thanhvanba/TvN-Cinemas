import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { format, addDays } from 'date-fns';
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
    const [allShowMovie, setAllShowMovie] = useState([])
    const [dateList, setDateList] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
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
    const [infoOrderQuickly, setInfoOrderQuickly] = useState({
        movieId: "",
        cinemaId: "",
        date: "",
        timeShow: ""
    })

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

    const hadleGetItem = async () => {
        let resCinema = await getAllCinemaApi()
        if (resCinema && resCinema.data && resCinema.data.result && resCinema.data.result.content) {
            setAllCinema(resCinema.data.result.content)
        }

        let resNowPlayMovie = await NowPlayingMovieApi()
        let resSpecialMovie = await SpecialMovieApi()
        if (resNowPlayMovie && resSpecialMovie &&
            resNowPlayMovie.data && resSpecialMovie.data &&
            resNowPlayMovie.data.result && resSpecialMovie.data.result
        ) {
            let movie = [...resNowPlayMovie.data.result, ...resSpecialMovie.data.result]
            setAllShowMovie(movie)
        }

        let resShowtime = await getAllShowtimeApi()
        if (resShowtime && resShowtime.data && resShowtime.data.result && resShowtime.data.result.content) {
            setAllShowtime(resShowtime.data.result.content)
        }
    }
    const FoundShowtime = (movieId, cinemaId) => {
        const foundShowtime = allShowtime.find(
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
            case 'cinema':
                const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
                const cinemaId = cinema.cinemaId
                setInfoOrderQuickly({ ...infoOrderQuickly, cinemaId: cinemaId })
                break;
            case 'movie':
                const movie = allShowMovie.find(movie => movie.title === selectedValue)
                const movieId = movie.movieId
                setInfoOrderQuickly({ ...infoOrderQuickly, movieId: movieId })
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
        hadleGetItem()
        ListDayShowtime()
    }, []);
    return (
        <div className="block h-36">
            <div className="inline-block w-[18%] p-3 items-center justify-between font-bold text-emerald-800">
                <h2 className="uppercase font-bold text-2xl">mua vé <br /> nhanh </h2>
            </div>
            <div className="inline-block w-[82%] p-2">
                <div className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-bl-full rounded-r-full text-gray-200 relative h-120 w-64">
                    <SelectMenu onSelectChange={(value) => handleSelectChange(value, 'movie')} items={listNameMovie} content={"Chọn phim"} />
                </div>
                <div className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-br-full text-gray-200 relative h-12 w-64">
                    <SelectMenu
                        onSelectChange={(value) => handleSelectChange(value, 'cinema')}
                        items={infoOrderQuickly.movieId ? listNameCinema : []}
                        content={"Chọn rạp"}
                    />
                    {/* {!infoOrderQuickly.movieId && <div className='absolute z-50 rounded-xl top-8 px-4 py-2 bg-orange-600 text-slate-900 w-60'>Vui lòng chọn phim</div>} */}
                </div>
                <div className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-tl-full rounded-r-full text-gray-200 relative h-12 w-64">
                    <SelectMenu
                        onSelectChange={(value) => handleSelectChange(value, 'date')}
                        items={infoOrderQuickly.cinemaId ? formattedDates : []}
                        content={"Chọn ngày"} />
                </div>
                <div onClick={handleToggle} className="inline-block pl-2 py-3 hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-tr-full text-gray-200 relative h-12 w-64">
                    <h3 className='pl-2 pr-8'>Chọn lịch chiếu</h3>
                    <span className='absolute right-2 top-3 '><ChevronUpDownIcon className='h-5 w-5 text-gray-400' /></span>
                </div>

                {toggle &&
                    <div className='bg-slate-100 py-8 absolute right-4 top-32 rounded-xl'>
                        <ul className='px-2 grid grid-cols-4 gap-4 w-80'>
                            {
                                foundShowtime && foundShowtime.listTimeShow
                                    .find((item) => FormatDataTime(item.date).date === selectedDateTime.date)
                                    ?.time.map((time, index) => {
                                        const currentDateTime = new Date();
                                        const currentDate = FormatDataTime(currentDateTime.toISOString()).date
                                        const currentTime = FormatDataTime(currentDateTime.toISOString()).time

                                        const isTimeInFuture = selectedDateTime.date > currentDate || (selectedDateTime.date === currentDate && time > currentTime);
                                        return (
                                            <li key={index} onClick={() => {
                                                if (!user.auth) {
                                                    handleModalStates();
                                                } else if (isTimeInFuture) {
                                                    setSelectedDateTime((prevState) => ({ ...prevState, time: time }));
                                                    const updatedDateTime = { ...selectedDateTime, time: time };
                                                    navigate(`/${foundShowtime.showTimeId}/order`, { state: { dateTime: updatedDateTime } });
                                                }
                                            }} className={`inline-block ${isTimeInFuture ? 'clickable' : 'unclickable'}`}>
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
                    />
                )}
            </div>
        </div>
    )
}

export default OrderQuickly
