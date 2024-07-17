import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UsersIcon, FilmIcon, Square3Stack3DIcon, BuildingLibraryIcon, ArrowPathIcon, TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent';
import useLoadingState from '../../../hook/UseLoadingState'

import AdminService from '../../../service/AdminService';
import ManagerService from '../../../service/ManagerService';
import MovieService from '../../../service/MovieService';
import CinemaService from '../../../service/CinemaService';
import FormatDataTime from '../../../utils/FormatDataTime';

import { LoginContext } from '../../../context/LoginContext';
import Loading from '../../../components/Loading';
import YearPicker from '../../../components/YearPicker';
import CardItem from './components/cardItem';
import RevenueStatistics from './components/revenueStatistics';
import PieChart from './components/pieChart'
import ApexChart from './components/TextStatistic';
import OptionsStatistics from './components/optionsStatistics';
import SelectMenu from '../../../components/SelectMenu/SelectMenu';
import ColumnChart from './components/columnChart';
import BarChart from './components/barChart';
import RevenueCinema from './RevenueCinema/revenueCinema';

import { ListDayOfMonth } from '../../../utils/ListDayOfMonth';
import { Squares2X2Icon } from '@heroicons/react/20/solid';
import TopCinemaChart from './components/topCinemaChart';

const Dashboard = () => {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('TOP 5');
  const [selected1, setSelected1] = useState('TOP 5');
  const { user } = useContext(LoginContext);

  const { GetAllMovieApi } = MovieService()
  const { getAllCinemaApi } = CinemaService()
  const { getAllShowtimeApi, getTotalRevenueApi, totalRevenueOfYearApi, totalRevenueOfCinema, totalTicketByCinemaApi, getStatisticsOverviewApi, getTopUsersApi, getTopMovieRatingApi, getFinanceAllCinemaApi, getDetailFinanceApi, getTopCinemaApi } = AdminService()
  const { getAllShowtimeByManagerApi, getTotalRevenueOfManagerApi, getRevenueYearApi, getTopUsersManagerApi } = ManagerService()

  const [allMovie, setAllMovie] = useState([])
  const [allCinema, setAllCinema] = useState([{
    location: "",
    cinemaName: "",
    desc: "",
    status: true,
    urlLocation: null,
    revenue: ""
  }])
  const [allUser, setAllUser] = useState([])

  const [ticketByYear, setTicketByYear] = useState([])
  const [revenueOfCinema, setRevenueOfCinema] = useState([])


  const [statistical, setStatistical] = useState({
    qRevenue: "",
    qMovieOfMonth: "",
    qCinema: "",
    qUser: ""
  })

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth() + 1);
  const [selectedOptions, setSelectedOptions] = useState(1);
  const [toggleStatic, setToggleStatic] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState()
  const [topUsers, setTopUsers] = useState()
  const [topMovies, setTopMovies] = useState()
  const [topCinema, setTopCinema] = useState()
  console.log("🚀 ~ Dashboard ~ topCinema:", topCinema)
  // //Test

  const getTotalByName = (name) => {
    const cinema = revenueOfCinema.find(item => item.name === name);
    return cinema ? cinema.total : 0;
  };
  const extendedCinema = allCinema.map(cinema => ({
    ...cinema,
    revenue: getTotalByName(cinema.cinemaName)
  }));

  const listTable = [
    {
      title: "Cinema ratings",
      icon: TrophyIcon,
      header: { stth: "STT", cinemah: "Rạp", addessh: "Địa chỉ", revenueh: "Doanh thu" },
      path: "/admin/list-cinemas",
      listUser: [],
      listCinema: extendedCinema.sort((a, b) => b.revenue - a.revenue)?.slice(0, 5),
      listMovie: [],
      listReview: []
    },
    {
      title: "Hot movies",
      icon: FireIcon,
      header: { stth: "STT", cinemah: "Tên phim", addessh: "Ngày phát hành", revenueh: "rating" },
      path: "/admin/list-movie",
      listUser: [],
      listCinema: [],
      listReview: [],
      listMovie: allMovie.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))?.slice(0, 5)
    },
    {
      title: "Lastest Users",
      icon: UsersIcon,
      header: { stth: "STT", cinemah: "Họ tên", addessh: "User Name", revenueh: "Role" },
      path: "/admin/list-user",
      listUser: allUser,
      listCinema: [],
      listMovie: [],
      listReview: []
    },
  ]

  const handleToggle = () => {
    setToggleStatic(!toggleStatic)
  }
  const handleGetAllItem = async () => {

    setLoading(true)
    let resOverview = await getStatisticsOverviewApi()
    if (resOverview && resOverview.data && resOverview.data.result) {
      setStatistical(resOverview.data.result)
    }
    setLoading(false)
  }

  const handleStatistic = async () => {
    setLoading(true)

    let params = selectedOptions === 1 ? { year: selectedYear } : { year: selectedYear, month: selectedMonth }
    let resTotalRevenue = user.role === 'ADMIN' ? await getTotalRevenueApi(params) : await getTotalRevenueOfManagerApi(params)
    if (resTotalRevenue && resTotalRevenue.data && resTotalRevenue.data.result) {
      setTotalRevenue(resTotalRevenue.data.result)
    }

    if (user.role === 'ADMIN') {
      let updatedParams = { ...params }
      updatedParams.isTicket = true
      let resTicket = await getTotalRevenueApi(updatedParams);
      if (resTicket && resTicket.data && resTicket.data.result) {
        setTicketByYear(resTicket.data.result);
      }
    }

    setLoading(false)
  }

  const handleStatisticTopUsers = async () => {
    let paramsTopUser = { top: typeof selected === 'number' ? selected : 5 }
    let updatedParams = { ...paramsTopUser }
    user.role === 'MANAGER' && (updatedParams.isStaff = true)
    let resTopUsers = user.role === 'ADMIN' ? await getTopUsersApi(paramsTopUser) : await getTopUsersManagerApi(updatedParams)
    if (resTopUsers && resTopUsers.data && resTopUsers.data.result) {
      setTopUsers(resTopUsers.data.result)
    }
  }

  const handleStatisticTopMovies = async () => {
    let paramsTopMovie = { top: typeof selected1 === 'number' ? selected1 : 5 }
    let resTopMovies = await getTopMovieRatingApi(paramsTopMovie)
    if (resTopMovies && resTopMovies.data && resTopMovies.data.result) {
      setTopMovies(resTopMovies.data.result)
    }
  }

  const handleStatisticTopCinema = async () => {
    let resTopMovies = await getTopCinemaApi()
    if (resTopMovies && resTopMovies.data && resTopMovies.data.result) {
      setTopCinema(resTopMovies.data.result)
    }
  }

  useEffect(() => {
    user.role === 'ADMIN' && handleGetAllItem()
    user.role === 'ADMIN' && handleStatisticTopCinema()
  }, []);

  useEffect(() => {
    handleStatisticTopUsers()
  }, [selected]);

  useEffect(() => {
    user.role === 'ADMIN' && handleStatisticTopMovies()
  }, [selected1]);

  useEffect(() => {
    handleStatistic()
  }, [toggleStatic]);

  const handleSelectChange = (selected) => {
    setSelected(parseInt(selected.split(" ")[1]));
  };
  const handleSelectChange1 = (selected1) => {
    setSelected1(parseInt(selected1.split(" ")[1]));
  };
  const options = ["Top 5", "Top 10"]
  const namesArray = ticketByYear.map(item => item.name);
  const totalTicketArray = ticketByYear.map(item => item.totalTicket);

  const categoriesArr = selectedOptions === 1 ? ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'] : ListDayOfMonth(selectedYear, selectedMonth)

  return (
    <div>
      <div className='px-4'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
          <h2 className='text-3xl flex items-center'>
            <Squares2X2Icon className='h-10 w-10 mr-1 text-emerald-600' />
            Dashboard
          </h2>
        </div>

        <div className='relative'>
          {
            loading ?
              <div className='flex justify-center absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                <Loading />
              </div> :
              <div className='grid grid-cols-4'>
                {user.role === 'ADMIN' ? <CardItem statistical={statistical} /> : <RevenueCinema />}

                {!(/^\/(admin\/finance\/cinema)/.test(pathname)) ?
                  <div className='col-span-4'>
                    {user.role === "ADMIN" &&
                      <>
                        <div className='pb-4 border-2 mx-3 mt-6'>
                          <h2 className='font-semibold text-3xl text-center uppercase pt-3'>Thống kê doanh thu, vé bán tất cả rạp</h2>
                          <div className='col-span-4 px-3 mt-4'>
                            <OptionsStatistics selectedMonth={selectedMonth} selectedYear={selectedYear} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} handleStatistic={handleToggle} />
                          </div>

                          <div className='flex'>
                            <div className={`${user.role === "ADMIN" ? "w-[55%]" : "w-full"} mt-6 relative px-3`}>
                              <div className='p-5 border-2 rounded-lg bg-slate-100'>
                                <div className='w-full relative'>
                                  <ApexChart revenueByYear={totalRevenue} categoriesArr={categoriesArr} />
                                </div>
                              </div>
                            </div>

                            <div className={`${user.role === "ADMIN" ? "w-[45%]" : ""} mt-6 relative px-3`}>
                              {user.role === "ADMIN" &&
                                <div className='p-2 pt-5 border-2 rounded-lg bg-slate-100'>
                                  <div className='w-full relative'>
                                    <PieChart seriesArr={totalTicketArray} labelsArr={namesArray} />
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>


                        <div className='p-4 border-2 mx-3 mt-6'>
                          <h2 className='font-semibold text-3xl text-center uppercase pt-3'>
                            Top doanh thu theo rạp
                          </h2>
                          <TopCinemaChart
                            seriesArr={[
                              {
                                name: 'Tổng tiền (VNĐ)',
                                data: topCinema?.revenue
                              }
                            ]}
                            categoriesArr={topCinema?.cinemaNames}
                          />
                        </div>

                        <div className='p-4 border-2 mx-3 mt-6'>
                          <h2 className='font-semibold text-3xl text-center uppercase pt-3'>Top phim đánh giá cao nhất</h2>
                          <div className='border-2 p-2 rounded-lg focus:outline-none bg-white w-32'>
                            <SelectMenu onSelectChange={handleSelectChange1} items={options} content={selected1 || `Top 5`} />
                          </div>
                          <BarChart
                            seriesData={[
                              {
                                name: 'Đánh giá(sao)',
                                data: topMovies?.data
                              },
                            ]}
                            categories={topMovies?.movie}
                          />
                        </div>
                      </>
                    }
                    <div className='p-4 border-2 mx-3 mt-6'>
                      <h2 className='font-semibold text-3xl text-center uppercase pt-3'>
                        {user.role === "ADMIN" ?
                          <span> Top khách hàng thân thiết nhất</span> :
                          <span> Top nhân viên xuất sắc nhất</span>
                        }
                      </h2>
                      <div className='border-2 p-2 rounded-lg focus:outline-none bg-white w-32'>
                        <SelectMenu onSelectChange={handleSelectChange} items={options} content={selected || `Top 5`} />
                      </div>
                      <ColumnChart
                        seriesArr={[
                          {
                            name: 'Tổng tiền (VNĐ)',
                            data: topUsers?.money
                          },
                          {
                            name: 'Số vé',
                            data: topUsers?.ticket
                          }
                        ]}
                        categoriesArr={topUsers?.name}
                      />
                    </div>
                  </div> :
                  <RevenueCinema />
                }
              </div>
          }
        </div>
      </div>
    </div >
  )
}

export default Dashboard