import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { MapPinIcon } from "@heroicons/react/24/outline"
import { useLocation, useNavigate } from 'react-router-dom';
import MovieService from "../../service/MovieService"
import CinemaService from '../../service/CinemaService';
import UserService from '../../service/UserService';

import ModalComponent from '../../utils/Modal';
import FormatDataTime from '../../utils/FormatDataTime'
import TruncatedContent from '../../utils/TruncatedContent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { format, addDays } from 'date-fns';

import { LoginContext } from '../../context/LoginContext';
import Loading from '../../components/Loading';
import { StarIcon } from '@heroicons/react/20/solid';
const ShowTimes = () => {
  const { SpecialMovieApi, NowPlayingMovieApi, GetOneMovieApi } = MovieService()
  const { getAllCinemaApi } = CinemaService()
  const { getShowtimeByMovieApi, getShowtimeByCinemaApi } = UserService()

  const { user } = useContext(LoginContext)
  const [modalStates, setModalStates] = useState(false);

  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [dateList, setDateList] = useState([]);
  const [allShowMovie, setAllShowMovie] = useState([])
  const [allCinema, setAllCinema] = useState([])
  const [movie, setMovie] = useState([])
  const [listShowtime, setListShowtime] = useState([])
  const [listShowtimeCinema, setListShowtimeCinema] = useState([])
  const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
  const [currentTab, setCurrentTab] = useState('1');
  const changeTab = (pathname) => {
    navigate(pathname)
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

  const handleCheckPathname = async (pathname) => {
    switch (pathname) {
      case "/showtimes/lichchieuphim":
        {
          let resNowPlayMovie = await NowPlayingMovieApi()
          let resSpecialMovie = await SpecialMovieApi()
          if (resNowPlayMovie && resSpecialMovie &&
            resNowPlayMovie.data && resSpecialMovie.data &&
            resNowPlayMovie.data.result && resSpecialMovie.data.result
          ) {
            let movie = [...resNowPlayMovie.data.result, ...resSpecialMovie.data.result]
            setAllShowMovie(movie)
          }
          setCurrentTab("1")
        }
        break;
      case "/showtimes/phimtheorap":
        {
          let res = await getAllCinemaApi()
          if (res && res.data && res.data.result && res.data.result.content) {
            setAllCinema(res.data.result.content)
          }
          setCurrentTab("2")
        }
        break;
      default:
        {
          let resNowPlayMovie = await NowPlayingMovieApi()
          let resSpecialMovie = await SpecialMovieApi()
          if (resNowPlayMovie && resSpecialMovie &&
            resNowPlayMovie.data && resSpecialMovie.data &&
            resNowPlayMovie.data.result && resSpecialMovie.data.result
          ) {
            let movie = [...resNowPlayMovie.data.result, ...resSpecialMovie.data.result]
            setAllShowMovie(movie)
          }
          setCurrentTab("1")
        }
    }
    setLoading(false)
  }

  const handleGetShowtimeByMovie = async (movieId) => {
    let resMovie = await GetOneMovieApi(movieId)
    if (resMovie && resMovie.data && resMovie.data.result) {
      setMovie(resMovie.data.result)
    }
    let resShowtimes = await getShowtimeByMovieApi(movieId)
    if (resShowtimes && resShowtimes.data && resShowtimes.data.result) {
      setListShowtime(resShowtimes.data.result)
    }
  }

  const hadnleGetShowtimeByCinema = async (cinemaId) => {
    let resShowtimes = await getShowtimeByCinemaApi(cinemaId)
    if (resShowtimes && resShowtimes.data && resShowtimes.data.result) {
      setListShowtimeCinema(resShowtimes.data.result)
    }
  }

  const handleModalStates = () => {
    setModalStates(!modalStates);
  };
  useEffect(() => {
    setLoading(true)
    handleCheckPathname(pathname)
    ListDayShowtime()
  }, [pathname]);

  return (
    <div className="w-full pt-32 pb-10">
      <Tabs className="content-page">
        {/* tab */}
        <TabList className="sub-tab">
          <ul className="relative flex flex-col sm:inline-block">
            <Tab onClick={() => changeTab("/showtimes/lichchieuphim")} className="relative option1-style uppercase font-bold float-left sm:w-64 md:w-72 h-14 shadow-inner shadow-cyan-500 rounded-t-full sm:rounded-tr-none text-slate-100 bg-transparent">
              <a className={`${currentTab === '1' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo phim</a>

            </Tab>
            <Tab onClick={() => changeTab("/showtimes/phimtheorap")} className="relative option1-style uppercase font-bold float-left sm:w-64 md:w-72 h-14 shadow-inner shadow-cyan-500 sm:rounded-tr-full text-slate-100 bg-transparent">
              <a className={`${currentTab === '2' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo rạp</a>
            </Tab>
          </ul>
        </TabList>
        {
          loading ?
            <Loading /> :
            <div>
              {/* Lịch chiếu theo phim */}
              < TabPanel >
                {/* load ds phim đang chiếu ở đây */}
                <div div className="tab-movie max-w-screen-xl mx-auto px-4">
                  <div className={`${allShowMovie.length > 7 ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7" : "flex justify-center"} gap-4`}>
                    {
                      allShowMovie.map((item, index) => (
                        <div key={`movie-${index}-${item.movieId}`} onClick={() => handleGetShowtimeByMovie(item.movieId)} className="mb-4">
                          <div className="relative product-item table border-2 border-slate-600 h-[92%]">
                            <img src={item.poster} alt=""
                              className="product-over h-full lg:w-[188px] xl:w-[166px] table-cell"
                            />
                            <div className="absolute top-0 right-0 bg-black bg-opacity-40 z-10 rounded-bl-full">
                              <div className='flex justify-center items-center p-2'>
                                <StarIcon className='h-6 text-amber-400 px-4' />
                                <p className=' text-slate-200 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-slate-200 mt-2 text-left uppercase font-bold text-sm h-[8%]">
                            {item.title}
                          </div>
                        </div>
                      ))
                    }
                  </div>


                  {movie && movie.poster &&
                    <div className='relative max-w-6xl mx-auto text-left pt-5'>
                      {/* chi tiết phim */}
                      <div className='flex pt-12 max-w-5xl mx-auto pb-10 px-4 my-4 border-t-4 border-t-cyan-600'>
                        {/* product image */}
                        <div className='relative w-1/5 px-4'>
                          <a href="">
                            <img src={movie.poster} alt="" />
                          </a>
                          <div className="absolute top-0 right-4 bg-black bg-opacity-40 z-10 rounded-bl-full">
                            <div className='flex justify-center items-center p-2'>
                              <StarIcon className='h-6 text-amber-400 px-4' />
                              <p className=' text-slate-200 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                            </div>
                          </div>
                        </div>
                        <div className='w-4/5 px-4'>
                          <div>
                            <h3 className='uppercase text-2xl text-slate-200'>
                              {movie.title}
                            </h3>
                          </div>
                          {/* dec */}
                          <div className='pt-4 text-slate-500'>
                            {movie.desc}
                          </div>
                        </div>
                      </div>

                      {listShowtime.length === 0 ?
                        <p className='text-2xl text-slate-200 text-center pt-4'>-- Bộ phim hiện chưa có lịch chiếu !!! --</p> :
                        <div>
                          {/* ngày chiếu */}
                          <div className='grid grid-cols-6'>
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

                          {/* rạp và thời gian chiếu */}
                          {listShowtime.map(foundShowtime => (
                            <div className='relative md:pl-60 min-h-[240px] pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                              {/* vị trí */}
                              <div className='hidden md:block absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl'>
                                <div className='p-6'>
                                  <h4 className='uppercase font-bold text-lg text-slate-200'>{foundShowtime.room.cinema.cinemaName}</h4>
                                  <p className='text-slate-500'><TruncatedContent content={foundShowtime.room.cinema.location} maxLength={18} /></p>
                                </div>
                                <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                                >
                                  <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                                  <a href="" className='pr-8'>Xem vị trí</a>
                                </button>
                              </div>
                              <div className='block md:hidden'>
                                <h4 className='uppercase font-bold text-lg text-slate-200'>{foundShowtime.room.cinema.cinemaName}</h4>
                              </div>
                              {/* thời gian */}
                              <div className='block relative'>
                                <div className='relative md:pl-28 pt-4'>
                                  <ul className='grid grid-cols-4 sm:grid-cols-5 gap-4'>
                                    {
                                      foundShowtime.listTimeShow
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
                              </div>
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  }

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

              </TabPanel>

              {/* Lịch chiếu theo rạp */}
              <TabPanel>
                <div className='max-w-screen-xl mx-auto px-4'>
                  {/*ds rạp */}
                  <div className={`${allCinema.length >= 4 ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex justify-center"} gap-8 mb-16 mx-4`}>
                    {
                      allCinema.map((item, index) => (
                        <div key={`cinema-${index}`} onClick={() => hadnleGetShowtimeByCinema(item.cinemaId)} className='bg-slate-700 md:w-[364px] lg:w-[330px] xl:w-72 flex flex-col justify-between'>
                          <div className='p-6'>
                            <h4 className='uppercase font-bold text-lg text-slate-200'>{item.cinemaName}</h4>
                            <p className='text-slate-500'>{item.location}</p>
                          </div>
                          <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                            onClick={() => window.open(item.urlLocation, '_blank')}
                          >
                            <span className="absolute right-12 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                            <a className='pr-8'>Xem vị trí</a>
                          </button>
                        </div>
                      ))
                    }
                  </div>

                  {listShowtimeCinema.length === 0 ?
                    <p className='text-2xl text-slate-200 text-center pt-4'>-- Rạp phim hiện chưa có lịch chiếu !!! --</p> :
                    <div>
                      {/* ngày chiếu */}
                      <div className='grid grid-cols-6'>
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

                      {/* phim và thời gian chiếu */}
                      {listShowtimeCinema.map(foundShowtime => (
                        <div className='max-w-5xl mx-auto'>
                          <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                            {/* chi tiết phim */}
                            <div className='flex pb-10 px-4 my-4 min-h-[144px] '>
                              {/* product image */}
                              <div className='relative md:block hidden w-1/5 px-4'>
                                <a href="">
                                  <img src={foundShowtime.movie.poster} alt="" />
                                </a>
                                <div className="absolute top-0 right-4 bg-black bg-opacity-40 z-10 rounded-bl-full">
                                  <div className='flex justify-center items-center p-2'>
                                    <StarIcon className='h-6 text-amber-400 px-4' />
                                    <p className=' text-slate-200 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                                  </div>
                                </div>
                              </div>
                              {/* product detail */}
                              <div className='w-full md:w-4/5 px-4'>
                                {/* name */}
                                <div>
                                  <h3 className='uppercase text-2xl text-slate-200'>
                                    {foundShowtime.movie.title}
                                  </h3>
                                </div>
                                {/* thời gian */}
                                <div className='block relative'>
                                  <div className='relative md:pl-28 pt-4'>
                                    <ul className='grid grid-cols-4 sm:grid-cols-5 gap-4'>
                                      {
                                        foundShowtime.listTimeShow
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  }

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

              </TabPanel>

            </div>
        }
      </Tabs >
    </div >
  )
}

export default ShowTimes
