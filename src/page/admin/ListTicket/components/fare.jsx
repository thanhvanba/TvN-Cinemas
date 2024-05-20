import React, { useState } from 'react'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import UserService from '../../../../service/UserService'
import AdminService from '../../../../service/AdminService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useLoadingState from '../../../../hook/UseLoadingState'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Fare = ({ onLoading }) => {
    const { getSeatPriceApi } = UserService()
    const { updatePriceSeatApi } = AdminService()

    const { loading, setLoading } = useLoadingState(false)
    const [fare, setFare] = useState({})

    const handleGetSeatPrice = async (type) => {
        let resPrice = await getSeatPriceApi(type)
        if (resPrice && resPrice.data && resPrice.data.result) {
            setFare(resPrice.data.result)
        }
    }

    const handleUpdateSeatPrice = async () => {
        setLoading('confirm', true)
        const data = { type: fare.type, price: fare.price }
        await updatePriceSeatApi(data, fare.priceId)
        setLoading('confirm', false)
    }

    const ticketTypes = ["NORMAL", "VIP", "COUPLE"]

    const handleSelectChange = (selectedValue) => {
        handleGetSeatPrice(selectedValue)
        setFare({ ...fare, type: selectedValue })
    }
    return (
        <div className='flex justify-center items-center bg-black bg-opacity-30 w-full h-screen right-0 bottom-0 fixed z-20'>
            <div className="relative w-1/3 z-10 overflow-hidden bg-slate-300 rounded-md">
                <h4 className="font-bold text-3xl p-2 border-b-2 border-slate-400">Chỉnh sửa giá vé</h4>
                <div className=' rounded-xl bg-slate-100 w-1/2 z-10'>
                    <button
                        type="button"
                        className="absolute top-1 right-1 z-50"
                    >
                        <span className="sr-only">Close menu</span>
                        <div
                            className='p-1 border-2 rounded-lg shadow-inner hover:bg-red-600 hover:text-zinc-50 text-red-700'
                            onClick={() => onLoading('fare', false)}
                        >
                            <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                        </div>
                    </button>
                </div>
                <div className="relative px-4 pb-2 md:px-6 md:pb-2 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                    {/* <div className='flex justify-center absolute mx-auto w-full h-full top-0 right-0 z-10'>
                        {loading['ticket'] && <Loading />}
                    </div> */}
                    <div className="relative my-4 z-30">
                        <label
                            htmlFor=""
                            className="block text-lg font-medium leading-6 text-gray-900"
                        >
                            Chọn loại vé
                        </label>
                        <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                            <SelectMenu onSelectChange={handleSelectChange} items={ticketTypes} content={"-------Select-------"} />
                        </div>
                    </div>
                    <div className="relative my-4">
                        <label
                            htmlFor=""
                            className="block text-lg font-medium leading-6 text-gray-900"
                        >
                            Giá tiền
                        </label>
                        <input
                            onChange={e => setFare({ ...fare, price: e.target.value })}
                            type="text"
                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            value={fare.price}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            className="w-1/4 text-[18px] rounded-xl hover:bg-emerald-800 hover:text-white text-white bg-emerald-600 py-2 transition-colors duration-300"
                            type='button'
                            // disabled={loading['change']}
                            onClick={() => {
                                handleUpdateSeatPrice()
                            }}
                        >
                            {loading['confirm'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                            &nbsp;Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fare
