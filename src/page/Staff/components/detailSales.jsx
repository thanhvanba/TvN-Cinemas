import { XMarkIcon } from '@heroicons/react/20/solid';
import { DatePicker } from 'antd'
import React, { useEffect } from 'react'
import CreateSeat from '../../../components/CreateSeat';
import screen from "../../../images/screen.webp"
import { useState } from 'react';
import popcorn from '../../../images/popcorn.png'
import Button from '../../admin/ListProduct/components/button';
import ChairType from '../../../components/ChairType';
import Modal from '../../../utils/Modal';
import SearchUser from './searchUser';
import ConvertStringFollowFormat from '../../../utils/ConvertStringFollowFormat';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../../service/UserService';
import dayjs from 'dayjs';
import FormatDataTime from '../../../utils/FormatDataTime';
import { format } from 'date-fns';

function DetailSales() {
    const { movieId } = useParams()
    const { getShowtimeByMovieApi } = UserService()

    const navigate = useNavigate()
    const [createSeatData, setCreateSeatData] = useState({})
    // const [colSeat, setColSeat] = useState()
    const [allShowtime, setAllShowtime] = useState([])
    console.log("🚀 ~ DetailSales ~ allShowtime:", allShowtime)
    const [selectSeats, setSelectSeats] = useState([])
    const [toggle, setToggle] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)
    const [modalStates, setModalStates] = useState(false)
    const currentDateTime = new Date();
    const [selectDateTime, setSelectDateTime] = useState(dayjs(currentDateTime.toISOString(), "YYYY-MM-DD"));

    const handleToggle = () => {
        setToggle(true)
        setModalStates(false)
    }

    const handleCloseModal = () => {
        setModalStates(false)
        setModalStates(false)
        navigate('/staff/info-ticket')
    }

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


    const generateSeatData = CreateSeat(createSeatData.rowSeat, createSeatData.colSeat, createSeatData.showTimeId, createSeatData.dataTime);
    const seatData = generateSeatData()

    const handleSelectDate = (date, dateString) => {
        setSelectDateTime(dateString);
    };

    const hadleGetItem = async (movieId) => {
        let resShowtime = await getShowtimeByMovieApi(movieId);
        if (resShowtime && resShowtime.data && resShowtime.data.result) {
            const newShowtimes = [];
            resShowtime.data.result.forEach(item => {
                if (item.status === "SHOWING") {
                    item.schedules.forEach(schedule => {
                        if (FormatDataTime(schedule.date).date === selectDateTime) {
                            newShowtimes.push({
                                rowSeat: item.room.rowSeat,
                                colSeat: item.room.colSeat,
                                showTimeId: item.showTimeId,
                                dataTime: { time: schedule.startTime, scheduleId: schedule.scheduleId },
                                startTime: schedule.startTime,
                                endTime: schedule.endTime,
                                roomName: item.room.roomName,
                                cinemaName: item.room.cinema.cinemaName,
                            });
                        }
                    });
                }
            });
            setAllShowtime(newShowtimes.sort((a, b) => {
                // Lấy giờ bắt đầu từ startTime của mỗi đối tượng
                const startTimeA = a.startTime;
                const startTimeB = b.startTime;

                // So sánh theo thứ tự tăng dần của giờ bắt đầu
                if (startTimeA < startTimeB) return -1;
                if (startTimeA > startTimeB) return 1;
                return 0;
            }));
        }
    };

    useEffect(() => {
        hadleGetItem(movieId)
    }, [selectDateTime]);
    return (
        <div className='px-4'>
            <div className='pb-4'>
                <h2 className='font-semibold text-3xl text-yellow-200 pt-4'>Danh sách xuất chiếu</h2>
                <DatePicker
                    defaultValue={selectDateTime}
                    onChange={handleSelectDate}
                    format='DD/MM/YYYY'
                    className="-m-2 bg-transparent border-none focus-within:bg-transparent hover:bg-transparent font-semibold text-gray-50 text-xl w-1/4"
                />
            </div>
            <ul className='grid grid-cols-6 gap-4'>
                {
                    allShowtime && allShowtime.map(item => (
                        <li
                            className={`${createSeatData.startTime === item.startTime ? "border-orange-500" : ""} border-[3px] hover:bg-slate-300  bg-slate-200 rounded-xl px-4 py-2 font-semibold cursor-pointer opacity-80`}
                            onClick={() => {
                                setCreateSeatData(item)
                            }}

                        >
                            <p><span>{format(new Date(`1970-01-01T${item.startTime}`), "HH:mm")}</span> - <span>{format(new Date(`1970-01-01T${item.endTime}`), "HH:mm")}</span></p>
                            <p>Phòng: <span>{item.roomName}</span></p>
                            <p>Rạp: <span>{item.cinemaName}</span></p>
                        </li>
                    ))
                }
            </ul>
            <div className='flex relative'>
                <div className='w-3/4'>
                    <h2 className='font-semibold text-3xl text-yellow-200 pt-8 pb-4'>Sơ đồ ghế</h2>
                    <div className='pb-28'>
                        {/* Màn hình */}
                        <div className='flex justify-center'>
                            <img className='w-full' src={screen} alt="" />
                        </div>

                        {/* Sơ đồ ghế*/}
                        <div>
                            {/* Tên phòng */}
                            <div className='text-center text-2xl font-bold text-gray-50 mb-6'>
                                Phòng chiếu
                                <span>&nbsp;{createSeatData.roomName || '***'}</span>
                            </div>
                            {/*  Sơ đồ*/}
                            <div className='flex justify-center'>
                                <div className='grid gap-1 mx-2 md:mx-4 lg:mx-12 xl:mx-28'
                                    style={{ gridTemplateColumns: `repeat(${createSeatData.colSeat}, minmax(0, 1fr))`, maxWidth: `${44 * createSeatData.colSeat}px` }}
                                >
                                    {seatData.map(seat => (
                                        <div
                                            key={seat.id}
                                            className={`${seat.type} ${selectSeats.some(item => item.seatId === seat.id) ? 'select' : ''} 
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
                        <ChairType />
                    </div>
                </div>
                <div className='w-1/4 my-60 bg-slate-300 rounded-xl h-full relative'>
                    <div className='absolute -top-24 right-1/3 bg-orange-50 hover:bg-orange-200 border-2 border-orange-500 opacity-80 rounded-lg w-24 h-16'>
                        <Button click={() => setOpenProduct(!openProduct)} img={popcorn} title={"Chọn sản phẩm"} />
                    </div>
                    {openProduct &&
                        <div className='flex justify-center items-center bg-black bg-opacity-50 w-full h-screen right-0 bottom-0 fixed z-20'>
                            <div className='relative block bg-slate-300 cyan-200 rounded-3xl h-auto w-1/2 text-slate-900 mt-16'>
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 z-50"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <div
                                        className='p-1 border-2 rounded-lg shadow-inner hover:bg-red-600 hover:text-zinc-50 text-red-700'
                                        onClick={() => setOpenProduct(!openProduct)}
                                    >
                                        <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                                    </div>
                                </button>
                                <ul>
                                    {/* nước lọc */}
                                    <li>
                                        <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Nước lọc</h2>
                                        {
                                            // listWater.every(item => item.quantity === 0) ? (
                                            //     <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                            // ) : (
                                            //     listWater.map((item, index) => (
                                            <div className='flex items-center'>
                                                <p className='text-sm sm:text-2xl p-3 sm:p-4'>{1}</p>
                                                <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                    <h3 className='py-1 text-base sm:text-xl'>{`item.name`}</h3>
                                                    <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                        Giá :
                                                        <span className='text-cyan-600'> {`formatPrice(item.price)`} <sup>đ</sup> </span>
                                                    </div>
                                                </div>
                                                {/* <NumberSpinner
                                                        idPerItem={item.foodId}
                                                        pricePerItem={item.price}
                                                        listFoodBooking={listFoodBooking}
                                                        setListFoodBooking={setListFoodBooking}
                                                        foods={foods}
                                                        setFoods={setFoods}
                                                    /> */}
                                            </div>
                                            //     ))
                                            // )
                                        }
                                    </li>
                                    {/* bắp rang */}
                                    <li>
                                        <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Bắp rang</h2>
                                        {
                                            // listPopcorn.every(item => item.quantity === 0) ? (
                                            //     <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                            // ) : (
                                            //     listPopcorn.map((item, index) => (
                                            <div className='flex items-center'>
                                                <p className='text-sm sm:text-2xl p-3 sm:p-4'>{`index + 1`}</p>
                                                <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                    <h3 className='py-1 text-base sm:text-xl'>{`item.name`}</h3>
                                                    <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                        Giá :
                                                        <span className='text-cyan-600'> {`formatPrice(item.price)`} <sup>đ</sup> </span>

                                                    </div>
                                                </div>
                                                {/* <NumberSpinner
                                                        idPerItem={item.foodId}
                                                        pricePerItem={item.price}
                                                        listFoodBooking={listFoodBooking}
                                                        setListFoodBooking={setListFoodBooking}
                                                        foods={foods}
                                                        setFoods={setFoods}
                                                    /> */}
                                            </div>
                                            //     ))
                                            // )
                                        }
                                    </li>
                                    {/* nước ngọt */}
                                    <li>
                                        <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Nước Ngọt</h2>
                                        {
                                            // listSoda.every(item => item.quantity === 0) ? (
                                            //     <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                            // ) : (
                                            //     listSoda.map((item, index) => (
                                            <div className='flex items-center'>
                                                <p className='text-sm sm:text-2xl p-3 sm:p-4'>{`index + 1`}</p>
                                                <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                    <h3 className='py-1 text-base sm:text-xl'>{`item.name`}</h3>
                                                    <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                        Giá :
                                                        <span className='text-cyan-600'> {`formatPrice(item.price)`} <sup>đ</sup> </span>

                                                    </div>
                                                </div>
                                                {/* <NumberSpinner
                                                        idPerItem={item.foodId}
                                                        pricePerItem={item.price}
                                                        listFoodBooking={listFoodBooking}
                                                        setListFoodBooking={setListFoodBooking}
                                                        foods={foods}
                                                        setFoods={setFoods}
                                                    /> */}
                                            </div>
                                            //     ))
                                            // )
                                        }
                                    </li>
                                    {/* khác */}
                                    <li>
                                        <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Khác</h2>
                                        {
                                            // listSnacks.every(item => item.quantity === 0) ? (
                                            //     <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                            // ) : (
                                            //     listSnacks.map((item, index) => (
                                            <div className='flex items-center'>
                                                <p className='text-sm sm:text-2xl p-3 sm:p-4'>{`index + 1`}</p>
                                                <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                    <h3 className='py-1 text-base sm:text-xl'>{`item.name`}</h3>
                                                    <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                        Giá :
                                                        <span className='text-cyan-600'> {`formatPrice(item.price)`} <sup>đ</sup> </span>

                                                    </div>
                                                </div>
                                                {/* <NumberSpinner
                                                        idPerItem={item.foodId}
                                                        pricePerItem={item.price}
                                                        listFoodBooking={listFoodBooking}
                                                        setListFoodBooking={setListFoodBooking}
                                                        foods={foods}
                                                        setFoods={setFoods}
                                                    /> */}
                                            </div>
                                            //     ))
                                            // )
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    {/* <h4 className="font-bold text-3xl p-2 border-b-2 border-slate-400">Chi tiết vé</h4>
                    <div className="relative px-3 pb-2 md:px-4 md:pb-2 rounded-2xl text-sm md:text-base text-slate-900">
                        <div className='flex justify-center absolute mx-auto w-full h-full top-0 right-0 z-10'>
                                {loading['ticket'] && <Loading />}
                            </div>
                        <div className='space-y-4'>
                            <div>
                                <p className="text-3xl pt-4 text-emerald-600 font-semibold">{`Đồ án tốt nghiệp`}</p>
                            </div>

                            <div>
                                <p className='font-light'>Ngày giờ chiếu</p>
                                <div className="flex items-center space-x-2 text-xl">
                                    <span className="font-bold text-orange-500">{`09:05`}</span>
                                    <span>-</span>
                                    <span className="font-bold">{`01/02/2024`}</span>
                                    <span>({`90`} phút)</span>
                                </div>
                            </div>

                            <div>
                                <p className='font-light'>Rạp chiếu</p>
                                <p className="font-semibold text-xl">{`Quận 9`}</p>
                            </div>

                            <div className="flex gap-10">
                                <div className="w-3/5">
                                    <p className='font-light'>Ghế</p>
                                    <p className="font-semibold text-xl">{ticketDetail && ticketDetail.seats && ticketDetail.seats.map(seat => (
                                            <span>&nbsp;{String.fromCharCode(65 + parseInt(seat.row, 10) - 1) + seat.column},</span>
                                        ))}</p>
                                </div>

                                <div className='w-2/5'>
                                    <p className='font-light'>Phòng chiếu</p>
                                    <p className="font-semibold text-xl">{`G1`}</p>
                                </div>
                            </div>

                            <div className='flex gap-10'>
                                <div className='w-3/5'>
                                    <p className='font-light'>Bắp nước</p>
                                    <p className="font-semibold text-xl w-full inline-block">
                                            {ticketDetail.foods && ticketDetail.foods.map((food, index) => (
                                                <p key={index}>&nbsp;{food},</p>
                                            ))}
                                        </p>
                                </div>
                                <div className='w-2/5'>
                                    <p className='font-light'>Giá tiền</p>
                                    <p className="font-semibold text-3xl text-cyan-600">{`908000`}</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="p-2 md:p-3 bg-slate-300 rounded-xl text-slate-900">
                        <h4 className="font-bold text-2xl">Thông tin thanh toán</h4>
                        <div>
                            <div className="my-2 ring-1 ring-gray-700 sm:mx-0 rounded-md">
                                <table className="min-w-full divide-y divide-gray-600">
                                    <thead className='border-b border-gray-700'>
                                        <tr>
                                            <th scope="col" className="px-3 py-3 text-left text-sm font-semibold">Danh mục</th>
                                            <th scope="col" className="px-3 py-3 w-[82px] text-left text-sm font-semibold">Số lượng</th>
                                            <th scope="col" className="px-3 py-3 w-20 text-left text-sm font-semibold">Đơn giá</th>
                                            {/* <th scope="col" className="px-3 py-3 text-left text-sm font-semibold">Tổng tiền</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            // bookingInfo && bookingInfo.seats && bookingInfo.seats.map(seatInfo => (
                                            <tr>
                                                <td className="relative px-3 py-2 text-sm">
                                                    <div className="font-medium text-slate-900">Ghế ({`G1`})</div>
                                                </td>
                                                <td className="px-3 py-2 text-sm">1</td>
                                                <td className="px-3 py-2 text-sm">{`seatIprice`}</td>
                                                {/* <td className="px-3 py-3 text-sm">{`seatInfe`}</td> */}
                                            </tr>
                                            // ))
                                        }
                                        {
                                            // bookingInfo && bookingInfo.foods && bookingInfo.foods.map(foodInfo => (
                                            <tr>
                                                <td className="relative px-3 py-2 text-sm">
                                                    <div className="font-medium text-slate-900">{`foonfo`}</div>
                                                </td>
                                                <td className="px-3 py-2 text-sm">{`foont`}</td>
                                                <td className="px-3 py-2 text-sm">{`100.000`}<sup>đ</sup></td>
                                                {/* <td className="px-3 py-3 text-sm">{`foonfo.food`}</td> */}
                                            </tr>
                                            // ))

                                        }
                                        {
                                            // bookingInfo && bookingInfo.foods && bookingInfo.foods.map(foodInfo => (
                                            <tr>
                                                <td className="relative px-3 py-2 text-sm">
                                                    <div className="font-medium text-slate-900">{`foonfo`}</div>
                                                </td>
                                                <td className="px-3 py-2 text-sm">{`foont`}</td>
                                                <td className="px-3 py-2 text-sm">{`100.000`}<sup>đ</sup></td>
                                                {/* <td className="px-3 py-3 text-sm">{`foonfo.food`}</td> */}
                                            </tr>
                                            // ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='text-slate-900 border-t-2 border-t-slate-400 mt-4  text-md pl-4 sm:pl-0'>
                                <div className='flex justify-end mt-4'>
                                    <p className='text-xl'>
                                        Tổng tiền :
                                        <span>
                                            {ConvertStringFollowFormat(
                                                // selectSeats.map(item => item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
                                                // foods.map(item => item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                                                10000000
                                            )}
                                            <sup>đ</sup>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute flex justify-center w-full bottom-4'>
                    <button
                        onClick={() => setModalStates(true)}
                        className="w-1/6 text-slate-200 p-4 rounded-xl hover:bg-emerald-800 bg-emerald-600 outline-none"
                        type="button"
                    // disabled={loading}
                    >
                        {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                        &nbsp;Xác Nhận
                    </button>
                </div>
                <div>
                    {modalStates && (
                        <Modal
                            isOpen={modalStates}
                            onClose={() => setModalStates(false)}
                            onConfirm={() => handleToggle()}
                            onCancel={() => handleCloseModal()}
                            title='Kiểm tra thông tin tài khoản'
                            content='Khách hàng mua vé hiện tại đã có tài khoản chưa ?'
                            buttonName='Đã có'
                            buttonCancel='Chưa có'
                        />
                    )}
                </div>
                {toggle &&
                    <SearchUser onToggle={setToggle} />
                }
            </div>

        </div >
    )
}

export default DetailSales
