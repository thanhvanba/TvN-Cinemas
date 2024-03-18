import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import CreateSeat from '../../../components/CreateSeat'
import './detailShowtime.css'
import UserService from '../../../service/UserService'
import FormatDataTime from '../../../utils/FormatDataTime'
import { useNavigate, useParams } from 'react-router-dom'

const DetailShowtime = ({ showtimeId, dateTime }) => {
  const { cinemaId } = useParams()
  const navigate = useNavigate();
  const { getOneShowtimeApi } = UserService()
  const [showtime, setShowtime] = useState({
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
  const [selectedDateTime, setSelectedDateTime] = useState(dateTime);
  const generateSeatData = CreateSeat(10, 14, showtimeId, dateTime);
  const seatData = generateSeatData();

  const hadleGetItem = async (showtimeId) => {
    let resShowtime = await getOneShowtimeApi(showtimeId)
    if (resShowtime && resShowtime.data && resShowtime.data.result) {
      setShowtime(resShowtime.data.result)
    }
  }

  useEffect(() => {
    hadleGetItem(showtimeId)
  }, [dateTime]);
  return (
    <div className='top-0 bottom-0 left-0 bg-black bg-opacity-50 w-full fixed flex justify-center items-center z-10'>
      <div className="w-[60%] z-10 overflow-hidden bg-slate-300 rounded-md">
        <div className="bg-slate-300 text-sm md:text-base text-slate-900">
          <div className='loader'></div>

          <div className='flex border-b-2 border-b-slate-400'>
            <h4 className="w-1/3 pt-4 font-bold px-4 text-3xl pb-2 border-r-2">Chi tiết xuất chiếu</h4>
            <h4 className="w-2/3 pt-4 font-bold px-4 text-3xl pb-2">Danh sách ghế</h4>
          </div>

          <div className='flex border-t-2 border-t-slate-400'>

            <div className='w-1/3 border-r-2'>
              <div className='px-6 space-y-6'>
                <div>
                  <p className="text-3xl pt-4 text-emerald-600 font-semibold">{showtime.movie.title}</p>
                </div>
                <div className='flex'>
                  <div className='w-3/5'>
                    <p className='font-light'>Ngày chiếu</p>
                    <p className="font-semibold text-xl">{dateTime.date}</p>
                  </div>
                  <div className='2/5'>
                    <p className='font-light'>Phòng chiếu</p>
                    <p className="font-semibold text-xl">{showtime.room.roomName}</p>
                  </div>
                </div>
                <div>
                  <p className='font-light'>Các xuất chiếu</p>
                  <ul className='relative items-center grid grid-cols-3 gap-2 py-4'>
                    {
                      showtime.listTimeShow
                        .find((item) => FormatDataTime(item.date).date === dateTime.date)
                        ?.time.map((time, index) => {
                          const currentDateTime = new Date();
                          const currentDate = FormatDataTime(currentDateTime.toISOString()).date
                          const currentTime = FormatDataTime(currentDateTime.toISOString()).time

                          const isTimeInFuture = dateTime.date > currentDate || (dateTime.date === currentDate && time > currentTime);
                          const isSelect = dateTime.time === time
                          return (
                            <li
                              onClick={() => {
                                setSelectedDateTime((prevState) => ({ ...prevState, time: time }));
                                const updatedDateTime = { ...selectedDateTime, time: time };
                                navigate(`/admin/list-showtime/cinema/${cinemaId}/${showtimeId}`, { state: { dateTime: updatedDateTime } });
                              }}
                            >
                              <a
                                className={`block p-1 border-2 text-center cursor-pointer rounded-xl ${isTimeInFuture ? 'bg-gray-100 border-orange-500' : 'bg-gray-300 border-gray-600 opacity-70'} ${isSelect ? 'bg-green-400' : ''}`}
                              >
                                {time}
                              </a>
                            </li>
                          );
                        }) || (
                        <p className='absolute left-20 -top-4 text-center text-lg text-slate-300'>-- Chưa có lịch chiếu --</p>
                      )}
                    {/* );
                      }) || (
                      <p className='absolute left-20 -top-4 text-center text-lg text-slate-300'>-- Chưa có lịch chiếu --</p>
                    )} */}
                  </ul>
                </div>
              </div>
              <div className='flex justify-end'>
                <button
                  className="w-1/4 mb-4 mr-6 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                  type='button'
                // disabled={loading['change']}
                // onClick={() => handleOpenModal()}
                >
                  {/* {loading['change'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                  &nbsp;OK
                </button>
              </div>
            </div>

            <div className='w-2/3'>
              <div className='flex justify-center pt-4 font-normal'>
                <div className='flex px-4'>
                  Tổng số ghế :
                  <span>100</span>
                </div>
                <div className='flex px-4'>
                  Đã đặt :
                  <span>2</span>
                </div>
                <div className='flex px-4'>
                  Còn trống :
                  <span>98</span>
                </div>
              </div>
              <div className='grid grid-cols-14 gap-1 mx-10 py-4'>
                {seatData.map(seat => (
                  <div
                    key={seat.id}
                    className={`${seat.type} flex justify-center items-center text-slate-200 h-8 w-8 rounded-xl`}
                  >
                    {seat.type === "booked" ? <XMarkIcon className='text-slate-400 h-8' /> : seat.label}
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default DetailShowtime
