import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react'
import { useState } from 'react';
import getSrcYoutube from '../../utils/GetSrcYoutube';

function Trailer({ showTrailer, closeTrailer, movie }) {

    return (
        <>
            {/* Hiển thị video khi showTrailer là true */}
            {showTrailer && (
                <div className='flex justify-center items-center bg-black bg-opacity-50 w-full h-screen right-0 bottom-0 fixed z-20'>
                    <div className='relative rounded-xl bg-slate-100 w-1/2 z-10'>
                        <div className="relative w-full h-0 pb-[56.25%]">
                            <iframe
                                title={`${movie.title} Trailer`}
                                className="absolute top-0 left-0 w-full h-full"
                                src={getSrcYoutube(movie.trailerLink)}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                            {/* Nút đóng ở góc phải trên của iframe */}
                            <button
                                className="absolute -top-8 -right-8 text-white cursor-pointer"
                                onClick={closeTrailer}
                            >
                                <XMarkIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Trailer
