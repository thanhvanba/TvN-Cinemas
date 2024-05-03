import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import logo from "../../images/logo.png"
import { UserCircleIcon as UserCircleIconSolid, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { Squares2X2Icon, UserCircleIcon as UserCircleIconOutline, FilmIcon, BuildingLibraryIcon, StarIcon, CalendarDaysIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import Dashboard from './Dashboard/dashboard'
import ListUser from './ListUser'
import ListMovie from './ListMovie';
import ListShowtime from './ListShowtime';
import ListReview from './ListReview';
import Info from '../Info';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//  import 'react-tabs/style/react-tabs.css';
import './index.css'
import AuthService from '../../service/AuthService'
import { LoginContext } from '../../context/LoginContext'
// import DetailShowtime from './ListShowtime/components/detailShowtime';
import ListProduct from './ListProduct';
import ProfileDetail from '../Info/components/profileDetail';
import ListTicket from './ListTicket';
import UserService from '../../service/UserService';

const Admin = () => {
  const { item } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { user } = useContext(LoginContext);
  const [currentTab, setCurrentTab] = useState('1');
  const [tabIndex, setTabIndex] = useState(0);
  const changeTab = (pathname) => {
    navigate(pathname)
  }
  const [show, setShow] = useState(false);

  const showService = () => {
    setShow(!show)
  }

  const { logoutApi } = AuthService();

  const { getUserInfoApi } = UserService()
  const items = user.role === "ADMIN" ?
    [
      { content: "Phim", icon: FilmIcon, path: "list-movie" },
      { content: "Rạp", icon: CalendarDaysIcon, path: user.role === "ADMIN" ? "list-cinema" : "list-showtime" },
      { content: "Sản phẩm - Khác", icon: StarIcon, path: "list-food" },
      { content: "Vé", icon: StarIcon, path: "list-ticket" },
      { content: "Nhân sự - Người Dùng", icon: UserCircleIconOutline, path: "list-personnel" },
      { content: "Khách hàng - Rạp", icon: BuildingLibraryIcon, path: "list-viewer" },
      { content: "Đánh giá", icon: StarIcon, path: "list-review" },
    ]
    : [
      { content: "Phim", icon: FilmIcon, path: "list-movie" },
      { content: "Rạp", icon: CalendarDaysIcon, path: user.role === "ADMIN" ? "list-cinema" : "list-showtime" },
      { content: "Sản phẩm - Khác", icon: StarIcon, path: "list-food" },
      { content: "Vé", icon: StarIcon, path: "list-ticket" },
      { content: "Nhân sự - Người Dùng", icon: UserCircleIconOutline, path: "list-personnel" },
    ]
  const handleCheckPathname = (pathname) => {
    switch (true) {
      case pathname === "/admin/info":
        setCurrentTab("2");
        break;
      case /^\/admin\/update-item\/user/.test(pathname):
        setCurrentTab("3");
        setTabIndex(tabIndex);
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

    /^\/(admin|manager)\/(add-item\/movie|update-item\/movie|list-movie)/.test(pathname) &&
      setTabIndex(0);

    /^\/(admin|manager)\/(add-item\/(cinema|showtime|room|schedule)|update-item\/(cinema|showtime|room)|list-cinema|list-room|room|cinema|list-showtime)/.test(pathname) &&
      setTabIndex(1);

    /^\/(admin|manager)\/(add-item\/food|update-item\/food|list-food)/.test(pathname) &&
      setTabIndex(2);

    item === "list-ticket" &&
      setTabIndex(3);

    item === "list-personnel" &&
      setTabIndex(4);

    item === "list-viewer" &&
      setTabIndex(5);

    item === "list-review" &&
      setTabIndex(6);

    if (item === "dashboard") {
      user.role === "ADMIN" ?
        setTabIndex(7) : setTabIndex(5);
    }
  };

  const handleGetItems = async () => {
    let resInfo = await getUserInfoApi()
    if (resInfo && resInfo.data && resInfo.data.result) {
      localStorage.setItem("cinemaId", resInfo.data.result.cinema.cinemaId)
    }
  }
  useEffect(() => {
    handleCheckPathname(pathname)
    handleTabChange()
    user.role === "MANAGER" && !localStorage.getItem("cinemaId") && handleGetItems()
  }, [pathname, item]);
  return (
    <div>
      <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
        {/* sidebar */}
        <div className='flex w-full justify-between pb-4'>
          <div className='flex flex-col'>
            < div className='fixed shadow-right h-screen bg-[#F8F4F3] w-1/5'>
              {/* logo */}
              <div className='flex items-center justify-center px-8 p-3 border-b-2 outline-none' >
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
                <ul className='flex flex-col p-8 overflow-y-auto max-h-[70vh]' >
                  {
                    items.map((item, index) => (
                      <Tab key={index}>
                        <li onClick={() => { (user.role === "ADMIN") ? changeTab(`/admin/${item.path}`) : changeTab(`/manager/${item.path}`) }}
                          className='mb-2'
                        >
                          {

                            <a className='font-semibold text-lg flex items-center h-10'>
                              <item.icon className='h-6 w-6 mr-4 text-emerald-600' />
                              {item.content}
                            </a>
                          }
                        </li>
                      </Tab>
                    ))
                  }
                  <Tab>
                    <li onClick={() => { (user.role === "ADMIN") ? changeTab(`/admin/dashboard`) : changeTab(`/manager/dashboard`) }}
                      className='mb-2'
                    >
                      <div className='flex items-center justify-between'>
                        <a className='font-semibold text-lg flex items-center h-10'>
                          <Squares2X2Icon className='h-6 w-6 mr-4 text-emerald-600' />
                          {"Thống kê"}
                        </a>
                        <div className='w-11 h-10 relative'>
                          <ChevronUpDownIcon onClick={showService} className='w-6 h-6 absolute top-1 left-2 font-normal' />
                        </div>
                      </div>
                    </li>
                  </Tab>
                  <ul className={`${show ? '' : 'hidden'} pb-[30px]`}>
                    <li className="pl-2">
                      <a href="/thiet-ke-thuong-hieu" className='pl-5 py-[5px] flex'>Thiết kế thương hiệu</a>
                    </li>
                    <li className="pl-2">
                      <a href="/thiet-ke-bao-bi" className='pl-5 py-[5px] flex'>Thiết kế bao bì</a>
                    </li>
                    <li className="pl-2">
                      <a href="/san-xuat-in-an" className='pl-5 py-[5px] flex'>In ấn sản xuất</a>
                    </li>
                  </ul>
                </ul >
              </TabList>


              {/* thongtin rạp */}
              < div className='absolute bottom-4 w-full text-xs text-center font-bold text-emerald-600' >
                T&N Cinemas - Nơi Hòa Quyện Giấc Mơ!
              </div >

            </div >
          </div>
          {/* main */}
          <div className='w-4/5'>
            {currentTab === '1' &&
              <div>
                <TabPanel>
                  <ListMovie />
                </TabPanel>
                <TabPanel>
                  <ListShowtime />
                </TabPanel>
                <TabPanel>
                  <ListProduct />
                </TabPanel>
                <TabPanel>
                  <ListTicket />
                </TabPanel>
                <TabPanel >
                  <ListUser />
                </TabPanel>
                {user.role === "ADMIN" &&
                  <>
                    <TabPanel>
                      <ListUser />
                    </TabPanel>
                    <TabPanel>
                      <ListReview />
                    </TabPanel>
                  </>
                }
                <TabPanel>
                  <Dashboard />
                </TabPanel>
              </div>
            }
            {currentTab === '2' &&
              <div>
                <div className=''>
                  <div className='h-20 mb-2 absolute flex items-center w-full border-b-2'>
                    <h2 className='text-3xl'>User Info</h2>
                  </div>
                  <Info />
                </div>
              </div>
            }
            {/* <div style={{ display: currentTab === '3' ? 'block' : 'none' }}>
              <div className=''>
                <div className='h-20 mb-2  flex items-center w-full border-b-2'>
                  <h2 className='text-3xl'>Update User</h2>
                </div>
                <div className='px-10'>
                  <ProfileDetail />
                </div>
              </div>
            </div> */}
          </div>

        </div>
      </Tabs >
    </div >
  )
}

export default Admin