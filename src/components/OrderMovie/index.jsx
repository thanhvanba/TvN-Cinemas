import React from 'react'
import { useState } from 'react';
import { ArmchairIcon, PopcornIcon, CreditCardIcon, InboxIcon } from 'lucide-react'
import screen from "../../images/screen.webp"

const OrderMovie = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
        {
            icon: <ArmchairIcon className='h-10 w-10' />,
            title: 'Chọn ghế',
        },
        {
            icon: <PopcornIcon className='h-10 w-10' />,
            title: 'Bắp nước',
        },
        {
            icon: <CreditCardIcon className='h-10 w-10' />,
            title: 'Thanh Toán',
        },
        {
            icon: <InboxIcon className='h-10 w-10' />,
            title: 'Thông tin vé',
        },
    ];

    const handleStepClick = (stepIndex) => {
        setCurrentStep(stepIndex + 1);
    };
    return (
        <div className='pt-32 bg-gray-900 h-auto          pb-64'>
            {/* Thanh navbar */}
            <div className='max-w-6xl mx-auto mb-4'>
                <ul className='grid grid-cols-4 mx-auto'>
                    {
                        steps.map((step, index) => (
                            <li key={index} className={`${index < currentStep ? 'border-b-cyan-600 text-cyan-500' : 'border-b-slate-400'} relative text-center text-slate-200 border-b-8 pb-5 mb-5`}>
                                <span className='flex justify-center items-center py-2'>
                                    {step.icon}
                                </span>
                                <span className='uppercase font-bold block py-2'>{step.title}</span>
                                <span className='absolute left-0 w-full py-2'>
                                    <a onClick={() => handleStepClick(index)} className={`${index < currentStep - 1 ? 'bg-cyan-500 text-slate-200' : 'bg-slate-200 text-cyan-950'}   font-bold px-4 py-2 rounded-full`} href="#">{index + 1}</a>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='max-w-7xl mx-auto'>
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
                    <div></div>
                    {/*  Sơ đồ*/}
                    <div></div>
                </div>
                {/* Loại ghế */}
                <div></div>
                {/* Thông tin ghế, giá tiền */}
                <div></div>
            </div>
        </div>
    )
}

export default OrderMovie
