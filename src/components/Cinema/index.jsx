import React from 'react'

import { MapPinIcon } from "@heroicons/react/24/outline"

const Cinema = ({ cinemaName, location, urlLocation }) => {
    return (
        <>
            <div className='p-6'>
                <h4 className='uppercase font-bold text-base text-slate-200'>{cinemaName}</h4>
                <p className='text-sm text-slate-500'>{location}</p>
            </div>
            <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                onClick={() => window.open(urlLocation, '_blank')}
            >
                <span className="absolute right-12 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                <a className='pr-8 text-sm'>Xem vị trí</a>
            </button>
        </>
        
    )
}

export default Cinema
