import React, { useEffect } from 'react'
import { useState } from 'react'
import { MapPinIcon } from "@heroicons/react/24/outline"
import { useLocation, useNavigate } from 'react-router-dom';
import MovieService from "../../service/MovieService"
import CinemaService from '../../service/CinemaService';
import FormatDataTime from '../../utils/FormatDataTime'
import { format, addDays } from 'date-fns';

const ShowTimes = () => {
  const { SpecialMovieApi, NowPlayingMovieApi, GetOneMovieApi } = MovieService()
  const { getAllCinemaApi } = CinemaService()

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [dateList, setDateList] = useState([]);
  const [allShowMovie, setAllShowMovie] = useState([])
  const [allCinema, setAllCinema] = useState([])
  const [movie, setMovie] = useState([])
  console.log("🚀 ~ file: index.jsx:22 ~ ShowTimes ~ movie:", movie)
  const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
  console.log("🚀 ~ file: index.jsx:26 ~ Movie ~ selectedDateTime:", selectedDateTime)
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
  }

  const handleGetOneMovie = async (movieId) => {
    let resMovie = await GetOneMovieApi(movieId)
    if (resMovie && resMovie.data && resMovie.data.result) {
      setMovie(resMovie.data.result)
    }
  }
  useEffect(() => {
    handleCheckPathname(pathname)
    ListDayShowtime()
  }, [pathname]);

  return (
    <div className="w-full pt-32 pb-10">
      <div className="content-page">
        {/* tab */}
        <div className="sub-tab">
          <ul className="relative inline-block">
            <li onClick={() => changeTab("/showtimes/lichchieuphim")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tl-full text-slate-100">
              <a className={`${currentTab === '1' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo phim</a>

            </li>
            <li onClick={() => changeTab("/showtimes/phimtheorap")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tr-full text-slate-100">
              <a className={`${currentTab === '2' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo rạp</a>
            </li>
          </ul>
        </div>

        {/* Lịch chiếu theo phim */}
        <div id='lichchieutheophim' style={{ display: currentTab === '1' ? 'block' : 'none' }}>
          {/* load ds phim đang chiếu ở đây */}
          <div className="tab-movie max-w-screen-xl mx-auto">
            <div className="grid grid-cols-7 gap-4">
              {
                allShowMovie.map((item, index) => (
                  <div key={`movie-${index}-${item.movieId}`} onClick={() => handleGetOneMovie(item.movieId)} className="mb-4">
                    <div className="product-item table border-2 border-slate-600 h-[92%]">
                      <img src={item.poster} alt=""
                        className="product-over h-full w-full table-cell" />
                    </div>
                    <div className="text-slate-200 mt-2 text-left uppercase font-bold text-sm h-[8%]">
                      {item.title}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {movie && movie.poster &&
            <div className='relative max-w-6xl mx-auto text-left pt-5'>
              {/* chi tiết phim */}
              <div className='flex pt-12 max-w-5xl mx-auto pb-10 px-4 my-4 border-t-4 border-t-cyan-600'>
                {/* product image */}
                <div className='w-1/5 px-4'>
                  <a href="">
                    <img src={movie.poster} alt="" />
                  </a>
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
              <div className='relative pl-60 pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* vị trí */}
                <div className='absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl'>
                  <div className='p-6'>
                    <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                    <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                  </div>
                  <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                  >
                    <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                    <a href="" className='pr-8'>Xem vị trí</a>
                  </button>
                </div>
                {/* thời gian */}
                <div className='block relative'>
                  <div className='relative pl-28 pt-4'>
                    <ul className='grid grid-cols-5 gap-4'>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          }



        </div>
      </div>


      {/* Lịch chiếu theo rạp */}
      <div id='lichchieutheorap' style={{ display: currentTab === '2' ? 'block' : 'none' }}>
        <div className='max-w-screen-xl mx-auto'>
          {/*ds rạp */}
          <div className='grid grid-cols-4 gap-8 mb-16 mx-4'>
            {
              allCinema.map((item, index) => (
                <div key={`cinema-${index}`} className='bg-slate-700 w-72 flex flex-col justify-between'>
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

          {/* ngày */}
          <div className='grid grid-cols-6'>
            <a href="" className='active2 option-style2 px-8 border border-slate-400 text-center text-slate-200'>
              14/10 <br />
              <span>Th 7</span>
            </a>
            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
              14/10 <br />
              <span>Th 7</span>
            </a>
            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
              14/10 <br />
              <span>Th 7</span>
            </a>
            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
              14/10 <br />
              <span>Th 7</span>
            </a>
            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
              14/10 <br />
              <span>Th 7</span>
            </a>
            <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
              14/10 <br />
              <span>Th 7</span>
            </a>
          </div>

          {/* phim và thời gian chiếu */}
          <div className='max-w-5xl mx-auto'>
            <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

              {/* chi tiết phim */}
              <div className='flex pb-10 px-4 my-4'>
                {/* product image */}
                <div className='w-1/5 px-4'>
                  <a href="">
                    <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                  </a>
                </div>
                {/* product detail */}
                <div className='w-4/5 px-4'>
                  {/* name */}
                  <div>
                    <h3 className='uppercase text-2xl text-slate-200'>
                      Đất rừng phương nam
                    </h3>
                  </div>
                  {/* thời gian */}
                  <div className='block relative'>
                    <div className='relative pl-2 pt-4'>
                      <ul className='grid grid-cols-5 gap-4'>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

              {/* chi tiết phim */}
              <div className='flex pb-10 px-4 my-4'>
                {/* product image */}
                <div className='w-1/5 px-4'>
                  <a href="">
                    <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                  </a>
                </div>
                {/* product detail */}
                <div className='w-4/5 px-4'>
                  {/* name */}
                  <div>
                    <h3 className='uppercase text-2xl text-slate-200'>
                      Đất rừng phương nam
                    </h3>
                  </div>
                  {/* thời gian */}
                  <div className='block relative'>
                    <div className='relative pl-2 pt-4'>
                      <ul className='grid grid-cols-5 gap-4'>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

              {/* chi tiết phim */}
              <div className='flex pb-10 px-4 my-4'>
                {/* product image */}
                <div className='w-1/5 px-4'>
                  <a href="">
                    <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                  </a>
                </div>
                {/* product detail */}
                <div className='w-4/5 px-4'>
                  {/* name */}
                  <div>
                    <h3 className='uppercase text-2xl text-slate-200'>
                      Đất rừng phương nam
                    </h3>
                  </div>
                  {/* thời gian */}
                  <div className='block relative'>
                    <div className='relative pl-2 pt-4'>
                      <ul className='grid grid-cols-5 gap-4'>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

              {/* chi tiết phim */}
              <div className='flex pb-10 px-4 my-4'>
                {/* product image */}
                <div className='w-1/5 px-4'>
                  <a href="">
                    <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                  </a>
                </div>
                {/* product detail */}
                <div className='w-4/5 px-4'>
                  {/* name */}
                  <div>
                    <h3 className='uppercase text-2xl text-slate-200'>
                      Đất rừng phương nam
                    </h3>
                  </div>
                  {/* thời gian */}
                  <div className='block relative'>
                    <div className='relative pl-2 pt-4'>
                      <ul className='grid grid-cols-5 gap-4'>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                        <li className='inline-block'>
                          <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShowTimes
