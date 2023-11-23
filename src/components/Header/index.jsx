import { Fragment, useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthService from '../../service/AuthService'
import { LoginContext } from '../../context/LoginContext'

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import logo from "../../images/logo.png"


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
  const [credentialId, useUserName] = useState('')
  const [password, usePassword] = useState('')
  const [currentTab, setCurrentTab] = useState('1');

  const [loading, setLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const { user } = useContext(LoginContext);

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
  }
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

  const handleCheckPathname = (pathname) => {
    switch (pathname) {
      case "/":
        setCurrentTab("1")
        break;
      case "/showtimes":
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
      default:
        setCurrentTab("1")
    }
  }

  useEffect(() => {
    handleCheckPathname(pathname)
  }, [pathname]);

  return (
    <header className="header">
      <div className='top-menu'>
        <div className='mx-auto flex max-w-7xl justify-between lg:px-8 top-menu-container'>
          <div className="flex lg:flex-auto">
            {/* logo */}
            <div className='flex items-center'>
              <a onClick={() => { changeTab('/') }} href="" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-[80px] w-auto" src={logo} alt="" />
              </a>
            </div>
            {/* Thanh điều hướng */}
            <nav className="mx-auto flex max-w-7xl justify-between lg:px-8">
              {/* <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div> */}
              <Popover.Group className="hidden lg:flex lg:gap-x-12">
                <ul className="hidden lg:flex">
                  {/* <li className='px-4 py-8 relative'>
                    <Popover>
                      <Popover.Button onClick={() => changeTab( "/")} className="flex">
                        <a href="#" className={`${currentTab === '1' ? "active" : ""} text-lg font-bold uppercase option-style`}>
                          Phim
                        </a>
                        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
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
                        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                          <div className="p-4">
                            {products.map((item) => (
                              <div
                                key={item.name}
                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                              >
                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                  <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                </div>
                                <div className="flex-auto">
                                  <a href={item.href} className="block font-semibold text-gray-900">
                                    {item.name}
                                    <span className="absolute inset-0" />
                                  </a>
                                  <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                            {callsToAction.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                              >
                                <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </li> */}
                  <li onClick={() => changeTab("/")} className='px-4 py-8 relative'>
                    <a href="#" className={`${currentTab === '1' ? "active" : ""} text-lg font-bold uppercase option-style`}>
                      Phim
                    </a>
                  </li>
                  <li onClick={() => changeTab("/showtimes")} className='px-4 py-8 relative'>
                    <a href="#" className={`${currentTab === '2' ? "active" : ""} text-lg font-bold uppercase option-style`}>
                      Lịch Chiếu
                    </a>
                  </li>
                  <li onClick={() => changeTab("/rap")} className='px-4 py-8 relative'>
                    <a href="#" className={`${currentTab === '3' ? "active" : ""} text-lg font-bold uppercase option-style`}>
                      Hệ thống rạp
                    </a>
                  </li>
                  <li onClick={() => changeTab("/khuyenmai")} className='px-4 py-8 relative'>
                    <a href="#" className={`${currentTab === '4' ? "active" : ""} text-lg font-bold uppercase option-style`}>
                      Khuyến mãi
                    </a>
                  </li>
                  <li onClick={() => changeTab("/lienhe")} className='px-4 py-8 relative'>
                    <a href="#" className={`${currentTab === '5' ? "active" : ""} text-lg font-bold uppercase option-style`}>
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </Popover.Group>
            </nav>
          </div>

          {/* Tìm kiếm, mua vé, đăng nhập */}
          <Popover className="flex items-center justify-center">
            {/* Tim kiem */}
            <div className='relative mr-2'>
              <div>
                <input className='h-10 rounded-2xl px-4 text-black' type="text" placeholder='Tìm kiếm' />
              </div>
              <a href="#" className='absolute right-0 top-0 m-3'>
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </a>
            </div>
            {
              user && user.auth === false
                ? <div>
                  <button
                    onClick={() => changeTab("/showtimes")}
                    className="my-4 ml-1 border-emerald-400 border-r-2 p-4 text-sm font-bold uppercase rounded-s-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300"
                    type='submit'
                  >
                    Mua Vé
                  </button>
                  <Popover.Button className="my-4 p-4 text-sm font-bold uppercase rounded-e-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300"
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
                      className="absolute top-full right-6 z-10 max-w-md overflow-hidden bg-cyan-950 rounded-md">
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
                            <a href="#">Quên mật khẩu</a>
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
                    className="border-emerald-400 border-r-2 pr-2 font-bold uppercase hover:text-emerald-800 text-white"
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

          </Popover>

          {/* <a href="" className='px-4 py-8 '>
              <UserIcon className="h-5 w-5 text-gray-400" />
            </a> */}

          {/* <a href="#" className="text-sm font-bold leading-6 text-slate-100">
              Log in <span aria-hidden="true">&rarr;</span>
            </a> */}

          {/* <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Disclosure as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-50">
                            Product
                            <ChevronDownIcon
                              className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {[...products, ...callsToAction].map((item) => (
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-50"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-50"
                    >
                      Marketplace
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-50"
                    >
                      Company
                    </a>
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-100 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog> */}
        </div>
      </div>





    </header >
  )
}

export default Header;