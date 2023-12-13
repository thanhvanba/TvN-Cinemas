import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArmchairIcon, PopcornIcon, CreditCardIcon, InboxIcon } from 'lucide-react'
import screen from "../../images/screen.webp"
import { XMarkIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./index.css"
import formatPrice from "../../utils/ConvertStringFollowFormat"
import UserService from '../../service/UserService';
import { parse, format } from 'date-fns';

const OrderMovie = () => {
    const seatsPerRow = 14;
    const numRows = 10;

    const { getOneShowtimeApi, getFoodApi, getSeatBookedApi, selectSeatApi, bookingTicketApi, getSeatPriceApi, getFoodByIdApi } = UserService()

    const [loading, setLoading] = useState(false);
    const [foods, setFoods] = useState([])
    const [listWater, setListWater] = useState([])
    const [listSoda, setListSoda] = useState([])
    const [listPopcorn, setListPopcorn] = useState([])
    const [listSnacks, setListSnacks] = useState([])
    const [listSeatBooked, setListSeatBooked] = useState([])
    const [listSeatBooking, setListSeatBooking] = useState([])
    console.log("🚀 ~ file: index.jsx:27 ~ OrderMovie ~ listSeatBooking:", listSeatBooking)
    const [listFoodBooking, setListFoodBooking] = useState([])
    console.log("🚀 ~ file: index.jsx:29 ~ OrderMovie ~ listFoodBooking:", listFoodBooking)
    const [selectSeats, setSelectSeats] = useState([])
    console.log("🚀 ~ file: index.jsx:31 ~ OrderMovie ~ selectSeats:", selectSeats)
    const [infoTicket, setInfoTicket] = useState({})
    console.log("🚀 ~ file: index.jsx:28 ~ OrderMovie ~ infoTicket:", infoTicket)
    const [showtime, setShowtime] = useState({
        showTimeId: null,
        room: {
            roomId: null,
            cinema: {
                cinemaId: null,
                location: null,
                cinemaName: null,
                desc: null,
                status: null,
                urlLocation: null
            },
            roomName: null
        },
        movie: {
            movieId: null,
            title: null,
            director: null,
            genres: null,
            actor: null,
            releaseDate: null,
            desc: null,
            poster: null,
            trailerLink: null,
            duration: null,
            reviews: null,
            rating: 0,
            delete: false
        },
        timeStart: null,
        timeEnd: "2",
        status: null,
        listTimeShow: [
        ],
        seats: null,
        special: null
    })
    const [currentStep, useCurrentStep] = useState('1');
    const { pathname } = useLocation()

    //dùng location để lấy stateDatime được truyền từ movie
    const location = useLocation();
    const { dateTime } = location.state;
    const { showtimeId } = useParams();

    const steps = [
        {
            icon: <ArmchairIcon className='h-8 w-8' />,
            title: 'Chọn ghế',
            url: '/order/chonghe'
        },
        {
            icon: <PopcornIcon className='h-8 w-8' />,
            title: 'Bắp nước',
            url: '/order/bapnuoc'
        },
        {
            icon: <CreditCardIcon className='h-8 w-8' />,
            title: 'Thanh Toán',
            url: '/order/xacnhan'
        },
        {
            icon: <InboxIcon className='h-8 w-8' />,
            title: 'Thông tin vé',
            url: '/order/ve'
        },
    ];

    // Hàm tạo danh sách ghế ngồi
    const createSeatData = (rows, seatsPerRow) => {
        const seatData = [];
        let type;

        for (let row = 1; row <= rows; row++) {
            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                const seatLabel = String.fromCharCode(65 + row - 1) + seatNum;
                const isSeatBooked = listSeatBooked.find(
                    item => parseInt(item.row) === row && parseInt(item.column) === seatNum)
                if (isSeatBooked) {
                    type = "booked";
                } else if (row === 10) {
                    type = "COUPLE";
                } else if ((row < 4) || (seatNum < 3 || seatNum > 12)) {
                    type = "NORMAL";
                } else
                    type = "VIP";

                seatData.push({ id: seatLabel, label: seatLabel, type: type });
            }
        }

        return seatData;
    };
    const seatData = createSeatData(numRows, seatsPerRow);

    const navigate = useNavigate()

    const handleCheckPathname = (pathname) => {
        switch (pathname) {
            case `/${showtimeId}/order/chonghe`:
                useCurrentStep("1")
                break;
            case `/${showtimeId}/order/bapnuoc`:
                useCurrentStep("2")
                break;
            case `/${showtimeId}/order/xacnhan`:
                useCurrentStep("3")
                break;
            case `/${showtimeId}/order/ve`:
                useCurrentStep("4")
                break;
            default:
                useCurrentStep("1")
        }
    }

    const hadleGetItem = async () => {
        let resShowtime = await getOneShowtimeApi(showtimeId)
        if (resShowtime && resShowtime.data && resShowtime.data.result) {
            setShowtime(resShowtime.data.result)
        }
    }
    const handleGetFood = async () => {
        let resFood = await getFoodApi("BAP")
        let resFood1 = await getFoodApi("NUOCLOC")
        let resFood2 = await getFoodApi("NUOCNGOT")
        let resFood3 = await getFoodApi("ANVAT")
        if (resFood && resFood.data && resFood.data.result) {
            setListPopcorn(resFood.data.result)
        }
        if (resFood1 && resFood1.data && resFood1.data.result) {
            setListWater(resFood1.data.result)
        }
        if (resFood2 && resFood2.data && resFood2.data.result) {
            setListSoda(resFood2.data.result)
        }
        if (resFood3 && resFood3.data && resFood3.data.result) {
            setListSnacks(resFood3.data.result)
        }
    }
    const handleGetSeatBooked = async () => {
        const data = {
            showtimeId: showtimeId,
            timeShow: format(parse(`${dateTime.date} ${dateTime.time}`, 'dd/MM/yyyy HH:mm', new Date()), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
        }
        console.log("🚀 ~ file: index.jsx:179 ~ handleGetSeatBooked ~ showtimeId.toString(:", showtimeId.toString())
        console.log("🚀 ~ file: index.jsx:179 ~ handleGetSeatBooked ~ showtimeId.toString(:", showtimeId)
        console.log(typeof showtimeId);
        console.log(data)
        let resSeat = await getSeatBookedApi(data)
        if (resSeat && resSeat.data && resSeat.data.result) {
            setListSeatBooked(resSeat.data.result)
        }
    }
    const handleSelectSeatApi = async () => {
        setLoading(true);
        const data = selectSeats;
        let res = await selectSeatApi(data, showtimeId)
        if (res && res.data && res.data.result) {
            setListSeatBooking(res.data.result.seatIds)
        }
        setLoading(false);
    }
    const handleBookingTicket = async () => {
        setLoading(true);
        const resTicket = await bookingTicketApi(listSeatBooking, listFoodBooking)
        if (resTicket && resTicket.data && resTicket.data.result) {
            setInfoTicket(resTicket.data.result)
        }
        setLoading(false);
    }
    const handleGetFoodById = async (foodId) => {
        console.log("Vào handle")
        let resFood = await getFoodByIdApi(foodId)
        if (resFood && resFood.data && resFood.data.result) {
            foods.push(resFood.data.result)
        }
        
        console.log("🚀 ~ file: index.jsx:212 ~ handleGetFoodById ~ foods:", foods)
    }

    const handleSelectSeat = async (seatId, type) => {
        if (type != "booked") {
            const row = seatId.charCodeAt(0) - 65 + 1; // Lấy giá trị Unicode của ký tự và trừ đi giá trị Unicode của 'A' + 1
            const seatNum = parseInt(seatId.slice(1), 10); // Lấy phần số từ seatLabel
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
                        timeShow: format(parse(`${dateTime.date} ${dateTime.time}`, 'dd/MM/yyyy HH:mm', new Date()), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
                    }]);
                }
            }
        }
    }
    const handleSelectFood = () => {
        listFoodBooking.map(foodId => {
            (handleGetFoodById(foodId))
        })

    }
    useEffect(() => {
        handleCheckPathname(pathname)
    }, [pathname]);
    useEffect(() => {
        hadleGetItem()
        handleGetFood()
        handleGetSeatBooked()
    }, [showtimeId]);
    // component number spiner
    const NumberSpinner = ({ idPerItem, pricePerItem }) => {
        const [quantity, setQuantity] = useState(0);
        const [totalPrice, setTotalPrice] = useState(0);

        const decreaseQuantity = () => {
            const newQuantity = quantity - 1
            if (newQuantity >= 0) {
                const indexToRemove = listFoodBooking.indexOf(idPerItem);
                setQuantity(newQuantity)
                setTotalPrice(newQuantity * pricePerItem)
                if (indexToRemove !== -1) {
                    const updatedItems = [...listFoodBooking];
                    updatedItems.splice(indexToRemove, 1);
                    setListFoodBooking(updatedItems);
                }
            }
        }
        const increaseQuantity = () => {
            const newQuantity = quantity + 1
            console.log("New Quantity:", newQuantity); // Thêm dòng này để kiểm tra giá trị mới
            if (newQuantity >= 0) {
                setQuantity(newQuantity)
                setTotalPrice(newQuantity * pricePerItem)
                if (idPerItem) {
                    setListFoodBooking((listFoodBooking) => [...listFoodBooking, idPerItem]);
                }
            }
        }
        return (
            <div className='w-2/5'>
                <div className='p-4 flex items-center'>
                    <div className='flex w-1/2 justify-center'>
                        <a onClick={decreaseQuantity} className='h-8 w-8 border-2 border-slate-900 rounded-full mx-2'>
                            <MinusSmallIcon />
                        </a>
                        <input className='h-8 w-8 bg-transparent text-center font-bold text-xl outline-none'
                            min={"0"}
                            type="text"
                            value={quantity}
                            readOnly
                        />
                        <a onClick={increaseQuantity} className='h-8 w-8 border-2 border-slate-900 rounded-full mx-2'>
                            <PlusSmallIcon />
                        </a>
                    </div>
                    <div className='ml-4 w-1/2 text-right text-2xl font-bold text-cyan-600'>
                        <span>{formatPrice(totalPrice)} <sup>đ</sup></span>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='pt-32 bg-gray-900 h-auto pb-64'>
            {/* Thanh navbar */}
            <div className='max-w-6xl mx-auto mb-4'>
                <ul className='grid grid-cols-4 mx-auto'>
                    {
                        steps.map((step, index) => (
                            <li onClick={() => navigate(`/${showtimeId}${step.url}`, { state: { dateTime: dateTime } })}
                                key={index}
                                className={`${index < currentStep ? 'border-b-cyan-600 text-cyan-500' : 'border-b-slate-400'} relative text-center text-sm text-slate-200 border-b-8 pb-5 mb-5`}
                            >
                                <span className='flex justify-center items-center py-2'>
                                    {step.icon}
                                </span>
                                <span className='uppercase font-bold block py-2'>{step.title}</span>
                                <span className='absolute left-0 w-full py-2'>
                                    <a className={`${index < currentStep - 1 ? 'bg-cyan-500 text-slate-200' : 'bg-slate-200 text-cyan-950'}   font-bold px-4 py-2 rounded-full`}>{index + 1}</a>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='max-w-5xl mx-auto'>
                {/* Thông tin phim và thời gian đặt vé */}
                <div className='flex justify-between mb-4'>
                    {/* thông tin */}
                    <div className='text-slate-200'>
                        <h3 className='uppercase font-bold text-emerald-600'>{showtime.movie.title}</h3>
                        <p>Suất chiếu: <span className='text-emerald-800'>{dateTime.time} - Ngày {dateTime.date}</span></p>
                        <p>Rạp: <span className='text-emerald-800'>{showtime.room.cinema.cinemaName}</span></p>
                    </div>
                    {/* thời gian */}
                    <div className='block border-2 border-cyan-600 uppercase text-center  mb-8 px-8 py-2 rounded-3xl text-slate-200'>
                        <span className='text-emerald-600'>Thời gian:</span>
                        <span className='font-bold '> 05:20</span>
                    </div>
                </div>
                {/* trang chọn ghế */}
                <div style={{ display: currentStep === '1' ? 'block' : 'none' }}>

                    {/* Màn hình */}
                    <div className='flex justify-center'>
                        <img className='w-5/6' src={screen} alt="" />
                    </div>
                    {/* Sơ đồ ghế*/}
                    <div>
                        {/* Tên phòng */}
                        <div className='text-center text-2xl font-bold text-slate-200 mb-6'>
                            Phòng chiếu
                            <span>&nbsp;{showtime.room.roomName}</span>
                        </div>
                        {/*  Sơ đồ*/}
                        <div className='grid grid-cols-14 gap-1 mx-44'>
                            {seatData.map(seat => (
                                <div
                                    key={seat.id}
                                    className={`${seat.type} ${selectSeats.some(item => item.seatId === seat.id) ? 'select' : ''} flex justify-center items-center text-slate-200 md:h-8 lg:h-10 rounded-xl`}
                                    onClick={() => handleSelectSeat(seat.id, seat.type)}
                                >
                                    {seat.type === "booked" ? <XMarkIcon className='text-slate-400 h-8' /> : seat.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Loại ghế */}
                    <div className='mt-10 grid grid-cols-5 justify-center'>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-slate-800 rounded-xl'>
                                <XMarkIcon className='text-slate-400' />
                            </div>
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế đã đặt</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-slate-800 rounded-xl' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế thường</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-orange-500 rounded-xl' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế VIP</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-pink-700 rounded-xl' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế đôi</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-green-500 rounded-xl border-2 border-[#00e608]' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế đang chọn</p>
                        </div>
                    </div>
                    <div className='relative flex justify-end pt-4 top-16'>
                        <button
                            onClick={() => {
                                handleSelectSeatApi();
                                navigate(`/${showtimeId}/order/bapnuoc`, { state: { dateTime: dateTime } })
                            }}
                            className="absolute w-1/4 text-[18px] text-slate-200 text-2xl p-4 rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600"
                            type="button"
                            disabled={loading}
                        >
                            {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                            &nbsp;Xác Nhận
                        </button>
                    </div>
                </div>
                {/* trang bắp nước */}
                <div style={{ display: currentStep === '2' ? 'block' : 'none' }}>
                    <div className='relative block bg-slate-300 cyan-200 rounded-3xl h-auto text-slate-900'>
                        <ul>
                            {/* nước lọc */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Nước lọc</h2>
                                {
                                    listWater.map((item, index) => (
                                        <div className='flex items-center border-b'>
                                            <p className='text-2xl p-4'>{index + 1}</p>
                                            <div className='px-4 w-3/5'>
                                                <h3 className='text-xl py-1'>{item.name}</h3>
                                                <div className='px-2 py-1 text-slate-600'>
                                                    Giá :
                                                    <span className='text-cyan-600'> {formatPrice(item.price)} <sup>đ</sup> </span>
                                                </div>
                                            </div>
                                            <NumberSpinner idPerItem={item.foodId} pricePerItem={item.price} />
                                        </div>
                                    ))
                                }
                            </li>
                            {/* bắp rang */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Bắp rang</h2>
                                {
                                    listPopcorn.map((item, index) => (
                                        <div className='flex items-center border-b'>
                                            <p className='text-2xl p-4'>{index + 1}</p>
                                            <div className='px-4 w-3/5'>
                                                <h3 className='text-xl py-1'>{item.name}</h3>
                                                <div className='px-2 py-1 text-slate-600'>
                                                    Giá :
                                                    <span className='text-cyan-600'> {formatPrice(item.price)} <sup>đ</sup> </span>

                                                </div>
                                            </div>
                                            <NumberSpinner idPerItem={item.foodId} pricePerItem={item.price} />
                                        </div>
                                    ))
                                }
                            </li>
                            {/* nước ngọt */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Nước Ngọt</h2>
                                {
                                    listSoda.map((item, index) => (
                                        <div className='flex items-center border-b'>
                                            <p className='text-2xl p-4'>{index + 1}</p>
                                            <div className='px-4 w-3/5'>
                                                <h3 className='text-xl py-1'>{item.name}</h3>
                                                <div className='px-2 py-1 text-slate-600'>
                                                    Giá :
                                                    <span className='text-cyan-600'> {formatPrice(item.price)} <sup>đ</sup> </span>

                                                </div>
                                            </div>
                                            <NumberSpinner idPerItem={item.foodId} pricePerItem={item.price} />
                                        </div>
                                    ))
                                }
                            </li>
                            {/* khác */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-xl text-slate-200'>Khác</h2>
                                {
                                    listSnacks.map((item, index) => (
                                        <div className='flex items-center border-b'>
                                            <p className='text-2xl p-4'>{index + 1}</p>
                                            <div className='px-4 w-3/5'>
                                                <h3 className='text-xl py-1'>{item.name}</h3>
                                                <div className='px-2 py-1 text-slate-600'>
                                                    Giá :
                                                    <span className='text-cyan-600'> {formatPrice(item.price)} <sup>đ</sup> </span>

                                                </div>
                                            </div>
                                           <NumberSpinner idPerItem={item.foodId} pricePerItem={item.price} />
                                        </div>
                                    ))
                                }
                            </li>
                            <div className='relative flex justify-end pt-4 top-16'>
                                <button
                                    onClick={() => {
                                        handleBookingTicket();
                                        navigate(`/${showtimeId}/order/xacnhan`, { state: { dateTime: dateTime } })
                                    }}
                                    className="absolute w-1/4 text-[18px] text-slate-200 text-2xl p-4 rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600"
                                    type="button"
                                    disabled={loading}
                                >
                                    {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                    &nbsp;Tiếp tục
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
                {/* trang thanh toán */}
                <div style={{ display: currentStep === '3' ? 'block' : 'none' }}>
                    <div className='flex gap-5 '>
                        <div className="w-full xl:w-2/3">
                            <div className="p-4 md:p-6 space-y-6 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                                <h4 className="font-bold text-3xl">Thông tin phim</h4>
                                <div>
                                    <p>Phim</p>
                                    <p className="font-semibold">{showtime.movie.title}</p>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="w-1/2">
                                        <p>Ngày giờ chiếu</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-orange-500">{dateTime.time}</span>
                                            <span>-</span>
                                            <span className="font-semibold">{dateTime.date}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Ghế</p>
                                        <p className="font-semibold">{selectSeats.map(seat => (<span>&nbsp;{seat.seatId},</span>))}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="w-1/2">
                                        <p>Phòng chiếu</p>
                                        <p className="font-semibold">{showtime.room.roomName}</p>
                                    </div>
                                    <div>
                                        <p>Rạp chiếu</p>
                                        <p className="font-semibold">{showtime.room.cinema.cinemaName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 md:p-6 space-y-6 bg-slate-300 mt-5 rounded-2xl text-sm md:text-base text-slate-900">
                                <h4 className="font-bold text-3xl">Thông tin thanh toán</h4>
                                <div>
                                    <div className="mt-4 ring-1 ring-gray-700 sm:mx-0 rounded-xl">
                                        <table className="min-w-full divide-y divide-gray-600">
                                            <thead className='border-b border-gray-700'>
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Danh mục</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Số lượng</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Đơn giá</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Tổng tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    infoTicket && infoTicket.seats && infoTicket.seats.map(seatInfo => (
                                                        <tr>
                                                            <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                <div className="font-medium text-slate-900">Ghế ({String.fromCharCode(65 + parseInt(seatInfo.row, 10) - 1) + seatInfo.column})</div>
                                                            </td>
                                                            <td className="px-3 py-3.5 text-sm">1</td>
                                                            <td className="px-3 py-3.5 text-sm">{seatInfo.price.price}</td>
                                                            <td className="px-3 py-3.5 text-sm">{seatInfo.price.price}</td>
                                                        </tr>
                                                    ))
                                                }
                                                {
                                                    infoTicket && infoTicket.foods && infoTicket.foods.map(foodInfo => (
                                                        <tr>
                                                            <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                <div className="font-medium text-slate-900">{foodInfo.food.name}</div>
                                                            </td>
                                                            <td className="px-3 py-3.5 text-sm">{foodInfo.count}</td>
                                                            <td className="px-3 py-3.5 text-sm">{foodInfo.food.price}</td>
                                                            <td className="px-3 py-3.5 text-sm">{foodInfo.food.price * foodInfo.count}</td>
                                                        </tr>
                                                    ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/3 flex-1 text-sm md:text-base">
                            <div className="bg-slate-300 h-full rounded-2xl p-4 md:p-6 space-y-5">
                                <h4 className="font-bold text-3xl">Phương thức thanh toán</h4>
                                <div id="headlessui-radiogroup-:rf:" role="radiogroup">
                                    <div className="space-y-2" role="none">
                                        <div className="relative block cursor-pointer rounded-xl border bg-transparent px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between border-gray-700" id="headlessui-radiogroup-option-:rg:" role="radio" aria-checked="true" tabIndex="0" data-headlessui-state="checked" aria-labelledby="headlessui-label-:rh:">
                                            <span className="flex items-center">
                                                <span className="h-6 w-6 rounded-full border flex items-center justify-center mr-4 bg-transparent border-red-500" aria-hidden="true">
                                                    <span className="bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </span>
                                                </span>
                                                <span className="flex flex-col text-sm">
                                                    <span className="font-medium text-slate-900 flex items-center gap-2" id="headlessui-label-:rh:">
                                                        {/* <img alt="hình ảnh" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" src="/images/vnpay.svg" style="color: transparent;" /> */}
                                                        VNPAY
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="pointer-events-none absolute -inset-px rounded-xl border border-red-500" aria-hidden="true"></span>
                                        </div>
                                        <div className="relative block cursor-pointer rounded-xl border bg-transparent px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between border-gray-700" id="headlessui-radiogroup-option-:ri:" role="radio" aria-checked="false" tabIndex="-1" data-headlessui-state="" aria-labelledby="headlessui-label-:rj:">
                                            <span className="flex items-center">
                                                <span className="h-6 w-6 rounded-full border border-gray-700 flex items-center justify-center mr-4 bg-transparent" aria-hidden="true"></span>
                                                <span className="flex flex-col text-sm">
                                                    <span className="font-medium text-slate-900 flex items-center gap-2" id="headlessui-label-:rj:">
                                                        {/* <img alt="hình ảnh" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" src="/images/payoo.svg" style="color: transparent;" />Payoo */}
                                                        Payoo
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="pointer-events-none absolute -inset-px rounded-xl border border-transparent" aria-hidden="true"></span>
                                        </div>
                                        <div className="relative block cursor-pointer rounded-xl border bg-transparent px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between border-gray-700" id="headlessui-radiogroup-option-:rk:" role="radio" aria-checked="false" tabIndex="-1" data-headlessui-state="" aria-labelledby="headlessui-label-:rl:">
                                            <span className="flex items-center">
                                                <span className="h-6 w-6 rounded-full border border-gray-700 flex items-center justify-center mr-4 bg-transparent" aria-hidden="true"></span>
                                                <span className="flex flex-col text-sm">
                                                    <span className="font-medium text-slate-900 flex items-center gap-2" id="headlessui-label-:rl:">
                                                        <img src="" alt="" />
                                                        {/* <img alt="hình ảnh" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" srcSet="/_next/image?url=%2Fimages%2Fviettel1.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Fimages%2Fviettel1.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Fimages%2Fviettel1.png&amp;w=128&amp;q=75" style="color: transparent;" /> */}
                                                        Viettel Money
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="pointer-events-none absolute -inset-px rounded-xl border border-transparent" aria-hidden="true"></span>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-bold">Chi phí</h4>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <p>Thanh toán</p>
                                        <p className="font-bold">{formatPrice(infoTicket.total)}<sup>đ</sup></p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Phí (0%)</p>
                                        <p className="font-bold">0</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Tổng cộng</p>
                                        <p className="font-bold">{formatPrice(infoTicket.total)}<sup>đ</sup></p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        className="w-full inline-flex items-center justify-center text-[18px] h-10 text-slate-200 p-4 rounded-full hover:bg-white hover:text-emerald-800 bg-emerald-600"
                                        type="button"
                                        disabled={loading}
                                    >
                                        {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                        &nbsp;Xác Nhận
                                    </button>
                                    <button className="inline-flex items-center justify-center rounded-full text-sm font-medium hover:bg-neutral-300 hover:text-accent-foreground h-10 px-8 py-2 w-full">
                                        Quay lại
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* trang thông tin ve */}
                <div style={{ display: currentStep === '4' ? 'block' : 'none' }}>
                    <div className='text-slate-200'>ve</div>
                </div>
                {/* Thông tin ghế, giá tiền */}
                <div className='flex text-slate-200 text-2xl pt-4 border-t border-t-slate-400 mt-10 justify-between'>
                    <div>
                        <p className=''>
                            Ghế đã chọn :
                            {selectSeats.map(seat => (<span>&nbsp;{seat.seatId},</span>))}
                        </p>
                        <p>
                            Kèm theo:
                            {
                                foods.map(food => (<span>&nbsp;{food.name},</span>))}{
                                console.log("🚀 ~ file: index.jsx:696 ~ OrderMovie ~ foods:", foods)
                            }

                        </p>
                        <p className='mt-2'>
                            Tổng tiền :
                            <span> {formatPrice(selectSeats.map(item => item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0))}
                                <sup>đ</sup>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderMovie
