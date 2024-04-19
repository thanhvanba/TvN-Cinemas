import React, { useState } from 'react'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import UserService from '../../../../service/UserService'
import AdminService from '../../../../service/AdminService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useLoadingState from '../../../../hook/UseLoadingState'

const Fare = () => {
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
        <div className=" w-3/5 z-10 overflow-hidden bg-slate-300 rounded-md right-1/2 ">
            <h4 className="font-bold text-3xl p-2 border-b-2 border-slate-400">Chỉnh sửa giá vé</h4>

            <div className="relative px-4 pb-2 md:px-6 md:pb-2 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                {/* <div className='flex justify-center absolute mx-auto w-full h-full top-0 right-0 z-10'>
                        {loading['ticket'] && <Loading />}
                    </div> */}
                <div className="relative my-4">
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
                        className="w-1/4 text-[18px] rounded-xl hover:bg-emerald-800 hover:text-white text-white bg-emerald-600 py-2 transition-colors duration-300 z-50"
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
    )
}

export default Fare
