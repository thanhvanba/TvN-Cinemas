import React from 'react'
import { useState, useEffect, useContext } from 'react'
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
import AddItem from './AddItem';
import AddMovie from './AddMovie';
import AddShowtime from './AddShowtime';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AuthService from '../../service/AuthService'
import { LoginContext } from '../../context/LoginContext'

const Admin = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState('1');
  const changeTab = (pathname) => {
    navigate(pathname)
  }
  const items = [
    { content: "Dashboard", icon: Squares2X2Icon, path: "dashboard" },
    { content: "User", icon: UserCircleIconOutline, path: "list-user" },
    { content: "Showtimes", icon: CalendarDaysIcon, path: "list-showtime" },
    { content: "Movies", icon: FilmIcon, path: "list-movie" },
    { content: "Cinemas", icon: BuildingLibraryIcon, path: "list-cinemas" },
    { content: "Review", icon: StarIcon, path: "list-review" }
  ]
  const handleCheckPathname = (pathname) => {
    switch (pathname) {
      case "/admin/add-item":
        setCurrentTab("2")
        break
      case "/admin/add-item/movie":
        setCurrentTab("3")
        break
      case "/admin/add-item/showtime":
        setCurrentTab("4")
        break
      default:
        setCurrentTab("1")
    }
  }

  const { logoutApi } = AuthService();
  const { user } = useContext(LoginContext);

  const handleLogoutApi = async (e) => {
    e.preventDefault();
    await logoutApi()
  }
  useEffect(() => {
    handleCheckPathname(pathname)
  }, [pathname]);
  return (
    <div>
      <Tabs>
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
                <span className='text-lg text-cyan-600 font-bold'>{user.credentialId}</span>
              </p>
            </div>
            {/* logout */}
            <button onClick={handleLogoutApi} className='ml-auto bg-slate-200 h-10 w-10 rounded-xl flex justify-center items-center'>
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-emerald-600" />
            </button>
          </div >

          {/* sidebar_nav */}

          <TabList>
            <ul className='flex flex-col p-8' >
              {
                items.map((item) => (
                  <Tab>
                    <li onClick={() => changeTab(`/admin/${item.path}`)} className='mb-2'>
                      {/* {key = index} */}
                      <a className='font-semibold text-lg flex items-center h-10'>
                        <item.icon className='h-6 w-6 mr-4 text-emerald-600' />
                        {item.content}
                      </a>
                    </li>
                  </Tab>
                ))
              }
            </ul >
          </TabList>


          {/* thongtin rạp */}
          < div className='mt-auto text-xs text-center mb-6 font-bold text-emerald-600' >
            T&N Cinemas - Nơi Hòa Quyện Giấc Mơ!
          </div >

        </div >

        {/* main */}
        < div className='pr-4 pb-10 pl-[336px]'>
          <div style={{ display: currentTab === '1' ? 'block' : 'none' }} >
            <TabPanel>
              <Dashboard />
            </TabPanel>
            <TabPanel>
              <ListUser />
            </TabPanel>
            <TabPanel>
              <ListShowtime />
            </TabPanel>
            <TabPanel>
              <ListMovie />
            </TabPanel>
            <TabPanel>
              <ListCinema />
            </TabPanel>
            <TabPanel>
              <ListReview />
            </TabPanel>
          </div>
          <div style={{ display: currentTab === '2' ? 'block' : 'none' }}>
            <AddItem />
          </div>
          <div style={{ display: currentTab === '3' ? 'block' : 'none' }}>
            <AddMovie />
          </div>
          <div style={{ display: currentTab === '4' ? 'block' : 'none' }}>
            <AddShowtime />
          </div>
        </div >


      </Tabs>
    </div>
  )
}

export default Admin
