import { MagnifyingGlassIcon, PencilSquareIcon, PowerIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Search from '../../../../components/Search';
import AdminService from '../../../../service/AdminService';
import FormatDataTime from '../../../../utils/FormatDataTime';
import TruncatedContent from '../../../../utils/TruncatedContent';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu';
import ModalComponent from '../../../../utils/Modal';
import { addDays } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import DetailShowtime from './detailShowtime';

const ShowtimeByRoom = () => {
  const { getAllShowtimeApi, getAllRoomApi } = AdminService();

  const currentDateTime = new Date();
  const [dateList, setDateList] = useState([]);
  const [dateTimeSelect, setDateTimeSelect] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState({ date: FormatDataTime(currentDateTime.toISOString()).date, time: "" });
  console.log("🚀 ~ ListShowtimes ~ selectedDateTime:", selectedDateTime)
  const [modalStates, setModalStates] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [allShowtime, setAllShowtime] = useState([]);
  const [allRoom, setAllRoom] = useState([]);

  const { cinemaId, movieId } = useParams()

  const navigate = useNavigate();
  const changeTab = (pathname) => {
    navigate(pathname);
  };
  const listShowtime = {
    header: { stt: "STT", movieInfo: "Phim", duration: "Thời lượng", timeshow: "Giờ chiếu", action: "actions" },
    action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
  }

  const handleGetShowtimeByRoom = async (roomId) => {
    let resST = await getAllShowtimeApi()
    if (resST && resST.data && resST.data.result && resST.data.result.content) {
      const showtimes = resST.data.result.content.filter(showtime => showtime.room.roomId === roomId)
      setAllShowtime(showtimes);
    }
  }
  const handleGetAllShowtime = async () => {
    let resST = await getAllShowtimeApi()
    if (resST && resST.data && resST.data.result && resST.data.result.content) {
      setAllShowtime(resST.data.result.content);
    }
  }
  const handleGetRoomByCinema = async (cinemaId) => {
    let resR = await getAllRoomApi()
    if (resR && resR.data && resR.data.result && resR.data.result.content) {
      const rooms = resR.data.result.content.filter(room => room.cinema.cinemaId === cinemaId)
      setAllRoom(rooms);
    }
  }

  const ListDayShowtime = () => {

    // Tạo danh sách 6 ngày liên tiếp
    const sixDayList = Array.from({ length: 6 }, (_, index) => {
      const date = addDays(currentDateTime, index);
      return FormatDataTime(date.toISOString()).date;
    });

    // Cập nhật state với danh sách ngày
    setDateList(sixDayList);
    setSelectedDateTime({ ...selectedDateTime, date: (sixDayList[0]) });
  }

  const handleSelectChange = (selectedValue) => {
    setSelectedDateTime({ ...selectedDateTime, date: selectedValue });
  }

  const handleDeleteShowtime = async (showtimeId) => {
    await deleteShowtimeApi(showtimeId);
    handleGetItem(currentPage);
    const updatedShowtimes = allShowtime.filter((showtime) => showtime.showTimeId !== showtimeId);
    setAllShowtime(updatedShowtimes);
  }

  const handleOpenModal = (showTimeId) => {
    setModalStates((prevStates) => ({ ...prevStates, [showTimeId]: true }));
  };

  const handleCloseModal = (showTimeId) => {
    setModalStates((prevStates) => ({ ...prevStates, [showTimeId]: false }));
  };

  useEffect(() => {
    handleGetRoomByCinema(cinemaId)
    ListDayShowtime()
    handleGetAllShowtime()
  }, [])
  return (
    <div className='border-2 h-screen'>
      <div className='h-full'>
        <div className='flex justify-end items-center py-4 pr-4'>
          <div className="border-2 rounded-xl ">
            <Search />
          </div>
          <div className="inline-block pl-2 py-2 hover:bg-emerald-600 bg-slate-500 m-2 rounded-bl-full rounded-r-full text-gray-200 relative h-10 w-36">
            <SelectMenu onSelectChange={handleSelectChange} items={dateList} content={selectedDateTime.date} />
          </div>
        </div>
        <div className='flex justify-between h-[85%]'>
          <div className='w-[12%] pl-4'>
            <ul className="flex flex-col">
              <listShowtime
                onClick={() => {
                  handleGetAllShowtime();
                  setSelectedRoom(1); // Update selectedRoom state
                }}
                className={`py-1 pl-2 font-semibold border-l-4 ${selectedRoom === 1 ? 'text-emerald-500 border-l-emerald-500 bg-emerald-100' : ''}`}
              >
                Tất cả phòng
              </listShowtime>
              {allRoom.map((room) => (
                <li
                  key={room.roomId}
                  onClick={() => {
                    handleGetShowtimeByRoom(room.roomId);
                    setSelectedRoom(room.roomId); // Update selectedRoom state
                  }}
                  className={`py-1 pl-2 font-semibold border-l-4 ${selectedRoom === room.roomId ? 'text-emerald-500 border-l-emerald-500 bg-emerald-100' : ''}`}
                >
                  Phòng {room.roomName}
                </li>
              ))}
            </ul>
          </div>

          <div className='w-[90%] bg-slate-100 shadow-inner mr-4 p-4 rounded-lg'>
            <div>
              <table className='mt-6 w-full'>
                <thead className=''>
                  <tr>
                    <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-14'>{listShowtime.header.stt}</th>
                    <th className='text-base text-center font-semibold px-3 pb-4 uppercase'>{listShowtime.header.movieInfo}</th>
                    <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-[124px]'>{listShowtime.header.duration}</th>
                    <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-2/5'>{listShowtime.header.timeshow}</th>
                    <th className='text-base text-center font-semibold px-3 pb-4 uppercase w-[110px]'>{listShowtime.header.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {allShowtime.map((item, index) => (

                    <tr
                      onClick={() => {
                      }}
                      className='border-b-2 border-slate-200 hover:bg-slate-200'
                    >
                      <td className='text-center font-medium px-5 py-4'>{index + 1}</td>
                      <td className='text-start font-medium px-5 py-4'>
                        <div className='flex items-center'>
                          <div div className='pr-2'>
                            <img className="h-12 w-8 text-emerald-600" src={item.movie.poster} alt="" />
                          </div>
                          <div>
                            <h3>{item.movie.title}</h3>
                            <p className='font-normal text-sm'>{FormatDataTime(item.timeStart).day} - {FormatDataTime(item.timeEnd).date}</p>
                          </div>
                        </div>
                      </td>
                      <td className='text-center font-medium px-5 py-4'>
                        {item.movie.duration}
                      </td>
                      <td className='text-center font-medium px-5 py-4'>
                        <ul className='relative items-center grid grid-cols-3 gap-2'>
                          {
                            item.listTimeShow
                              .find((item) => FormatDataTime(item.date).date === selectedDateTime.date)
                              ?.time.map((time, index) => {
                                const currentDate = FormatDataTime(currentDateTime.toISOString()).date
                                const currentTime = FormatDataTime(currentDateTime.toISOString()).time

                                const isTimeInFuture = selectedDateTime.date > currentDate || (selectedDateTime.date === currentDate && time > currentTime);
                                return (
                                  <li
                                    onClick={() => {
                                      setSelectedDateTime((prevState) => ({ ...prevState, time: time }));
                                      const updatedDateTime = { ...selectedDateTime, time: time };
                                      navigate(`/admin/list-showtime/cinema/${item.room.cinema.cinemaId}/${item.showTimeId}`, { state: { dateTime: updatedDateTime } });
                                    }}
                                  >
                                    <a
                                      className={`block p-1 border-2 text-center cursor-pointer rounded-xl ${isTimeInFuture ? ' bg-gray-100 border-orange-500' : 'bg-gray-300 border-gray-600 opacity-70'}`}
                                    >
                                      {time}
                                    </a>
                                  </li>
                                );
                              }) || (
                              <p className='absolute left-20 -top-4 text-center text-lg text-slate-300'>-- Chưa có lịch chiếu --</p>
                            )}
                        </ul>
                      </td>
                      <td className='font-medium px-5 py-4'>
                        {(
                          <div className='flex items-center justify-center'>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                changeTab(`/admin/update-item/showtime/${item.showTimeId}`);
                              }}
                              className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100'
                              href=''
                            >
                              <listShowtime.action.aEdit className='h-4 w-4 text-cyan-600' />
                            </button>
                            <button
                              type='button'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModal(item.showTimeId);
                              }}
                              className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'
                            >
                              <listShowtime.action.aDelete className='h-4 w-4 text-red-600' />
                            </button>
                            <div>
                              {modalStates[item.showTimeId] && (
                                <ModalComponent
                                  isOpen={modalStates[item.showTimeId]}
                                  onClose={() => handleCloseModal(item.showTimeId)}
                                  onConfirm={() => handleDeleteShowtime(item.showTimeId)}
                                  onCancel={() => handleCloseModal(item.showTimeId)}
                                  title='Xóa Lịch chiếu'
                                  content='Bạn có chắc chắn xóa lịch chiếu này ???'
                                  buttonName='Delete'
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>


                  ))}
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default ShowtimeByRoom
