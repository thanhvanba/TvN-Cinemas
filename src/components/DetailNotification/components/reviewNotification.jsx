import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'

function ReviewNotification({ notification }) {
    return (
        <>
            <div className="relative px-2 pb-2 md:px-4 md:pb-2 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                <h3 className="relative text-lg">
                    [{notification?.notification?.title}]
                </h3>
                <div className='px-2'>
                    <h3 className='text-center mt-4'>Thông tin chi tiết</h3>
                    <div className='space-y-4'>
                        <div>
                            <p className="text-2xl text-emerald-600 font-semibold">{notification?.notification?.detailData?.movieName}</p>
                        </div>

                        <div className='flex justify-between'>
                            <div>
                                <p className='font-light'>Đánh giá</p>
                                <p className="font-semibold text-cyan-600">{notification?.notification?.detailData?.comment ? notification?.notification?.detailData?.comment : "-"}</p>
                            </div>
                            <div>
                                <p className='font-light'>Số sao</p>
                                <div className='flex'>
                                    {(notification?.notification?.detailData?.rating || notification?.notification?.detailData?.rating != 0) && <StarIcon className='h-6 text-amber-400 px-1' />}
                                    <span className='w-[30px] flex text-start'>{notification?.notification?.detailData?.rating ? notification?.notification?.detailData?.rating : "-"}</span>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <p className='font-light'>Người đánh giá</p>
                            <p className="text-xl font-semibold text-cyan-600">{notification?.notification?.detailData?.userName ? notification?.notification?.detailData?.userName : "-"}</p>
                        </div>
                    </div>

                </div>
            </div>
            {!notification && <div className='h-96'></div>}
        </>
    )
}

export default ReviewNotification
