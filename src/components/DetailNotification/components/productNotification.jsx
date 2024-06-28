import React from 'react'

function ProductNotification({ notification }) {
    return (
        <>
            <div className="relative px-2 pb-2 md:px-4 md:pb-2 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                <h3 className="relative text-lg">
                    [{notification?.notification?.title}]
                </h3>
                <p className='text-center font-light py-3'>
                    {notification?.notification?.message}
                    <div className='flex justify-center '>
                        <p className='w-20 border-b-2 border-b-slate-400'></p>
                    </div>
                </p>
                {(notification?.notification?.detailData !== null && notification?.notification?.type !== 'PROMOTION' && notification?.notification?.type !== 'ORTHER' && notification?.notification?.type !== 'TICKET_REMINDER') &&
                    <div className='px-2'>
                        <h3 className='text-center mt-4 font-medium'>Thông tin chi tiết</h3>
                        <div className='flex justify-between'>
                            <img className='h-20' src={notification?.notification?.detailData?.food?.image} alt="" />
                            <div>
                                <div>
                                    <p className="text-2xl text-emerald-600 font-semibold">{notification?.notification?.detailData?.food?.name}</p>
                                </div>
                                <div className='flex'>
                                    <p className='font-light'>Số lượng:</p>
                                    <p className="pl-3 font-semibold text-cyan-600">{notification?.notification?.detailData?.quantity}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
            {!notification && <div className='h-96'></div>}
        </>
    )
}

export default ProductNotification
