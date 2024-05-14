import React, { useEffect, useState } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Search from '../../../../components/Search'
import AdminService from '../../../../service/AdminService'

function ListPromotion() {
    const navigate = useNavigate()
    const { getAllPromotionApi } = AdminService()
    const [promotion, setPromotion] = useState()

    const [pagination, setPagination] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );

    const handleGetItems = async () => {
        let resPromotion = await getAllPromotionApi()
        if (resPromotion && resPromotion.data && resPromotion.data.result) {
            setPromotion(resPromotion.data.result)
            // setPagination(prevPagination => ({
            //     ...prevPagination,
            //     pageNumber: pageNumber,
            //     pageSize: resPromotion.data.result.pageSize,
            //     totalPages: resPromotion.data.result.totalPages,
            //     totalElements: resPromotion.data.result.totalElements
            // }));
        }
    }

    const promotionFake = [
        {
            code: "PROBKLOP",
            nameSk: "Tháng 4 vui vẻ",
            dateStart: "01/04/2024",
            dateEnd: "30/04/2024",
            status: "Đang hoạt động",
            deleted: true
        },
        {
            code: "PROBKLOPLOPOJHIO",
            nameSk: "Tháng 4 vui vẻ",
            dateStart: "01/04/2024",
            dateEnd: "30/04/2024",
            status: "Đang hoạt động",
            deleted: false
        },
        {
            code: "PROBKLOP",
            nameSk: "Đón sinh nhật cùng TvN Cinema",
            dateStart: "01/04/2024",
            dateEnd: "30/04/2024",
            status: "Đang hoạt động",
            deleted: true
        }
    ]

    useEffect(() => {
        handleGetItems()
    }, [])
    return (
        <div className='px-4'>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <h2 className='text-3xl cursor-default'>Chương trình khuyến mãi</h2>
                {
                    // user.role === "ADMIN" &&
                    <button
                        className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-emerald-800 bg-emerald-600 text-white"
                        type='submit'
                    // onClick={() => changeTab("/admin/add-item/movie")}
                    >
                        Thêm
                    </button>
                }
            </div>
            <div className='flex justify-between py-4'>
                <div className='rounded-md border-2 w-1/3'>
                    <Search />
                </div>
            </div>
            {/* {!loading && */}
            <div className=''>
                <table className='mt-6 w-full'>
                    <thead className=''>
                        <tr className='border-b-2 border-slate-200'>
                            <th className='text-sm text-center font-light px-2 pb-4 uppercase w-60'>Mã CT khuyến mãi</th>
                            <th className='text-sm text-center font-light px-2 pb-4 uppercase w-80'>Tên CT khuyến mãi</th>
                            <th className='text-sm text-center font-light px-2 pb-4 uppercase w-40'>Ngày bắt đầu</th>
                            <th className='text-sm text-center font-light px-2 pb-4 uppercase w-40'>Ngày kết thúc</th>
                            <th className='text-sm text-center font-light px-2 pb-4 uppercase w-44'>Trạng thái</th>
                            {/* {user.role === "ADMIN" && <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.action}</th>} */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            promotionFake.map((item, index) => (
                                <tr
                                    onClick={() => { navigate('/admin/promotion') }}
                                    className='border-b-2 border-slate-200 hover:bg-slate-200 cursor-pointer'
                                >
                                    <td className='text-start font-medium px-2 py-3'>{item.code}</td>
                                    <td className='text-start font-medium px-2 py-3'>{item.nameSk}</td>
                                    <td className='text-center font-medium px-2 py-3'>{item.dateStart}</td>
                                    <td className='text-center font-medium px-2 py-3'>{item.dateEnd}</td>
                                    <td className={`${item.deleted ? "text-red-600" : "text-green-600"} text-center font-medium px-2 py-3`}>{item.deleted ? "Đã kết thúc" : "Đang diễn ra"}</td>
                                    <td className='text-center font-medium px-2 py-3'>
                                        <div className='flex items-center justify-end pr-8 outline-none'>
                                            <button
                                                type='button'
                                                onClick={(e) => { e.stopPropagation(); handleOpenModal(item.movieId); }}
                                                className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100 outline-none'
                                            >
                                                <TrashIcon className='h-4 w-4 text-red-600' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {/* <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetAllMovie} /> */}
            </div>
            {/* } */}
        </div>
    )
}

export default ListPromotion
