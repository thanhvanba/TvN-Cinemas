import React from 'react'
import FormatDataTime from '../../utils/FormatDataTime'

const DetailTicket = (ticketDetail) => {
    return (
        <div className='top-0 bottom-0 bg-cover w-full fixed flex justify-center items-center   '>
            <div className=" w-[28%] z-10 overflow-hidden bg-slate-300 rounded-md">
                <div className="p-4 md:p-6 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                    <h4 className="font-bold text-3xl pb-2 border-b-2 border-slate-400">Chi tiết vé</h4>
                    <div className='px-4  space-y-6'>
                        <div>
                            <p className="text-3xl pt-4 text-emerald-600 font-semibold">{ticketDetail.movieName}</p>
                        </div>
                        <div>
                            <p className='font-light'>Ngày giờ chiếu</p>
                            <div className="flex items-center space-x-2 text-xl">
                                <span className="font-bold text-orange-500">{FormatDataTime(ticketDetail.timeShow).time}</span>
                                <span>-</span>
                                <span className="font-bold">{FormatDataTime(ticketDetail.timeShow).date}</span>
                                <span>({ticketDetail.duration} phút)</span>
                            </div>

                        </div>
                        <div>
                            <p className='font-light'>Rạp chiếu</p>
                            <p className="font-semibold text-xl">{ticketDetail.cinemaName}</p>
                        </div>

                        <div className="flex items-center gap-10">
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
                        <div className='flex items-center gap-10'>
                            <div className='w-3/5'>
                                <p className='font-light'>Bắp nước</p>
                                <p className="font-semibold text-xl">{ticketDetail.foods && ticketDetail.foods.map((food, index) => (
                                    <span key={index}>&nbsp;{food.food.name},</span>
                                ))}</p>
                            </div>
                            <div className='w-2/5'>
                                <p className='font-light'>Giá tiền</p>
                                <p className="font-semibold text-3xl text-cyan-600">{ticketDetail.price}</p>
                            </div>
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
