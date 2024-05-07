import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

function ChairType() {
    return (
        <div className='mt-10 grid grid-cols-3 lg:grid-cols-5 justify-center'>
            <div className='relative flex'>
                <div className='absolute left-4 h-8 w-8 lg:h-10 lg:w-10 bg-slate-800 rounded-xl'>
                    <XMarkIcon className='text-slate-400' />
                </div>
                <p className='text-gray-100 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế đã đặt</p>
            </div>
            <div className='relative flex'>
                <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-slate-800 rounded-xl' />
                <p className='text-gray-100 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế thường</p>
            </div>
            <div className='relative flex'>
                <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-orange-500 rounded-xl' />
                <p className='text-gray-100 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế VIP</p>
            </div>
            <div className='relative flex'>
                <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-pink-700 rounded-xl' />
                <p className='text-gray-100 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế đôi</p>
            </div>
            <div className='relative flex'>
                <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-green-500 rounded-xl border-2 border-[#00e608]' />
                <p className='text-gray-100 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế đang chọn</p>
            </div>
        </div>
    )
}

export default ChairType
