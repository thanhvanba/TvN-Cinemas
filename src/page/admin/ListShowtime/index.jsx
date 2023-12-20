import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import TruncatedContent from '../../../utils/TruncatedContent'
import FormatDataTime from '../../../utils/FormatDataTime'
import { useNavigate } from 'react-router-dom'
import AdminService from '../../../service/AdminService'
import ManagerService from '../../../service/ManagerService'
import { LoginContext } from '../../../context/LoginContext';
const ListShowtime = () => {
  const { getAllShowtimeApi } = AdminService()
  const { getAllShowtimeByManagerApi, changeStatusShowtimeApi, deleteShowtimeApi } = ManagerService()
  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
  }
  const [loading, setLoading] = useState(false);
  const [allShowtime, setAllShowtime] = useState([]);
  const { user } = useContext(LoginContext);
  const listShowtime = {
    header: { stt: "STT", movieInfo: "Phim", time: "Thời gian", room: "Phòng", status: "status", action: "actions" },
    showtime: allShowtime,
    action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
  }

  const handleGetItem = async () => {
    let res = (user.role === "ADMIN") ?
      await getAllShowtimeApi() : await getAllShowtimeByManagerApi()

    if (res && res.data && res.data.result && res.data.result.content) {
      setAllShowtime(res.data.result.content)
    }
  }

  const handleChangeStatus = async (showtimeId) => {
    await changeStatusShowtimeApi(showtimeId);

    const updatedShowtimes = allShowtime.map((showtime) => {
      if (showtime.showTimeId === showtimeId) {
        return { ...showtime, status: !showtime.status };
      }
      return showtime;
    });

    console.log('Updated Showtimes:', updatedShowtimes);

    setAllShowtime(updatedShowtimes);
  };

  const handleDeleteShowtime = async (showtimeId) => {
    await deleteShowtimeApi(showtimeId);

    const updatedShowtimes = allShowtime.filter((showtime) => showtime.showTimeId !== showtimeId);

    setAllShowtime(updatedShowtimes);
  };

  useEffect(() => {
    handleGetItem()
  }, []);
  return (
    <div>
      <div className='px-4'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
          <h2 className='text-3xl'>List Showtime</h2>
          {
            (user.role === "MANAGER") ?
              <button
                className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                onClick={() => changeTab("/admin/add-item/showtime")}
                type='button'
              >
                Add Showtime
              </button>
              :
              <div></div>
          }
        </div>

        <div>
          <div className='px-3'>
            <div className=''>
              {
                <table className='mt-6 w-full'>
                  <thead className=''>
                    <tr>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.stt}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.movieInfo}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.time}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.room}</th>
                      {user.role === "MANAGER" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.status}</th>}
                      {user.role === "MANAGER" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listShowtime.header.action}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listShowtime.showtime.map((item, index) => (
                        <tr onClick={() => changeTab(`/admin/showtime/${item.showTimeId}`)} className='border-b-8 border-slate-50 bg-slate-100'>
                          <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
                          <td className='text-start font-medium px-5 py-4'>
                            <div className='flex items-center'>
                              <div div className='pr-2' >
                                <img className="h-20 w-16 text-emerald-600" src={item.movie.poster} alt="" />
                              </div >
                              <div>
                                <h3>{item.movie.title}</h3>
                                <p className='font-normal text-xs'><TruncatedContent content={"Actor: " + item.movie.actor} maxLength={20} /></p>
                                <span className='font-normal text-xs'><TruncatedContent content={"Director: " + item.movie.director} maxLength={20} /></span>
                              </div>
                            </div>
                          </td>
                          <td className='text-start font-medium px-5 py-4'>{FormatDataTime(item.timeStart).date} - {FormatDataTime(item.timeEnd).date} </td>
                          <td className='text-start font-medium px-5 py-4'>{item.room.roomName}</td>
                          {user.role === "MANAGER" && <td className={`${item.status ? "text-green-600" : "text-red-600"} text-start font-medium px-5 py-4`}>{item.status ? "Active" : "Inactive"}</td>}
                          <td className='text-start font-medium px-5 py-4'>
                            {user.role === "MANAGER" && <div className='flex items-center'>
                              <button type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.showTimeId) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                <listShowtime.action.aChange className='h-4 w-4 text-emerald-600' />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/showtime/${item.showTimeId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                <listShowtime.action.aEdit className='h-4 w-4 text-cyan-600' />
                              </button>
                              <button type='button' onClick={(e) => { e.stopPropagation(); handleDeleteShowtime(item.showTimeId) }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                <listShowtime.action.aDelete className='h-4 w-4 text-red-600' />
                              </button>
                            </div>}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListShowtime
