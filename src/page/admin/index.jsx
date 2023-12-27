import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
import ListOther from './ListOther';
import AddItem from './AddItem';
import AddMovie from './AddMovie';
import AddShowtime from './AddShowtime';
import Info from '../Info';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AuthService from '../../service/AuthService'
import { LoginContext } from '../../context/LoginContext'

const Admin = () => {
  const { item } = useParams()
  const { pathname } = useLocation()
  const { checkPath } = useLocation()
  const navigate = useNavigate()

  const { user } = useContext(LoginContext);
  const [currentTab, setCurrentTab] = useState(item || '1');
  const [tabIndex, setTabIndex] = useState(0);
  console.log("🚀 ~ file: index.jsx:34 ~ Admin ~ tabIndex:", tabIndex)
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const { logoutApi } = AuthService();
  const items = [
    { content: "Dashboard", icon: Squares2X2Icon, path: "dashboard" },
    { content: "User", icon: UserCircleIconOutline, path: "list-user" },
    { content: "Showtimes", icon: CalendarDaysIcon, path: "list-showtime" },
    { content: "Movies", icon: FilmIcon, path: "list-movie" },
    { content: "Cinemas", icon: BuildingLibraryIcon, path: "list-cinemas" },
    // { content: "Review", icon: StarIcon, path: "list-review" },
    { content: "Other", icon: StarIcon, path: "list-other" }
  ]
  const handleCheckPathname = (pathname) => {
    switch (true) {
      case /^\/admin\/(add-item\/food|update-item\/food|food)/.test(pathname):
      case /^\/admin\/(add-item\/cinema|update-item\/cinema|cinema)/.test(pathname):
      case /^\/admin\/(add-item\/room|update-item\/room|room)/.test(pathname):
        setCurrentTab("2");
        break;
      //case pathname === "/admin/add-item/movie":
      case /^\/admin\/(add-item\/movie|update-item\/movie|movie)/.test(pathname):
        setCurrentTab("3");
        break;
      case /^\/admin\/(add-item\/showtime|update-item\/showtime|showtime)/.test(pathname):
        setCurrentTab("4");
        break;
      case pathname === "/admin/info":
        setCurrentTab("5");
        break;
      default:
        setCurrentTab("1");
    }
  };

  const handleLogoutApi = async (e) => {
    e.preventDefault();
    await logoutApi()
  }

  const handleTabChange = () => {
    {
      item === "dashboard" &&
        setTabIndex(0);
    }
    {
      item === "list-user" &&
        setTabIndex(1);
    }
    {
      item === "list-showtime" &&
        setTabIndex(2);
    }
    {
      item === "list-movie" &&
        setTabIndex(3);
    }
    {
      item === "list-cinemas" &&
        setTabIndex(4);
    }
    // {
    //   item === "list-review" &&
    //     setTabIndex(5);
    // }
    {
      item === "list-other" &&
        setTabIndex(5);
    }
  };
  useEffect(() => {
    handleCheckPathname(pathname)
    handleTabChange()
  }, [pathname, item]);
  return (
    <div>
      <Tabs selectedIndex={tabIndex}>
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
            <div onClick={() => { changeTab('/admin/info') }} className='pr-4'>
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
                    {(user.role === "MANAGER") && (item.content === "User") ?
                      null :
                      <li onClick={() => { (user.role === "ADMIN") ? changeTab(`/admin/${item.path}`) : changeTab(`/manager/${item.path}`) }}
                        className='mb-2'
                      >
                        {/* {key = index} */}
                        {

                          <a className='font-semibold text-lg flex items-center h-10'>
                            <item.icon className='h-6 w-6 mr-4 text-emerald-600' />
                            {item.content}
                          </a>
                        }
                      </li>}
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
            <TabPanel >
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
            {/* <TabPanel>
              <ListReview />
            </TabPanel> */}
            <TabPanel>
              <ListOther />
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
          <div style={{ display: currentTab === '5' ? 'block' : 'none' }}>
            <div className=''>
              <div className='h-20 mb-2 absolute flex items-center w-full border-b-2'>
                <h2 className='text-3xl'>User Info</h2>
              </div>
              <Info />
            </div>
          </div>
        </div >


      </Tabs >
    </div >
  )
}

export default Admin