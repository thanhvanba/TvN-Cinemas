import React from 'react'
import { useState, useEffect } from 'react'
import CinemaService from '../../service/CinemaService';

import { MapPinIcon } from "@heroicons/react/24/outline"
import Loading from '../../components/Loading';
function Cinemas() {
    const [allCinema, setAllCinema] = useState([])
    const [loading, setLoading] = useState(false);

    const { getAllCinemaApi } = CinemaService()

    const handleGetItems = async () => {
        let res = await getAllCinemaApi()
        if (res && res.data && res.data.result && res.data.result.content) {
            setAllCinema(res.data.result.content)
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        handleGetItems()
    }, []);
    return (
        <div className='pt-32 pb-10 w-full'>
            <div className='max-w-7xl mx-auto'>
                {loading ? <Loading /> :
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16 mx-4'>
                        {
                            allCinema.map((item, index) => (
                                <div key={`cinema-${index}`} className='bg-slate-700 sm:w-80 md:w-[260px] lg:w-64 flex flex-col justify-between'>
                                    <div className='p-6'>
                                        <h4 className='uppercase font-bold text-lg text-slate-200'>{item.cinemaName}</h4>
                                        <p className='text-slate-500'>{item.location}</p>
                                    </div>
                                    <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                                        onClick={() => window.open(item.urlLocation, '_blank')}
                                    >
                                        <span className="absolute right-12 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                                        <a className='pr-8'>Xem vị trí</a>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Cinemas
