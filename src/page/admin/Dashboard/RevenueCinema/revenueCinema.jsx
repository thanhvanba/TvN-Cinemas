import React from 'react'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import OptionsStatistics from '../components/optionsStatistics'
import ConvertStringFollowFormat from '../../../../utils/ConvertStringFollowFormat'
import Statistics from './components/statistics'

const RevenueCinema = () => {
    return (
        <div className='p-4 border-2 col-span-4 mx-3 mt-6'>
            <div className='col-span-4 px-3 mt-4'>
                <OptionsStatistics />
            </div>
            <div className='flex mt-4'>
                <div className='w-1/3 px-3'>
                    <div className='flex'>
                        <div className='py-3 bg-slate-200 w-1/2 mr-1 h-32 rounded-md shadow-lg'>
                            <p className='font-semibold px-2'>Thu: <span className='text-green-500'>{ConvertStringFollowFormat(1897900)}<sup>đ</sup></span></p>
                            <div className='px-3 flex justify-between'>
                                <div>
                                    <p className='text-lg font-light'>Vé</p>
                                    <p className='font-bold text-xl'>45.5%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(863544)}<sup>đ</sup></p>
                                </div>
                                <div>
                                    <p className='text-lg font-light'>Sản phẩm</p>
                                    <p className='font-bold text-xl'>54.5%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(1034355)}<sup>đ</sup></p>
                                </div>
                            </div>
                        </div>
                        <div className='py-3 bg-slate-200 w-1/2 ml-1 h-32 rounded-md shadow-lg'>
                            <p className='font-semibold px-2'>Chi: <span className='text-red-500'>{ConvertStringFollowFormat(1897900)}<sup>đ</sup></span></p>
                            <div className='px-3 flex justify-between'>
                                <div>
                                    <p className='text-lg font-light'>Sản phẩm</p>
                                    <p className='font-bold text-xl'>100%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(863544)}<sup>đ</sup></p>
                                </div>
                                <div>
                                    <p className='text-lg font-light'>Khác</p>
                                    <p className='font-bold text-xl'>0%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(0)}<sup>đ</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-slate-200 h-44 mt-2 shadow-lg px-5 py-4 rounded-md'>
                        <p className='relative pl-28 pb-4 font-medium'>
                            <span className='absolute top-0 left-0'>Chu kỳ:</span>
                            <span>Theo tháng</span>
                        </p>
                        <p className='relative pl-28 pb-4 font-medium'>
                            <span className='absolute top-0 left-0'>Thời gian:</span>
                            <span>Tháng 11</span>
                        </p>
                        <p className='relative pl-28 pb-4 font-medium'>
                            <span className='absolute top-0 left-0'>Số hóa đơn:</span>
                            <span>14 đơn</span>
                        </p>
                        <p className='relative pl-28 pb-4 font-medium'>
                            <span className='absolute top-0 left-0'>Lợi nhuận:</span>
                            <span>{ConvertStringFollowFormat(124900)}<sup>đ</sup></span>
                        </p>
                    </div>
                </div>
                <div className='w-2/3'>
                    <div className='h-full'>
                        <Statistics />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RevenueCinema
