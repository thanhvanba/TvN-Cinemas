import React from 'react'
import TicketNotification from './components/ticketNotification'
import { XMarkIcon } from '@heroicons/react/20/solid'
import ReviewNotification from './components/reviewNotification'
import ProductNotification from './components/productNotification'
import Loading from '../Loading'

function DetailNotification({ notification, setShowDetailNotification, setNotification, loadingDetail }) {
    return (
        <div className={`${notification?.notification?.type === "LOW_STOCK" ? 'w-[22%]' : 'w-[28%]'} relative z-50 overflow-hidden bg-slate-300 rounded-md`}>
            <h4 className="font-bold text-2xl p-2 border-b-2 border-slate-400 text-black">Chi tiết thông báo</h4>
            <div className='flex justify-center absolute mx-auto w-full h-full top-0 right-0 z-10'>
                {loadingDetail && <Loading />}
            </div>
            {!loadingDetail ?
                <>
                    <div className='rounded-xl bg-slate-100 w-1/2 z-10'>
                        <button
                            type="button"
                            className="absolute top-1 right-1 z-50"
                        >
                            <span className="sr-only">Close menu</span>
                            <div
                                className='p-1 border-2 rounded-lg shadow-inner hover:bg-red-600 hover:text-zinc-50 text-red-700'
                                onClick={() => {
                                    setNotification([])
                                    setShowDetailNotification(false)
                                }}
                            >
                                <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                            </div>
                        </button>
                    </div>
                    {(notification?.notification?.type === "BOOKING_SUCCESS" || notification?.notification?.type === "TICKET_STATUS") ?
                        <TicketNotification notification={notification} />
                        : notification?.notification?.type === "REVIEW" ?
                            <ReviewNotification notification={notification} />
                            : <ProductNotification notification={notification} />
                    }
                    <div className='px-4 flex justify-end z-50'>
                        <button
                            className="w-1/4 mb-4 z-50 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                            type='button'
                            onClick={() => {
                                setNotification([])
                                setShowDetailNotification(false)
                            }}
                        >
                            OK
                        </button>
                    </div>
                </>
                : <div className='h-96'>

                </div>
            }
        </div>
    )
}

export default DetailNotification
