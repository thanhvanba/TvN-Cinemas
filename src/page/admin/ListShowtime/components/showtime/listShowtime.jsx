import { ArrowUturnLeftIcon, ChevronRightIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, PowerIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot, BadgePlus, History } from "lucide-react"
import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Search from '../../../../../components/Search';

import searchImg from '../../../../../images/7a0bfed18240211e7851.jpg'
import AdminService from '../../../../../service/AdminService';
import FormatDataTime from '../../../../../utils/FormatDataTime';
import TruncatedContent from '../../../../../utils/TruncatedContent';
import SelectMenu from '../../../../../components/SelectMenu/SelectMenu';
import ModalComponent from '../../../../../utils/Modal';
import { addDays, format, isAfter, parse, isEqual, isBefore } from 'date-fns';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ManagerService from '../../../../../service/ManagerService';
import Loading from '../../../../../components/Loading';
import Pagination from '../../../../../components/Pagination';

import { Space, TimePicker, DatePicker } from 'antd'

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { LoginContext } from '../../../../../context/LoginContext';
import MovieService from '../../../../../service/MovieService';
import { BuildingLibraryIcon } from '@heroicons/react/24/solid';

const ShowtimeByRoom = () => {
  const { getShowtimeByCinemaApi, getShowtimeByRoomApi, getRoomeByCinemaApi } = AdminService();
  const { deleteShowtimeApi, changeStatusShowtimeApi, getAllShowtimeByManagerApi, getAllRoomByManagerApi, getShowtimeByRoomCinemaApi } = ManagerService()
  const { GetAllMovieApi } = MovieService()

  const { user } = useContext(LoginContext)
  const location = useLocation();
  const { cinemaName } = location.state || {};
  const currentDateTime = new Date();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState({ date: FormatDataTime(currentDateTime.toISOString()).date, time: "" });
  const [movieArr, setMovieArr] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [pagination, setPagination] = useState(
    {
      pageNumber: 1,
      pageSize: null,
      totalPages: null,
      totalElements: null
    }
  );
  const [allShowtime, setAllShowtime] = useState([]);
  const [allRoom, setAllRoom] = useState([]);

  const { cinemaId, movieId } = useParams()

  const navigate = useNavigate();
  const changeTab = (pathname) => {
    navigate(pathname);
  };
  const listShowtime = {
    header: { stt: "STT", movieInfo: "Phim", duration: "Thời lượng", timeshow: "Giờ chiếu", room: "Phòng", action: "actions" },
    action: { aChange: PowerIcon, aEdit: BadgePlus, aDelete: TrashIcon }
  }

  const handleGetShowtimeByRoom = async (pageNumber, roomId) => {
    setLoading(true)
    let resST = user.role === "ADMIN" ?
      await getShowtimeByRoomApi(roomId || selectedRoom, pageNumber, 4, status ? format(parse(selectedDateTime.date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null, selectedMovie)
      : await getShowtimeByRoomCinemaApi(roomId || selectedRoom, pageNumber, 4, status ? format(parse(selectedDateTime.date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null, selectedMovie)
    // let resST = user.role === "ADMIN" ? await getShowtimeByRoomApi(roomId, pageNumber, 6) : await getShowtimeByRoomCinemaApi(roomId, pageNumber, 6)
    if (resST && resST.data && resST.data.result.content) {
      // const showtimes = resST.data.result.content.filter(showtime => showtime.room.roomId === roomId)
      setAllShowtime(resST.data.result.content);
      setPagination(prevPagination => ({
        ...prevPagination,
        pageNumber: pageNumber,
        pageSize: resST.data.result.pageSize,
        totalPages: resST.data.result.totalPages,
        totalElements: resST.data.result.totalElements
      }));
    }
    setLoading(false)
  }
  const handleGetAllShowtime = async (pageNumber) => {
    setLoading(true)
    let resST = user.role === "ADMIN" ?
      await getShowtimeByCinemaApi(cinemaId, pageNumber, 4, status ? format(parse(selectedDateTime.date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null, selectedMovie)
      : await getAllShowtimeByManagerApi(pageNumber, 4, status ? format(parse(selectedDateTime.date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null, selectedMovie)
    if (resST && resST.data && resST.data.result.content) {
      setAllShowtime(resST.data.result.content);
      setPagination(prevPagination => ({
        ...prevPagination,
        pageNumber: pageNumber,
        pageSize: resST.data.result.pageSize,
        totalPages: resST.data.result.totalPages,
        totalElements: resST.data.result.totalElements
      }));
    }
    setLoading(false)
  }
  const handleGetRoomByCinema = async (cinemaId) => {
    let resR = user.role === "ADMIN" ? await getRoomeByCinemaApi(cinemaId) : await getAllRoomByManagerApi()
    let resM = await GetAllMovieApi(1, 999)
    if (resR && resR.data && resR.data.result.content) {
      setAllRoom(resR.data.result.content.reverse());
    }
    if (resM && resM.data && resM.data.result.content) {
      setMovieArr(resM.data.result.content.map(movie => {
        return {
          movieID: movie.movieId,
          movieName: movie.title
        };
      }));
    }
  }

  const handleSelectChange = (date, dateString) => {
    setLoading(true)
    setSelectedDateTime({ ...selectedDateTime, date: dateString });
    setLoading(false)
  }

  useEffect(() => {
    handleGetRoomByCinema(cinemaId)
  }, [])

  useEffect(() => {
    const dateTime = selectedDateTime.date
    selectedRoom === 1 ?
      handleGetAllShowtime(pagination.pageNumber)
      : handleGetShowtimeByRoom(pagination.pageNumber)
    setSelectedDateTime({ ...selectedDateTime, date: dateTime });
    setSelectedMovie(null);
  }, [selectedDateTime.date])

  useEffect(() => {
    const dateTime = selectedDateTime.date
    selectedRoom === 1 ?
      handleGetAllShowtime(1)
      : handleGetShowtimeByRoom(1)
  }, [selectedMovie])

  useEffect(() => {
    selectedRoom === 1 ?
      handleGetAllShowtime(pagination.pageNumber)
      : handleGetShowtimeByRoom(pagination.pageNumber)
  }, [status])

  const handleSelectType = async (value) => {
    const movie = movieArr.find(movie => movie?.movieName === value)
    setSelectedMovie(movie?.movieID)
  }
  return (
    <div>
      <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
        {user.role === "ADMIN" ?
          <div className='flex items-center'>
            <h2 onClick={() => { changeTab("/admin/list-cinema") }} className='cursor-pointer font-medium text-2xl flex items-center'>
              <BuildingLibraryIcon className='h-10 w-10 mr-1 text-emerald-600' />
              Rạp
            </h2>
            <ChevronRightIcon className='px-1 h-6' />
            <h2 className='cursor-default font-medium text-2xl'>{cinemaName}</h2>
            <ChevronRightIcon className='px-1 h-6' />
            <h2 className='cursor-default text-xl'>Danh sách lịch chiếu</h2>
          </div>
          : <h2 className='text-3xl cursor-default'>Quản lý lịch chiếu</h2>
        }
        {
          <div className='flex items-center'>
            <button
              className="h-14 w-14 first-letter:border-slate-400 border p-3 m-1 text-sm font-bold uppercase rounded-2xl text-emerald-800 hover:bg-slate-200"
              onClick={() => navigate(user.role === "ADMIN" ? "/admin/list-room" : "/manager/list-room", { state: { cinemaId: cinemaId, cinemaName: cinemaName } })}
              type='submit'
            >
              <HomeIcon />
            </button>
            <button
              className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-emerald-800 bg-emerald-600 text-white"
              onClick={() => navigate(user.role === "ADMIN" ? '/admin/add-item/showtime' : '/manager/add-item/showtime', { state: { cinemaId: cinemaId, cinemaName: cinemaName } })}
              type='button'
            >
              Thêm lịch chiếu
            </button>
          </div>

        }
      </div>
      <div className='border-2'>
        <div className='flex justify-center absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
          {loading && <Loading />}
        </div>

        <div className='h-full'>
          {
            !loading && allRoom.length === 0 && allShowtime.length === 0 ?
              <>
                <div className='flex justify-center'>
                  <img src={searchImg} alt="" />
                </div>

                <div className='p-4 font-light text-center text-gray-500'>Chưa có phòng và lịch chiếu. Tiến hành thêm phòng, lịch chiếu !!!</div>
              </> :
              <>
                <div className='relative flex justify-end items-center py-4 pr-4'>
                  <div className='border-2 my-2 rounded-xl flex'>
                    <div className="h-8 xl:w-72 w-32 px-4 focus:outline-none py-1">
                      <SelectMenu onSelectChange={handleSelectType} items={['ALL', ...movieArr.map(item => item.movieName)]} content={selectedMovie?.movieName ? selectedMovie?.movieName : "Chọn phim"} />
                    </div>
                  </div>

                  {status &&
                    <div className='text-black'>
                      <DatePicker
                        onChange={handleSelectChange}
                        placeholder={selectedDateTime.date || FormatDataTime(currentDateTime.toISOString()).date}
                        format='DD/MM/YYYY'
                        className="inline-block py-1.5 bg-slate-100 m-2 rounded-full text-black relative h-9 w-36 cursor-default border-slate-300"
                      />
                    </div>
                  }
                  {/* </div> */}
                  <button
                    type="button"
                    className="absolute top-4 left-4 z-10"
                  >
                    <span className="sr-only">Close menu</span>
                    <div
                      className={`${status ? '' : 'shadow-inner'} p-1 border-2 rounded-lg text-sky-700`}
                      onClick={() => {
                        setStatus(!status)
                        setPagination(prevPagination => ({
                          ...prevPagination,
                          pageNumber: 1,
                        }))
                      }}
                    >
                      {status ?
                        <History className="text-4xl h-10 w-10 z-10 cursor-pointer opacity-80 hover:opacity-100 shadow-inner" aria-hidden="true" />
                        : <ArrowUturnLeftIcon className="text-4xl h-10 w-10 z-10 cursor-pointer opacity-80 hover:opacity-100 shadow-inner" aria-hidden="true" />
                      }
                    </div>
                  </button>
                </div>
                {!loading &&
                  <>
                    <div className='flex justify-between pb-4'>
                      <div className='w-[12%] pl-4'>
                        <ul className="flex flex-col">
                          <li
                            onClick={() => {
                              handleGetAllShowtime(1);
                              setSelectedRoom(1); // Update selectedRoom state
                            }}
                            className={`py-1 pl-2 font-semibold border-l-4 cursor-pointer ${selectedRoom === 1 ? 'text-emerald-500 border-l-emerald-500 bg-emerald-100' : ''}`}
                          >
                            Tất cả phòng
                          </li>
                          {allRoom && allRoom.length > 0 && allRoom.map((room) => (
                            <li
                              key={room.roomId}
                              onClick={() => {
                                handleGetShowtimeByRoom(1, room.roomId);
                                setSelectedRoom(room.roomId); // Update selectedRoom state            
                              }}
                              className={`py-1 pl-2 font-semibold border-l-4 cursor-pointer ${selectedRoom === room.roomId ? 'text-emerald-500 border-l-emerald-500 bg-emerald-100' : ''}`}
                            >
                              Phòng {room.roomName}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className='w-[90%] bg-slate-50 shadow-inner mr-4 p-4 rounded-lg'>
                        <div>
                          {allShowtime.length === 0 ? <>
                            <div className='flex justify-center'>
                              <img src={searchImg} alt="" />
                            </div>

                            <div className='p-4 font-light text-center text-gray-500'>Chưa lên lịch chiếu</div>
                          </> :
                            <table className='mt-6 w-full'>
                              <thead className=''>
                                <tr>
                                  <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-14'>{listShowtime.header.stt}</th>
                                  <th className='text-base text-center font-semibold px-3 pb-4 uppercase'>{listShowtime.header.movieInfo}</th>
                                  <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-[124px]'>{listShowtime.header.duration}</th>
                                  {selectedRoom === 1 && <th className='text-base text-center font-semibold px-3 pb-4 uppercase'>{listShowtime.header.room}</th>}
                                  {status && <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-2/5'>{listShowtime.header.timeshow}</th>}
                                  <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-20'>{listShowtime.header.action}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allShowtime && allShowtime.map((item, index) => {
                                  let hasShowtimes = false;
                                  let selectDate = parse(selectedDateTime.date, 'dd/MM/yyyy', new Date());
                                  return (
                                    // (isBefore(item.timeStart, selectDate) || isEqual(item.timeStart, selectDate)) && (isAfter(item.timeEnd, selectDate) || isEqual(item.timeEnd, selectDate)) &&
                                    <tr
                                      onClick={() => {
                                      }}
                                      className='border-b-2 border-slate-200 hover:bg-slate-200'
                                    >
                                      <td className='text-center font-medium px-3 py-4'>{index + 1 + pagination.pageSize * (pagination.pageNumber - 1)}</td>
                                      <td className='text-start font-medium px-3 py-4'>
                                        <div className='flex items-center'>
                                          <div div className='pr-2'>
                                            <img className="h-12 w-8 text-emerald-600" src={item.movie.poster} alt="" />
                                          </div>
                                          <div>
                                            <h3 className='text-emerald-600 font-medium'>{item.movie.title}</h3>
                                            <p className='font-normal text-sm'>{FormatDataTime(item.timeStart).day} - {FormatDataTime(item.timeEnd).date}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className='text-center font-medium px-3 py-4'>
                                        {item.movie.duration}
                                      </td>
                                      {selectedRoom === 1 && <td className='text-center font-medium px-3 py-4'>
                                        {item.room.roomName}
                                      </td>}
                                      {status &&
                                        <td className='text-center font-medium px-3 py-4'>
                                          <ul className='relative items-center grid grid-cols-3 gap-2'>
                                            {
                                              item.schedules.map((schedule, index) => {
                                                const currentDateTime = new Date();
                                                const dateTime = parse(`${selectedDateTime.date} ${schedule.startTime}`, 'dd/MM/yyyy HH:mm:ss', new Date());
                                                if (FormatDataTime(schedule.date).date === selectedDateTime.date) {
                                                  const isTimeInFuture = isAfter(dateTime, currentDateTime);
                                                  hasShowtimes = true;
                                                  return (
                                                    <li key={index}
                                                      onClick={() => {
                                                        setSelectedDateTime((prevState) => ({ ...prevState, time: schedule.startTime, scheduleId: schedule.scheduleId }));
                                                        const updatedDateTime = {
                                                          ...selectedDateTime, time: schedule.startTime, scheduleId: schedule.scheduleId
                                                        };

                                                        { user.role === 'ADMIN' ? navigate(`/admin/list-showtime/showtime/${item.showTimeId}`, { state: { dateTime: updatedDateTime } }) : navigate(`/manager/list-showtime/showtime/${item.showTimeId}`, { state: { dateTime: updatedDateTime } }) }
                                                      }}
                                                      className={`inline-block ${isTimeInFuture ? 'clickable' : 'unclickable'}`}
                                                    >
                                                      <a
                                                        className={`block p-1 border-2 text-center cursor-pointer rounded-xl ${isTimeInFuture ? ' bg-gray-100 border-orange-500' : 'bg-gray-300 border-gray-400 opacity-70'}`}
                                                      >

                                                        {format(
                                                          parse(`${schedule.startTime}`, 'HH:mm:ss', new Date()),
                                                          "HH:mm"
                                                        )}
                                                      </a>
                                                    </li>
                                                  )
                                                }

                                                console.log("🚀 ~ item.schedules.map ~ hasShowtimes:", hasShowtimes)

                                              })
                                            }
                                          </ul>
                                          {!hasShowtimes && (
                                            <p className=' text-center text-lg text-slate-400 font-light'>-- Chưa có lịch chiếu ngày hôm nay--</p>
                                          )}
                                        </td>
                                      }
                                      <td className='font-medium px-3 py-4'>
                                        {(
                                          <div className='flex items-center justify-center'>
                                            {
                                              status ?
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/admin/add-item/schedule`, { state: { dateTime: selectedDateTime, idShowtime: item.showTimeId } });
                                                  }}
                                                  className='flex justify-center items-center w-8 h-8 rounded-lg bg-emerald-100'
                                                  href=''
                                                >
                                                  <listShowtime.action.aEdit className='h-4 w-4 text-emerald-600' />
                                                </button>
                                                : <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/admin/update-item/showtime/${item.showTimeId}`, { state: { cinemaId: cinemaId, cinemaName: cinemaName } });
                                                  }}
                                                  className='flex justify-center items-center w-8 h-8 rounded-lg bg-sky-100'
                                                  href=''
                                                >
                                                  <PencilSquareIcon className='h-4 w-4 text-sky-600' />
                                                </button>
                                            }
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>}
                        </div>
                      </div>
                    </div>
                    {allShowtime.length !== 0 && <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={selectedRoom === 1 ? handleGetAllShowtime : handleGetShowtimeByRoom} />}
                  </>
                }
              </>
          }
        </div>
      </div>
    </div >
  )
}

export default ShowtimeByRoom
