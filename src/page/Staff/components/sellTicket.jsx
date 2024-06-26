import React from 'react'
import Slider from '../../../components/Slider'
import MovieSlider from '../../../components/Slider2'

function SellTicket({ nowPlayingMovie }) {
    return (
        <div className=''>
            <div className='border-2 h-full'>
                <div className='h-full relative'>

                    <div className='relative px-8 pb-8'>
                        <div className='w-full'>
                            <Slider movies={nowPlayingMovie} />
                        </div>
                    </div>
                    <div className='relative px-4 pb-8'>
                        <h2 className='text-3xl font-bold text-white pb-4'>Danh sách phim đang chiếu</h2>

                        <div className='loader1 absolute left-0 w-full'></div>
                        <div className='pt-6 pb-8 px-4 bg-slate-200 bg-opacity-20 rounded-xl'>
                            <MovieSlider movies={nowPlayingMovie} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SellTicket
