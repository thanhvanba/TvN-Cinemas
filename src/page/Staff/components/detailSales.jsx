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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserService from '../../../service/UserService';
import dayjs from 'dayjs';
import FormatDataTime from '../../../utils/FormatDataTime';
import { format, isAfter, parse } from 'date-fns';
import Loading from '../../../components/Loading'
import background from "../../../images/movie-details-bg.jpg"
import NumberSpinner from '../../../utils/NumberSpinner';
import { list } from '@material-tailwind/react';
import useLoadingState from '../../../hook/UseLoadingState';
import Load from '../../../components/Load'
import SeatImage from '../../../images/section.jpg'

function DetailSales() {
    const { movieId } = useParams()
    const location = useLocation()
    const { movieName } = location.state || {}
    const { getShowtimeByMovieApi, getFoodApi, selectSeatApi, getSeatPriceApi } = UserService()

    const navigate = useNavigate()
    const [selectSchedule, setSelectSchedule] = useState({})
    const { loading, setLoading } = useLoadingState(false)
    const [allShowtime, setAllShowtime] = useState([])
    const [showtimeByMovie, setShowtimeByMovie] = useState([])
    const [selectSeats, setSelectSeats] = useState([])
    const [toggle, setToggle] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)
    const [modalStates, setModalStates] = useState(false)
    const [checkIsTimeInFuture, setCheckIsTimeInFuture] = useState(true)
    const [listWater, setListWater] = useState([])
    const [listSoda, setListSoda] = useState([])
    const [listPopcorn, setListPopcorn] = useState([])
    const [listSnacks, setListSnacks] = useState([])

    const [foods, setFoods] = useState([])
    const [listSeatBooking, setListSeatBooking] = useState([])
    const [listFoodBooking, setListFoodBooking] = useState([])
    const currentDateTime = dayjs(new Date());
    const [selectDateTime, setSelectDateTime] = useState(currentDateTime);

    const handleSelectSeat = async (seatId, type) => {
        if (type != "booked") {
            const row = seatId.charCodeAt(0) - 65 + 1; // Lấy giá trị Unicode của ký tự và trừ đi giá trị Unicode của 'A' + 1
            const seatNum = parseInt(seatId?.slice(1), 10); // Lấy phần số từ seatLabel
            const existingIndex = selectSeats.findIndex(seat => seat.seatId === seatId);
            const resPrice = await getSeatPriceApi(type)
            if (resPrice && resPrice.data && resPrice.data.result) {
                const price = resPrice.data.result.price
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
                        price: price,
                        row: row,
                        column: seatNum,
                        scheduleId: selectSchedule?.dataTime?.scheduleId
                    }]);
                }
            }
        }
    }

    const handleSelectSeatApi = async () => {
        setLoading('selectSeat', true);
        const data = selectSeats;
        let res = await selectSeatApi(data, selectSchedule.showTimeId)
        if (res && res.data && res.data.result) {
            setListSeatBooking(res.data.result.seatIds)
        }
        setLoading('selectSeat', false);
    }
    const [listSeatBooked, setListSeatBooked] = useState([]);
    const [loadSeatBooked, setLoadSeatBooked] = useState(false);
    const { getSeatBookedApi } = UserService();

    const handleGetSeatBooked = async () => {
        setLoadSeatBooked(true)
        const params = {
            showtimeId: selectSchedule?.showTimeId,
            scheduleId: selectSchedule?.dataTime.scheduleId || ""
        };
        let resSeat = await getSeatBookedApi(params);
        if (resSeat && resSeat.data && resSeat.data.result) {
            setListSeatBooked(resSeat.data.result);
        }
        setLoadSeatBooked(false)
    };

    useEffect(() => {
        selectSchedule?.showTimeId && selectSchedule?.dataTime.scheduleId &&
            handleGetSeatBooked();
    }, [selectSchedule?.dataTime]); // Theo dõi sự thay đổi của showtimeId và dateTime

    const seatData = CreateSeat(selectSchedule?.rowSeat, selectSchedule?.colSeat, listSeatBooked);

    const handleSelectDate = (date, dateString) => {
        date && setSelectDateTime(date);
    };

    const handleGetShowtimeByMovie = async (movieId) => {
        setLoading('getItem', true)
        let resShowtime = await getShowtimeByMovieApi(movieId);
        if (resShowtime && resShowtime.data && resShowtime.data.result) {
            setShowtimeByMovie(resShowtime.data.result)
        }

        setLoading('getItem', false)
    }
    const hadleGetItem = () => {
        setLoading('getItem', true)
        let isTimeInFuture
        const newShowtimes = [];
        //Lọc lịch chiếu theo rạp
        if (showtimeByMovie) {
            let hasFutureScheduleBeenSet = false;

            showtimeByMovie.filter(item => item.room.cinema.cinemaId === localStorage.getItem('cinemaId')).forEach(item => {
                if (item.status === "SHOWING") {
                    item.schedules.forEach(schedule => {
                        if (schedule.date === dayjs(selectDateTime.toISOString()).format("YYYY-MM-DD")) {
                            //Lấy danh sách xuất chiếu theo ngày
                            newShowtimes.push({
                                rowSeat: item.room.rowSeat,
                                colSeat: item.room.colSeat,
                                showTimeId: item.showTimeId,
                                dataTime: { time: schedule.startTime, scheduleId: schedule.scheduleId },
                                startTime: schedule.startTime,
                                endTime: schedule.endTime,
                                roomName: item.room.roomName,
                                cinemaName: item.room.cinema.cinemaName,
                                poster: item.movie.poster,
                                movieId: item.movie.movieId,
                                movieName: item.movie.title,
                                duration: item.movie.duration,
                            });
                            const currentDateTime = new Date();
                            const dateTime = parse(`${schedule.date} ${schedule.startTime}`, 'yyyy-MM-dd HH:mm:ss', new Date());
                            isTimeInFuture = isAfter(dateTime, currentDateTime);
                            if (!hasFutureScheduleBeenSet) {  // Check the flag
                                if (isTimeInFuture) {
                                    setSelectSchedule({
                                        rowSeat: item.room.rowSeat,
                                        colSeat: item.room.colSeat,
                                        showTimeId: item.showTimeId,
                                        dataTime: { time: schedule.startTime, scheduleId: schedule.scheduleId },
                                        startTime: schedule.startTime,
                                        endTime: schedule.endTime,
                                        roomName: item.room.roomName,
                                        cinemaName: item.room.cinema.cinemaName,
                                        poster: item.movie.poster,
                                        movieId: item.movie.movieId,
                                        movieName: item.movie.title,
                                        duration: item.movie.duration,
                                    });
                                    hasFutureScheduleBeenSet = true;  // Update the flag
                                } else {
                                    setSelectSchedule({});
                                }
                            }
                        }
                    });
                }
            });
            let listShowtime = newShowtimes.sort((a, b) => {
                // Lấy giờ bắt đầu từ startTime của mỗi đối tượng
                const startTimeA = a.startTime;
                const startTimeB = b.startTime;

                // So sánh theo thứ tự tăng dần của giờ bắt đầu
                if (startTimeA < startTimeB) return -1;
                if (startTimeA > startTimeB) return 1;
                return 0;
            })

            if (isTimeInFuture === false) {
                setSelectSchedule(listShowtime[0]);
            }

            setAllShowtime(listShowtime);
        }
        setLoading('getItem', false)
    };

    const handleGetFood = async (cinemaId) => {
        let resFood = await getFoodApi("BAP", '', '', cinemaId)
        let resFood1 = await getFoodApi("NUOCLOC", '', '', cinemaId)
        let resFood2 = await getFoodApi("NUOCNGOT", '', '', cinemaId)
        let resFood3 = await getFoodApi("ANVAT", '', '', cinemaId)
        if (resFood && resFood.data && resFood.data.result.content) {
            setListPopcorn(resFood.data.result.content.filter(item => item.quantity > 0))
        }
        if (resFood1 && resFood1.data && resFood1.data.result.content) {
            setListWater(resFood1.data.result.content.filter(item => item.quantity > 0))
        }
        if (resFood2 && resFood2.data && resFood2.data.result.content) {
            setListSoda(resFood2.data.result.content.filter(item => item.quantity > 0))
        }
        if (resFood3 && resFood3.data && resFood3.data.result.content) {
            setListSnacks(resFood3.data.result.content.filter(item => item.quantity > 0))
        }
    }

    const handleConfirm = () => {
        setToggle(true)
        setModalStates(false)
    }

    const handleCancel = () => {
        setModalStates(false)
        navigate('/staff/info-ticket', { state: { infoSchedule: selectSchedule, listSeatBooking: listSeatBooking, listFoodBooking: listFoodBooking, selectSeats: selectSeats, foods: foods } })
    }
    useEffect(() => {
        hadleGetItem()
    }, [selectDateTime, showtimeByMovie]);

    useEffect(() => {
        handleGetFood(localStorage.getItem('cinemaId'))
        handleGetShowtimeByMovie(movieId)
    }, [])
    return (
        <div className='px-4'>
            <h2 className='text-center text-3xl text-emerald-600 font-bold pt-3'>{movieName}</h2>
            <div className='pb-4'>
                <h2 className='font-semibold text-3xl text-yellow-200 pt-4'>Danh sách xuất chiếu</h2>
                <DatePicker
                    defaultValue={selectDateTime}
                    onChange={handleSelectDate}
                    format='DD/MM/YYYY'
                    className="-m-2 bg-transparent border-none focus-within:bg-transparent hover:bg-transparent font-semibold text-gray-50 text-xl w-1/4"
                />
            </div>
            {loading['getItem'] &&
                <div className='flex justify-center absolute mx-auto w-full h-[79vh] top-44 right-0 z-10'
                    style={{ backgroundImage: `url(${background})`, backgroundAttachment: "fixed" }}>
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-400 opacity-20"></div>
                    <Loading />
                </div>
            }
            {!loading['getItem'] &&
                <div className='h-full'>
                    {allShowtime && allShowtime?.length > 0 ?
                        <ul className='grid grid-cols-6 gap-4'>
                            {
                                allShowtime && allShowtime.map(item => {
                                    const currentDateTime = new Date();
                                    const dateTime = parse(`${dayjs(selectDateTime.toISOString()).format("YYYY-MM-DD")} ${item.startTime}`, 'yyyy-MM-dd HH:mm:ss', new Date());
                                    const isTimeInFuture = isAfter(dateTime, currentDateTime);
                                    return (
                                        <li
                                            className={`${isTimeInFuture ? 'text-gray-800 bg-white hover:bg-slate-100' : 'text-gray-500 bg-gray-300'} border-[3px] rounded-xl px-4 py-2 font-semibold cursor-pointer opacity-90 ${selectSchedule.startTime === item.startTime ? "border-orange-500" : ""} `}
                                            onClick={() => {
                                                setSelectSchedule(item)
                                                setCheckIsTimeInFuture(isTimeInFuture);
                                            }}

                                        >
                                            <p><span>{format(new Date(`1970-01-01T${item.startTime}`), "HH:mm")}</span> - <span>{format(new Date(`1970-01-01T${item.endTime}`), "HH:mm")}</span></p>
                                            <p>Phòng: <span>{item.roomName}</span></p>
                                            <p>Rạp: <span>{item.cinemaName}</span></p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        : <p className='text-gray-50 font-light text-center'>-- Chưa có xuất chiếu --</p>
                    }
                    <div className='flex relative h-full'>
                        <div className='w-3/4'>
                            <h2 className='font-semibold text-3xl text-yellow-200 pt-8 pb-4'>Sơ đồ ghế</h2>
                            {allShowtime && allShowtime?.length > 0 ?
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
                                            <span>&nbsp;{selectSchedule?.roomName || '***'}</span>
                                        </div>
                                        {/*  Sơ đồ*/}
                                        <div className='flex justify-center'>
                                            {loadSeatBooked ?
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${SeatImage})`,
                                                        backgroundPosition: 'center', // Vị trí ảnh nền sẽ được căn giữa
                                                        backgroundRepeat: 'no-repeat', // Ngăn lặp lại ảnh nền 
                                                        height: '400px',
                                                        width: '600px'
                                                    }}
                                                    className='flex justify-center items-center rounded-md'
                                                >
                                                    <Load />
                                                </div>
                                                :
                                                <div className='grid gap-1 mx-2 md:mx-4 lg:mx-12 xl:mx-28'
                                                    style={{ gridTemplateColumns: `repeat(${selectSchedule?.colSeat}, minmax(0, 1fr))`, maxWidth: `${44 * selectSchedule?.colSeat}px` }}
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
                                            }
                                        </div>
                                    </div>

                                    {/* Loại ghế */}
                                    <ChairType />
                                </div>
                                : <p className='text-gray-50 font-light text-center pb-[400px]'>-- Vui lòng chọn xuất chiếu --</p>
                            }
                        </div>
                        {allShowtime && allShowtime?.length > 0 &&
                            <>
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
                                                            listWater.every(item => item.quantity === 0) ? (
                                                                <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                                            ) : (
                                                                listWater.map((item, index) => (
                                                                    <div className='flex items-center'>
                                                                        <p className='text-sm sm:text-2xl p-3 sm:p-4'>{index + 1}</p>
                                                                        <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                                            <h3 className='py-1 text-base sm:text-xl'>{item.name}</h3>
                                                                            <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                                                Giá :
                                                                                <span className='text-cyan-600'> {ConvertStringFollowFormat(item.price)} <sup>đ</sup> </span>
                                                                            </div>
                                                                        </div>
                                                                        <NumberSpinner
                                                                            idPerItem={item.foodId}
                                                                            pricePerItem={item.price}
                                                                            listFoodBooking={listFoodBooking}
                                                                            setListFoodBooking={setListFoodBooking}
                                                                            foods={foods}
                                                                            setFoods={setFoods}
                                                                        />
                                                                    </div>
                                                                ))
                                                            )
                                                        }
                                                    </li>
                                                    {/* bắp rang */}
                                                    <li>
                                                        <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Bắp rang</h2>
                                                        {
                                                            listPopcorn.every(item => item.quantity === 0) ? (
                                                                <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                                            ) : (
                                                                listPopcorn.map((item, index) => (
                                                                    <div className='flex items-center'>
                                                                        <p className='text-sm sm:text-2xl p-3 sm:p-4'>{index + 1}</p>
                                                                        <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                                            <h3 className='py-1 text-base sm:text-xl'>{item.name}</h3>
                                                                            <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                                                Giá :
                                                                                <span className='text-cyan-600'> {ConvertStringFollowFormat(item.price)} <sup>đ</sup> </span>

                                                                            </div>
                                                                        </div>
                                                                        <NumberSpinner
                                                                            idPerItem={item.foodId}
                                                                            pricePerItem={item.price}
                                                                            listFoodBooking={listFoodBooking}
                                                                            setListFoodBooking={setListFoodBooking}
                                                                            foods={foods}
                                                                            setFoods={setFoods}
                                                                        />
                                                                    </div>
                                                                ))
                                                            )
                                                        }
                                                    </li>
                                                    {/* nước ngọt */}
                                                    <li>
                                                        <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Nước Ngọt</h2>
                                                        {
                                                            listSoda.every(item => item.quantity === 0) ? (
                                                                <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                                            ) : (
                                                                listSoda.map((item, index) => (
                                                                    <div className='flex items-center'>
                                                                        <p className='text-sm sm:text-2xl p-3 sm:p-4'>{index + 1}</p>
                                                                        <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                                            <h3 className='py-1 text-base sm:text-xl'>{item.name}</h3>
                                                                            <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                                                Giá :
                                                                                <span className='text-cyan-600'> {ConvertStringFollowFormat(item.price)} <sup>đ</sup> </span>

                                                                            </div>
                                                                        </div>
                                                                        <NumberSpinner
                                                                            idPerItem={item.foodId}
                                                                            pricePerItem={item.price}
                                                                            listFoodBooking={listFoodBooking}
                                                                            setListFoodBooking={setListFoodBooking}
                                                                            foods={foods}
                                                                            setFoods={setFoods}
                                                                        />
                                                                    </div>
                                                                ))
                                                            )
                                                        }
                                                    </li>
                                                    {/* khác */}
                                                    <li>
                                                        <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Khác</h2>
                                                        {
                                                            listSnacks.every(item => item.quantity === 0) ? (
                                                                <div className="p-4 text-center text-gray-500">Hiện không có hàng</div>
                                                            ) : (
                                                                listSnacks.map((item, index) => (
                                                                    <div className='flex items-center'>
                                                                        <p className='text-sm sm:text-2xl p-3 sm:p-4'>{index + 1}</p>
                                                                        <div className='px-3 sm:px-4 w-2/5 sm:w-1/2 md:w-3/5'>
                                                                            <h3 className='py-1 text-base sm:text-xl'>{item.name}</h3>
                                                                            <div className='px-2 py-1 text-slate-600 text-xs sm:text-base'>
                                                                                Giá :
                                                                                <span className='text-cyan-600'> {ConvertStringFollowFormat(item.price)} <sup>đ</sup> </span>

                                                                            </div>
                                                                        </div>
                                                                        <NumberSpinner
                                                                            idPerItem={item.foodId}
                                                                            pricePerItem={item.price}
                                                                            listFoodBooking={listFoodBooking}
                                                                            setListFoodBooking={setListFoodBooking}
                                                                            foods={foods}
                                                                            setFoods={setFoods}
                                                                        />
                                                                    </div>
                                                                ))
                                                            )
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
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
                                                            selectSeats && selectSeats.map(seatInfo => (
                                                                <tr>
                                                                    <td className="relative px-3 py-2 text-sm">
                                                                        <div className="font-medium text-slate-900">Ghế ({String.fromCharCode(65 + parseInt(seatInfo.row, 10) - 1) + seatInfo.column})</div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-sm">1</td>
                                                                    <td className="px-3 py-2 text-sm">{seatInfo.price}</td>
                                                                    {/* <td className="px-3 py-3 text-sm">{`seatInfe`}</td> */}
                                                                </tr>
                                                            ))
                                                        }
                                                        {
                                                            foods && foods.map(foodInfo => (
                                                                <tr>
                                                                    <td className="relative px-3 py-2 text-sm">
                                                                        <div className="font-medium text-slate-900">{foodInfo.name}</div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-sm">{foodInfo.count}</td>
                                                                    <td className="px-3 py-2 text-sm">{foodInfo.price}<sup>đ</sup></td>
                                                                    {/* <td className="px-3 py-3 text-sm">{`foonfo.food`}</td> */}
                                                                </tr>
                                                            ))

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
                                                                selectSeats.map(item => item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
                                                                foods.reduce((total, food) => {
                                                                    return total + (food.price * food.count);
                                                                }, 0)
                                                            )}
                                                            <sup>đ</sup>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {checkIsTimeInFuture &&
                                    <div className='absolute flex justify-center w-full bottom-4'>
                                        <button
                                            onClick={() => {
                                                setModalStates(true)
                                                handleSelectSeatApi()
                                            }}
                                            className="w-1/6 text-slate-200 p-4 rounded-xl hover:bg-emerald-800 bg-emerald-600 outline-none"
                                            type="button"
                                        // disabled={loading}
                                        >
                                            {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                                            &nbsp;Xác Nhận
                                        </button>
                                    </div>
                                }
                            </>
                        }
                        <div>
                            {modalStates && (
                                <Modal
                                    isOpen={modalStates}
                                    onClose={() => setModalStates(false)}
                                    onConfirm={() => handleConfirm()}
                                    onCancel={() => handleCancel()}
                                    title='Kiểm tra thông tin tài khoản'
                                    content='Khách hàng mua vé hiện tại đã có tài khoản chưa ?'
                                    buttonName='Đã có'
                                    buttonCancel='Chưa có'
                                />
                            )}
                        </div>
                        {toggle &&
                            <SearchUser infoSchedule={selectSchedule} listSeatBooking={listSeatBooking} listFoodBooking={listFoodBooking} selectSeats={selectSeats} foods={foods} onToggle={setToggle} />
                        }
                    </div>
                </div>
            }
        </div >
    )
}

export default DetailSales
