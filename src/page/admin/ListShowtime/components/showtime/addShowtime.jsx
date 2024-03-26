import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormatDataTime from '../../../../../utils/FormatDataTime';

import AdminService from '../../../../../service/AdminService'
import ManagerService from '../../../../../service/ManagerService';
import MovieService from '../../../../../service/MovieService';
import UserService from '../../../../../service/UserService';
import UseToastNotify from '../../../../../utils/UseToastForNotify';

import { LoginContext } from '../../../../../context/LoginContext';
import Loading from '../../../../../components/Loading';

const AddShowtime = () => {
    const { showtimeId } = useParams();
    const { pathname } = useLocation()

    const navigate = useNavigate()
    const location = useLocation();
    const { cinemaName } = location.state || {};

    const { getAllRoomApi } = AdminService()
    const { addShowtimeApi, updateShowTimeApi, getAllRoomByManagerApi } = ManagerService()
    const { getOneShowtimeApi } = UserService()
    const { GetAllMovieApi } = MovieService()

    const { user } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectDate, setSelectDate] = useState(null);
    const [oneShowtime, setOneShowtime] = useState({
        showTimeId: "",
        room: {
            roomId: "",
            cinema: {
                cinemaId: "",
                location: "",
                cinemaName: "",
                desc: "",
                status: true,
                urlLocation: null
            },
            roomName: "",
            delet: false
        },
        movie: {
            movieId: "",
            title: "",
            director: "",
            genres: "",
            actor: "",
            releaseDate: "",
            desc: "",
            poster: "",
            trailerLink: "",
            duration: "",
            reviews: [],
            rating: "0",
            delete: false
        },
        timeStart: "",
        timeEnd: "",
        status: true,
        listTimeShow: [
            {
                date: "",
                time: []
            },
        ],
        seats: null,
        special: false
    })
    const [showtime, setShowtime] = useState({
        roomId: "",
        movieId: "",
        timeStart: "",
        timeEnd: "",
        special: "",
        listTimeShow: [],
    })

    const [schedule, setSchedule] = useState(oneShowtime.listTimeShow || [{ date: "", time: [] },]);

    const [allMovie, setAllMovie] = useState([])
    const [allRoom, setAllRoom] = useState([])

    const handleGetAllItem = async (pathname) => {
        if (pathname === "/admin/add-item/showtime") {
            let resMovie = await GetAllMovieApi()
            if (resMovie && resMovie.data && resMovie.data.result && resMovie.data.result.content) {
                setAllMovie(resMovie.data.result.content)
            }
        }

        let resRoom = (user.role === "ADMIN") ?
            await getAllRoomApi() : await getAllRoomByManagerApi()

        if (resRoom && resRoom.data && resRoom.data.result && resRoom.data.result.content) {
            setAllRoom(resRoom.data.result.content)
        }
    }
    const handleAddShowtime = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = showtime;
        await addShowtimeApi(data);
        navigate(-1)
        setLoading(false);
    };
    const handleUpdateShowtime = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = showtime;
        let resShowtime = await updateShowTimeApi(showtimeId, data);
        navigate(-1)
        if (resShowtime && resShowtime.data && resShowtime.data.result) {
            console.log(resShowtime.data.result)
        }
        setLoading(false);
    };
    const hadleGetOneShowtime = async () => {
        let resShowtime = await getOneShowtimeApi(showtimeId)
        if (resShowtime && resShowtime.data && resShowtime.data.result) {
            setOneShowtime(resShowtime.data.result)
        }
        setLoading1(false)
    }

    const listNameMovie = allMovie.map(item => item.title)
    const listNameRoom = allRoom.map(item => item.roomName)
    const handleSelectChange = (selectedValue) => {
        const movie = allMovie.find(movie => movie.title === selectedValue)
        if (movie) {
            const selectedId = movie.movieId
            setShowtime({ ...showtime, movieId: selectedId })
        }
        const room = allRoom.find(room => room.roomName === selectedValue)
        if (room) {
            const roomId = room.roomId
            setShowtime({ ...showtime, roomId: roomId })
        }
    };

    const [isChecked, setIsChecked] = useState(oneShowtime.special || false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleTimeChange = (date, selectedTime) => {
        // Kiểm tra xem ngày đã tồn tại trong mảng lịch chưa
        const parts = date.toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }).split('/');
        const dateFormat = `${parts[2]}-${String(parts[0]).padStart(2, '0')}-${String(parts[1]).padStart(2, '0')}`;

        const existingDayIndex = schedule.findIndex((item) => item.date === dateFormat);
        if (existingDayIndex !== -1) {
            // Nếu ngày đã tồn tại, thêm thời gian vào ngày đó
            const existingDay = schedule[existingDayIndex];
            if (!existingDay.time.includes(selectedTime)) {
                const updatedSchedule = [...schedule];
                const updatedTime = [...existingDay.time, selectedTime].sort();
                updatedSchedule[existingDayIndex].time = updatedTime;
                setSchedule(updatedSchedule); // Cập nhật lịch
            } else {
                UseToastNotify(`Thời gian ${selectedTime} đã tồn tại trong ngày ${dateFormat}.`, 'warn')
            }

        } else {
            // schedule.push({
            //     date: dateFormat,
            //     time: [selectedTime]
            // })
            // setSchedule([...schedule, { date: dateFormat, time: [selectedTime] }]);
            const newDay = { date: dateFormat, time: [selectedTime] };
            const updatedSchedule = [...schedule, newDay];
            updatedSchedule.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sắp xếp lại lịch
            setSchedule(updatedSchedule);
        }
    };
    const handleRemoveTime = (date, selectedTime) => {
        // Tìm đối tượng có ngày tương ứng trong mảng lịch
        const existingDay = schedule.find((item) => item.date === date);

        if (existingDay) {
            const updatedTimes = existingDay.time.filter((time) => time !== selectedTime);
            existingDay.time = updatedTimes
            // Cập nhật mảng lịch với thời gian mới
            setSchedule((prevSchedule) => {
                const newSchedule = [...prevSchedule];
                const existingDayIndex = newSchedule.findIndex((item) => item.date === date);
                newSchedule[existingDayIndex] = { date: date, time: updatedTimes };
                return newSchedule;
            });
        }
    };

    useEffect(() => {
        if (pathname === "/admin/add-item/showtime") {
            setShowtime({
                roomId: "",
                movieId: "",
                timeStart: "",
                timeEnd: "",
                special: "",
                listTimeShow: [],
            })
            setOneShowtime({
                showTimeId: "",
                room: {
                    roomId: "",
                    cinema: {
                        cinemaId: "",
                        location: "",
                        cinemaName: "",
                        desc: "",
                        status: true,
                        urlLocation: null
                    },
                    roomName: "",
                    delet: false
                },
                movie: {
                    movieId: "",
                    title: "",
                    director: "",
                    genres: "",
                    actor: "",
                    releaseDate: "",
                    desc: "",
                    poster: "",
                    trailerLink: "",
                    duration: "",
                    reviews: [],
                    rating: "0",
                    delete: false
                },
                timeStart: "",
                timeEnd: "",
                status: true,
                listTimeShow: [
                    {
                        date: "",
                        time: []
                    },
                ],
                seats: null,
                special: false
            })
        }
        handleGetAllItem(pathname)
    }, [pathname]);
    useEffect(() => {
        if (showtimeId) {
            hadleGetOneShowtime();
            setLoading1(true);
        }
    }, [showtimeId]);
    useEffect(() => {
        setIsChecked(oneShowtime.special)
        setSchedule(oneShowtime.listTimeShow)
        pathname !== "/admin/add-item/showtime" &&
            setShowtime({
                ...showtime,
                roomId: oneShowtime.room.roomId,
                movieId: oneShowtime.movie.movieId,
                timeStart: oneShowtime.timeStart,
                timeEnd: oneShowtime.timeEnd,
                special: oneShowtime.special,
                listTimeShow: oneShowtime.listTimeShow,
            })
    }, [oneShowtime]);
    return (
        <div>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 onClick={() => { navigate("/admin/cinema/") }} className='cursor-pointer font-medium text-2xl'>Rạp</h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    <h2 onClick={() => { navigate(-1) }} className='cursor-pointer font-medium text-2xl'>{cinemaName}</h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    {/^\/admin\/add-item\/showtime/.test(pathname) ?
                        <h2 className='cursor-default text-xl'>Thêm lịch chiếu</h2>
                        : <h2 className='cursor-default text-xl'>Chỉnh sửa lịch chiếu</h2>
                    }
                </div>
            </div>
            <div className='px-4 relative'>
                <div className='absolute mx-auto top-80 right-1/2 z-50'>
                    {loading1 && <Loading />}
                </div>
                {!loading1 &&
                    <div className='pt-8'>
                        <div className='border p-8'>
                            <form id='formAddCinema' onSubmit={pathname === "/admin/add-item/showtime" ? handleAddShowtime : handleUpdateShowtime} action="">
                                <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Movie
                                        </label>
                                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                            {
                                                pathname === "/admin/add-item/showtime" ?
                                                    <SelectMenu onSelectChange={handleSelectChange} items={listNameMovie} content={"-------Select-------"} /> :
                                                    <input
                                                        type="text"
                                                        className="placeholder-neutral-900 w-full  text-lg focus:outline-none"
                                                        placeholder={oneShowtime.movie.title}
                                                        readOnly
                                                    />
                                            }
                                        </div>
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Room
                                        </label>
                                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                            {
                                                pathname === "/admin/add-item/showtime" ?
                                                    <SelectMenu onSelectChange={handleSelectChange} items={listNameRoom} content={"-------Select-------"} /> :
                                                    pathname === `/admin/showtime/${showtimeId}` ?
                                                        <input
                                                            type="text"
                                                            className="placeholder-neutral-900 w-full text-lg focus:outline-none"
                                                            placeholder={oneShowtime.room.roomName}
                                                            readOnly
                                                        /> :
                                                        <SelectMenu onSelectChange={handleSelectChange} items={listNameRoom} content={oneShowtime.room.roomName} />
                                            }
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className="relative my-4 w-full">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Time Start
                                            </label>
                                            {pathname === `/admin/showtime/${showtimeId}` ?
                                                <div className="relative mt-1 pr-4 w-4/5 cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                    <input
                                                        type="text"
                                                        className="placeholder-neutral-900 w-full text-lg focus:outline-none"
                                                        placeholder={FormatDataTime(oneShowtime.timeStart).date}
                                                        readOnly
                                                    />
                                                </div> :
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={date => {
                                                        setStartDate(date);
                                                        setShowtime({ ...showtime, timeStart: date });
                                                    }}
                                                    placeholderText={FormatDataTime(oneShowtime.timeStart).date}
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    dateFormat="yyyy-MM-dd" // Định dạng ngày
                                                />}
                                        </div>
                                        <div className="relative my-4 w-full">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Time End
                                            </label>
                                            {pathname === `/admin/showtime/${showtimeId}` ?
                                                <div className="relative mt-1 pr-4 w-4/5 cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                    <input
                                                        type="text"
                                                        className="placeholder-neutral-900 w-full text-lg focus:outline-none"
                                                        placeholder={FormatDataTime(oneShowtime.timeEnd).date}
                                                        readOnly
                                                    />
                                                </div> :
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={date => {
                                                        setEndDate(date);
                                                        setShowtime({ ...showtime, timeEnd: date });
                                                    }}
                                                    placeholderText={FormatDataTime(oneShowtime.timeEnd).date}
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    dateFormat="yyyy-MM-dd" // Định dạng ngày
                                                />}
                                        </div>
                                        <div className="relative my-4 w-full">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Is Special:
                                            </label>
                                            <label className="inline-flex items-center mt-4">
                                                {
                                                    pathname === "/admin/add-item/showtime" ?
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-indigo-600 h-5 w-5"
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                                handleCheckboxChange(e);
                                                                setShowtime({ ...showtime, special: e.target.checked });
                                                            }}
                                                        /> : pathname === `/admin/showtime/${showtimeId}` ?
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox text-indigo-600 h-5 w-5"
                                                                checked={isChecked}
                                                                onChange={(e) => {
                                                                    handleCheckboxChange(e);
                                                                    setShowtime({ ...showtime, special: e.target.checked });
                                                                }}
                                                                disabled
                                                            /> :
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox text-indigo-600 h-5 w-5"
                                                                checked={isChecked}
                                                                onChange={(e) => {
                                                                    handleCheckboxChange(e);
                                                                    setShowtime({ ...showtime, special: e.target.checked });
                                                                }}
                                                            />
                                                }
                                                <span className="ml-2">Special</span>

                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className="rounded-md p-8 mt-8 shadow-lg bg-slate-100 relative">

                                    <div className=''>
                                        {
                                            pathname !== `/admin/showtime/${showtimeId}` &&
                                            <>
                                                <h2 className='text-lg font-medium leading-6 text-gray-900'>Set up schedule</h2>
                                                <div className='flex justify-between'>
                                                    <div className="relative m-8 w-full">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900 pb-2"
                                                        >
                                                            Date <br />
                                                            <span className='text-xs font-extralight text-red-400'>( --Ngày thuộc khoảng thời gian chiếu đã chọn ở trên-- )</span>
                                                        </label>
                                                        <DatePicker
                                                            selected={selectDate}
                                                            onChange={date => setSelectDate(date)}
                                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                            dateFormat="yyyy-MM-dd"
                                                        />
                                                    </div>
                                                    <div className="relative m-8 w-full">
                                                        <label
                                                            htmlFor=""
                                                            className="block text-lg font-medium leading-6 text-gray-900 pb-2"
                                                        >
                                                            Time<br />
                                                            <span className='text-xs font-extralight'>( Thời gian chiếu trong ngày )</span>
                                                        </label>
                                                        <DatePicker
                                                            selected={selectDate}
                                                            onChange={e => {
                                                                handleTimeChange(e, e.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
                                                                const nonEmptySchedule = schedule.filter(item => Object.keys(item).length > 0);

                                                                setShowtime({ ...showtime, listTimeShow: nonEmptySchedule });
                                                            }}
                                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            dateFormat="HH:mm"
                                                            timeFormat="HH:mm"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        <div className='p-8 border-2'>
                                            <h2 className='font-medium text-lg text-gray-900'>Schedule:</h2>
                                            <ul>
                                                {schedule.map((item, index) => (
                                                    <li key={item.date}>
                                                        {item.time.length > 0 && (
                                                            <>
                                                                <p className='py-4'>
                                                                    <span className='text-emerald-600 pr-8 font-semibold'>{user.role === "ADMIN" ? index + 1 : index}. Date:</span>
                                                                    {FormatDataTime(item.date).date}
                                                                </p>
                                                                <div className='flex'>
                                                                    <p className='text-emerald-600 font-medium px-4'> Time:</p>
                                                                    <ul className='justify-center grid grid-cols-8 gap-4'>
                                                                        {item.time.map((time) => (
                                                                            <li className='bg-slate-200 rounded-lg p-0.5' key={time}>
                                                                                <span className='p-2'>{time}</span>
                                                                                {
                                                                                    pathname !== `/admin/showtime/${showtimeId}` &&
                                                                                    <button className='text-red-400 pr-2'
                                                                                        onClick={() => {
                                                                                            handleRemoveTime(item.date, time)
                                                                                            const nonEmptySchedule = schedule.filter(item => Object.keys(item).length > 0);
                                                                                            setShowtime({ ...showtime, listTimeShow: nonEmptySchedule });
                                                                                        }}
                                                                                    >
                                                                                        <sup>X</sup>
                                                                                    </button>
                                                                                }
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>

                                    </div>
                                </div>
                                {pathname !== `/admin/showtime/${showtimeId}` &&
                                    <div className='flex justify-end'>

                                        <button
                                            className="w-1/6 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                            type='submit'
                                            disabled={loading}
                                        >
                                            {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                            &nbsp;{pathname === "/admin/add-item/showtime" ? "Add Showtime" : "Update Showtime"}
                                        </button>
                                    </div>}
                            </form>
                        </div>
                    </div>}
            </div>
        </div >
    )
}
export default AddShowtime