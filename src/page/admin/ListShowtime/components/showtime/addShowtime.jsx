import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import FormatDataTime from '../../../../../utils/FormatDataTime';

import AdminService from '../../../../../service/AdminService'
import ManagerService from '../../../../../service/ManagerService';
import MovieService from '../../../../../service/MovieService';
import UserService from '../../../../../service/UserService';
import UseToastNotify from '../../../../../utils/UseToastForNotify';

import { LoginContext } from '../../../../../context/LoginContext';
import Loading from '../../../../../components/Loading';

import { Space, TimePicker, DatePicker } from 'antd'
import { format, parse, parseISO } from 'date-fns';

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { BuildingLibraryIcon } from '@heroicons/react/24/solid';

const AddShowtime = () => {
    const { showtimeId } = useParams();
    const { pathname } = useLocation()

    const navigate = useNavigate()
    const location = useLocation();
    const { cinemaId, cinemaName } = location.state || {};

    const { getAllRoomApi, getRoomeByCinemaApi, checkScheduleApi } = AdminService()
    const { addShowtimeApi, updateShowTimeApi, getAllRoomByManagerApi, checkScheduleManagerApi } = ManagerService()
    const { getOneShowtimeApi } = UserService()
    const { GetAllMovieApi } = MovieService()

    const { user } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [startDate, setStartDate] = useState({
        date: "",
        startTime: ""
    });
    const [durationMovie, setDurationMovie] = useState(0);
    const [timeOverLap, setTimeOverLap] = useState({ start: "", end: "" });
    const [endDate, setEndDate] = useState(null);
    const [selectDateTime, setSelectDateTime] = useState({
        date: "",
        startTime: "",
    });
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
            genres: [],
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
        schedules: [],
        seats: null,
        special: false
    })
    const [showtime, setShowtime] = useState({
        roomId: "",
        movieId: "",
        timeStart: "",
        timeEnd: "",
        special: "",
        schedules: [],
    })

    const [schedule, setSchedule] = useState([]);
    const [allMovie, setAllMovie] = useState([])
    const [allRoom, setAllRoom] = useState([])
    const [errors, setErrors] = useState({});
    const handleGetAllItem = async (pathname) => {
        if (pathname === "/admin/add-item/showtime" || pathname === "/manager/add-item/showtime") {
            let resMovie = await GetAllMovieApi(1, 999)
            if (resMovie && resMovie.data && resMovie.data.result && resMovie.data.result.content) {
                setAllMovie(resMovie.data.result.content)
            }
        }

        let resRoom = (user.role === "ADMIN") ?
            await getRoomeByCinemaApi(cinemaId) : await getAllRoomByManagerApi()

        if (resRoom && resRoom.data && resRoom.data.result && resRoom.data.result.content) {
            setAllRoom(resRoom.data.result.content.reverse())
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!showtime.movieId) newErrors.movie = 'Vui lòng chọn phim!';
        if (!showtime.roomId) newErrors.room = 'Vui lòng chọn phòng!';
        if (!showtime.timeStart) newErrors.timeStart = 'Vui lòng chọn thời gian bắt đầu!';
        if (!showtime.timeEnd) newErrors.timeEnd = 'Vui lòng chọn thời gian kết thúc!';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearError = (fieldName) => {
        if (errors[fieldName]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: undefined
            }));
        }
    };
    const handleAddShowtime = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = showtime;
            await addShowtimeApi(data);
            navigate(-1)
            setLoading(false);
        }
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
            setSchedule(transformData(resShowtime.data.result.schedules))
        }
        setLoading1(false)
    }

    const listNameMovie = allMovie.map(item => item.title)
    const listNameRoom = allRoom.map(item => item.roomName)
    const handleSelectChange = (selectedValue) => {
        const movie = allMovie.find(movie => movie.title === selectedValue)
        if (movie) {
            const selectedId = movie.movieId
            setDurationMovie(movie.duration)
            setShowtime({ ...showtime, movieId: selectedId })
            clearError('movie')
        }
        const room = allRoom.find(room => room.roomName === selectedValue)
        if (room) {
            const roomId = room.roomId
            setShowtime({ ...showtime, roomId: roomId })
            clearError('room')
        }
    };

    const [isChecked, setIsChecked] = useState(oneShowtime.special || false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleTimeChange = (date, time) => {
        const newDate = new Date(date)
        const newDateTime = new Date(`2000-01-01 ${time}`);
        const durationDateTime = new Date(newDateTime); // Tạo một bản sao của newDateTime

        // Tính tổng số phút mới bằng cách cộng durationMovie và 15 phút
        const totalMinutes = newDateTime.getMinutes() + parseInt(durationMovie) + 15;

        // Tính số giờ và số phút mới dựa trên tổng số phút mới
        const hoursToAdd = Math.floor(totalMinutes / 60);
        const minutesToAdd = totalMinutes % 60;

        // Cập nhật số giờ và số phút của durationDateTime
        durationDateTime.setHours(durationDateTime.getHours() + hoursToAdd);
        durationDateTime.setMinutes(minutesToAdd);

        const existingDayIndex = schedule.findIndex(item => item.date === date);
        if (existingDayIndex !== -1) {
            const existingDay = schedule[existingDayIndex];
            let overlap = false; // Biến overlap để kiểm tra trùng khớp

            // Kiểm tra xem thời gian mới có trùng với bất kỳ khoảng thời gian nào trong lịch chiếu không
            for (const existingTime of existingDay.time) {
                const existingDateTime = new Date(`2000-01-01 ${existingTime}`);
                const existingDurationDateTime = new Date(existingDateTime)
                console.log("🚀 ~ handleTimeChange ~ existingDateTime:", existingDateTime)
                // Tính tổng số phút mới bằng cách cộng durationMovie và 15 phút
                const totalMinutes = existingDateTime.getMinutes() + parseInt(durationMovie) + 15;;

                // Tính số giờ và số phút mới dựa trên tổng số phút mới
                const hoursToAdd = Math.floor(totalMinutes / 60);
                const minutesToAdd = totalMinutes % 60;

                // Cập nhật số giờ và số phút của durationDateTime
                existingDurationDateTime.setHours(existingDurationDateTime.getHours() + hoursToAdd);
                existingDurationDateTime.setMinutes(minutesToAdd);
                // Nếu thời gian mới trùng khớp với một khoảng thời gian nào đó trong lịch chiếu
                if (newDateTime < existingDurationDateTime && durationDateTime > existingDateTime) {
                    setTimeOverLap({ ...timeOverLap, start: existingDateTime, end: existingDurationDateTime })
                    overlap = true;

                    UseToastNotify(`Lịch chiếu từ (${format(newDateTime, "HH:mm")} - ${format(durationDateTime, "HH:mm")}) đã trùng với lịch chiếu từ (${format(existingDateTime, "HH:mm")} - ${format(existingDurationDateTime, "HH:mm")}) ngày ${format(newDate, "dd/MM/yyyy")}`, 'warn');
                    break; // Dừng vòng lặp ngay khi tìm thấy trùng khớp
                }
            }

            if (overlap) {
                // Hiển thị thông báo nếu có trùng khớp
            } else {
                // Nếu không có trùng khớp, cập nhật lịch và prevShowtime
                console.log("Vào3")
                const updatedSchedule = [...schedule];
                const updatedTime = [...existingDay.time, time].sort();
                updatedSchedule[existingDayIndex].time = updatedTime;
                setSchedule(updatedSchedule);

                setShowtime(prevShowtime => ({
                    ...prevShowtime,
                    schedules: [
                        ...prevShowtime.schedules,
                        { date: date, startTime: time }
                    ]
                }));
            }
        } else {
            // Nếu ngày không tồn tại trong lịch, thêm ngày mới
            const newDay = { date: date, time: [time] };
            const updatedSchedule = [...schedule, newDay];
            updatedSchedule.sort((a, b) => new Date(a.date) - new Date(b.date));
            setSchedule(updatedSchedule);
            setShowtime(prevShowtime => ({
                ...prevShowtime,
                schedules: [
                    ...prevShowtime.schedules,
                    { date: date, startTime: time }
                ]
            }));
        }
    };

    const transformData = (initialData) => {
        let transformedData = [];
        let currentDate = '';
        let currentStartTimes = [];

        if (initialData.length > 0) {
            initialData.forEach(item => {
                if (item.date !== currentDate) {
                    if (currentDate !== '') {
                        transformedData.push({ "date": currentDate, "time": currentStartTimes });
                    }
                    currentDate = item.date;
                    currentStartTimes = [];
                }
                item.startTime &&
                    currentStartTimes.push(format(
                        parse(`${item.startTime}`, 'HH:mm:ss', new Date()),
                        "HH:mm"
                    ));
            });

            transformedData.push({ "date": currentDate, "time": currentStartTimes });
            console.log("🚀 ~ transformData ~ transformedData:", transformedData)
        }
        return transformedData
    }

    const handleRemoveTime = (date, selectedTime) => {
        // Tìm đối tượng có ngày tương ứng trong mảng lịch
        const existingDay = schedule.find((item) => item.date === date);

        if (existingDay) {
            const updatedTimes = existingDay.time.filter((time) => time !== selectedTime);
            existingDay.time = updatedTimes

            let filteredShowtime = showtime.schedules.filter(item => !(item.date === date && item.startTime === selectedTime));
            setShowtime({ ...showtime, schedules: filteredShowtime });
            // Cập nhật mảng lịch với thời gian mới
            setSchedule((prevSchedule) => {
                const newSchedule = [...prevSchedule];
                const existingDayIndex = newSchedule.findIndex((item) => item.date === date);
                newSchedule[existingDayIndex] = { date: date, time: updatedTimes };
                return newSchedule;
            });
        }
    };

    const handleCheckScheduleInDB = async (showtimeId, date, startTime) => {
        setLoading('checkSchedule', true)
        let response
        const params = {
            showtimeId: showtimeId,
            date: date,
            startTime: startTime
        }
        if (user.role === "ADMIN") {
            response = await checkScheduleApi(params)
        } else {
            response = await checkScheduleManagerApi(params)
        }
        setLoading('checkSchedule', !response)
    }
    useEffect(() => {
        if (pathname === "/(admin|manager)/add-item/showtime") {
            setShowtime({
                roomId: "",
                movieId: "",
                timeStart: "",
                timeEnd: "",
                special: "",
                schedules: [],
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
                    genres: [],
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
                schedules: [],
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
        if (pathname !== "/admin/add-item/showtime" || pathname !== "/manager/add-item/showtime") {
            setIsChecked(oneShowtime.special);
            setSchedule(transformData(oneShowtime.schedules));
            setShowtime({
                ...showtime,
                roomId: oneShowtime.room.roomId,
                movieId: oneShowtime.movie.movieId,
                timeStart: oneShowtime.timeStart,
                timeEnd: oneShowtime.timeEnd,
                special: oneShowtime.special,
                schedules: oneShowtime.schedules,
            });
        }
    }, [oneShowtime]);

    const handleSelectDate = (date, dateString) => {
        setSelectDateTime({ ...selectDateTime, date: dateString });
    };

    const handleSelectTime = (time, timeString) => {
        // Cập nhật selectDateTime với startTime mới
        setSelectDateTime({ ...selectDateTime, startTime: timeString });

        // Kiểm tra nếu timeString không rỗng
        if (timeString) {
            // Gọi handleTimeChange với date và startTime mới      
            // handleCheckScheduleInDB(showtimeId, selectDateTime.date, timeString)
            handleTimeChange(selectDateTime.date, timeString);
        }
    };
    return (
        <div>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 className='cursor-default font-medium text-2xl flex items-center'>
                        <BuildingLibraryIcon className='h-10 w-10 mr-1 text-emerald-600' />
                        Rạp
                    </h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    {user.role === "ADMIN" &&
                        <>
                            <h2 onClick={() => { navigate(-1) }} className='cursor-pointer font-medium text-2xl'>{cinemaName}</h2>
                            <ChevronRightIcon className='px-1 h-6' />
                        </>
                    }
                    {/^\/(admin|manager)\/add-item\/showtime/.test(pathname) ?
                        <h2 className='cursor-default text-xl'>Thêm lịch chiếu</h2>
                        : <h2 className='cursor-default text-xl'>Chỉnh sửa lịch chiếu</h2>
                    }
                </div>
            </div>
            <div className='px-4 relative'>
                <div className='absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                    {loading1 && <Loading />}
                </div>
                {!loading1 &&
                    <div className='pt-8'>
                        <div className='border p-8'>
                            <form id='formAddCinema' onSubmit={pathname === "/admin/add-item/showtime" || pathname === "/manager/add-item/showtime" ? handleAddShowtime : handleUpdateShowtime} action="">
                                <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Phim {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                        </label>
                                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                            {
                                                pathname === "/admin/add-item/showtime" || pathname === "/manager/add-item/showtime" ?
                                                    <SelectMenu onSelectChange={handleSelectChange} items={listNameMovie} content={"Chọn phim"} /> :
                                                    <input
                                                        type="text"
                                                        className="placeholder-[#bfbfbf] leading-7 font-sans border-[#d9d9d9] w-full text-lg focus:outline-none"
                                                        placeholder={oneShowtime.movie.title}
                                                        readOnly
                                                    />
                                            }
                                        </div>
                                        {errors.movie && <p className="text-red-600">{errors.movie}</p>}
                                    </div>
                                    <div className="relative my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Phòng {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                        </label>
                                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                            {
                                                pathname === "/admin/add-item/showtime" || pathname === "/manager/add-item/showtime" ?
                                                    <SelectMenu onSelectChange={handleSelectChange} items={listNameRoom} content={"Chọn phòng"} /> :
                                                    pathname === `/admin/update-item/showtime/${showtimeId}` || pathname === `/manager/update-item/showtime/${showtimeId} ` ?
                                                        <input
                                                            type="text"
                                                            className="placeholder-neutral-900 w-full text-lg focus:outline-none"
                                                            placeholder={oneShowtime.room.roomName}
                                                            readOnly
                                                        /> :
                                                        <SelectMenu onSelectChange={handleSelectChange} items={listNameRoom} content={oneShowtime.room.roomName} />
                                            }
                                        </div>
                                        {errors.room && <p className="text-red-600">{errors.room}</p>}
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className="relative my-4 w-full">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Thời gian bắt đầu {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={date => {
                                                    setStartDate(date);
                                                    setShowtime({ ...showtime, timeStart: date });
                                                    clearError('timeStart')
                                                }}
                                                placeholder={'Chọn ngày bắt đầu'}
                                                className="block w-4/5 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                dateFormat="yyyy-MM-dd" // Định dạng n gày
                                                defaultValue={/^\/(admin|manager)\/update-item/.test(pathname) ? dayjs(FormatDataTime(oneShowtime.timeStart).date, 'DD/MM/YYYY') : null}
                                            />
                                            {errors.timeStart && <p className="text-red-600">{errors.timeStart}</p>}
                                        </div>
                                        <div className="relative my-4 w-full">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Thời gian kết thúc {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={date => {
                                                    setEndDate(date);
                                                    setShowtime({ ...showtime, timeEnd: date });
                                                    clearError('timeEnd')
                                                }}
                                                placeholder={'Chọn ngày kết thúc'}
                                                className="block w-4/5 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                dateFormat="yyyy-MM-dd" // Định dạng ngày
                                                defaultValue={/^\/(admin|manager)\/update-item/.test(pathname) ? dayjs(FormatDataTime(oneShowtime.timeEnd).date, 'DD/MM/YYYY') : null}
                                            />
                                            {errors.timeEnd && <p className="text-red-600">{errors.timeEnd}</p>}
                                        </div>
                                        <div className="relative my-4 w-full">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Suất chiếu đặt biệt:
                                            </label>
                                            <label className="inline-flex items-center mt-4">
                                                {
                                                    pathname === "/admin/add-item/showtime" || pathname === "/manager/add-item/showtime" ?
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-indigo-600 h-5 w-5"
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                                handleCheckboxChange(e);
                                                                setShowtime({ ...showtime, special: e.target.checked });
                                                            }}
                                                        /> : pathname === `/admin/showtime/${showtimeId}` || pathname === `/manager/showtime/${showtimeId}` ?
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
                                {(pathname === "/admin/add-item/showtime" || pathname === "/manager/add-item/showtime") &&
                                    <div className="rounded-md p-8 mt-8 shadow-lg bg-slate-100 relative">
                                        <div className=''>
                                            <h2 className='text-lg font-medium leading-6 text-gray-900'>Thiết lập xuất chiếu</h2>
                                            <div className='flex justify-between'>
                                                <div className="relative m-8 w-full">
                                                    <label
                                                        htmlFor=""
                                                        className="block text-lg font-medium leading-6 text-gray-900 pb-2"
                                                    >
                                                        Ngày<br />
                                                        <span className='text-xs font-extralight text-red-400'>( --Ngày thuộc khoảng thời gian chiếu đã chọn ở trên-- )</span>
                                                    </label>
                                                    <DatePicker
                                                        onChange={handleSelectDate}
                                                        placeholder={'Chọn ngày chiếu'}
                                                        className="block w-4/5 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    />
                                                </div>
                                                <div className="relative m-8 w-full">
                                                    <label
                                                        htmlFor=""
                                                        className="block text-lg font-medium leading-6 text-gray-900 pb-2"
                                                    >
                                                        Thời gian<br />
                                                        <span className='text-xs font-extralight'>( Thời gian chiếu trong ngày )</span>
                                                    </label>

                                                    <TimePicker
                                                        format="HH:mm"
                                                        onChange={handleSelectTime}
                                                        placeholder={'Chọn xuất chiếu'}
                                                        className="block w-4/5 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    />


                                                </div>
                                            </div>

                                            <div className='p-8 border-2'>
                                                <h2 className='font-medium text-lg text-gray-900'>Danh sách suất chiếu:</h2>
                                                <ul>
                                                    {schedule && schedule.map((item, index) => (
                                                        <li key={item.date}>
                                                            <p className='py-4'>
                                                                <span className='text-emerald-600 pr-8 font-semibold'>{index + 1}. Ngày:</span>
                                                                {FormatDataTime(item.date).date}
                                                            </p>
                                                            <div className='flex'>
                                                                <p className='text-emerald-600 font-medium px-4'> Thời gian:</p>
                                                                <ul className='justify-center grid grid-cols-8 gap-4'>
                                                                    {item.time && item.time.map((time) => (
                                                                        <li className='bg-slate-200 rounded-lg p-0.5' key={time}>
                                                                            <span className='p-2'>{time}</span>
                                                                            {
                                                                                pathname !== `/(admin|manager)/showtime/${showtimeId} ` &&
                                                                                <button className='text-red-400 pr-2'
                                                                                    onClick={() => {
                                                                                        handleRemoveTime(item.date, time)
                                                                                    }}
                                                                                >
                                                                                    <sup>X</sup>
                                                                                </button>
                                                                            }
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                }
                                {
                                    <div className='flex justify-end'>
                                        <button
                                            className="w-1/6 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                            type='submit'
                                            disabled={loading}
                                        >
                                            {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                            &nbsp;{pathname === "/admin/add-item/showtime" || pathname === "/manager/add-item/showtime" ? "Thêm lịch chiếu" : "Cập nhật lịch chiếu"}
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