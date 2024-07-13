import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import CreateSeat from '../../../../../components/CreateSeat'
import './detailShowtime.css'
import UserService from '../../../../../service/UserService'
import FormatDataTime from '../../../../../utils/FormatDataTime'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ManagerService from '../../../../../service/ManagerService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useLoadingState from '../../../../../hook/UseLoadingState'
import { format, isAfter, parse } from 'date-fns'
import AdminService from '../../../../../service/AdminService'
import { Space, TimePicker, DatePicker } from 'antd'

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { LoginContext } from '../../../../../context/LoginContext'
import Load from '../../../../../components/Load'
import SeatImage from '../../../../../images/section.jpg'

const DetailShowtime = ({ showtimeId, dateTime }) => {
  const navigate = useNavigate();

  const { user } = useContext(LoginContext)
  const { pathname } = useLocation()

  const { getOneShowtimeApi } = UserService()
  const { updateShowTimeApi, addScheduleManagerApi, deleteScheduleManagerApi, quantitySeatBookedManagerApi, checkScheduleManagerApi } = ManagerService()
  const { quantitySeatBookedApi, deleteScheduleAdminApi, addScheduleAdminApi, checkScheduleApi } = AdminService()
  const { loading, setLoading } = useLoadingState(false)
  const [countSeatBooked, setCountSeatBooked] = useState({
    SeatAvailable: "",
    SeatBooked: ""
  })
  const [oneShowtime, setOneShowtime] = useState({
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
      roomName: null,
      colSeat: 0,
      rowSeat: 0
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
      rating: 0,
      delete: false
    },
    timeStart: null,
    timeEnd: "2",
    status: null,
    listTimeShow: [
    ],
    seats: null,
    special: null
  })
  const [listSeatBooked, setListSeatBooked] = useState([]);
  const [loadSeatBooked, setLoadSeatBooked] = useState(false);
  const { getSeatBookedApi } = UserService();

  const handleGetSeatBooked = async () => {
    setLoadSeatBooked(true)
    const params = {
      showtimeId: showtimeId,
      scheduleId: dateTime.scheduleId || ""
    };
    let resSeat = await getSeatBookedApi(params);
    if (resSeat && resSeat.data && resSeat.data.result) {
      setListSeatBooked(resSeat.data.result);
    }
    setLoadSeatBooked(false)
  };

  useEffect(() => {
    showtimeId && dateTime.scheduleId &&
      handleGetSeatBooked();
  }, [dateTime]); // Theo dõi sự thay đổi của showtimeId và dateTime

  const [selectedDateTime, setSelectedDateTime] = useState(dateTime);
  const seatData = CreateSeat(oneShowtime.room.rowSeat, oneShowtime.room.colSeat, listSeatBooked);

  const [schedule, setSchedule] = useState({
    showTimeId: "",
    date: "",
    startTime: ""
  });

  const hadleGetItem = async (showtimeId) => {
    setLoading('getItem', true)
    let resShowtime = await getOneShowtimeApi(showtimeId)
    if (resShowtime && resShowtime.data && resShowtime.data.result) {
      setOneShowtime(resShowtime.data.result)
      setSchedule(prevSchedule => (
        {
          ...prevSchedule,
          showTimeId: resShowtime.data.result.showTimeId,
          date: format(parse(dateTime.date, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
        }
      ))
    }
    if (/^\/(admin|manager)\/list-showtime\/showtime/.test(pathname)) {
      let resCount = user.role === "ADMIN" ? await quantitySeatBookedApi(showtimeId, dateTime.scheduleId) : await quantitySeatBookedManagerApi(showtimeId, dateTime.scheduleId)
      if (resCount && resCount.data && resCount.data.result) {
        setCountSeatBooked(resCount.data.result)
      }
    }
    setLoading('getItem', false)
  }

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
  const handleDeleteSchedule = async () => {
    setLoading('deleteSchedule', true);
    user.role === "ADMIN" ? await deleteScheduleAdminApi(dateTime.scheduleId) : await deleteScheduleManagerApi(dateTime.scheduleId)
    setLoading('deleteSchedule', false);
  };
  const handleAddSchedule = async () => {
    setLoading('addSchedule', true);
    { user.role === "ADMIN" ? await addScheduleAdminApi(schedule) : await addScheduleManagerApi(schedule) }
    setLoading('addSchedule', false);
  };
  const handleSelectTime = (time, timeString) => {
    // Cập nhật selectDateTime với startTime mới
    setSchedule(prevSchedule => ({ ...prevSchedule, startTime: timeString }));
    handleCheckScheduleInDB(schedule.showTimeId, schedule.date, timeString)
  };

  useEffect(() => {
    hadleGetItem(showtimeId)
  }, [dateTime]);

  let hasShowtimes = false
  return (
    <div className='top-0 bottom-0 left-0 bg-black bg-opacity-50 w-full fixed flex justify-center items-center z-10'>
      <div className={`${pathname !== "/admin/add-item/schedule" ? "w-3/5" : "w-1/3"} z-10 overflow-hidden bg-slate-300 rounded-md`}>
        <div className="bg-slate-300 text-sm md:text-base text-slate-900">

          {pathname !== "/admin/add-item/schedule" && loading['getItem'] && <div className='loader'></div>}

          <div className='flex border-b-2 border-b-slate-400'>
            {pathname === "/admin/add-item/schedule" ?
              <h2 className="w-full pt-4 font-bold px-4 text-3xl pb-2 border-r-2">Thêm suất chiếu</h2>
              :
              <>
                <h2 className="w-1/3 pt-4 font-bold px-4 text-3xl pb-2 border-r-2">Chi tiết suất chiếu</h2>
                <h2 className="w-2/3 pt-4 font-bold px-4 text-3xl pb-2">Danh sách ghế</h2>
              </>}
          </div>

          <div className='flex border-t-2 border-t-slate-400'>
            <div className={`${pathname !== "/admin/add-item/schedule" ? "w-1/3" : "w-full"} border-r-2`}>
              <div className='px-6 space-y-6 h-[80%]'>
                <div>
                  <p className="text-3xl pt-4 text-emerald-600 font-semibold">{oneShowtime.movie.title}</p>
                </div>
                <div className='flex justify-start'>
                  <div className={`${pathname !== "/admin/add-item/schedule" ? "w-3/5" : ""}`}>
                    <p className='font-light'>Ngày chiếu</p>
                    <p className="font-semibold text-xl">{dateTime.date}</p>
                  </div>
                  <div className={`${pathname !== "/admin/add-item/schedule" ? "w-2/5" : "pl-8"}`}>
                    <p className='font-light'>Phòng chiếu</p>
                    <p className="font-semibold text-xl">{oneShowtime.room.roomName}</p>
                  </div>
                </div>
                {pathname !== "/admin/add-item/schedule" ?
                  <div>
                    <p className='font-light'>Các suất chiếu</p>
                    <ul className='relative items-center grid grid-cols-3 gap-4 py-4'>
                      {
                        oneShowtime && oneShowtime.schedules && oneShowtime.schedules.map((schedule, index) => {
                          const currentDateTime = new Date();
                          const selectDateTime = parse(`${schedule.date} ${schedule.startTime}`, 'yyyy-MM-dd HH:mm:ss', new Date());
                          if (FormatDataTime(schedule.date).date === selectedDateTime.date) {
                            const isTimeInFuture = isAfter(selectDateTime, currentDateTime);
                            hasShowtimes = true;
                            const isSelect = dateTime.time === schedule.startTime
                            return (
                              <li key={index}
                                onClick={() => {
                                  setSelectedDateTime((prevState) => ({ ...prevState, time: schedule.startTime, scheduleId: schedule.scheduleId }));
                                  const updatedDateTime = {
                                    ...selectedDateTime, time: schedule.startTime, scheduleId: schedule.scheduleId
                                  };
                                  navigate(`/admin/list-showtime/showtime/${oneShowtime.showTimeId}`, { state: { dateTime: updatedDateTime } });
                                }}
                                className={`inline-block relative ${isTimeInFuture ? 'clickable' : 'unclickable'}`}
                              >
                                <a
                                  className={`block p-1 border-2 text-center cursor-pointer rounded-xl ${isTimeInFuture ? 'bg-gray-100 border-orange-500' : 'bg-gray-300 border-gray-600 opacity-70'} ${isSelect ? 'bg-green-400' : ''}`}
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
                      <p className=' text-center text-lg text-slate-400'>-- Chưa có lịch chiếu --</p>
                    )}
                  </div> :
                  <div className='pb-8'>
                    <p className='font-light'>Chọn suất chiếu</p>
                    <TimePicker
                      format="HH:mm"
                      onChange={handleSelectTime}
                      className="block w-56 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                    />

                  </div>}
              </div>


              <div className='h-[20%] pb-2'>
                <div className='flex justify-end'>
                  {pathname !== "/admin/add-item/schedule" ?
                    <button
                      className="w-1/4 mb-4 mr-6 text-[18px] mt-4 rounded-xl hover:bg-red-400 hover:text-white text-white bg-red-600 py-2 transition-colors duration-300"
                      type='button'
                      disabled={loading['deleteSchedule']}
                      onClick={handleDeleteSchedule}
                    >
                      {loading['deleteSchedule'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                      &nbsp;Xóa
                    </button>
                    : <button
                      className={`${loading['checkSchedule'] ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''} 
                      w-1/4 mb-4 mr-6 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 hover:text-white text-white bg-emerald-600 py-2 transition-colors duration-300`}
                      type='button'
                      onClick={handleAddSchedule}
                      disabled={(loading['checkSchedule'] || loading['addSchedule'])}
                    >
                      {loading['addSchedule'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                      &nbsp;Thêm
                    </button>
                  }
                  <button
                    className="w-1/4 mb-4 mr-6 text-[18px] mt-4 rounded-xl hover:bg-sky-800 text-white bg-sky-600 py-2 transition-colors duration-300"
                    type='button'
                    disabled={loading['change']}
                    onClick={() => navigate(-1)}
                  >
                    {loading['change'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                    &nbsp;Thoát
                  </button>
                </div>
              </div>
            </div>

            {pathname !== "/admin/add-item/schedule" &&
              <div className='w-2/3'>
                {/* {!loading['getItem'] && */}
                <div className='flex justify-center pt-4 font-normal'>
                  <div className='flex px-4'>
                    Tổng số ghế :
                    <span>{countSeatBooked.SeatAvailable + countSeatBooked.SeatBooked}</span>
                  </div>
                  <div className='flex px-4'>
                    Đã đặt :
                    <span>{countSeatBooked.SeatBooked}</span>
                  </div>
                  <div className='flex px-4'>
                    Còn trống :
                    <span>{countSeatBooked.SeatAvailable}</span>
                  </div>
                </div>
                {/* } */}
                <div className='flex justify-center'>
                  {loadSeatBooked ?
                    <div
                      style={{
                        backgroundImage: `url(${SeatImage})`,
                        backgroundPosition: 'center', // Vị trí ảnh nền sẽ được căn giữa
                        backgroundRepeat: 'no-repeat', // Ngăn lặp lại ảnh nền 
                        height: '350px',
                        width: '500px',
                        marginTop: '8px'
                      }}
                      className='flex justify-center items-center rounded-md'
                    >
                      <Load />
                    </div>
                    :
                    <div className='grid grid-cols-14 gap-1 mx-10 py-4'
                      style={{ gridTemplateColumns: `repeat(${oneShowtime.room.colSeat}, minmax(0, 1fr))`, maxWidth: `${36 * oneShowtime.room.colSeat}px` }}
                    >
                      {seatData.map(seat => (
                        <div
                          key={seat.id}
                          className={`${seat.type} flex justify-center items-center text-slate-200 h-8 w-8 rounded-xl`}
                        >
                          {seat.type === "booked" ? <XMarkIcon className='text-slate-400 h-8' /> : seat.label}
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </div>
            }
          </div>

        </div>
      </div>
    </div >
  )
}

export default DetailShowtime
