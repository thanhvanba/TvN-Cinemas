
import slider2 from "../../images/slider.jpg"
import slider1 from "../../images/slider-1.jpg"
import slider3 from "../../images/slider-2.jpg"
import "./index.css"
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MovieService from "../../service/MovieService"

import OrderQuickly from "../../components/OrderQuickly"
import Loading from "../../components/Loading"
import { StarIcon } from "@heroicons/react/20/solid"
import HomeSlider from "../../components/Slider"

const IMAGES = [
  slider1, slider2, slider3
]

const Home = () => {
  const { ComingSoonMovieApi, SpecialMovieApi, NowPlayingMovieApi } = MovieService()

  const tabsRef = useRef(null);
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  const [comingSoonMovie, setComingSoonMovie] = useState([]);
  const [specialMovie, setSpecialMovie] = useState([]);
  const [allMovie, setAllMovie] = useState([])

  const [movieOrderQuickly, setMovieOrderQuickly] = useState([])

  const [currentTab, setCurrentTab] = useState('1');

  const changeTab = (pathname) => {
    navigate(pathname)
  }


  const handleCheckPathname = async (pathname) => {
    let res;

    switch (pathname) {
      case "/phim/dangchieu":
        {
          setAllMovie(nowPlayingMovie)
          setCurrentTab("1")
        }
        break;
      case "/phim/sapchieu":
        {
          setAllMovie(comingSoonMovie)
          setCurrentTab("2")
        }
        break;
      case "/dacbiet":
        {
          setAllMovie(specialMovie)
          setCurrentTab("3")
        }
        break;
      default:
        {
          setAllMovie(nowPlayingMovie)
          setCurrentTab("1")
        }
    }
    setLoading(false)
  }

  const handleGetMovie = async () => {
    const resNowPlay = await NowPlayingMovieApi()
    if (resNowPlay && resNowPlay.data && resNowPlay.data.result) {
      setNowPlayingMovie(resNowPlay.data.result)
    }
    const resComingSoon = await ComingSoonMovieApi()
    if (resComingSoon && resComingSoon.data && resComingSoon.data.result) {
      setComingSoonMovie(resComingSoon.data.result)
    }
    const resSpecial = await SpecialMovieApi()
    if (resSpecial && resSpecial.data && resSpecial.data.result) {
      setSpecialMovie(resSpecial.data.result)
    }
    setMovieOrderQuickly([...resNowPlay.data.result, ...resSpecial.data.result])
  }

  useEffect(() => {
    setLoading(true)
    handleCheckPathname(pathname)
  }, [pathname, nowPlayingMovie, comingSoonMovie, specialMovie]);

  useEffect(() => {

    // Cuộn đến vị trí tab
    const offset = 120;
    if (tabsRef.current) {
      const scrollTop = tabsRef.current.offsetTop - offset;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [currentTab])
  useEffect(() => {
    handleGetMovie()
  }, [])
  return (
    <div className="w-full">
      {/* slider */}
      <div className="px-8">
        {[...comingSoonMovie, ...movieOrderQuickly].length > 0 && <HomeSlider movies={[...comingSoonMovie, ...movieOrderQuickly]} />}
      </div>
      {/* mua vé nhanh */}
      <div className="absolute hidden md:block w-[45%] md:h-[264px] lg:h-auto md:w-[50%] right-16 lg:top-72 md:top-36 bg-[#FFFFFFB2] rounded-md bg-cover">
        <OrderQuickly allShowMovie={movieOrderQuickly} />
      </div>
      {/* hiển thị ds phim */}
      <div className="content-page" ref={tabsRef}>
        <ul className="sub-tab">
          <div className="relative flex flex-col md:inline-block md:font-bold">
            <li onClick={() => changeTab("/phim/dangchieu")} className="cursor-pointer relative option1-style uppercase font-bold md:float-left md:w-56 lg:w-72 h-14 shadow-inner shadow-cyan-500 rounded-t-full md:rounded-tr-none z-30 text-slate-100 bg-transparent">
              <a className={`${currentTab === '1' ? "active1" : ""} p-2 leading-[3.5rem]`}>Phim đang chiếu</a>
            </li>
            <li onClick={() => changeTab("/phim/sapchieu")} className="cursor-pointer relative option1-style uppercase font-bold md:float-left md:w-56 lg:w-72 h-14 shadow-inner shadow-cyan-500 z-20 text-slate-100 bg-transparent">
              <a className={`${currentTab === '2' ? "active1" : ""} p-2 leading-[3.5rem]`}>Phim sắp chiếu</a>
            </li>
            <li onClick={() => changeTab("/dacbiet")} className="cursor-pointer relative option1-style uppercase font-bold md:float-left md:w-56 lg:w-72 h-14 shadow-inner shadow-cyan-500 md:rounded-tr-full z-10 text-slate-100 bg-transparent">
              <a className={`${currentTab === '3' ? "active1" : ""} p-2 leading-[3.5rem]`}>Suất chiếu đặc biệt</a>
            </li>
          </div>
        </ul>
        {
          loading ?
            <Loading /> :
            <div >
              {/* load phim */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-screen-xl mx-auto">
                {
                  allMovie && allMovie.length > 0 &&
                  allMovie.map((movie, index) => (
                    <div key={`movie-${index}-${movie.movieId}`} onClick={() => changeTab(`/movie/${movie.movieId}`)} className="mb-4">
                      <div className="relative product-item table border-2 border-slate-600 h-[92%]">
                        <img
                          src={movie.poster}
                          alt=""
                          className="product-over h-[462px] w-full table-cell"
                        />
                        <div className="absolute top-0 right-0 bg-black bg-opacity-40 z-10 rounded-bl-full">
                          <div className='flex justify-center items-center p-2'>
                            <StarIcon className='h-6 text-amber-400 px-4' />
                            <p className=' text-slate-200 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative text-slate-200 mt-2 text-left uppercase font-bold h-[8%]">
                        {movie.title}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        }
      </div>
    </div >
  )
}

export default Home;