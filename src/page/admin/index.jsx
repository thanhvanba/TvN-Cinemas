import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import logo from "../../images/logo.png"
import { UserCircleIcon as UserCircleIconSolid, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { Squares2X2Icon, UserCircleIcon as UserCircleIconOutline, FilmIcon, BuildingLibraryIcon, StarIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import './index.css'
import Dashboard from './Dashboard/dashboard'
import ListUser from './ListUser'
import ListCinema from './ListCinema'
import ListMovie from './ListMovie';
import ListShowtime from './ListShowtime';
import ListReview from './ListReview';

const Admin = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState('1');
  const changeTab = (pathname) => {
    navigate(pathname)
  }
  const items = [
    { content: "Dashboard", icon: Squares2X2Icon, path: "/admin/dashboard" },
    { content: "User", icon: UserCircleIconOutline, path: "/admin/list-user" },
    { content: "Showtimes", icon: CalendarDaysIcon, path: "/admin/list-showtime" },
    { content: "Movies", icon: FilmIcon, path: "/admin/list-movie" },
    { content: "Cinemas", icon: BuildingLibraryIcon, path: "/admin/list-cinemas" },
    { content: "Review", icon: StarIcon, path: "/admin/list-review" }
  ]
  const handleCheckPathname = (pathname) => {
    switch (pathname) {
      case "/admin/dashboard":
        setCurrentTab("1")
        break;
      case "/admin/list-user":
        setCurrentTab("2")
        break;
      case "/admin/list-showtime":
        setCurrentTab("3")
        break;
      case "/admin/list-movie":
        setCurrentTab("4")
        break;
      case "/admin/list-cinemas":
        setCurrentTab("5")
        break;
      case "/admin/list-review":
        setCurrentTab("6")
        break;
      default:
        setCurrentTab("1")
    }
  }

  useEffect(() => {
    handleCheckPathname(pathname)

  }, [pathname]);
  return (
    <div>
      {/* sidebar */}
      < div className='flex flex-col fixed top-0 bottom-0 right-0 left-0 max-w-xs shadow-right' >

        {/* logo */}
        <div className='flex items-center justify-center px-8 p-3 border-b-2' >
          <a onClick={() => { changeTab('/') }} href="" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-14 w-auto" src={logo} alt="" />
          </a>
        </div >

        {/* thong tin admin */}
        < div className='flex px-8 py-6 border-b-2' >
          {/* avatar */}
          <div div className='pr-4' >
            <UserCircleIconSolid className="h-12 w-12 text-emerald-600" />
          </div >
          <div>
            <p>
              <span>Xin chào</span>
              <br />
              <span className='text-lg text-cyan-600 font-bold'>Thành Văn</span>
            </p>
          </div>
          {/* logout */}
          <button className='ml-auto bg-slate-200 h-10 w-10 rounded-xl flex justify-center items-center'>
            <ArrowRightOnRectangleIcon className="h-6 w-6 text-emerald-600" />
          </button>
        </div >

        {/* sidebar_nav */}
        <ul ul className='flex flex-col p-8' >
          {
            items.map((item) => (
              <li className='mb-2'>
                {/* {key = index} */}
                <a onClick={() => changeTab(item.path)} className='font-semibold text-lg flex items-center h-10'>
                  <item.icon className='h-6 w-6 mr-4 text-emerald-600' />
                  {item.content}
                </a>
              </li>
            ))
          }
        </ul >

        {/* thongtin rạp */}
        < div className='mt-auto text-xs text-center' >
          T&N Cinemas - Nơi Hòa Quyện Giấc Mơ!
        </div >

      </div >

      {/* main */}
      < div className='pr-4 pb-10 pl-[336px]'>
        <div style={{ display: currentTab === '1' ? 'block' : 'none' }} >
          <Dashboard />
        </div>
        <div style={{ display: currentTab === '2' ? 'block' : 'none' }} >
          <ListUser />
        </div>
        <div style={{ display: currentTab === '3' ? 'block' : 'none' }}>
          <ListShowtime />
        </div>
        <div style={{ display: currentTab === '4' ? 'block' : 'none' }}>
          <ListMovie />
        </div>
        <div style={{ display: currentTab === '5' ? 'block' : 'none' }} >
          <ListCinema />
        </div>
        <div style={{ display: currentTab === '6' ? 'block' : 'none' }}>
          <ListReview />
        </div>
      </div >
    </div>
  )
}

export default Admin
