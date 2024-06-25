import React from 'react'
import ConvertStringFollowFormat from '../../../../utils/ConvertStringFollowFormat';
import Pagination from '../../../../components/Pagination';
import FormatDataTime from '../../../../utils/FormatDataTime';
import { UserCircleIcon } from 'lucide-react';

function ListStockEntries({ allStockEntries, pagination, handleGetStockEntries }) {
    return (
        <div>
            <table className='mt-6 w-full'>
                <thead className=''>
                    <tr className='border-b-2 border-slate-200'>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{"STT"}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-60'>{"Thông tin sản phẩm"}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-24'>{"Số lượng"}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-28'>{"Giá nhập"}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-36'>{"Nhà cung cấp"}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-28'>{"Tổng giá"}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{"Người nhập"}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-32'>{"Ngày nhập"}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStockEntries.map((item, index) => (
                            <tr
                                // onClick={() => changeTab(`/admin/movie/${item.movieId}`)}
                                className='border-b-2 border-slate-200 hover:bg-slate-200 cursor-pointer'
                            >
                                <td className='text-center font-medium px-2 py-3'>{index + 1 + pagination.pageSize * (pagination.pageNumber - 1)}</td>
                                <td className='text-center font-medium px-2 py-3'>
                                    <div className='flex items-center'>
                                        <div div className='pr-2' >
                                            <img className="h-20 w-16 text-emerald-600" src={item.food.image} alt="" />
                                        </div >
                                        <div className='flex flex-col'>
                                            <h3 className='font-light text-xs'>{item.food.foodId}</h3>
                                            <h3 className='uppercase'>{item.food.name}</h3>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center font-medium px-2 py-3'>{item.quantity}</td>
                                <td className='text-center font-medium px-2 py-3'>{ConvertStringFollowFormat(item.purchasePrice)}</td>
                                <td className='text-center font-medium px-2 py-3'>{item.supplier || '-'}</td>
                                <td className='text-center font-medium px-2 py-3'>{ConvertStringFollowFormat(item.totalPrice)}</td>
                                <td className='text-start px-2 py-3'>
                                    <div className='flex items-center'>
                                        <div div className='pr-2' >
                                            {item.manager.avatar ? <img className='rounded-full w-14 h-14 border-2' src={item.manager.avatar} alt="" /> : <UserCircleIcon className="h-16 w-16 text-emerald-600" />}
                                        </div >
                                        <div>
                                            <h3>{item.manager.fullName}</h3>
                                            <p className='font-normal'>Email: {item.manager.email}</p>
                                            <span className='font-normal'>Sdt: {item.manager.phone}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center font-medium px-2 py-3'>{FormatDataTime(item.entryDate).date}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {allStockEntries.length !== 0 && < Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetStockEntries} />}
        </div>
    )
}

export default ListStockEntries
