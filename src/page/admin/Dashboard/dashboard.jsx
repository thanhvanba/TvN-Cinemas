import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UsersIcon, FilmIcon, Square3Stack3DIcon, BuildingLibraryIcon, ArrowPathIcon, TrophyIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline'
import format from "../../../utils/ConvertStringFollowFormat"

import AdminService from '../../../service/AdminService';
import MovieService from '../../../service/MovieService';
import CinemaService from '../../../service/CinemaService';

const Dashboard = () => {
  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const { } = AdminService
  const { GetAllMovieApi } = MovieService()
  const [statistical, setStatistical] = useState({
    totalIncome: "",
    qMovie: "",
    qCinema: "",
    qUser: ""
})
  const Statistical = [
    { title: "Thống kê tổng doanh thu", quantity: "399900000", icon: Square3Stack3DIcon },
    { title: "Phim trong tháng", quantity: "160", icon: FilmIcon },
    { title: "Hệ thống rạp", quantity: "10", icon: BuildingLibraryIcon },
    { title: "Thống kê số lượng người dùng", quantity: "3999", icon: UsersIcon }
  ]
  const listTable = [
    {
      title: "Cinema ratings",
      icon: TrophyIcon,
      header: { stth: "STT", cinemah: "Rạp", addessh: "Địa chỉ", revenueh: "Doanh thu" },
      path: "/admin/list-cinemas",
      cinemaRatings: [
        { Stt: 1, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 2, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 3, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 4, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 5, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" }
      ]
    },
    {
      title: "Hot movies",
      icon: FireIcon,
      header: { stth: "STT", cinemah: "Tên phim", addessh: "Số lượng suất chiếu", revenueh: "rating" },
      path: "/admin/list-movie",
      cinemaRatings: [
        { Stt: 1, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 2, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 3, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 4, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 5, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" }
      ]
    },
    {
      title: "Lastest Users",
      icon: UsersIcon,
      header: { stth: "STT", cinemah: "Họ tên", addessh: "Email", revenueh: "User Name" },
      path: "/admin/list-user",
      cinemaRatings: [
        { Stt: 1, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 2, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 3, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 4, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 5, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" }
      ]
    },
    {
      title: "Lastest Review",
      icon: StarIcon,
      header: { stth: "STT", cinemah: "Phim", addessh: "Người dùng", revenueh: "Raiting" },
      path: "/admin/list-review",
      cinemaRatings: [
        { Stt: 1, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 2, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 3, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 4, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" },
        { Stt: 5, cinema: "BHD Star", address: "Tân Phú", revenue: "30000" }
      ]
    }
  ]

  const handleRenderApi = async() => {
    let res = await GetAllMovieApi()
    if(res && res.data && res.data.result){

    }
  }
  useEffect(() => {

  }, []);
  return (
    <div>
      <div className='px-4'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
          <h2 className='text-3xl'>Drashboard</h2>
          <button
            className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
            type='submit'
          >
            Add showtime
          </button>
        </div>
        <div>
          <div className='grid grid-cols-4'>
            {
              Statistical.map((item) => (
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
              listTable.map((table) => (
                <div className='px-3 col-span-2'>
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
                            {
                              table.cinemaRatings.map((item) => (
                                <tr>
                                  <td className='text-start font-medium px-5 pt-4 pb-1'>{item.Stt}</td>
                                  <td className='text-start font-medium px-5 pt-4 pb-1'>{item.cinema}</td>
                                  <td className='text-start font-medium px-5 pt-4 pb-1'>{item.address}</td>
                                  <td className='text-start font-medium px-5 pt-4 pb-1'>{format(item.revenue)}</td>
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
    </div>
  )
}

export default Dashboard