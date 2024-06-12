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

const Dashboard = () => {
  // const { loading, setLoading } = useLoadingState(false);

  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('TOP 5');
  const [selected1, setSelected1] = useState('TOP 5');
  const { user } = useContext(LoginContext);
  // const navigate = useNavigate()
  // const changeTab = (pathname) => {
  //   navigate(pathname)
  // }

  const { GetAllMovieApi } = MovieService()
  const { getAllCinemaApi } = CinemaService()
  const { getAllUserApi, getAllShowtimeApi, getTotalRevenueApi, totalRevenueOfYearApi, totalRevenueOfCinema, totalTicketByCinemaApi, getStatisticsOverviewApi, getTopUsersApi, getTopMovieRatingApi, getFinanceAllCinemaApi, getDetailFinanceApi } = AdminService()
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
  // const [revenueByYear, setRevenueByYear] = useState([])

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

    console.log("VÀO ĐÂY")
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


  useEffect(() => {
    user.role === 'ADMIN' && handleGetAllItem()
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
          <h2 className='text-3xl'>Dashboard</h2>
          {
            user.role === "MANAGER" ?
              <button
                className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                onClick={() => changeTab("/admin/add-item/showtime")}
                type='button'
              >
                Add showtime
              </button> :
              <div></div>
          }
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

                    {user.role === "ADMIN" &&
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
                {/* <div className='flex col-span-4 relative'>
                  <div className={`${user.role === "ADMIN" ? "w-[55%]" : "w-full"} relative`}>
                    {revenueByYear.length === 0 &&
                      <div className='flex justify-center items-center absolute mx-auto w-full h-full top-0 ringht-[50%] z-50'>
                        {loading['revenueYear'] && <FontAwesomeIcon className='w-16 h-16 ' icon={faSpinner} spin />}
                      </div>}
                    <RevenueStatistics chartConfig={chartConfig} />
                  </div>

                  {user.role !== "MANAGER" &&
                    <div className='w-[45%] relative'>
                      {ticketByYear.length === 0 &&
                        <div className='flex justify-center items-center absolute mx-auto w-full h-full top-0 ringht-[50%] z-50'>
                          {loading['ticketYear'] && <FontAwesomeIcon className='w-16 h-16 ' icon={faSpinner} spin />}
                        </div>}
                      <PieChart configPieChart={configPieChart} />
                    </div>}

                  <div className='absolute top-4 right-4'>
                    <YearPicker onYearChange={handleYearChange} />
                  </div>

                </div> */}


                {/* {
                  listTable.map((table, index) => (
                    user.role === "MANAGER" && (index == 0 || index == 2) ? null :
                      <div div className='px-3 col-span-2' >
                        <div className='mt-6 border-2 rounded-lg bg-slate-100'>
                          <div className='p-5 flex justify-between border-b-2'>
                            <h3 className='flex items-center text-2xl font-semibold'>
                              <table.icon className='h-6 w-6 mr-3 text-emerald-600' />
                              {table.title}
                            </h3>
                            <div className='flex items-center'>
                              <a href=""><ArrowPathIcon className='h-4 w-4' /></a>
                              <a onClick={() => changeTab(table.path)} href="" className='ml-4 bg-slate-200 rounded-md px-2'>View All</a>
                            </div>
                          </div>
                          <div className='pt-8 pb-5'>
                            <div>
                              <table className='w-full'>
                                <thead className='border-b'>
                                  <tr>
                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{table.header.stth}</th>
                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{table.header.cinemah}</th>
                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{table.header.addessh}</th>
                                    <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{table.header.revenueh}</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {index == 0 &&
                                    // Rendering table.cinemaRatings
                                    table.listCinema.map((item, index) => (
                                      <tr key={`movie-${index}`}>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{index + 1}</td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'><TruncatedContent content={item.cinemaName} maxLength={15} /></td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'><TruncatedContent content={item.location} maxLength={18} /></td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{format(getTotalByName(item.cinemaName))}</td>
                                      </tr>
                                    ))
                                  }

                                  {index == 1 &&
                                    // Rendering table.listMovie
                                    table.listMovie.map((item, index) => (
                                      <tr key={`rating-${index}`}>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{index + 1}</td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'><TruncatedContent content={item.title} maxLength={15} /></td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{FormatDataTime(item.releaseDate).date}</td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{(item.rating === null) ? 0 : item.rating}</td>
                                      </tr>
                                    ))
                                  }

                                  {user.role === "ADMIN" && index == 2 &&
                                    // Rendering table.listUser
                                    table.listUser.map((item, index) => (
                                      <tr key={`rating-${index}`}>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{index + 1}</td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{item.fullName}</td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{item.userName}</td>
                                        <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{item.role.roleName}</td>
                                      </tr>
                                    ))
                                  }
                                </tbody>

                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))
                } */}

              </div>
          }
        </div>
      </div>
    </div >
  )
}

export default Dashboard