import React, { useContext, useEffect, useState } from 'react'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import ConvertStringFollowFormat from '../../../../utils/ConvertStringFollowFormat'
import Statistics from './components/statistics'
import AdminService from '../../../../service/AdminService'
import ManagerService from '../../../../service/ManagerService'
import { LoginContext } from '../../../../context/LoginContext'

const RevenueCinema = () => {
    const { user } = useContext(LoginContext)
    const { getDetailFinanceApi, getFinanceAllCinemaApi } = AdminService()
    const { getDetailFinanceManagerApi, getFinanceAllCinemaManagerApi } = ManagerService()
    const [financeAllCinema, setFinanceAllCinema] = useState()
    const [detailFinance, setDetailFinance] = useState()
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);
    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    };
    const updateFinanceCinema = financeAllCinema?.find(item => item.cinema === localStorage.getItem('cinemaId'));

    const handleGetRevenueCinema = async () => {
        let resFinance = user.role === 'ADMIN' ? await getFinanceAllCinemaApi(selectedYear) : await getFinanceAllCinemaManagerApi(selectedYear)
        if (resFinance && resFinance.data && resFinance.data.result) {
            setFinanceAllCinema(resFinance.data.result)
        }
    }

    const handleGetDetailFinance = async () => {
        let paramDetailFinance = {
            cinemaId: localStorage.getItem("cinemaId") ? localStorage.getItem("cinemaId") : '',
            year: selectedYear
        }

        let resFinanceDetail = user.role === 'ADMIN' ? await getDetailFinanceApi(paramDetailFinance) : await getDetailFinanceManagerApi(paramDetailFinance)
        if (resFinanceDetail && resFinanceDetail.data && resFinanceDetail.data.result) {
            setDetailFinance(resFinanceDetail.data.result)
        }

    }

    useEffect(() => {
        handleGetDetailFinance()
    }, [localStorage.getItem('cinemaId')]);

    useEffect(() => {
        handleGetRevenueCinema()
        handleGetDetailFinance()
    }, [selectedYear]);


    return (
        <div className='p-4 border-2 col-span-4 mx-3 mt-6'>
            <div className='col-span-4 px-3 mt-4'>
                <div className='w-40 pr-3'>
                    <span className='font-bold text-lg'>Năm</span>
                    <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                        <SelectMenu onSelectChange={handleYearChange} items={years} content={selectedYear} />
                    </div>
                </div>
            </div>
            <div className='flex mt-4'>
                <div className='w-[38%] px-3'>
                    <div className='flex'>
                        <div className='py-3 bg-slate-200 w-1/2 mr-1 h-32 rounded-md shadow-lg'>
                            <p className='font-semibold px-2'>Thu: <span className='text-green-500'>{ConvertStringFollowFormat(detailFinance?.totalRevenue)}<sup>đ</sup></span></p>
                            <div className='px-3 flex justify-between'>
                                <div>
                                    <p className='text-lg font-light'>Vé</p>
                                    <p className='font-bold text-xl'>{detailFinance?.ticketRevenue ? (detailFinance?.ticketRevenue / detailFinance?.totalRevenue * 100).toFixed(2) : 0}%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(detailFinance?.ticketRevenue)}<sup>đ</sup></p>
                                </div>
                                <div>
                                    <p className='text-lg font-light'>Sản phẩm</p>
                                    <p className='font-bold text-xl'>{detailFinance?.foodRevenue ? (detailFinance?.foodRevenue / detailFinance?.totalRevenue * 100).toFixed(2) : 0}%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(detailFinance?.foodRevenue)}<sup>đ</sup></p>
                                </div>
                            </div>
                        </div>
                        <div className='py-3 bg-slate-200 w-1/2 ml-1 h-32 rounded-md shadow-lg'>
                            <p className='font-semibold px-2'>Chi: <span className='text-red-500'>{ConvertStringFollowFormat(detailFinance?.totalExpense)}<sup>đ</sup></span></p>
                            <div className='px-3 flex justify-between'>
                                <div>
                                    <p className='text-lg font-light'>Sản phẩm</p>
                                    <p className='font-bold text-xl'>{detailFinance?.foodExpense ? (detailFinance?.foodExpense / detailFinance?.totalExpense * 100).toFixed(2) : 0}%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(detailFinance?.foodExpense)}<sup>đ</sup></p>
                                </div>
                                <div>
                                    <p className='text-lg font-light'>Khác</p>
                                    <p className='font-bold text-xl'>{detailFinance?.otherExpense ? (detailFinance?.otherExpense / detailFinance?.totalExpense * 100).toFixed(2) : 0}%</p>
                                    <p className='text-xs font-extralight'>{ConvertStringFollowFormat(detailFinance?.foodExpense)}<sup>đ</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-slate-200 h-52 mt-2 shadow-lg px-5 py-4 rounded-md'>
                        <p className='relative pl-40 pb-4'>
                            <span className='absolute top-0 left-0 font-bold'>Chu kỳ:</span>
                            <span>Theo năm</span>
                        </p>
                        <p className='relative pl-40 pb-4'>
                            <span className='absolute top-0 left-0 font-bold'>Thời gian:</span>
                            <span>Năm {selectedYear}</span>
                        </p>
                        <p className='relative pl-40 pb-4'>
                            <span className='absolute top-0 left-0 font-bold'>Số hóa đơn:</span>
                            <span>{detailFinance?.totalOfBooking || 0} đơn</span>
                        </p>
                        <p className='relative pl-40 pb-4'>
                            <span className='absolute top-0 left-0 font-bold'>Nhập hàng:</span>
                            <span>{detailFinance?.totalOfOrder || 0} đơn</span>
                        </p>
                        <p className='relative pl-40 pb-4'>
                            <span className='absolute top-0 left-0 font-bold'>Lợi nhuận:</span>
                            <span>{ConvertStringFollowFormat(detailFinance?.profit)}<sup>đ</sup></span>
                        </p>
                    </div>
                </div>
                <div className='w-[62%]'>
                    <div className='h-full'>
                        <Statistics financeCinema={updateFinanceCinema} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RevenueCinema
