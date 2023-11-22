import Slider from "../Slider"
import slider1 from "../../images/slider.jpg"
import slider2 from "../../images/slider-1.jpg"
import slider3 from "../../images/slider-2.jpg"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import "./index.css"
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MovieService from "../../service/MovieService"

const IMAGES = [
  slider1, slider2, slider3
]

const Home = () => {
  const { GetAllMovieApi, ComingSoonMovieApi, SpecialMovieApi, NowPlayingMovieApi } = MovieService()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState('1');
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const [allMovie, setAllMovie] = useState([])

  const handleCheckPathname = async (pathname) => {
    let res;
    switch (pathname) {
      case "/phim/dangchieu":
        {
          res = await NowPlayingMovieApi()
          setCurrentTab("1")
        }
        break;
      case "/phim/sapchieu":
        {
          res = await ComingSoonMovieApi()
          setCurrentTab("2")
        }
        break;
      case "/dacbiet":
        {
          res = await SpecialMovieApi()
          setCurrentTab("3")
        }
        break;
      default:
        {
          res = await GetAllMovieApi()
          setCurrentTab("1")
        }
    }


    if (res && res.data && res.data.result) {
      setAllMovie(res.data.result)
    }
  }
  useEffect(() => {
    handleCheckPathname(pathname)
    console.log("🚀 ~ file: index.jsx:94 ~ useEffect ~ pathname:", pathname)
    console.log(allMovie)
  }, [pathname]);

  return (
    <div className="w-full">
      {/* slider */}
      <div className="relative">
        <Slider images={IMAGES} />
        <a href="/" style={{ fontSize: "4rem" }}>
          Link
        </a>
      </div>
      {/* mua vé nhanh */}
      <div className="cart-wrap">
        <div className="block h-36">
          <div className="inline-block w-1/5 p-3 items-center justify-between font-bold text-emerald-800">
            <h2 className="uppercase font-bold text-2xl">mua vé <br /> online </h2>
          </div>
          <div className="inline-block w-4/5 p-2">
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-r-full rounded-bl-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn phim</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-br-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn ngày</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-r-full rounded-tl-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn rạp</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-tr-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn suất chiếu</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
          </div>
        </div>
      </div>
      {/* hiển thị ds phim */}
      <div className="content-page">
        <div className="sub-tab">
          <ul className="relative inline-block">
            <li onClick={() => changeTab("/phim/dangchieu")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tl-full z-30 text-slate-100">
              <a className={`${currentTab === '1' ? "active1" : ""} p-2 leading-[3.5rem]`}>Phim đang chiếu</a>
            </li>
            <li onClick={() => changeTab("/phim/sapchieu")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 z-20 text-slate-100">
              <a className={`${currentTab === '2' ? "active1" : ""} p-2 leading-[3.5rem]`}>Phim sắp chiếu</a>
            </li>
            <li onClick={() => changeTab("/dacbiet")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tr-full z-10 text-slate-100">
              <a className={`${currentTab === '3' ? "active1" : ""} p-2 leading-[3.5rem]`}>Suất chiếu đặc biệt</a>
            </li>
          </ul>
        </div>

        <div className="tab-movie">
          {/* load phim dang chieu */}
          <div style={{ display: currentTab === '1' ? 'block' : 'none' }}>
            <div className="grid grid-cols-4 gap-4 max-w-screen-xl mx-auto">
              {
                allMovie && allMovie.length > 0 &&
                allMovie.map((movie, index) => {
                  return (
                    <div div key={`movie-${index}-${movie.movieId}`} onClick={() => changeTab(`/movie/${movie.movieId}`)} className="mb-4">
                      <div className="product-item table border-2 border-slate-600 h-[92%]">
                        <img
                          src={movie.poster}
                          alt=""
                          className="product-over h-full w-full table-cell"
                        />
                      </div>
                      <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                        {movie.title}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {/* load phim sap chieu */}
          <div style={{ display: currentTab === '2' ? 'block' : 'none' }}>
            <div className="grid grid-cols-4 gap-4 max-w-screen-xl mx-auto">
              {
                allMovie && allMovie.length > 0 &&
                allMovie.map((movie) => (
                  <div onClick={() => changeTab("/movie")} className="mb-4">
                    <div className="product-item table border-2 border-slate-600 h-[92%]">
                      <img
                        src={movie.poster}
                        alt=""
                        className="product-over h-[462px] w-full table-cell"
                      />
                    </div>
                    <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                      {movie.title}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {/* load suat chieu dac biet */}
          <div style={{ display: currentTab === '3' ? 'block' : 'none' }}>
            <div className="grid grid-cols-4 gap-4 max-w-screen-xl mx-auto">
              {
                allMovie && allMovie.length > 0 &&
                allMovie.map((movie) => (
                  <div onClick={() => changeTab("/movie")} className="mb-4">
                    <div className="product-item table border-2 border-slate-600 h-[92%]">
                      <img
                        src={movie.poster}
                        alt=""
                        className="product-over h-[462px] w-full table-cell"
                      />
                    </div>
                    <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                      {movie.title}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home;