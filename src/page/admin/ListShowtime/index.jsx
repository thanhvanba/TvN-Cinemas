import React, { useState, useEffect, useContext } from 'react';
import { PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import TruncatedContent from '../../../utils/TruncatedContent';
import FormatDataTime from '../../../utils/FormatDataTime';
import { useNavigate } from 'react-router-dom';
import AdminService from '../../../service/AdminService';
import ManagerService from '../../../service/ManagerService';
import MovieService from '../../../service/MovieService';
import UserService from '../../../service/UserService';

import { LoginContext } from '../../../context/LoginContext';

import SelectMenu from '../../../components/SelectMenu/SelectMenu';
import Pagination from '../../../utils/Pagination'
import ModalComponent from '../../../utils/Modal';

const ListShowtime = () => {
  const { getAllShowtimeApi, getAllCinemaApi } = AdminService();
  const { getAllShowtimeByManagerApi, changeStatusShowtimeApi, deleteShowtimeApi } = ManagerService();
  const { SpecialMovieApi, NowPlayingMovieApi, GetOneMovieApi } = MovieService()
  const { getShowtimeByMovieApi, getShowtimeByCinemaApi } = UserService()

  const navigate = useNavigate();
  const changeTab = (pathname) => {
    navigate(pathname);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalStates, setModalStates] = useState({});
  const [allShowtime, setAllShowtime] = useState([]);
  const [allCinema, setAllCinema] = useState([])
  const [allShowMovie, setAllShowMovie] = useState([])
  const [movie, setMovie] = useState([])

  const { user } = useContext(LoginContext);
  const listShowtime = {
    header: { stt: "STT", movieInfo: "Phim", time: "Thời gian", room: "Rạp", status: "status", action: "actions" },
    showtime: allShowtime,
    action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
  }

  const handleGetItem = async (pageIndex) => {
    setCurrentPage(pageIndex)
    setLoading(true);
    const res = user.role === 'ADMIN' ? await getAllShowtimeApi(pageIndex, 5) : await getAllShowtimeByManagerApi(pageIndex, 5);
    setLoading(true);
    if (res && res.data && res.data.result && res.data.result.content) {
      setAllShowtime(res.data.result.content);
    }

  };

  const handleChangeStatus = async (showtimeId) => {
    await changeStatusShowtimeApi(showtimeId);
    handleGetItem(currentPage);
    const updatedShowtimes = allShowtime.map((showtime) => {
      if (showtime.showTimeId === showtimeId) {
        return { ...showtime, status: !showtime.status };
      }
      return showtime;
    });

    setAllShowtime(updatedShowtimes);
  };

  const handleGetAllItem = async () => {
    let res = user.role === "ADMIN" ? await getAllCinemaApi() : null;

    if (res && res.data && res.data.result && res.data.result.content) {
      setAllCinema(res.data.result.content)
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
  }

  const handleDeleteShowtime = async (showtimeId) => {
    await deleteShowtimeApi(showtimeId);
    handleGetItem(currentPage);
    const updatedShowtimes = allShowtime.filter((showtime) => showtime.showTimeId !== showtimeId);

    setAllShowtime(updatedShowtimes);
  };

  const handleOpenModal = (showTimeId) => {
    setModalStates((prevStates) => ({ ...prevStates, [showTimeId]: true }));
  };

  const handleCloseModal = (showTimeId) => {
    setModalStates((prevStates) => ({ ...prevStates, [showTimeId]: false }));
  };

  const handleGetShowtimeByMovie = async (movieId) => {
    let resMovie = await GetOneMovieApi(movieId)
    if (resMovie && resMovie.data && resMovie.data.result) {
      setMovie(resMovie.data.result)
    }
    let resShowtimes = await getShowtimeByMovieApi(movieId)
    if (resShowtimes && resShowtimes.data && resShowtimes.data.result) {
      setAllShowtime(resShowtimes.data.result)
    }
  }

  const hadnleGetShowtimeByCinema = async (cinemaId) => {
    let resShowtimes = await getShowtimeByCinemaApi(cinemaId)
    if (resShowtimes && resShowtimes.data && resShowtimes.data.result) {
      setAllShowtime(resShowtimes.data.result)
    }
  }

  const listNameMovie = allShowMovie.map(item => item.title)
  const listNameCinema = allCinema.map(item => item.cinemaName)
  const handleSelectChange = (selectedValue) => {
    const movie = allShowMovie.find(movie => movie.title === selectedValue)
    if (movie) {
      handleGetShowtimeByMovie(movie.movieId)
    }
    const cinema = allCinema.find(cinema => cinema.cinemaName === selectedValue)
    if (cinema) {
      hadnleGetShowtimeByCinema(cinema.cinemaId)
    }
  };

  useEffect(() => {
    handleGetItem(currentPage);
    handleGetAllItem()
  }, []);

  return (
    <div>
      <div className='px-4'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
          <h2 className='text-3xl'>Danh sách lịch chiếu</h2>
          <div className='flex'>
            <div
              className="relative mt-1 pr-4 mr-2 w-60 cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6"
            >
              <SelectMenu onSelectChange={handleSelectChange} items={listNameMovie} content={"----- Lọc theo phim -----"} />
            </div>
            {user.role === 'ADMIN' && (
              <div
                className="relative mt-1 pr-4 w-60 cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6"
              >
                <SelectMenu onSelectChange={handleSelectChange} items={listNameCinema} content={"----- Lọc theo rạp -----"} />
              </div>)}
          </div>
          {user.role === 'MANAGER' && (
            <button
              className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
              onClick={() => changeTab('/admin/add-item/showtime')}
              type='button'
            >
              Add Showtime
            </button>
          )}
        </div>
        <div className='relative'>
          <div className='px-3'>
            {
              allShowtime.length === 0 &&
              <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                {loading && <FontAwesomeIcon className='w-16 h-16 ' icon={faSpinner} spin />}
              </div>
            }
            <div className=''>
              {allShowtime.room === "" ? (
                user.role === 'MANAGER' ? (
                  <p className='text-3xl'>-- Chưa có lịch chiếu nào. Vui lòng thêm lịch chiếu !!! --</p>
                ) : (
                  <p className='text-3xl'>-- Chưa có lịch chiếu nào!!! --</p>
                )
              ) : (
                <table className='mt-6 w-full'>
                  <thead className=''>
                    <tr>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.stt}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.movieInfo}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.time}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.room}</th>
                      {user.role === 'MANAGER' && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.status}</th>}
                      {user.role === 'MANAGER' && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.action}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {allShowtime &&
                      listShowtime.showtime.map((item, index) => (
                        <tr
                          onClick={() => changeTab(`/admin/showtime/${item.showTimeId}`)}
                          className='border-b-8 border-slate-50 bg-slate-100'
                        >
                          <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
                          <td className='text-start font-medium px-5 py-4'>
                            <div className='flex items-center'>
                              <div div className='pr-2'>
                                <img className="h-20 w-16 text-emerald-600" src={item.movie.poster} alt="" />
                              </div>
                              <div>
                                <h3>{item.movie.title}</h3>
                                <p className='font-normal text-xs'>
                                  <TruncatedContent content={"Actor: " + item.movie.actor} maxLength={20} />
                                </p>
                                <span className='font-normal text-xs'>
                                  <TruncatedContent content={"Director: " + item.movie.director} maxLength={20} />
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='text-start font-medium px-5 py-4'>
                            {FormatDataTime(item.timeStart).date} - {FormatDataTime(item.timeEnd).date}
                          </td>
                          <td className='text-start font-medium px-5 py-4'>{item.room.cinema.cinemaName} - Phòng {item.room.roomName}</td>
                          {user.role === 'MANAGER' && (
                            <td className={`${item.status ? 'text-green-600' : 'text-red-600'} text-start font-medium px-5 py-4`}>
                              {item.status ? 'Active' : 'Inactive'}
                            </td>
                          )}
                          <td className='text-start font-medium px-5 py-4'>
                            {user.role === 'MANAGER' && (
                              <div className='flex items-center'>
                                <button
                                  type='button'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleChangeStatus(item.showTimeId);
                                  }}
                                  className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'
                                >
                                  <listShowtime.action.aChange className='h-4 w-4 text-emerald-600' />
                                </button>
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
              )}
            </div>
            <Pagination pageNumber={currentPage} onPageChange={handleGetItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListShowtime;
