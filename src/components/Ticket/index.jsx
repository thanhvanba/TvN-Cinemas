import React from 'react'
import FormatDataTime from '../../utils/FormatDataTime';
import formatPrice from '../../utils/ConvertStringFollowFormat';

const Ticket = ({ ticket }) => {
    return (
        <div className='flex justify-between relative bg-slate-50 px-2 cursor-pointer'>
            <div className='py-4'>
                <p className='text-start font-medium py-2 text-emerald-600 '>{ticket.movieName}</p>
                <p className='pl-2 text-start font-light text-xs'>{ticket.cinemaName}</p>
                <p className='pl-2 text-start font-semibold text-xs'>{ticket.startTime} - Ngày {FormatDataTime(ticket.date).date}  </p>
            </div>
            <p className='absolute bottom-3 right-0  font-medium text-xl text-zinc-500'>
                <div className='text-xl text-center text-slate-800'>Giá:</div>
                <div>{formatPrice(ticket.price)}
                    <sup>đ</sup></div>
            </p>
        </div>
    )
}

export default Ticket
