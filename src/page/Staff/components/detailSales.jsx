import { XMarkIcon } from '@heroicons/react/20/solid';
import { DatePicker } from 'antd'
import React from 'react'
import CreateSeat from '../../../components/CreateSeat';
import screen from "../../../images/screen.webp"
import { useState } from 'react';

function DetailSales() {
    const rowSeat = 10
    const colSeat = 17
    const generateSeatData = CreateSeat(rowSeat, colSeat, "", "");
    const seatData = generateSeatData();

    const [selectSeats, setSelectSeats] = useState([])

    const handleSelectSeat = async (seatId, type) => {
        if (type != "booked") {
            const row = seatId.charCodeAt(0) - 65 + 1; // Lấy giá trị Unicode của ký tự và trừ đi giá trị Unicode của 'A' + 1
            const seatNum = parseInt(seatId.slice(1), 10); // Lấy phần số từ seatLabel
            const existingIndex = selectSeats.findIndex(seat => seat.seatId === seatId);
            // const resPrice = await getSeatPriceApi(type)
            // if (resPrice && resPrice.data && resPrice.data.result) {
            //     const price = resPrice.data.result.price
            if (existingIndex !== -1) {
                // Nếu phần tử đã tồn tại trong mảng, xóa nó
                const updatedSeats = [...selectSeats];
                updatedSeats.splice(existingIndex, 1);
                setSelectSeats(updatedSeats);
            } else {
                // Nếu phần tử chưa tồn tại trong mảng, thêm nó vào
                setSelectSeats([...selectSeats, {
                    seatId: seatId,
                    priceType: type,
                    // price: price,
                    row: row,
                    column: seatNum,
                    // scheduleId: dateTime.scheduleId
                }]);
                // }
            }
        }
    }

    return (
        <div className='px-4'>
            <div className='pb-4'>
                <h2 className='font-semibold text-3xl pt-4'>Danh sách xuất chiếu</h2>
                <DatePicker
                    // onChange={handleSelectDate}
                    className="-m-2 bg-transparent border-none focus-within:bg-transparent hover:bg-transparent font-semibold text-xl w-1/4"
                />
            </div>
            <ul className='grid grid-cols-7 gap-4'>
                <li className='border-2 border-orange-500 bg-slate-200 rounded-xl px-4 py-2 font-semibold'>
                    <p><span>8:00</span> - <span>10:00</span></p>
                    <p>Phòng: <span>G1</span></p>
                    <p>Rạp: <span>Tvn Quận 9</span></p>
                </li>
                <li className='border-2 bg-slate-200 rounded-xl px-4 py-2 font-semibold'>
                    <p><span>8:00</span> - <span>10:00</span></p>
                    <p>Phòng: <span>G1</span></p>
                    <p>Rạp: <span>Tvn Quận 9</span></p>
                </li>
                <li className='border-2 bg-slate-200 rounded-xl px-4 py-2 font-semibold'>
                    <p><span>8:00</span> - <span>10:00</span></p>
                    <p>Phòng: <span>G1</span></p>
                    <p>Rạp: <span>Tvn Quận 9</span></p>
                </li>
                <li className='border-2 bg-slate-200 rounded-xl px-4 py-2 font-semibold'>
                    <p><span>8:00</span> - <span>10:00</span></p>
                    <p>Phòng: <span>G1</span></p>
                    <p>Rạp: <span>Tvn Quận 9</span></p>
                </li>
            </ul>

            <h2 className='font-semibold text-3xl pt-8 pb-4'>Sơ đồ ghế</h2>
            <div>
                {/* Màn hình */}
                <div className='flex justify-center'>
                    <img className='w-5/6' src={screen} alt="" />
                </div>

                {/* Sơ đồ ghế*/}
                <div>
                    {/* Tên phòng */}
                    <div className='text-center text-2xl font-bold text-gray-600 mb-6'>
                        Phòng chiếu
                        <span>&nbsp;{`G1`}</span>
                    </div>
                    {/*  Sơ đồ*/}
                    <div className='flex justify-center'>
                        <div className='grid gap-1 mx-6 sm:mx-12 md:mx-32 lg:mx-40 xl:mx-44'
                            style={{ gridTemplateColumns: `repeat(${colSeat}, minmax(0, 1fr))`, maxWidth: `${44 * colSeat}px` }}
                        >
                            {seatData.map(seat => (
                                <div
                                    key={seat.id}
                                    className={`${seat.type} 
                                    ${selectSeats.some(item => item.seatId === seat.id) ? 'select' : ''} 
                                    cursor-pointer flex justify-center items-center text-slate-200 h-6 w-6 sm:h-10 sm:w-10 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-xl`}
                                    onClick={() => handleSelectSeat(seat.id, seat.type)}
                                >
                                    {seat.type === "booked" ? <XMarkIcon className='text-slate-400 h-8' /> : seat.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loại ghế */}
                <div className='mt-10 grid grid-cols-3 lg:grid-cols-5 justify-center px-20'>
                    <div className='relative flex'>
                        <div className='absolute left-4 h-8 w-8 lg:h-10 lg:w-10 bg-slate-800 rounded-xl'>
                            <XMarkIcon className='text-slate-400' />
                        </div>
                        <p className='text-gray-600 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế đã đặt</p>
                    </div>
                    <div className='relative flex'>
                        <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-slate-800 rounded-xl' />
                        <p className='text-gray-600 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế thường</p>
                    </div>
                    <div className='relative flex'>
                        <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-orange-500 rounded-xl' />
                        <p className='text-gray-600 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế VIP</p>
                    </div>
                    <div className='relative flex'>
                        <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-pink-700 rounded-xl' />
                        <p className='text-gray-600 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế đôi</p>
                    </div>
                    <div className='relative flex'>
                        <div className='absolute left-4 lg:h-10 lg:w-10 h-8 w-8 bg-green-500 rounded-xl border-2 border-[#00e608]' />
                        <p className='text-gray-600 font-bold py-2 pl-16 text-xs sm:text-base'>Ghế đang chọn</p>
                    </div>
                </div>

                <div className='relative flex justify-end pt-4 pr-4 sm:pr-0 text-xs sm:text-2xl'>
                    <button
                        // onClick={() => {
                        //     handleSelectSeatApi();
                        //     navigate(`/${showtimeId}/order/bapnuoc`, { state: { dateTime: dateTime } })
                        // }}
                        className="absolute top-8 w-1/4 text-slate-200 p-4 rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600"
                        type="button"
                    // disabled={loading}
                    >
                        {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                        &nbsp;Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailSales
