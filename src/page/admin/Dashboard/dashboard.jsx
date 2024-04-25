import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UsersIcon, FilmIcon, Square3Stack3DIcon, BuildingLibraryIcon, ArrowPathIcon, TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent';
import Statistical from '../../../utils/Statistical';
import PieChart from '../../../utils/PieChart'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useLoadingState from '../../../hook/UseLoadingState'

import AdminService from '../../../service/AdminService';
import ManagerService from '../../../service/ManagerService';
import MovieService from '../../../service/MovieService';
import CinemaService from '../../../service/CinemaService';
import FormatDataTime from '../../../utils/FormatDataTime';

import { LoginContext } from '../../../context/LoginContext';

import Loading from '../../../components/Loading';
import YearPicker from '../../../components/YearPicker';
const Dashboard = () => {
  const { loading, setLoading } = useLoadingState(false);
  const [loading1, setLoading1] = useState(false);
  const { user } = useContext(LoginContext);
  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const { GetAllMovieApi } = MovieService()
  const { getAllCinemaApi } = CinemaService()
  const { getAllUserApi, getAllShowtimeApi, getTotalRevenueApi, totalRevenueOfYearApi, totalRevenueOfCinema, totalTicketByCinemaApi } = AdminService()
  const { getAllShowtimeByManagerApi, getTotalRevenueOfManagerApi, getRevenueYearApi } = ManagerService()

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
  const [revenueByYear, setRevenueByYear] = useState([])
  const [ticketByYear, setTicketByYear] = useState([])
  const [revenueOfCinema, setRevenueOfCinema] = useState([])

  const [statistical, setStatistical] = useState({
    qRevenue: "",
    qMovieOfMonth: "",
    qCinema: "",
    qUser: ""
  })

  const listStatistical = [
    { title: "Thống kê tổng doanh thu", quantity: statistical.qRevenue || "0", icon: Square3Stack3DIcon },
    { title: "Phim trong tháng", quantity: statistical.qMovieOfMonth || "0", icon: FilmIcon },
    { title: "Hệ thống rạp", quantity: statistical.qCinema || "0", icon: BuildingLibraryIcon },
    { title: "Thống kê số lượng người dùng", quantity: statistical.qUser || "0", icon: UsersIcon }
  ]

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
      listCinema: extendedCinema.sort((a, b) => b.revenue - a.revenue).slice(0, 5),
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
      listMovie: allMovie.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 5)
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

  const handleGetAllItem = async () => {
    let resTotalRevenue = (user.role === "MANAGER") ?
      await getTotalRevenueOfManagerApi() : await getTotalRevenueApi()
    let resMovie = await GetAllMovieApi()
    if (resMovie && resMovie.data && resMovie.data.result && resMovie.data.result.content) {
      const updatedMovies = resMovie.data.result.content.map((movie) => ({
        ...movie,
        rating: movie.rating === "null" ? "0" : movie.rating,
      }));

      setAllMovie(updatedMovies);
    }

    let resCinema = await getAllCinemaApi()
    if (resCinema && resCinema.data && resCinema.data.result && resCinema.data.result.content) {
      setAllCinema(resCinema.data.result.content)
    }

    let resUser = (user.role === "ADMIN") && await getAllUserApi()
    if (resUser && resUser.data && resUser.data.result && resUser.data.result.content) {
      const lastFourUsers = resUser.data.result.content.slice().reverse().slice(0, 5);
      setAllUser(lastFourUsers)
    }

    let resShowtime = (user.role === "ADMIN") ?
      await getAllShowtimeApi() : await getAllShowtimeByManagerApi()

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const totalMovies = resShowtime.data.result.content.filter((showtime) => {
      const startTime = new Date(showtime.timeStart);
      const endTime = new Date(showtime.timeEnd);

      const isShowtimeInCurrentMonth =
        (startTime < endTime) &&
        (
          (startTime.getFullYear() < currentYear || (startTime.getFullYear() === currentYear && startTime.getMonth() + 1 <= currentMonth)) &&
          (endTime.getFullYear() > currentYear || (endTime.getFullYear() === currentYear && endTime.getMonth() + 1 >= currentMonth))
        );

      return isShowtimeInCurrentMonth;
    }).length;

    (user.role === "ADMIN") ?
      setStatistical({ ...statistical, qRevenue: resTotalRevenue.data.result, qMovieOfMonth: totalMovies, qCinema: resCinema.data.result.totalElements, qUser: resUser.data.result.totalElements })
      :
      setStatistical({ ...statistical, qRevenue: resTotalRevenue.data.result, qMovieOfMonth: totalMovies, qCinema: resCinema.data.result.totalElements })
    // setStatistical({...statistical})

    let resRevenueOfManager = (user.role === "ADMIN") && await totalRevenueOfCinema()
    if (resRevenueOfManager && resRevenueOfManager.data && resRevenueOfManager.data && resRevenueOfManager.data.result) {
      setRevenueOfCinema(resRevenueOfManager.data.result)
    }

    setLoading1(false)
  }

  const handleStatisticalOfYear = async (year) => {
    // Sử dụng tham số year nếu nó đã được truyền vào, nếu không thì sử dụng năm hiện tại
    const selectedYear = year || new Date().getFullYear();
    // setLoading('revenueYear', true);
    let resRevenue = (user.role === "ADMIN") ?
      await totalRevenueOfYearApi(selectedYear) :
      await getRevenueYearApi(selectedYear)
    // setLoading('revenueYear', false);

    if (resRevenue && resRevenue.data && resRevenue.data.result) {
      setRevenueByYear(resRevenue.data.result);
    }
    // setLoading('ticketYear', true);
    let resTicket = await totalTicketByCinemaApi(selectedYear);
    // setLoading('ticketYear', false);
    if (resTicket && resTicket.data && resTicket.data.result) {
      setTicketByYear(resTicket.data.result);
    }
  }
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearChange = (selectedYear) => {

    setSelectedYear(selectedYear);
  };

  useEffect(() => {
    setLoading1(true)
    handleGetAllItem()
  }, []);

  useEffect(() => {
    handleStatisticalOfYear(selectedYear)
    // setRevenueByYear([])
  }, [selectedYear]);

  // Hàm tạo mảng màu dựa trên số lượng giá trị trong series
  const generateColors = (count) => {
    const defaultColors = ["#0000FF", "#FF0000"]; // Màu mặc định

    // Nếu có nhiều hơn 2 giá trị, tạo thêm màu ngẫu nhiên
    if (count > 2) {
      const additionalColors = Array.from({ length: count - 2 }, () => getRandomColor());
      return [...defaultColors, ...additionalColors];
    }

    return defaultColors;
  };
  // Hàm tạo màu ngẫu nhiên
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  let chartData = (user.role === "ADMIN") ?
    {
      type: "line",
      series: revenueByYear
    } :
    {
      type: "area",
      series: [
        {
          name: revenueByYear.name,
          data: revenueByYear.data,
        },
      ],
    };

  const chartConfig = {
    type: chartData.type,
    height: 300,
    series: chartData.series,
    options: {
      chart: {
        // toolbar: {
        // show: false,
        // },
      },
      // title: {
      //     show: "",
      // },
      // dataLabels: {
      //     enabled: false,
      // },
      colors: generateColors(revenueByYear.length), // Sử dụng hàm generateColors để tạo mảng màuF
      stroke: {
        lineCap: "round",
        curve: "straight",
      },
      // markers: {
      //     size: 0,
      // },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const namesArray = ticketByYear.map(item => item.name);
  const totalTicketArray = ticketByYear.map(item => item.totalTicket);

  const configPieChart = {
    type: "pie",
    width: 280,
    height: 280,
    series: totalTicketArray,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: generateColors(ticketByYear.length), // Sử dụng hàm generateColors để tạo mảng màuF,
      legend: {
        show: false,
      },
      labels: namesArray,
    },
  };

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
            loading1 ?
              <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                <Loading />
              </div> :
              <div className='grid grid-cols-4'>
                {
                  listStatistical.map((item) => (
                    <div className='px-3'>
                      <div className='mt-6 p-5 relative border-2 rounded-lg bg-slate-100'>
                        <span className='text-xs'>{item.title}</span>
                        <p className='pr-8 text-3xl font-semibold mt-2'>{format(item.quantity)}</p>
                        <item.icon className='h-8 w-8 absolute right-5 bottom-5 text-emerald-600' />
                      </div>
                    </div>
                  ))
                }

                <div className='flex col-span-4 relative'>
                  <div className={`${user.role === "ADMIN" ? "w-[55%]" : "w-full"} relative`}>
                    {revenueByYear.length === 0 &&
                      <div className='flex justify-center items-center absolute mx-auto w-full h-full top-0 ringht-[50%] z-50'>
                        {loading['revenueYear'] && <FontAwesomeIcon className='w-16 h-16 ' icon={faSpinner} spin />}
                      </div>}
                    <Statistical chartConfig={chartConfig} />
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

                </div>


                {
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

                }

              </div>
          }
        </div>
      </div>
    </div >
  )
}

export default Dashboard