import { Fragment, useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthService from '../../service/AuthService'
import UserService from '../../service/UserService'
import { LoginContext } from '../../context/LoginContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './index.css'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

import logo from "../../images/logo.png"
import Search from '../Search'


const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const Header = () => {
  const { loginApi, logoutApi } = AuthService();
  const { forgotPasswordApi, searchMovieApi } = UserService()

  const [email, setEmail] = useState('')
  const [toggle, setToggle] = useState(false)
  const [credentialId, useUserName] = useState('')
  const [password, usePassword] = useState('')
  const [currentTab, setCurrentTab] = useState('');
  const [inputSearch, setInputSearch] = useState("")
  const [listMovieFound, setListMovieFound] = useState([])
  const [showMovieList, setShowMovieList] = useState(false);

  const [loading, setLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { user } = useContext(LoginContext);

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
    setInputSearch("")
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }
  const handleInputFocus = () => {
    setShowMovieList(true);
  };
  const handleInputBlur = () => {
    // Sử dụng setTimeout để đảm bảo rằng onBlur sẽ được gọi sau khi onClick của danh sách
    setTimeout(() => {
      setShowMovieList(false);
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    let logobj = { credentialId, password };
    await loginApi(logobj)
    setLoading(false)

  }

  const handleLogoutApi = async (e) => {
    e.preventDefault();
    setLoading(true)
    await logoutApi()
    setLoading(false)
  }

  const handleSearchMovie = async (value) => {
    let resMovie = await searchMovieApi(value)
    if (resMovie && resMovie.data && resMovie.data.result) {
      setListMovieFound(resMovie.data.result)
    }
  }
  const handleChange = (value) => {
    handleSearchMovie(value)
    setInputSearch(value)
  }
  const handleForgotPassword = async () => {
    setLoading(true)
    await forgotPasswordApi(email)
    setToggle(false)
    setLoading(false)
  }
  const handleCheckPathname = (pathname) => {
    switch (pathname) {
      case "/":
        setCurrentTab("0")
        break;
      case "/phim":
        setCurrentTab("1")
        break;
      case "/showtimes":
      case "/showtimes/lichchieuphim":
      case "/showtimes/phimtheorap":
        setCurrentTab("2")
        break;
      case "/rap":
        setCurrentTab("3")
        break;
      case "/khuyenmai":
        setCurrentTab("4")
        break;
      case "/lienhe":
        setCurrentTab("5")
        break;
    }
  }

  useEffect(() => {
    handleCheckPathname(pathname)
    setMobileMenuOpen(false)
  }, [pathname]);
  return (
    <header className="header">
      <div className='top-menu'>
        <div className='mx-auto h-full flex max-w-5xl xl:max-w-7xl justify-between lg:px-8 top-menu-container'>
          <div className="flex lg:flex-auto">
            {/* logo */}
            <div className='flex items-center'>
              <a onClick={() => { changeTab('/') }} href="" className="pl-6 lg:p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-[60px] md:h-[80px] w-auto" src={logo} alt="" />
              </a>
            </div>
            {/* Thanh điều hướng */}
            <nav className="mx-auto flex max-w-6xl xl:max-w-7xl justify-between lg:px-8">
              <Popover.Group className="hidden lg:flex lg:gap-x-12">
                <ul className="hidden lg:flex">
                  <li onClick={() => changeTab("/phim")} className='px-4 py-8 relative cursor-pointer'>
                    <a className={`${currentTab === '1' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Phim
                    </a>
                  </li>
                  <li onClick={() => changeTab("/showtimes")} className='px-4 py-8 relative cursor-pointer'>
                    <a className={`${currentTab === '2' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Lịch Chiếu
                    </a>
                  </li>
                  <li onClick={() => changeTab("/rap")} className='px-4 py-8 relative cursor-pointer'>
                    <a className={`${currentTab === '3' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Hệ thống rạp
                    </a>
                  </li>
                  <li onClick={() => changeTab("/khuyenmai")} className='px-4 py-8 relative cursor-pointer'>
                    <a className={`${currentTab === '4' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Khuyến mãi
                    </a>
                  </li>
                  <li onClick={() => changeTab("/lienhe")} className='px-4 py-8 relative cursor-pointer'>
                    <a className={`${currentTab === '5' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </Popover.Group>
            </nav>
          </div>
          {/* Tìm kiếm, mua vé, đăng nhập */}
          <Popover className="relative items-center justify-center hidden lg:flex">
            {/* Tim kiem */}
            <div className='relative mr-2'>
              <div className=''>
                <input
                  onChange={(e) => handleChange(e.target.value)}
                  className='h-10 xl:w-full w-32 rounded-2xl px-4 text-black focus:outline-none'
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  value={inputSearch}
                  placeholder='Tìm kiếm' />
              </div>
              <button
                className='absolute right-0 top-0 m-3'>
                <MagnifyingGlassIcon
                  onClick={() => changeTab(`/tim-kiem/${inputSearch}`)}
                  className="h-5 w-5 text-gray-400" />
              </button>
              {showMovieList && listMovieFound.length !== 0 &&
                <div className='absolute -right-[50%] bg-slate-100 w-[200%] mt-2 p-4 rounded-lg'>
                  {listMovieFound.map(movie => (
                    <div className='text-gray-900 hover:bg-slate-300 hover:rounded-md'>
                      <div onClick={() => changeTab(`/movie/${movie.movieId}`)} className='flex p-2 items-end'>
                        <img className="h-10 w-8 text-emerald-600" src={movie.poster} alt="" />
                        <span className='text-lg font-semibold px-4 items-center'>{movie.title}</span>
                      </div>
                    </div>
                  ))

                  }
                </div>
              }
            </div>

            {/* <Search searchFunction={hannd} /> */}
            {
              user && user.auth === false ?
                <div className='flex'>
                  <button
                    onClick={() => changeTab("/showtimes")}
                    className="hidden xl:block my-4 ml-1 border-emerald-400 border-r-2 p-4 text-sm font-bold uppercase rounded-s-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300 outline-none"
                    type='submit'
                  >
                    Mua Vé
                  </button>
                  <Popover.Button className="my-4 p-4 text-sm font-bold uppercase rounded-2xl xl:rounded-s-none hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300 outline-none "
                  >
                    Đăng Nhập
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      className="absolute top-full right-0 z-10 max-w-md overflow-hidden bg-cyan-950 rounded-md">
                      <div className="px-6 py-4 backdrop-blur-sm relative">
                        <form action="">
                          <div className="relative my-2">
                            <input onChange={e => useUserName(e.target.value)} className="block w-72 py-2.5 px-0 text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                            <label htmlFor="" className="absolute text-xl text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                            >
                              User Name
                            </label>
                          </div>
                          <div className="relative my-2">
                            <input
                              type={isShowPassword === true ? "text" : "password"}
                              onChange={e => usePassword(e.target.value)}
                              className="block w-72 py-2.5 px-0 text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                              placeholder=""
                            />
                            <div onClick={() => setIsShowPassword(!isShowPassword)}>
                              {
                                isShowPassword === false ?
                                  <EyeSlashIcon
                                    className='h-6 w-6 text-white absolute right-0 top-5'
                                  />
                                  : <EyeIcon
                                    className='h-6 w-6 text-white absolute right-0 top-5'
                                  />
                              }
                            </div>
                            <label htmlFor="" className="absolute text-xl text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                            >
                              Password
                            </label>
                          </div>
                          <div className="flex justify-between mt-4 items-center">
                            <button onClick={handleSubmit} className="w-1/2 text-[18px] rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600 py-2 transition-colors duration-300" type='submit'
                            >
                              {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                              &nbsp;Đăng nhập
                            </button>
                            <a onClick={handleToggle}>Quên mật khẩu</a>
                          </div>
                          <button onClick={() => { changeTab('/signup') }} className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600 py-2 transition-colors duration-300" type='submit'
                          >
                            Đăng ký thành viên
                          </button>
                        </form>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
                : <div>
                  <span
                    className="cursor-pointer border-emerald-400 border-r-2 pr-2 font-bold uppercase hover:text-emerald-800 text-white"
                    onClick={() => { changeTab('/user/info') }}
                  >
                    {user.credentialId}
                  </span>
                  <button
                    onClick={handleLogoutApi}
                    className="ml-2 p-2 text-sm font-bold uppercase rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300"
                    type='submit'
                  >
                    {loading && <FontAwesomeIcon className='w-4 h-4' icon={faSpinner} spin />}
                    &nbsp;Đăng xuất
                  </button>
                </div>
            }
            {toggle &&
              <div className='absolute z-50 -left-80 top-20 bg-slate-200 p-4 rounded-md w-96'>
                <h3 className='text-2xl text-gray-900 font-bold'>Quên mật khẩu</h3>
                <label
                  htmlFor=""
                  className="block text-lg pb-2 font-light leading-6 text-gray-900"
                >
                  Vui lòng nhập email tài khoản để xác thực
                </label>
                <input
                  // value={account.email}
                  onChange={e => { setEmail(e.target.value) }}
                  type="email"
                  className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  placeholder="Email  "
                />
                <div className='flex justify-end'>
                  <button
                    className="w-1/2 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                    &nbsp;Xác thực
                  </button>
                </div>
              </div>
            }
          </Popover>
          <div className="absolute right-6 top-7 lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen && <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <Dialog as="div" className="lg:hidden z-10" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#312b2b] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="" className="-mt-1">
              <span className="sr-only">Your Company</span>
              <img className="h-[60px] w-auto" src={logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root pt-8">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-10">
                <div className='relative mr-2'>
                  <div className=''>
                    <input
                      onChange={(e) => handleChange(e.target.value)}
                      className='h-10 w-full rounded-2xl px-4 text-black focus:outline-none'
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      value={inputSearch}
                      placeholder='Tìm kiếm' />
                  </div>
                  <button
                    className='absolute right-0 top-0 m-3'>
                    <MagnifyingGlassIcon
                      onClick={() => changeTab(`/tim-kiem/${inputSearch}`)}
                      className="h-5 w-5 text-gray-400" />
                  </button>
                  {showMovieList && listMovieFound.length !== 0 &&
                    <div className='absolute left-0 bg-slate-100 w-[100%] mt-2 p-4 rounded-lg'>
                      {listMovieFound.map(movie => (
                        <div className='text-gray-900 hover:bg-slate-300 hover:rounded-md'>
                          <div onClick={() => changeTab(`/movie/${movie.movieId}`)} className='flex p-2 items-end'>
                            <img className="h-10 w-8 text-emerald-600" src={movie.poster} alt="" />
                            <span className='text-lg font-semibold px-4 items-center'>{movie.title}</span>
                          </div>
                        </div>
                      ))

                      }
                    </div>
                  }
                </div>
                <ul className="text-white">
                  <li onClick={() => changeTab("/phim")} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100'>
                    <a className={`${currentTab === '1' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Phim
                    </a>
                  </li>
                  <li onClick={() => changeTab("/showtimes")} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100'>
                    <a className={`${currentTab === '2' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Lịch Chiếu
                    </a>
                  </li>
                  <li onClick={() => changeTab("/rap")} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100'>
                    <a className={`${currentTab === '3' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Hệ thống rạp
                    </a>
                  </li>
                  <li onClick={() => changeTab("/khuyenmai")} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100'>
                    <a className={`${currentTab === '4' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Khuyến mãi
                    </a>
                  </li>
                  <li onClick={() => changeTab("/lienhe")} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100'>
                    <a className={`${currentTab === '5' ? "active" : ""} text-sm xl:text-lg font-bold uppercase option-style`}>
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>

              <div className="py-6">

                {
                  user && user.auth === false ?
                    <button onClick={() => { changeTab('/signup') }} className="w-full mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600 py-2 transition-colors duration-300" type='submit'
                    >
                      Đăng ký thành viên
                    </button>
                    : <div className='flex justify-center items-center'>
                      <span
                        className="border-emerald-400 border-r-2 pr-2 font-bold uppercase hover:text-emerald-800 text-white"
                        onClick={() => { changeTab('/user/info') }}
                      >
                        {user.credentialId}
                      </span>
                      <button
                        onClick={handleLogoutApi}
                        className="ml-2 p-2 text-sm font-bold uppercase rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300"
                        type='submit'
                      >
                        {loading && <FontAwesomeIcon className='w-4 h-4' icon={faSpinner} spin />}
                        &nbsp;Đăng xuất
                      </button>
                    </div>
                }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header >
  )
}

export default Header;