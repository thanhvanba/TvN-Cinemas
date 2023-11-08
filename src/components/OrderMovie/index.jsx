import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArmchairIcon, PopcornIcon, CreditCardIcon, InboxIcon } from 'lucide-react'
import screen from "../../images/screen.webp"
import { XMarkIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import "./index.css"
import formatPrice from "../../utils/ConvertStringFollowFormat"

const OrderMovie = () => {
    const pricePerItem = 15000
    const seatsPerRow = 14;
    const numRows = 8;

    const [currentStep, useCurrentStep] = useState('1');
    const { pathname } = useLocation()

    const steps = [
        {
            icon: <ArmchairIcon className='h-10 w-10' />,
            title: 'Chọn ghế',
            url: '/order/chonghe'
        },
        {
            icon: <PopcornIcon className='h-10 w-10' />,
            title: 'Bắp nước',
            url: '/order/bapnuoc'
        },
        {
            icon: <CreditCardIcon className='h-10 w-10' />,
            title: 'Thanh Toán',
            url: '/order/xacnhan'
        },
        {
            icon: <InboxIcon className='h-10 w-10' />,
            title: 'Thông tin vé',
            url: '/order/ve'
        },
    ];

    // Hàm tạo danh sách ghế ngồi
    const createSeatData = (rows, seatsPerRow) => {
        const seatData = [];

        for (let row = 1; row <= rows; row++) {
            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                const seatLabel = String.fromCharCode(65 + row - 1) + seatNum;
                seatData.push({ id: seatLabel, label: seatLabel, status: 'available' });
            }
        }

        return seatData;
    };

    const seatData = createSeatData(numRows, seatsPerRow);

    const navigate = useNavigate()

    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const handleCheckPathname = (pathname) => {
        switch (pathname) {
            case "/order/chonghe":
                useCurrentStep("1")
                break;
            case "/order/bapnuoc":
                useCurrentStep("2")
                break;
            case "/order/xacnhan":
                useCurrentStep("3")
                break;
            case "/order/ve":
                useCurrentStep("4")
                break;
            default:
                useCurrentStep("1")
        }
    }

    useEffect(() => {
        handleCheckPathname(pathname)
    }, [pathname]);

    // component number spiner
    const NumberSpinner = () => {
        const [quantity, useQuantity] = useState(0);
        const [totalPrice, useTotalPrice] = useState(0);

        const decreaseQuantity = (id) => {
            const newQuantity = quantity - 1
            useQuantity(newQuantity)
            useTotalPrice(newQuantity * pricePerItem)
        }
        const increaseQuantity = (id) => {
            const newQuantity = quantity + 1
            useQuantity(newQuantity)
            useTotalPrice(newQuantity * pricePerItem)
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
        <div className='pt-32 bg-gray-900 h-auto          pb-64'>
            {/* Thanh navbar */}
            <div className='max-w-6xl mx-auto mb-4'>
                <ul className='grid grid-cols-4 mx-auto'>
                    {
                        steps.map((step, index) => (
                            <li onClick={() => changeTab(step.url)} key={index} className={`${index < currentStep ? 'border-b-cyan-600 text-cyan-500' : 'border-b-slate-400'} relative text-center text-slate-200 border-b-8 pb-5 mb-5`}>
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
                {/* trang chọn ghế */}
                <div style={{ display: currentStep === '1' ? 'block' : 'none' }}>
                    {/* Thông tin phim và thời gian đặt vé */}
                    <div className='flex justify-between mb-4'>
                        {/* thông tin */}
                        <div className='text-xl text-slate-200'>
                            <h3 className='uppercase font-bold text-emerald-600'>Đất rừng phương nam</h3>
                            <p>Suất chiếu: <span className='text-emerald-800'>--:--</span></p>
                            <p>Rạp: <span className='text-emerald-800'>*********</span></p>
                        </div>
                        {/* thời gian */}
                        <div className='block border-2 border-cyan-600 uppercase text-center text-2xl mb-8 px-8 py-2 rounded-3xl text-slate-200'>
                            <span className='text-emerald-600'>Thời gian:</span>
                            <span className='font-bold text-3xl'> 05:20</span>
                        </div>
                    </div>
                    {/* Màn hình */}
                    <div className=''>
                        <img className='w-full' src={screen} alt="" />
                    </div>
                    {/* Sơ đồ ghế*/}
                    <div>
                        {/* Tên phòng */}
                        <div className='text-center text-2xl font-bold text-slate-200 mb-6'>
                            Phòng chiếu
                            <span> số 5</span>
                        </div>
                        {/*  Sơ đồ*/}
                        <div className='grid grid-cols-14 gap-3 mx-24'>
                            {seatData.map(seat => (
                                <div key={seat.id} className={`seat ${seat.status} text-center text-slate-200 bg-gray-700 md:h-8 lg:h-12 rounded-xl`} >
                                    {seat.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Loại ghế */}
                    <div className='mt-10 grid grid-cols-5 justify-center'>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-slate-600 rounded-xl'>
                                <XMarkIcon className='text-slate-400' />
                            </div>
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế đã đặt</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-slate-800 rounded-xl' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế thường</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-orange-700 rounded-xl' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế VIP</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-pink-700 rounded-xl' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế đôi</p>
                        </div>
                        <div className='relative flex'>
                            <div className='absolute left-4 lg:h-10 lg:w-10 md:h-8 md:w-8 bg-green-500 rounded-xl' />
                            <p className='text-slate-200 text-lg font-bold py-2 pl-16'>Ghế đang chọn</p>
                        </div>
                    </div>
                    {/* Thông tin ghế, giá tiền */}
                    <div className='flex text-slate-200 text-2xl pt-4 border-t border-t-slate-400 mt-10 justify-between'>
                        <div>
                            <p className=''>Ghế đã chọn : <span> A1, A4</span></p>
                            <p className='mt-2'>Tổng tiền : <span> 45đ</span></p>
                        </div>
                        <button className="w-1/4 text-[18px] rounded-xl hover:bg-white hover:text-emerald-800 bg-emerald-600 py-2 transition-colors duration-300" type='submit'
                        >
                            Thanh Toán
                        </button>
                    </div>
                </div>
                {/* trang bắp nước */}
                <div style={{ display: currentStep === '2' ? 'block' : 'none' }}>
                    <div className='relative block bg-slate-300 cyan-200 rounded-3xl h-auto text-slate-900'>
                        <ul>
                            {/* nước lọc */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-3xl text-slate-200'>Nước lọc</h2>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Aquafina</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>
                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Aquafina</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>
                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                            </li>
                            {/* bắp rang */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-3xl text-slate-200'>Bắp rang</h2>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Bắp vị phô mai</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Bắp vị bơ</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Bắp ngọt</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                            </li>
                            {/* nước ngọt */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-3xl text-slate-200'>Nước ngọt</h2>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Pepsi</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Coca</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Sprite</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                            </li>
                            {/* khác */}
                            <li>
                                <h2 className='px-8 py-4 bg-cyan-500 rounded-t-3xl uppercase text-3xl text-slate-200'>Khác</h2>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Khoai tây chiên</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Xúc xích</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-4 w-3/5'>
                                        <h3 className='text-3xl py-2'>Khoai lang chiên</h3>
                                        <div className='text-xl p-2 text-slate-600'>
                                            Giá :
                                            <span className='text-cyan-600'> {formatPrice(pricePerItem)} <sup>đ</sup> </span>

                                        </div>
                                    </div>
                                    <NumberSpinner />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* trang thanh toán */}
                <div style={{ display: currentStep === '3' ? 'block' : 'none' }}>
                    <div className='text-slate-200'>thanh toan</div>
                </div>
                {/* trang thông tin ve */}
                <div style={{ display: currentStep === '4' ? 'block' : 'none' }}>
                    <div className='text-slate-200'>ve</div>
                </div>
            </div>
        </div>
    )
}

export default OrderMovie
