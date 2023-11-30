import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import AdminService from '../../../service/AdminService'
import MovieService from '../../../service/MovieService';

import UseToastNotify from '../../../utils/UseToastForNotify';

const AddShowtime = () => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectDate, setSelectDate] = useState(null);
    const [schedule, setSchedule] = useState([]);

    const { addShowtimeApi } = AdminService()

    const [showtime, setShowtime] = useState({
        roomId: "",
        movieId: "",
        timeStart: "",
        timeEnd: "",
        isSpecial: "",
        listTimeShow: [],
    })
    console.log("🚀 ~ file: index.jsx:37 ~ AddShowtime ~ showtime:", showtime)

    const [allMovie, setAllMovie] = useState([])
    const { GetAllMovieApi } = MovieService()
    const handleGetAllMovie = async () => {
        let res = await GetAllMovieApi()
        if (res && res.data && res.data.result && res.data.result.content) {
            setAllMovie(res.data.result.content)
        }
    }
    const nameMovie = allMovie.map(item => item.title)

    // const [allRoom, setAllRoom] = useState([])
    // const { getAllRoomApi } = RoomService()

    // const handleGetAllRoom = async () => {
    //     let res = await getAllRoomApi()
    //     if (res && res.data && res.data.result && res.data.result.content) {
    //         setAllRoom(res.data.result.content)
    //     }
    // }

    const handleSelectChange = (selectedValue) => {
        const movie = allMovie.find(movie => movie.title === selectedValue)
        const selectedId = movie.movieId
        setShowtime({ ...showtime, movieId: selectedId })

        // const movie = allMovie.find(movie => movie.title === selectedValue)
        // const selectedId = room.roomId
        // setShowtime({ ...showtime, roomId: selectedId })

    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleTimeChange = (date, selectedTime) => {
        // Kiểm tra xem ngày đã tồn tại trong mảng lịch chưa
        const parts = date.toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }).split('/');
        const dateFormat = `${parts[2]}-${String(parts[0]).padStart(2, '0')}-${String(parts[1]).padStart(2, '0')}`;

        const existingDay = schedule.find((item) => item.date === dateFormat);
        if (existingDay) {
            // Nếu ngày đã tồn tại, thêm thời gian vào ngày đó
            if (!existingDay.time.includes(selectedTime)) {
                existingDay.time.push(selectedTime);
                setSchedule([...schedule]);
            } else {
                UseToastNotify(`Thời gian ${selectedTime} đã tồn tại trong ngày ${dateFormat}.`, 'warn')
            }

        } else {
            // Nếu ngày chưa tồn tại, thêm một đối tượng mới vào mảng lịch
            setSchedule([...schedule, { date: dateFormat, time: [selectedTime] }]);
        }
    };

    const handleRemoveTime = (date, selectedTime) => {
        // Tìm đối tượng có ngày tương ứng trong mảng lịch
        const existingDay = schedule.find((item) => item.date === date);

        if (existingDay) {
            const updatedTimes = existingDay.time.filter((time) => time !== selectedTime);

            // Cập nhật mảng lịch với thời gian mới
            setSchedule((prevSchedule) => {
                const newSchedule = [...prevSchedule];
                const existingDayIndex = newSchedule.findIndex((item) => item.date === date);
                newSchedule[existingDayIndex] = { date: date, time: updatedTimes };
                return newSchedule;
            });
        }
    };

    const handleAddShowtime = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = showtime;
        await addShowtimeApi(data);
        setLoading(false);
    };

    useEffect(() => {
        handleGetAllMovie()
    }, []);
    console.log(schedule)
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>Add Showtime</h2>
                </div>

                <div className='pt-8'>
                    <div className='border p-8'>
                        <form id='formAddCinema' onSubmit={handleAddShowtime} action="">
                            <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                <div className="relative my-4">
                                    <label
                                        htmlFor=""
                                        className="block text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Movie
                                    </label>
                                    <SelectMenu onSelectChange={handleSelectChange} items={nameMovie} />
                                </div>
                                <div className="relative my-4">
                                    <label
                                        htmlFor=""
                                        className="block text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Room
                                    </label>
                                    <SelectMenu onSelectChange={handleSelectChange} />
                                </div>
                                <div className='flex justify-between'>
                                    <div className="relative my-4 w-full">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Time Start
                                        </label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={date => {
                                                setStartDate(date);
                                                setShowtime({ ...showtime, timeStart: date });
                                            }}
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            dateFormat="yyyy-MM-dd" // Định dạng ngày
                                        />
                                    </div>
                                    <div className="relative my-4 w-full">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Time End
                                        </label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={date => {
                                                setEndDate(date);
                                                setShowtime({ ...showtime, timeEnd: date });
                                            }}
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            dateFormat="yyyy-MM-dd" // Định dạng ngày
                                        />
                                    </div>
                                    <div className="relative my-4 w-full">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Is Special:
                                        </label>
                                        <label className="inline-flex items-center mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-indigo-600 h-5 w-5"
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    handleCheckboxChange(e);
                                                    setShowtime({ ...showtime, isSpecial: e.target.checked });
                                                }}
                                            />
                                            <span className="ml-2">Special</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="rounded-md p-8 mt-8 shadow-lg bg-slate-100 relative">
                                <h2 className='text-lg font-medium leading-6 text-gray-900'>Set up schedule</h2>
                                <div className=''>
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
                                                    handleTimeChange(e, e.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
                                                    setShowtime({ ...showtime, listTimeShow: schedule });
                                                }}
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                showTimeSelect
                                                showTimeSelectOnly
                                                dateFormat="h:mm aa"
                                            />
                                        </div>
                                    </div>

                                    <div className='p-8 border-2'>
                                        <h2 className='font-medium text-lg text-gray-900'>Schedule:</h2>
                                        <ul>
                                            {schedule.map((item, index) => (
                                                <li key={item.date}>
                                                    {item.time.length > 0 && (
                                                        <>
                                                            <p className='py-4'>
                                                                <span className='text-emerald-600 pr-8 font-semibold'>{index + 1}. Date:</span>
                                                                {item.date}
                                                            </p>
                                                            <div className='flex'>
                                                                <p className='text-emerald-600 font-medium px-4'> Time:</p>
                                                                <ul className='flex justify-center'>
                                                                    {item.time.map((time) => (
                                                                        <li className='bg-slate-200 mx-2 rounded-lg p-0.5' key={time}>
                                                                            <span className='p-2'>{time}</span>
                                                                            <button className='text-red-400 pr-2' onClick={() => handleRemoveTime(item.date, time)}><sup>X</sup></button>
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
                            <div className='flex justify-end'>
                                <button
                                    className="w-1/6 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                    type='submit'
                                    disabled={loading}
                                >
                                    {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                    &nbsp;Add Showtime
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default AddShowtime