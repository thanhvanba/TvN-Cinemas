import React from 'react'
import FormatDataTime from '../../utils/FormatDataTime';
import formatPrice from '../../utils/ConvertStringFollowFormat';
import TimeAgo from '../TimeAgo';

const Ticket = ({ ticket }) => {
    return (
        <div className='flex flex-col justify-between relative bg-slate-50 px-2 pb-2 cursor-pointer'>
            {/* <div className='pb-6'> */}
            <p className='text-start font-medium py-2 text-emerald-600 '>{ticket.movieName}</p>
            <p className='pl-2 text-start font-light text-xs'>{ticket.cinemaName}</p>
            <p className='pl-2 text-start font-semibold text-xs'>{ticket.startTime} - Ngày {FormatDataTime(ticket.date).date}  </p>
            {/* </div> */}
            <p className='absolute bottom-1.5 right-1 font-medium text-2xl text-zinc-500'>
                {/* <div className='text-xl text-center text-slate-800'>Giá:</div> */}
                <div>{formatPrice(ticket.price)}
                    <sup>đ</sup>
                </div>
            </p>
            <p className='absolute top-3 right-1 font-medium text-[10px] text-orange-500'>
                {/* <div className='text-xl text-center text-slate-800'>Giá:</div> */}
                <div>{TimeAgo(ticket.createAt)}</div>
            </p>
        </div>
    )
}

export default Ticket
