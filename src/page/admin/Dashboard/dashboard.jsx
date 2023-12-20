import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UsersIcon, FilmIcon, Square3Stack3DIcon, BuildingLibraryIcon, ArrowPathIcon, TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline'
import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent';

import AdminService from '../../../service/AdminService';
import ManagerService from '../../../service/ManagerService';
import MovieService from '../../../service/MovieService';
import CinemaService from '../../../service/CinemaService';

import { LoginContext } from '../../../context/LoginContext';
const Dashboard = () => {
  const { user } = useContext(LoginContext);
  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const { GetAllMovieApi } = MovieService()
  const { getAllCinemaApi } = CinemaService()
  const { getAllUserApi, getAllShowtimeApi } = AdminService()
  const { getAllShowtimeByManagerApi } = ManagerService()

  const [allMovie, setAllMovie] = useState([])
  const [allCinema, setAllCinema] = useState([])
  const [allUser, setAllUser] = useState([])


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

  const listTable = [
    {
      title: "Cinema ratings",
      icon: TrophyIcon,
      header: { stth: "STT", cinemah: "Rạp", addessh: "Địa chỉ", revenueh: "Doanh thu" },
      path: "/admin/list-cinemas",
      listUser: [],
      listCinema: allCinema,
      listMovie: [],
      listReview: []
    },
    {
      title: "Hot movies",
      icon: FireIcon,
      header: { stth: "STT", cinemah: "Tên phim", addessh: "Số lượng suất chiếu", revenueh: "rating" },
      path: "/admin/list-movie",
      listUser: [],
      listCinema: [],
      listReview: [],
      listMovie: allMovie
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
    {
      title: "Lastest Review",
      icon: StarIcon,
      header: { stth: "STT", cinemah: "Phim", addessh: "Người dùng", revenueh: "Raiting" },
      path: "/admin/list-review",
      listUser: [],
      listCinema: [],
      listMovie: [],
      listReview: [
        { Stt: 1, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 2, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 3, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 4, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 5, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" }
      ]
    }
  ]

  const HandleGetAllItem = async () => {
    let resMovie = await GetAllMovieApi()
    let resCinema = await getAllCinemaApi()
    let resUser = (user.role === "ADMIN") && await getAllUserApi()
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
      setStatistical({ ...statistical, qMovieOfMonth: totalMovies, qCinema: resCinema.data.result.totalElements, qUser: resUser.data.result.totalElements })
      :
      setStatistical({ ...statistical, qMovieOfMonth: totalMovies, qCinema: resCinema.data.result.totalElements })
    // setStatistical({...statistical})

    if (resMovie && resMovie.data && resMovie.data.result && resMovie.data.result.content) {
      const topFourMovies = resMovie.data.result.content.slice().sort((a, b) => b.RATING - a.RATING).slice(0, 5);
      setAllMovie(topFourMovies)
    }
    if (resCinema && resCinema.data && resCinema.data.result && resCinema.data.result.content) {
      const topCinemas = [...resCinema.data.result.content].sort((a, b) => b.DOANH_THU - a.DOANH_THU).slice(0, 5);
      setAllCinema(topCinemas)
    }
    if (resUser && resUser.data && resUser.data.result && resUser.data.result.content) {
      const lastFourUsers = resUser.data.result.content.slice().reverse().slice(0, 5);
      setAllUser(lastFourUsers)
    }
  }

  useEffect(() => {
    HandleGetAllItem()
  }, []);

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

        <div>
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
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{format("3000000")}</td>
                                  </tr>
                                ))
                              }

                              {index == 1 &&
                                // Rendering table.listMovie
                                table.listMovie.map((item, index) => (
                                  <tr key={`rating-${index}`}>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{index + 1}</td>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'><TruncatedContent content={item.title} maxLength={15} /></td>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{item.isDelete}</td>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{item.rating}</td>
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

                              {index == 3 &&
                                // Rendering table.listReview
                                table.listReview.map((item, index) => (
                                  <tr key={`rating-${index}`}>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{index + 1}</td>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{item.cinema}</td>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{item.address}</td>
                                    <td className='text-start text-sm font-medium px-5 pt-4 pb-1'>{format(item.revenue)}</td>
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
        </div>
      </div>
    </div >
  )
}

export default Dashboard