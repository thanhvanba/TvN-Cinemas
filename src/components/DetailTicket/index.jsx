import React from 'react'
import FormatDataTime from '../../utils/FormatDataTime'
import ConvertStringFollowFormat from '../../utils/ConvertStringFollowFormat'

const DetailTicket = (ticketDetail) => {
    return (
        <div className='top-0 bottom-0 bg-cover w-full fixed flex justify-center items-center   '>
            <div className=" w-[28%] z-10 overflow-hidden bg-slate-300 rounded-md">
                <div className="p-4 md:p-6 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                    <h4 className="font-bold text-3xl pb-2 border-b-2 border-slate-400">Chi tiếtd vé</h4>
                    <div className='px-4 space-y-4'>
                        <div>
                            <p className="text-3xl pt-4 text-emerald-600 font-semibold">{ticketDetail.movieName}</p>
                        </div>
                        <div>
                            <p className='font-light'>Ngày giờ chiếu</p>
                            {ticketDetail.timeShow &&
                                <div className="flex items-center space-x-2 text-xl">
                                    <span className="font-bold text-orange-500">{FormatDataTime(ticketDetail.startTime)}</span>
                                    <span>-</span>
                                    <span className="font-bold">{FormatDataTime(ticketDetail.date).date}</span>
                                    <span>({ticketDetail.duration} phút)</span>
                                </div>
                            }

                        </div>
                        <div>
                            <p className='font-light'>Rạp chiếu</p>
                            {ticketDetail.cinemaName && <p className="font-semibold text-xl">{ticketDetail.cinemaName}</p>}
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="w-3/5">
                                <p className='font-light'>Ghế</p>
                                {ticketDetail?.seats &&
                                    <p className="font-semibold text-xl">{ticketDetail && ticketDetail.seats && ticketDetail.seats.map(seat => (
                                        <span>&nbsp;{String.fromCharCode(65 + parseInt(seat.row, 10) - 1) + seat.column},</span>
                                    ))}
                                    </p>
                                }
                            </div>
                            <div className='w-2/5'>
                                <p className='font-light'>Phòng chiếu</p>
                                {ticketDetail.roomName && <p className="font-semibold text-xl">{ticketDetail.roomName}</p>}
                            </div>
                        </div>
                        <div className='flex items-center gap-10'>
                            <div className='w-3/5'>
                                <p className='font-light'>Bắp nước</p>
                                {ticketDetail?.food &&
                                    <p className="font-semibold text-xl">{ticketDetail.foods && ticketDetail.foods.map((food, index) => (
                                        <span key={index}>&nbsp;{food.food.name},</span>
                                    ))}
                                    </p>
                                }
                            </div>
                            <div className='w-2/5'>
                                <p className='font-light'>Giá tiền</p>
                                {ticketDetail.price && <p className="font-semibold text-3xl text-cyan-600">{ConvertStringFollowFormat(ticketDetail.price)}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='border-t-2 border-slate-400 p-4'>
                        <div className='flex justify-between'>
                            <p className='font-light'>Thời gian đặt vé: </p>
                            {ticketDetail?.createAt && <p className='text-xl'>&nbsp;{FormatDataTime(ticketDetail.createAt).date}, {FormatDataTime(ticketDetail.createAt).time}</p>}
                        </div>
                        {ticketDetail?.cancelTime &&
                            <div className='flex justify-between'>
                                <p className='font-light'>Thời gian hủy vé: </p>
                                <p className='text-xl'>&nbsp;{FormatDataTime(ticketDetail.cancelTime).date}, {FormatDataTime(ticketDetail.cancelTime).time}</p>
                            </div>
                        }
                        <div className='flex justify-between'>
                            <p className='font-light'>Mã đặt vé: </p>
                            {ticketDetail?.bookingId && <p className='text-xl'>{ticketDetail.bookingId}</p>}
                        </div>
                        <div className='flex items-start justify-between'>
                            <p className='font-light'>Khách hàng: </p>
                            {ticketDetail.userName === null || ticketDetail.fullName === null ?
                                <p className='text-xl'>Khách vãng lai</p> :
                                <div className='text-center'>
                                    <p className='text-xl'>&nbsp;{ticketDetail.userName}</p>
                                    <p className='text-xl'>&nbsp; ({ticketDetail.fullName})</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            className="w-1/4 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                            type='button'
                            disabled={loading['change']}
                            onClick={() => handleOpenModal()}
                        >
                            {loading['change'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                            &nbsp;OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailTicket
