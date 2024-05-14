import React, { useEffect, useState } from 'react'
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


const ListTicket = () => {
  const { getAllRoomApi, deleteFoodApi, getAllTicketApi, getAllBookingtApi, getAllUserApi, confirmTicketApi } = AdminService()
  const { getTicketDetailApi } = UserService()

  const [allTicketC, setAllTicketC] = useState([])
  const [allTicketU, setAllTicketU] = useState([])
  const [allTicketCa, setAllTicketCa] = useState([])
  const { loading, setLoading } = useLoadingState(false)
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
    let resTicketC = await getAllBookingtApi(pageNumber, 8, "CONFIRMED", localStorage.getItem("cinemaId") || null)
    let resTicketU = await getAllBookingtApi(null, null, "UNCONFIRMED", localStorage.getItem("cinemaId") || null)
    let resTicketCa = await getAllBookingtApi(null, null, "CANCELLED", localStorage.getItem("cinemaId") || null)
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

    if (resTicketU && resTicketU.data && resTicketU.data.result && resTicketU.data.result.content) {
      setAllTicketU(resTicketU.data.result.content)
    }

    if (resTicketCa && resTicketCa.data && resTicketCa.data.result && resTicketCa.data.result.content) {
      setAllTicketCa(resTicketCa.data.result.content)
    }
    setLoading('loading', false)
  }


  const listTicket = {
    header: { stt: "STT", movieName: "Phim", cinemaName: "Rạp", showtime: "Thời gian chiếu", ticketPrice: "Giá vé", createAt: "Ngày đặt", user: "Người đặt" },
    tickets: allTicketC,
  }
  const handleGetTicketDetail = async (bookingId) => {
    setLoading('ticket', true)
    let resTicket = await getTicketDetailApi(bookingId)
    if (resTicket && resTicket.data && resTicket.data.result) {
      setTicketDetail(resTicket.data.result)
    }
    setLoading('ticket', false)
  }

  const handleConfirmTicket = async (bookingId) => {
    setLoading('confirm', true)
    await confirmTicketApi(bookingId)
    setLoading('confirm', false)
    handleOpenModal()
  }

  const handleOpenModal = () => {
    setToggle(prevToggle => !prevToggle);
  }

  useEffect(() => {
    handleGetItems(pagination.pageNumber)
  }, [])
  return (
    <div className='relative w-full'>
      <div className='px-3 w-full'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2 w-full'>
          <h2 className='text-3xl cursor-default'>Quản lý vé  </h2>

          {
            // (user.role === "ADMIN" && /^\/(admin|manager)\/list-movie/.test(pathname)) ?
            <button
              className="my-4 px-6 py-2 border-slate-400 border text-sm font-bold uppercase rounded-2xl hover:bg-emerald-800 bg-emerald-600 text-white"
              type='submit'
              onClick={() => setLoading('fare', true)}
            >
              <Receipt />
            </button>
          }
        </div>
        <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
          {loading['loading'] && <Loading />}
        </div>
        {
          !loading['loading'] &&
          <div className="ticket-list-container">
            {/* Phần đã xác nhận */}

            <div className='pr-3 border-1 w-3/4'>
              {/* <div className='flex justify-end items-center py-4 pr-4'>
                <div className="border-2 rounded-xl ">
                  <Search />
                </div>
              </div> */}
              <table className='mt-6 w-full'>
                <thead className=''>
                  <tr>
                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.stt}</th>
                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.movieName}</th>
                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.cinemaName}</th>
                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.showtime}</th>
                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.ticketPrice}</th>
                    <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listTicket.header.createAt}</th>
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
                        <td className='text-start font-medium px-2 py-4'>{item.movieName}</td>
                        <td className='text-center font-medium px-2 py-4'>{item.cinemaName}</td>
                        <td className='text-center font-medium px-2 py-4'>{item.startTime} - Ngày {FormatDataTime(item.date).date}</td>
                        <td className='text-center font-medium px-2 py-4'>{item.price}</td>
                        <td className='text-center font-medium px-2 py-4'>{TimeAgo(item.createAt)}</td>
                        <td className='text-center font-medium px-2 py-4'>{item.userName}</td>
                      </tr>
                    ))
                  }
                </tbody>

              </table>
              <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetItems} />
            </div>

            <div className='p-2 h-full bg-neutral-200 w-1/4 shadow-2xl rounded-xl'>
              {/* Phần chưa xác nhận */}
              <div className=''>
                <h2 className='font-semibold text-center text-xl text-amber-500'>Vé mới</h2>
                <div className="ticket-section">
                  <div className="scrollable1-section bg-slate-300 bg-opacity-30 p-1">
                    {
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
                </div>
              </div>


              {/* Phần đã hủy */}
              <div className=''>
                <h2 className='font-semibold text-center text-xl pt-4 text-red-500'>Đã Hủy</h2>
                <div className="ticket-section">
                  <div className="scrollable1-section bg-slate-300 bg-opacity-30 p-1">
                    {
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
                </div>
              </div>


            </div>
          </div>
        }
        {
          toggle && (
            <div className='flex justify-center items-center bg-black bg-opacity-50 w-full h-screen right-0 bottom-0 fixed z-20'>
              <div className=" w-[30%] z-10 overflow-hidden bg-slate-300 rounded-md right-1/2 ">
                <h4 className="font-bold text-3xl p-2 border-b-2 border-slate-400">Chi tiết vé</h4>

                <div className="relative px-4 pb-2 md:px-6 md:pb-2 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                  <div className='flex justify-center absolute mx-auto w-full h-full top-0 right-0 z-10'>
                    {loading['ticket'] && <Loading />}
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <p className="text-3xl pt-4 text-emerald-600 font-semibold">{ticketDetail.movieName}</p>
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
                      <p className="font-semibold text-xl">{ticketDetail.cinemaName}</p>
                    </div>

                    <div className="flex gap-10">
                      <div className="w-3/5">
                        <p className='font-light'>Ghế</p>
                        <p className="font-semibold text-xl">{ticketDetail && ticketDetail.seats && ticketDetail.seats.map(seat => (
                          <span>&nbsp;{String.fromCharCode(65 + parseInt(seat.row, 10) - 1) + seat.column},</span>
                        ))}</p>
                      </div>

                      <div className='w-2/5'>
                        <p className='font-light'>Phòng chiếu</p>
                        <p className="font-semibold text-xl">{ticketDetail.roomName}</p>
                      </div>
                    </div>

                    <div className='flex gap-10'>
                      <div className='w-3/5'>
                        <p className='font-light'>Bắp nước</p>
                        <p className="font-semibold text-xl w-full inline-block">
                          {ticketDetail.foods && ticketDetail.foods.map((food, index) => (
                            <p key={index}>&nbsp;{food},</p>
                          ))}
                        </p>
                      </div>
                      <div className='w-2/5'>
                        <p className='font-light'>Giá tiền</p>
                        <p className="font-semibold text-3xl text-cyan-600">{ticketDetail.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='border-t-2 border-slate-400 p-4'>
                  <div className='flex justify-between'>
                    <p className='font-light'>Thời gian đặt vé: </p>
                    <p className='text-xl'>&nbsp;{FormatDataTime(ticketDetail.createAt).date}, {FormatDataTime(ticketDetail.createAt).time}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-light'>Mã đặt vé: </p>
                    <p className='text-xl'>{ticketDetail.bookingId}</p>
                  </div>
                  <div className='flex items-start justify-between'>
                    <p className='font-light'>Khách hàng: </p>
                    <div className='text-center'>
                      <p className='text-xl'>&nbsp;{ticketDetail.userName}</p>
                      <p className='text-xl'>&nbsp; ({ticketDetail.fullName})</p>
                    </div>
                  </div>
                </div>

                <div className='p-4 flex justify-end'>
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
              </div>
            </div>
          )
        }
        {
          loading['fare'] &&
            <Fare onLoading={setLoading} />
        }
      </div>
    </div >
  );
};

export default ListTicket