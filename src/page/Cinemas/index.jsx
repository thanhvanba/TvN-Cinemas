import React from 'react'
import { useState, useEffect } from 'react'
import CinemaService from '../../service/CinemaService';

import { MapPinIcon } from "@heroicons/react/24/outline"
import Loading from '../../components/Loading';
import Cinema from '../../components/Cinema';
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
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 mx-4 cursor-default'>
                        {
                            allCinema.map((item, index) => (
                                <div key={`cinema-${index}`} className='bg-slate-700 md:w-[364px] lg:w-[330px] xl:w-72 flex flex-col justify-between'>
                                    <Cinema cinemaName={item.cinemaName} location={item.location} urlLocation={item.urlLocation} />
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
