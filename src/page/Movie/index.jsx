import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { format, addDays, isAfter, parse } from 'date-fns';
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
import DetailMovie from './components/detailMovie';

const Movie = () => {
    const { GetOneMovieApi } = MovieService()
    const { getAllCinemaApi } = CinemaService()
    const { getShowtimeByMovieApi } = UserService()
    const navigate = useNavigate()

    const [modalStates, setModalStates] = useState(false);
    const { user } = useContext(LoginContext)

    const { id } = useParams();
    const [dateList, setDateList] = useState([]);
    const [cinemaId, setCinemaId] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "", scheduleId: "" });
    const [movie, setMovie] = useState({})
    const [allCinema, setAllCinema] = useState([])
    const [allShowtime, setAllShowtime] = useState([])
    const [foundShowtime, setFoundShowtime] = useState([])
    const [listSchedule, setListSchedule] = useState([])


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

    const FoundShowtime = (cinemaId) => {
        let schedule = []
        const foundShowtime = allShowtime.filter(
            item =>
                item.room.cinema.cinemaId === cinemaId &&
                item.movie.movieId === id
        );
        foundShowtime && setFoundShowtime(foundShowtime);
        foundShowtime.map((showtime) => {
            schedule = [...schedule, ...showtime.schedules]; // Thêm lịch chiếu từ showtime.schedule vào mảng schedule
        });
        let updatedSchedule = schedule.sort((a, b) => {
            // Lấy giờ bắt đầu từ startTime của mỗi đối tượng
            const startTimeA = a.startTime;
            const startTimeB = b.startTime;

            // So sánh theo thứ tự tăng dần của giờ bắt đầu
            if (startTimeA < startTimeB) return -1;
            if (startTimeA > startTimeB) return 1;
            return 0;
        })
        
        console.log("🚀 ~ FoundShowtime ~ updatedSchedule:", updatedSchedule)
        setListSchedule(updatedSchedule)
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
        localStorage.setItem('cinemaId', selectedId);
        FoundShowtime(selectedId)
    };

    let hasShowtimes = false;
    return (
        <div className='pt-32 h-auto'>
            <div className='max-w-6xl mx-auto pb-4'>
                {/* chi tiết phim */}
                <DetailMovie movie={movie} />
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
                                <SelectMenu onSelectChange={handleSelectChange} items={listNameCinema} content={"--------Chọn rạp--------"} />
                            </div>
                        </div>
                        {
                            foundShowtime.length === 0 ?
                                <p className='text-2xl text-slate-200 text-center pt-4'>-- Chưa có thông tin lịch chiếu cho bộ phim này !!! --</p>
                                :
                                <div>
                                    {/* ngày chiếu */}
                                    <div className='grid grid-cols-6 px-4 cursor-default'>
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
                                                <Cinema cinemaName={foundShowtime[0]?.room.cinema.cinemaName} location={foundShowtime[0]?.room.cinema.location} urlLocation={foundShowtime[0]?.room.cinema.urlLocation} />
                                            </div>
                                            {/* thời gian */}
                                            <div className='block relative'>
                                                <div className='relative sm:pl-28 pt-4'>
                                                    <ul className='grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                                                        {listSchedule.map((schedule, index) => {
                                                            const currentDateTime = new Date();
                                                            const dateTime = parse(`${selectedDateTime.date} ${schedule.startTime}`, 'dd/MM/yyyy HH:mm:ss', new Date());
                                                            if (FormatDataTime(schedule.date).date === selectedDateTime.date) {
                                                                const isTimeInFuture = isAfter(dateTime, currentDateTime);
                                                                hasShowtimes = true;
                                                                return (
                                                                    <li key={index}
                                                                        onClick={() => {
                                                                            if (!user.auth) {
                                                                                handleModalStates();
                                                                            } else if (isTimeInFuture) {
                                                                                setSelectedDateTime((prevState) => ({ ...prevState, time: schedule.startTime, scheduleId: schedule.scheduleId }));
                                                                                const updatedDateTime = {
                                                                                    ...selectedDateTime, time: schedule.startTime, scheduleId: schedule.scheduleId
                                                                                };
                                                                                navigate(`/${schedule?.showTimeId}/order`, { state: { dateTime: updatedDateTime, cinemaId: cinemaId } });
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
                                                        }
                                                    </ul>
                                                    {!hasShowtimes && (
                                                        <p className='text-xl text-slate-200 text-center'>-- Chưa có lịch chiếu --</p>
                                                    )}
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
                                title='Đăng nhập để trải nghiệm chức năng đặt vé'
                                content='Vui lòng đăng ký nếu như bạn chưa có tài khoản. Hoặc đăng nhập nếu đã có tài khoản bạn nhé. Xin cảm ơn !!!'
                                buttonName='Chuyển đến trang đăng ký/ đăng nhập'
                                buttonCancel='Thoát'
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Movie