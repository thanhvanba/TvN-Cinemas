import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import AdminService from '../../../service/AdminService';
import Ticket from '../../../components/Ticket';
import Pagination from '../../../components/Pagination';
import Loading from '../../../components/Loading';
import FormatDataTime from '../../../utils/FormatDataTime';
import UserService from '../../../service/UserService';
import useLoadingState from '../../../hook/UseLoadingState'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Receipt } from 'lucide-react';
import Fare from './components/fare';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TimeAgo from '../../../components/TimeAgo';
import ConvertStringFollowFormat from '../../../utils/ConvertStringFollowFormat';
import { LoginContext } from '../../../context/LoginContext';
import StaffService from '../../../service/StaffService';
import { TicketIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';


const ListTicket = () => {
  const { user } = useContext(LoginContext)
  const { getAllRoomApi, deleteFoodApi, getAllTicketApi, getAllBookingApi, confirmTicketApi } = AdminService()
  const { getAllBookingStaffApi } = StaffService()
  const { getTicketDetailApi } = UserService()

  const [allTicketC, setAllTicketC] = useState([])
  const [allTicketU, setAllTicketU] = useState([])
  const [allTicketCa, setAllTicketCa] = useState([])
  const { loading, setLoading } = useLoadingState(false)
  const [bookingSearch, setBookingSearch] = useState('')
  const [toggle, setToggle] = useState(false);
  const [ticketDetail, setTicketDetail] = useState({});
  const [pagination, setPagination] = useState(
    {
      pageNumber: 1,
      pageSize: null,
      totalPages: null,
      totalElements: null
    }
  );

  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const handleGetItems = async (pageNumber) => {
    setLoading('loading', true)
    let resTicketC = user.role === 'ADMIN' ? await getAllBookingApi(pageNumber, 8, "CONFIRMED", localStorage.getItem("cinemaId") || null) : await getAllBookingStaffApi(pageNumber, 8, "CONFIRMED", localStorage.getItem("cinemaId") || null)
    if (resTicketC && resTicketC.data && resTicketC.data.result && resTicketC.data.result.content) {
      setAllTicketC(resTicketC.data.result.content)
      setPagination(prevPagination => ({
        ...prevPagination,
        pageNumber: pageNumber,
        pageSize: resTicketC.data.result.pageSize,
        totalPages: resTicketC.data.result.totalPages,
        totalElements: resTicketC.data.result.totalElements
      }));
    }
    setLoading('loading', false)
  }

  const handleGetItems1 = async () => {
    setLoading('loadingU', true)
    let resTicketU = user.role === 'ADMIN' ?
      await getAllBookingApi(null, null, "UNCONFIRMED", localStorage.getItem("cinemaId") || null)
      : await getAllBookingStaffApi(null, null, "UNCONFIRMED", localStorage.getItem("cinemaId") || null)
    setLoading('loadingU', false)

    if (resTicketU && resTicketU.data && resTicketU.data.result && resTicketU.data.result.content) {
      setAllTicketU(resTicketU.data.result.content)
    }
  }

  const handleGetItems2 = async () => {
    setLoading('loadingCa', true)
    let resTicketCa = user.role === 'ADMIN' ?
      await getAllBookingApi(null, null, "CANCELLED", localStorage.getItem("cinemaId") || null)
      : await getAllBookingStaffApi(null, null, "CANCELLED", localStorage.getItem("cinemaId") || null)
    setLoading('loadingCa', false)

    if (resTicketCa && resTicketCa.data && resTicketCa.data.result && resTicketCa.data.result.content) {
      setAllTicketCa(resTicketCa.data.result.content)
    }
  }


  const listTicket = {
    header: { stt: "STT", movieName: "Phim", cinemaName: "Rạp", showtime: "Thời gian chiếu", ticketPrice: "Giá vé", createAt: "Ngày đặt", user: "Người đặt" },
    tickets: allTicketC,
  }
  const handleGetTicketDetail = async (bookingId) => {
    setLoading('ticket', true)
    let resTicket = await getTicketDetailApi(bookingId)
    if (resTicket && resTicket.data && resTicket.data.result) {
      resTicket && !toggle && setToggle(true);
      setTicketDetail(resTicket.data.result)
    }
    setLoading('ticket', false)
  }

  const handleConfirmTicket = async (bookingId) => {
    setLoading('confirm', true)
    await confirmTicketApi(bookingId)
    setLoading('confirm', false)
    handleGetItems1()
    handleOpenModal()
  }

  const handleOpenModal = () => {
    setToggle(prevToggle => !prevToggle);
  }

  useEffect(() => {
    handleGetItems1()
    handleGetItems2()
    handleGetItems(pagination.pageNumber)
  }, [])
  return (
    <div className='relative w-full'>
      <div className='px-3 w-full'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2 w-full'>
          <h2 className='text-3xl cursor-default flex items-center'>
            <TicketIcon className='h-12 w-12 mr-1 text-emerald-600' />
            Quản lý vé
          </h2>

          {
            user.role === "ADMIN" &&
            <button
              className="my-4 px-6 py-2 border-slate-400 border text-sm font-bold uppercase rounded-2xl hover:bg-emerald-800 bg-emerald-600 text-white"
              type='submit'
              onClick={() => setLoading('fare', true)}
            >
              <Receipt />
            </button>
          }
        </div>
        {

          <div className="ticket-list-container pb-8">
            {
              !loading['loading'] && listTicket.tickets.length === 0 && allTicketU.length === 0 && allTicketCa.length === 0 ?
                <p className='w-full text-center text-lg text-slate-400 font-light'>-- Chưa bán được vé nào --</p>
                : <>
                  {/* Phần đã xác nhận */}
                  <div className='pr-3 border-1 w-3/4 relative'>
                    <div className='flex justify-center absolute mx-auto top-72 right-1/2 left-1/2 z-50'>
                      {loading['loading'] && <Loading />}
                    </div>
                    <div className='relative w-1/3'>
                      <input
                        onChange={e => {
                          setBookingSearch(e.target.value)
                        }}
                        type="text"
                        className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder="Nhập mã đặt vé"
                      />
                      <button
                        className='absolute right-0 top-0 m-2'>
                        <MagnifyingGlassIcon
                          onClick={() => {
                            handleGetTicketDetail(bookingSearch);
                          }}
                          className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                    {!loading['loading'] &&
                      <>
                        {
                          listTicket.tickets.length === 0 ?
                            <p className='text-center text-lg text-slate-400 font-light'>--Chưa có vé được xác nhận--</p>
                            :
                            <>
                              <table className='mt-6 w-full'>
                                <thead className=''>
                                  <tr>
                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase w-10'>{listTicket.header.stt}</th>
                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.movieName}</th>
                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.cinemaName}</th>
                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase w-[196px]'>{listTicket.header.showtime}</th>
                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase w-[73px]'>{listTicket.header.ticketPrice}</th>
                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase w-[116px]'>{listTicket.header.createAt}</th>
                                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.user}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    listTicket.tickets.map((item, index) => (
                                      <tr
                                        onClick={() => {
                                          handleOpenModal();
                                          handleGetTicketDetail(item.bookingId);
                                        }}
                                        className='border-b-2 border-slate-200 hover:bg-slate-100 cursor-pointer'
                                      >
                                        <td className='text-center font-medium px-2 py-4'>{index + 1}</td>
                                        <td className='text-start font-bold px-2 py-4 text-emerald-800'>{item.movieName}</td>
                                        <td className='text-center font-medium px-2 py-4'>{item.cinemaName}</td>
                                        <td className='text-center font-medium px-2 py-4 flex flex-col justify-center'>
                                          <span className='text-orange-500'>{item.startTime}</span>
                                          <span>Ngày {FormatDataTime(item.date).date}</span>
                                        </td>
                                        <td className='text-center font-medium px-2 py-4'>{ConvertStringFollowFormat(item.price)}<sup>đ</sup></td>
                                        <td className='text-center font-medium px-2 py-4 text-sky-600'>{TimeAgo(item.createAt)}</td>
                                        <td className='text-center font-medium px-2 py-4'>{item.userName ? item.userName : '-'}</td>
                                      </tr>
                                    ))
                                  }
                                </tbody>

                              </table>
                              <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetItems} />
                            </>
                        }
                      </>
                    }
                  </div>

                  <div className='flex-col w-1/4'>
                    <div className='p-2 h-auto bg-gray-100 w-full shadow-[0_0_20px_3px_rgba(0,0,0,0.1)] rounded-xl'>
                      {/* Phần chưa xác nhận */}
                      <div className='relative'>
                        <h2 className='font-semibold text-center text-xl text-amber-500'>Vé mới</h2>
                        <div className='flex justify-center absolute mx-auto top-1/2 right-1/2 left-1/2 z-50'>
                          {loading['loadingU'] && <Loading />}
                        </div>
                        <div className="ticket-section modal-body scrollable1-section">
                          {!loading['loadingU'] &&
                            <div className="bg-slate-300 bg-opacity-30 p-1">
                              {
                                allTicketU.length === 0 ?
                                  <p className=' text-center text-lg text-slate-400 font-light'>-- Chưa có vé nào vừa được mua--</p>
                                  :
                                  allTicketU.map((item) => (
                                    <div
                                      onClick={() => {
                                        handleOpenModal();
                                        handleGetTicketDetail(item.bookingId);
                                      }}
                                      className='border-t-2 border-x-2 border-stone-400'
                                    >
                                      <Ticket ticket={item} />
                                    </div>
                                  ))
                              }
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    <div className='p-2 mt-4 h-auto bg-gray-100 w-full shadow-[0_0_20px_3px_rgba(0,0,0,0.1)] rounded-xl'>
                      {/* Phần đã hủy */}
                      <div className='relative'>
                        <h2 className='font-semibold text-center text-xl pt-4 text-red-500'>Đã Hủy</h2>
                        <div className='flex justify-center absolute mx-auto top-1/2 right-1/2 left-1/2  z-50'>
                          {loading['loadingCa'] && <Loading />}
                        </div>
                        <div className="ticket-section modal-body scrollable1-section">
                          {!loading['loadingCa'] &&
                            <div className="bg-slate-300 bg-opacity-30 p-1">
                              {
                                allTicketCa.length === 0 ?
                                  <p className=' text-center text-lg text-slate-400 font-light'>-- Chưa có vé nào đã hủy --</p>
                                  :
                                  allTicketCa.map((item) => (
                                    <div
                                      onClick={() => {
                                        handleOpenModal();
                                        handleGetTicketDetail(item.bookingId);
                                      }}
                                      className='border-t-2 border-x-2 border-stone-400'
                                    >
                                      <Ticket ticket={item} />
                                    </div>
                                  ))
                              }
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </>}

          </div>
        }
        {
          toggle && (
            <div className='flex justify-center items-center bg-black bg-opacity-50 w-full h-screen right-0 bottom-0 fixed z-50'>
              <div className="w-[30%] z-10 overflow-hidden bg-slate-300 rounded-md right-1/2 ">
                <h4 className="font-bold text-3xl p-2 border-b-2 border-slate-400">Chi tiết vé</h4>
                <div className='flex justify-center absolute mx-auto w-full h-full top-0 right-0 z-10'>
                  {loading['ticket'] && <Loading />}
                </div>
                {!loading['ticket'] ?
                  <>
                    <div className="relative bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                      <div className='px-4 py-3 space-y-3'>
                        <div>
                          <p className="text-3xl text-emerald-600 font-semibold">{ticketDetail.movieName}</p>
                        </div>
                        <div>
                          <p className='font-light'>Ngày giờ chiếu</p>
                          <div className="flex items-center space-x-2 text-xl">
                            <span className="font-bold text-orange-500">{ticketDetail.startTime}</span>
                            <span>-</span>
                            <span className="font-bold">{FormatDataTime(ticketDetail.date).date}</span>
                            <span>({ticketDetail.duration} phút)</span>
                          </div>

                        </div>
                        <div>
                          <p className='font-light'>Rạp chiếu</p>
                          {ticketDetail.cinemaName && <p className="font-semibold text-xl">{ticketDetail.cinemaName}</p>}
                        </div>

                        <div className="flex items-center gap-10">
                          <div className="w-3/5">
                            <p className='font-light'>Ghế</p>
                            {ticketDetail?.seats &&
                              <p className="font-semibold text-xl">
                                {ticketDetail && ticketDetail.seats && ticketDetail.seats.map((seat, index) => (
                                  <span key={index}>{String.fromCharCode(65 + parseInt(seat.row, 10) - 1) + seat.column}{index < ticketDetail.seats.length - 1 ? ', ' : ''}</span>
                                ))}
                              </p>
                            }
                          </div>
                          <div className='w-2/5'>
                            <p className='font-light'>Phòng chiếu</p>
                            {ticketDetail.roomName && <p className="font-semibold text-xl">{ticketDetail.roomName}</p>}
                          </div>
                        </div>
                        <div className='flex items-start gap-10'>
                          <div className='w-3/5'>
                            <p className='font-light'>Bắp nước</p>
                            <p className="font-semibold text-xl">
                              {ticketDetail.foods && ticketDetail.foods.map((food, index) => (
                                <p key={index}>{food}</p>
                              ))}
                            </p>
                          </div>
                          <div className='w-2/5'>
                            <p className='font-light'>Giá tiền</p>
                            {ticketDetail.price && <p className="font-semibold text-3xl text-cyan-600">{ConvertStringFollowFormat(ticketDetail.price)}<sup>đ</sup></p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='border-t-2 border-slate-400 p-3'>
                      <div className='flex justify-between'>
                        <p className='font-light'>Thời gian đặt vé: </p>
                        {ticketDetail?.createAt && <p className='text-lg'>&nbsp;{FormatDataTime(ticketDetail.createAt).date}, {FormatDataTime(ticketDetail.createAt).time}</p>}
                      </div>
                      {ticketDetail?.status === 'CANCELLED' &&
                        <div className='flex justify-between'>
                          <p className='font-light'>Thời gian hủy vé: </p>
                          <p className='text-lg'>&nbsp;{FormatDataTime(ticketDetail.cancelTime).date}, {FormatDataTime(ticketDetail.cancelTime).time}</p>
                        </div>
                      }
                      <div className='flex justify-between'>
                        <p className='font-light'>Mã đặt vé: </p>
                        {ticketDetail?.bookingId && <p className='text-lg'>{ticketDetail.bookingId}</p>}
                      </div>
                      <div className='flex items-start justify-between'>
                        <p className='font-light'>Khách hàng: </p>
                        {ticketDetail.userName === null || ticketDetail.fullName === null ?
                          <p className='text-lg'>Khách vãng lai</p> :
                          <div className='text-center'>
                            {ticketDetail.userName && <p className='text-lg'>&nbsp;{ticketDetail.userName}</p>}
                            {ticketDetail.fullName && <p className='text-lg'>&nbsp; ({ticketDetail.fullName})</p>}
                          </div>
                        }
                      </div>
                    </div>
                    <div className='p-3 flex justify-end'>
                      <button
                        className="w-1/4 text-[18px] rounded-xl hover:bg-sky-800 text-white bg-sky-600 py-2 transition-colors duration-300 z-50"
                        type='button'
                        disabled={loading['change']}
                        onClick={() => {
                          handleOpenModal()
                          setTicketDetail([])
                        }}
                      >
                        {loading['change'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                        &nbsp;Thoát
                      </button>
                      {ticketDetail.status === "UNCONFIRMED" &&
                        <button
                          className="w-1/3 ml-2 text-[18px] rounded-xl hover:bg-emerald-800 hover:text-white text-white bg-emerald-600 py-2 transition-colors duration-300 z-50"
                          type='button'
                          disabled={loading['change']}
                          onClick={() => {
                            handleConfirmTicket(ticketDetail.bookingId)
                          }}
                        >
                          {loading['confirm'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                          &nbsp;Xác nhận
                        </button>
                      }
                    </div>
                  </> :
                  <div className='h-96'>

                  </div>
                }
              </div>
            </div>
          )
        }
        {
          loading['fare'] &&
          <Fare onLoading={setLoading} />
        }
      </div >
    </div >
  );
};

export default ListTicket