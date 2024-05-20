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
import { format, addDays, parse, isAfter } from 'date-fns';

import { LoginContext } from '../../context/LoginContext';
import Loading from '../../components/Loading';
import { StarIcon } from '@heroicons/react/20/solid';
import Cinema from '../../components/Cinema';
import useLoadingState from '../../hook/UseLoadingState';
const ShowTimes = () => {
  const { SpecialMovieApi, NowPlayingMovieApi, GetOneMovieApi } = MovieService()
  const { getAllCinemaApi } = CinemaService()
  const { getShowtimeByMovieApi, getShowtimeByCinemaApi } = UserService()

  const { user } = useContext(LoginContext)
  const [modalStates, setModalStates] = useState(false);

  const { loading, setLoading } = useLoadingState(false);
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [dateList, setDateList] = useState([]);

  const [allShowMovie, setAllShowMovie] = useState([])

  const [allCinema, setAllCinema] = useState([])
  const [movie, setMovie] = useState([])
  const [listShowtime, setListShowtime] = useState([])
  const [listShowtimeCinema, setListShowtimeCinema] = useState([])
  console.log("🚀 ~ ShowTimes ~ listShowtimeCinema:", listShowtimeCinema)
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
          setCurrentTab("1")
        }
        break;
      case "/showtimes/phimtheorap":
        {
          setCurrentTab("2")
        }
        break;
      default:
        {
          setCurrentTab("1")
        }
    }
  }

  const handleGetMovie = async () => {
    setLoading('loading', true)
    const resNowPlay = await NowPlayingMovieApi()

    const resSpecial = await SpecialMovieApi()
    if (resSpecial && resSpecial.data && resSpecial.data.result && resNowPlay && resNowPlay.data && resNowPlay.data.result) {
      setAllShowMovie([...resSpecial.data.result, ...resNowPlay.data.result])
    }
    let res = await getAllCinemaApi()
    if (res && res.data && res.data.result && res.data.result.content) {
      setAllCinema(res.data.result.content)
    }
    setLoading('loading', false)
  }

  const handleGetShowtimeByMovie = async (movieId) => {
    setLoading('bymovie', true)
    let resShowtimes = await getShowtimeByMovieApi(movieId)
    if (resShowtimes && resShowtimes.data && resShowtimes.data.result) {
      const showtimes = resShowtimes.data.result.filter(showtime => showtime.status !== "ENDED")
      const groupedSchedules = showtimes.reduce((acc, showtime) => {
        const existingCinema = acc.find(item => item?.cinema?.cinemaId === showtime.room.cinema.cinemaId);
        if (existingCinema) {
          existingCinema.schedules.push(...showtime.schedules);
        } else {
          acc.push({
            cinema: showtime.room.cinema,
            schedules: [...showtime.schedules]
          });
        }
        return acc;
      }, []);

      groupedSchedules.forEach(cinema => {
        cinema.schedules.sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          // Nếu ngày bằng nhau, so sánh theo startTime
          if (a.startTime < b.startTime) return -1;
          if (a.startTime > b.startTime) return 1;
          return 0;
        });
      });
      setListShowtime(groupedSchedules)
      setMovie(resShowtimes.data.result[0].movie)
    }
    setLoading('bymovie', false)
  }

  const hadnleGetShowtimeByCinema = async (cinemaId) => {
    setLoading('bycinema', true)
    let resShowtimes = await getShowtimeByCinemaApi(cinemaId)
    if (resShowtimes && resShowtimes.data && resShowtimes.data.result && resShowtimes.data.result.content) {
      const groupedSchedules = resShowtimes.data.result.content.reduce((acc, showtime) => {
        const existingCinema = acc.find(item => item?.movie?.movieId === showtime.movie.movieId);
        if (existingCinema) {
          existingCinema.schedules.push(...showtime.schedules);
        } else {
          acc.push({
            movie: showtime.movie,
            schedules: [...showtime.schedules]
          });
        }
        return acc;
      }, []);

      groupedSchedules.forEach(showtime => {
        showtime.schedules.sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          // Nếu ngày bằng nhau, so sánh theo startTime
          if (a.startTime < b.startTime) return -1;
          if (a.startTime > b.startTime) return 1;
          return 0;
        });
      });
      setListShowtimeCinema(groupedSchedules)
    }
    setLoading('bycinema', false)
  }

  const handleModalStates = () => {
    setModalStates(!modalStates);
  };
  useEffect(() => {
    handleCheckPathname(pathname)
    ListDayShowtime()
  }, [pathname]);

  useEffect(() => {
    handleGetMovie()
  }, [])
  let hasShowtimes = false;
  return (
    <div className="w-full pt-32 pb-10">
      <Tabs className="content-page">
        {/* tab */}
        <TabList className="sub-tab">
          <ul className="relative flex flex-col sm:inline-block">
            <Tab onClick={() => changeTab("/showtimes/lichchieuphim")} className="border-none relative option1-style uppercase font-bold float-left sm:w-64 md:w-72 h-14 shadow-inner shadow-cyan-500 rounded-t-full sm:rounded-tr-none text-slate-100 bg-transparent cursor-pointer outline-none">
              <a className={`${currentTab === '1' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo phim</a>

            </Tab>
            <Tab onClick={() => changeTab("/showtimes/phimtheorap")} className="border-none relative option1-style uppercase font-bold float-left sm:w-64 md:w-72 h-14 shadow-inner shadow-cyan-500 sm:rounded-tr-full text-slate-100 bg-transparent cursor-pointer outline-none">
              <a className={`${currentTab === '2' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo rạp</a>
            </Tab>
          </ul>
        </TabList>
        {
          loading['loading'] ?
            <Loading /> :
            <div>
              {/* Lịch chiếu theo phim */}
              < TabPanel >
                {/* load ds phim đang chiếu ở đây */}
                <div div className="tab-movie max-w-screen-xl mx-auto px-4">
                  <div className={`${allShowMovie.length > 5 ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7" : "flex justify-center"} gap-4`}>
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
                                <p className=' text-slate-200 font-bold text-lg'>{item.rating ? item.rating : "N/A"}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-slate-200 mt-2 text-left uppercase font-bold text-sm h-[8%]">
                            <TruncatedContent content={item.title} maxLength={18} />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {
                    loading['bymovie'] ?
                      <Loading /> : (
                        movie && movie.poster &&
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
                            <p className='text-2xl text-slate-200 text-center pt-4 font-light cursor-default'>-- Bộ phim hiện chưa có lịch chiếu !!! --</p> :
                            <div>
                              {/* ngày chiếu */}
                              <div className='grid grid-cols-6'>
                                {dateList.map((date, index) => (
                                  <a
                                    key={index}
                                    className={`cursor-pointer px-8 border border-slate-400 text-center text-slate-200 ${FormatDataTime(date).date === selectedDateTime.date ? 'selected' : ''
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
                              {listShowtime.map(foundShowtime => {

                                return (
                                  <div className='relative md:pl-60 min-h-[250px] pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>
                                    {/* vị trí */}
                                    <div className='hidden md:block absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl cursor-default'>
                                      <Cinema cinemaName={foundShowtime?.cinema?.cinemaName} location={foundShowtime?.cinema?.location} urlLocation={foundShowtime?.cinema?.urlLocation} />
                                    </div>
                                    <div className='block md:hidden'>
                                      <h4 className='uppercase font-bold text-lg text-slate-200'>{foundShowtime?.cinema?.cinemaName}</h4>
                                    </div>
                                    {/* thời gian */}
                                    <div className='block relative'>
                                      <div className='relative md:pl-28 pt-4'>
                                        <ul className='grid grid-cols-4 sm:grid-cols-5 gap-4'>
                                          {foundShowtime.schedules.map((schedule, index) => {
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
                                                      setSelectedDateTime((prevState) => ({ ...prevState, time: schedule.startTime }));
                                                      const updatedDateTime = {
                                                        ...selectedDateTime, time: schedule.startTime
                                                      };
                                                      navigate(`/${showtimeByRoom.showTimeId}/order`, { state: { dateTime: updatedDateTime } });
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
                                          <p className='text-xl text-slate-200 text-center font-light cursor-default'>-- Chưa có lịch chiếu --</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          }
                        </div>
                      )
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
                        buttonCancel='Thoát'
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
                        <div key={`cinema-${index}`} onClick={() => hadnleGetShowtimeByCinema(item.cinemaId)} className='cursor-default bg-slate-700 hover:bg-slate-600 md:w-[364px] lg:w-[330px] xl:w-72 flex flex-col justify-between'>
                          <Cinema cinemaName={item.cinemaName} location={item.location} urlLocation={item.urlLocation} />
                        </div>
                      ))
                    }
                  </div>
                  {
                    loading['bycinema'] ?
                      <Loading /> : (
                        listShowtimeCinema.length === 0 ?
                          <p className='text-2xl text-slate-200 text-center pt-4 font-light cursor-default'>-- Rạp phim hiện chưa có lịch chiếu !!! --</p> :
                          <div>
                            {/* ngày chiếu */}
                            <div className='grid grid-cols-6'>
                              {dateList.map((date, index) => (
                                <a
                                  key={index}
                                  className={`cursor-pointer px-8 border border-slate-400 text-center text-slate-200 ${FormatDataTime(date).date === selectedDateTime.date ? 'selected' : ''
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
                                      <p>
                                        <img src={foundShowtime.movie.poster} />
                                      </p>
                                      <div className="absolute top-0 right-4 bg-black bg-opacity-40 z-10 rounded-bl-full">
                                        <div className='flex justify-center items-center p-2'>
                                          <StarIcon className='h-6 text-amber-400 px-4' />
                                          <p className=' text-slate-200 font-bold text-lg cursor-default'>{foundShowtime.movie.rating ? foundShowtime.movie.rating : "N/A"}</p>
                                        </div>
                                      </div>
                                    </div>
                                    {/* product detail */}
                                    <div className='w-full md:w-4/5 px-4'>
                                      {/* name */}
                                      <div>
                                        <h3 className='uppercase text-2xl text-slate-200 cursor-default'>
                                          {foundShowtime.movie.title}
                                        </h3>
                                      </div>
                                      {/* thời gian */}
                                      <div className='block relative'>
                                        <div className='relative md:pl-28 pt-4'>
                                          <ul className='grid grid-cols-4 sm:grid-cols-5 gap-4'>
                                            {foundShowtime && foundShowtime.schedules.map((schedule, index) => {
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
                                                        setSelectedDateTime((prevState) => ({ ...prevState, time: schedule.startTime }));
                                                        const updatedDateTime = {
                                                          ...selectedDateTime, time: schedule.startTime
                                                        };

                                                        console.log("🚀 ~ showtimeByRoom.schedules.map ~ updatedDateTime:", updatedDateTime)
                                                        navigate(`/${showtimeByRoom.showTimeId}/order`, { state: { dateTime: updatedDateTime } });
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
                                            <p className='text-xl text-slate-200 text-center font-light cursor-default'>-- Chưa có lịch chiếu --</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                      )
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
                        buttonCancel='Thoát'
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
