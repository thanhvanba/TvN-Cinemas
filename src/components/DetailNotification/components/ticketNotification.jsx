import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import FormatDataTime from '../../../utils/FormatDataTime'

function TicketNotification({ notification }) {
    return (
        <>
            <div className="relative px-2 pb-2 md:px-4 md:pb-2 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                <h3 className="relative text-lg">
                    [{notification?.notification?.title}]
                </h3>
                <div className='px-2'>
                    <h3 className='text-center mt-4'>Thông tin vé</h3>
                    <div className='space-y-4'>
                        <div>
                            <p className="text-2xl text-emerald-600 font-semibold">{notification?.notification?.detailData?.movieName}</p>
                        </div>

                        <div>
                            <p className='font-light'>Ngày giờ chiếu</p>
                            <div className="flex items-center space-x-2 text-xl">
                                <span className="font-bold text-orange-500">{notification?.notification?.detailData?.startTime}</span>
                                <span>-</span>
                                <span className="font-bold">{FormatDataTime(notification?.notification?.detailData?.date).date}</span>
                                <span>({notification?.notification?.detailData?.duration} phút)</span>
                            </div>
                        </div>

                        <div>
                            <p className='font-light'>Rạp chiếu</p>
                            <p className="font-semibold text-xl">{notification?.notification?.detailData?.cinemaName}</p>
                        </div>

                        <div className="flex gap-10">
                            <div className="w-3/5">
                                <p className='font-light'>Ghế</p>
                                <p className="font-semibold text-xl">
                                    {notification?.notification?.detailData && notification?.notification?.detailData?.seats && notification?.notification?.detailData?.seats.map((seat, index) => (
                                        <span>&nbsp;{String.fromCharCode(65 + parseInt(seat.row, 10) - 1) + seat.column}{index < notification?.notification?.detailData?.seats.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </p>
                            </div>

                            <div className='w-2/5'>
                                <p className='font-light'>Phòng chiếu</p>
                                <p className="font-semibold text-xl">{notification?.notification?.detailData?.roomName}</p>
                            </div>
                        </div>

                        <div className='flex gap-10'>
                            <div className='w-3/5'>
                                <p className='font-light'>Bắp nước</p>
                                <p className="font-semibold text-xl w-full inline-block">
                                    {notification?.notification?.detailData?.foods && notification?.notification?.detailData?.foods.map((food, index) => (
                                        <p key={index}>&nbsp;{food}</p>
                                    ))}
                                </p>
                            </div>
                            <div className='w-2/5'>
                                <p className='font-light'>Giá tiền</p>
                                <p className="font-semibold text-3xl text-cyan-600">{notification?.notification?.detailData?.price}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='border-t-2 border-slate-400 p-4 text-black'>
                <div className='flex justify-between'>
                    <p className='font-light'>Thời gian đặt vé: </p>
                    <p className='text-xl'>&nbsp;{FormatDataTime(notification?.notification?.detailData?.createAt).date}, {FormatDataTime(notification?.notification?.detailData?.createAt).time}</p>
                </div>
                {notification?.notification?.detailData?.status === 'CANCELLED' &&
                    <div className='flex justify-between'>
                        <p className='font-light'>Thời gian hủy vé: </p>
                        <p className='text-xl'>&nbsp;{FormatDataTime(notification?.notification?.detailData?.cancelTime).date}, {FormatDataTime(notification?.notification?.detailData?.cancelTime).time}</p>
                    </div>
                }
                {notification?.notification?.detailData?.status === 'CONFIRMED' &&
                    <div className='flex justify-between'>
                        <p className='font-light'>Thời gian xác thực: </p>
                        <p className='text-xl'>&nbsp;{FormatDataTime(notification?.notification?.createdAt).date}, {FormatDataTime(notification?.notification?.createdAt).time}</p>
                    </div>
                }
                <div className='flex justify-between'>
                    <p className='font-light'>Mã đặt vé: </p>
                    <p className='text-xl'>{notification?.notification?.detailData?.bookingId}</p>
                </div>
                <div className='flex items-start justify-between'>
                    <p className='font-light'>Khách hàng: </p>
                    {notification?.notification?.detailData?.userName === null || notification?.notification?.detailData?.fullName === null ?
                        <p className='text-xl'>Khách vãng lai</p> :
                        <div className='text-center'>
                            <p className='text-xl'>&nbsp;{notification?.notification?.detailData?.userName}</p>
                            <p className='text-xl'>&nbsp; ({notification?.notification?.detailData?.fullName})</p>
                        </div>
                    }
                </div>
            </div>
            {!notification && <div className='h-96'></div>}
        </>

    )
}

export default TicketNotification
