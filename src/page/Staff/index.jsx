import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Header from './components/header'
import logo from "../../images/logo.png"
import UserService from '../../service/UserService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CalendarDaysIcon, FilmIcon } from '@heroicons/react/20/solid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ListTicket from '../admin/ListTicket';
import Loading from '../../components/Loading';
import MovieService from '../../service/MovieService';
import Pagination from '../../components/Pagination';

import slider2 from "../../images/slider.jpg"
import slider1 from "../../images/slider-1.jpg"
import slider3 from "../../images/slider-2.jpg"
import bg from "../../images/bg-cinema-10.png"
import background from "../../images/movie-details-bg.jpg"

import './index.css'
import SellTicket from './components/sellTicket';
import DetailSales from './components/detailSales';
import Info from '../Info';
import InfoTicket from './components/infoTicket';
import StaffService from '../../service/StaffService';
function Staff() {
    const { movieId } = useParams()
    const { getUserInfoApi } = UserService()
    const { NowPlayingMovieApi, GetAllMovieApi } = MovieService()
    const { getNowPlayingMovieStaffApi } = StaffService()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(false)
    const [nowPlayingMovie, setNowPlayMovie] = useState([])
    const handleTabChange = () => {
        /^\/staff\/sell-ticket/.test(pathname) &&
            setTabIndex(0);
        /^\/staff\/confirm-ticket/.test(pathname) &&
            setTabIndex(1);
    }
    const items = [
        { content: "Bán vé", icon: FilmIcon, path: "sell-ticket" },
        { content: "Xác nhận vé", icon: CalendarDaysIcon, path: "confirm-ticket" },
    ]
    const handleGetItems = async () => {
        setLoading(true)
        let resInfo = await getUserInfoApi()
        if (resInfo && resInfo.data && resInfo.data.result) {
            !localStorage.getItem("cinemaId") && localStorage.setItem("cinemaId", resInfo.data.result?.cinema?.cinemaId)
        }
        let resNowPlaying = await getNowPlayingMovieStaffApi()
        if (resNowPlaying && resNowPlaying.data && resNowPlaying.data.result) {
            setNowPlayMovie(resNowPlaying.data.result)
        }
        setLoading(false)
    }
    const IMAGES = [
        slider1, slider2, slider3
    ]
    useEffect(() => {
        handleTabChange()
    }, [pathname]);
    useEffect(() => {
        handleGetItems()
    }, []);
    return (
        <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
            <div className='flex w-full justify-between'>
                <div className='flex flex-col'>
                    <div className='bg-slate-100 h-screen fixed w-1/6 bg-cover'
                        style={{ backgroundImage: `url(${bg})` }}
                    >
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
                                            <li onClick={() => { changeTab(`/staff/${item.path}`) }}
                                                className='mb-2'
                                            >
                                                {
                                                    <a className='font-semibold text-lg flex items-center h-10 '>
                                                        <item.icon className='h-6 w-6 mr-4 text-emerald-600' />
                                                        <span className=''>{item.content}</span>
                                                    </a>
                                                }
                                            </li>
                                        </Tab>
                                    ))
                                }
                            </ul>
                        </TabList>
                        < div className='absolute bottom-4 w-full text-xs text-center font-bold text-emerald-600' >
                            T&N Cinemas - Nơi Hòa Quyện Giấc Mơ!
                        </div >
                    </div>
                </div>
                <div className='w-5/6 relative'>
                    <Header />
                    {/^\/staff\/info-ticket/.test(pathname) ?
                        <InfoTicket /> :
                        /^\/staff\/info/.test(pathname) ?
                            <div className='pt-20'>
                                <div className='px-4'>
                                    <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                                        <h2 className='text-3xl cursor-default'>Hồ sơ</h2>
                                    </div>
                                    <Info />
                                </div>
                            </div> :
                            <>
                                <div className='flex justify-center absolute mx-auto top-96 right-1/2 left-1/2 z-50'>
                                    {loading && <Loading />}
                                </div>
                                {
                                    !loading &&
                                    <div className='pt-20 relative'>
                                        <TabPanel style={{ backgroundImage: `url(${background})`, backgroundAttachment: "fixed" }}
                                            className="bg-slate-300 z-50 w-full"

                                        >
                                            <div className="absolute top-0 left-0 w-full h-full bg-slate-400 opacity-20"></div>

                                            {movieId ? <DetailSales /> : <SellTicket images={IMAGES} nowPlayingMovie={nowPlayingMovie} />}
                                        </TabPanel>
                                        <TabPanel>
                                            <ListTicket />
                                        </TabPanel>
                                    </div>
                                }
                            </>
                    }
                </div>
            </div>
        </Tabs >
    )
}

export default Staff
