import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import logo from "../../images/logo.png"
import { UserCircleIcon as UserCircleIconSolid, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { Squares2X2Icon, UserCircleIcon as UserCircleIconOutline, FilmIcon, BuildingLibraryIcon, StarIcon, CalendarDaysIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
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
import Header from '../Staff/components/header';
import UserService from '../../service/UserService';
import ListPromotion from './ListPromotion';
import AdminService from '../../service/AdminService';

const Admin = () => {
  const { item } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const { user } = useContext(LoginContext);
  const [currentTab, setCurrentTab] = useState('1');
  const [tabIndex, setTabIndex] = useState(0);
  const changeTab = (pathname) => {
    user.role === "ADMIN" && localStorage.getItem('cinemaId') && localStorage.removeItem('cinemaId')
    navigate(pathname)
    setShow(false)
  }
  const [allCinema, setAllCinema] = useState([])
  const [selectCinemaId, setSelectCinemaId] = useState('')

  const showService = () => {
    setShow(!show)
  }
  const { getAllShowtimeApi, getAllCinemaApi, deleteCinemaApi, changeStatusCinemaApi } = AdminService();
  const { logoutApi } = AuthService();

  const { getUserInfoApi } = UserService()
  const items = user.role === "ADMIN" ?
    [
      { content: "Phim", icon: FilmIcon, path: "list-movie" },
      { content: "Rạp", icon: CalendarDaysIcon, path: user.role === "ADMIN" ? "list-cinema" : "list-showtime" },
      { content: "Sản phẩm", icon: StarIcon, path: "list-food" },
      { content: "Vé", icon: StarIcon, path: "list-ticket" },
      { content: "Nhân sự", icon: UserCircleIconOutline, path: "list-personnel" },
      { content: "Khách hàng - Rạp", icon: BuildingLibraryIcon, path: "list-viewer" },
      { content: "Đánh giá", icon: StarIcon, path: "list-review" },
      { content: "Khuyến mãi", icon: StarIcon, path: "list-promotion" },
    ]
    : [
      { content: "Phim", icon: FilmIcon, path: "list-movie" },
      { content: "Lịch chiếu", icon: CalendarDaysIcon, path: user.role === "ADMIN" ? "list-cinema" : "list-showtime" },
      { content: "Sản phẩm", icon: StarIcon, path: "list-food" },
      { content: "Vé", icon: StarIcon, path: "list-ticket" },
      { content: "Nhân sự", icon: UserCircleIconOutline, path: "list-personnel" },
    ]
  const handleCheckPathname = (pathname) => {
    switch (true) {
      case (pathname === "/admin/info" || pathname === "/manager/info"):
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

    /^\/(admin|manager)\/(add-item\/promotion|update-item\/promotion|list-promotion|promotion)/.test(pathname) &&
      setTabIndex(7);
    if (item === "dashboard" || /^\/(admin)\/finance\/cinema/.test(pathname)) {
      user.role === "ADMIN" ?
        setTabIndex(8) : setTabIndex(5);
    }
  };

  const handleGetItems = async () => {
    let resInfo = await getUserInfoApi()
    if (resInfo && resInfo.data && resInfo.data.result) {
      user.role === "MANAGER" && !localStorage.getItem("cinemaId") && localStorage.setItem("cinemaId", resInfo.data.result.cinema.cinemaId)
    }

    let res = user.role === "ADMIN" ? await getAllCinemaApi(1, 999, true) : null;
    if (res && res.data && res.data.result && res.data.result.content) {
      setAllCinema(res.data.result.content)
    }
  }

  useEffect(() => {
    handleCheckPathname(pathname)
    handleTabChange()
    handleGetItems()
  }, [pathname, item]);
  return (
    <div>
      <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
        {/* sidebar */}
        <div className='flex w-full justify-between pb-4'>
          <div className='flex flex-col'>
            < div className='fixed shadow-right h-screen bg-gray-300 w-1/5'>
              {/* logo */}
              <div className='flex items-center justify-center px-8 p-3 border-b-2 outline-none' >
                <a onClick={() => { changeTab('/') }} href="" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-14 w-auto" src={logo} alt="" />
                </a>
              </div >

              <TabList>
                <ul className='flex flex-col p-8 overflow-y-auto max-h-[90vh]' >
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
                        {user.role === "ADMIN" &&
                          <div className='w-11 h-10 relative'>
                            <ChevronUpDownIcon onClick={(e) => { e.stopPropagation(); showService() }} className='w-6 h-6 absolute top-1 left-2 font-normal' />
                          </div>
                        }
                      </div>
                    </li>
                  </Tab>
                  <ul className={`${show ? '' : 'hidden'} pb-[30px]`}>
                    {allCinema &&
                      allCinema.map((item) => (
                        <li className={`${(localStorage.getItem('cinemaId') === item.cinemaId) ? 'text-emerald-600 font-semibold' : ''} pl-2 cursor-default`}>
                          <p onClick={() => {
                            localStorage.setItem("cinemaId", item.cinemaId)
                            navigate(`/admin/finance/cinema/${item.cinemaId}`)
                          }
                          } className='pl-5 py-[5px] flex'>{item.cinemaName}</p>
                        </li>
                      ))
                    }
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
            <Header />
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
                    <TabPanel>
                      <ListPromotion />
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
                <div className='px-4'>
                  <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl cursor-default'>Hồ sơ</h2>
                  </div>
                  <Info />
                </div>
              </div>
            }
            <div style={{ display: currentTab === '3' ? 'block' : 'none' }}>
              <div className=''>
                <div className='h-20 mb-2  flex items-center w-full border-b-2'>
                  <h2 className='text-3xl px-4'>Cập nhật thông tin</h2>
                </div>
                <div className='px-10'>
                  <ProfileDetail />
                </div>
              </div>
            </div>
          </div>

        </div>
      </Tabs >
    </div >
  )
}

export default Admin