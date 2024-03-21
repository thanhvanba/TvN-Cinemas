import React from 'react'

const Button = ({ click, img, title }) => {
    return (
        <div
            className='w-24 h-16 shadow-inner border-2 border-sky-400 rounded-lg mx-2 hover:bg-slate-100 cursor-pointer'
            onClick={() => { click() }}
        >
            <div className='flex items-center justify-center py-1'>
                <img className='w-8' src={img} alt="" />
            </div>
            <p className='text-center text-xs text-gray-500 font-medium'>{title}</p>
        </div>
    )
}

export default Button
