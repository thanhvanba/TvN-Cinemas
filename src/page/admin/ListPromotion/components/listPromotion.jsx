import React, { useEffect, useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Search from '../../../../components/Search'
import PromotionService from '../../../../service/PromotionService'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Pagination from '../../../../components/Pagination'
import FormatDataTime from '../../../../utils/FormatDataTime'
import Modal from '../../../../utils/Modal'
import Loading from '../../../../components/Loading'
import useLoadingState from '../../../../hook/UseLoadingState'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon } from '@heroicons/react/20/solid'
import { isAfter, parse } from 'date-fns'

function ListPromotion() {
    const navigate = useNavigate()
    const { getAllPromotionApi, deletePromotionsCode, deletePromotionsFixed, getOnePromotionApi } = PromotionService()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const [promotionByCode, setPromotionByCode] = useState()
    const [promotion, setPromotion] = useState()

    const [modalStates, setModalStates] = useState({});
    const { loading, setLoading } = useLoadingState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [pagination, setPagination] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );
    const [pagination1, setPagination1] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );

    const handleOpenModal = (promotionId) => {
        setModalStates((prevStates) => ({ ...prevStates, [promotionId]: true }));
    };
    const handleCloseModal = (promotionId) => {
        setModalStates((prevStates) => ({ ...prevStates, [promotionId]: false }));
    };

    const handleGetPromotionByCode = async (pageNumber) => {
        setLoading('promotionByCode', true)

        let resPromotion = await getAllPromotionApi(pageNumber, 6)
        if (resPromotion && resPromotion.data && resPromotion.data.result) {
            setPromotionByCode(resPromotion.data.result.content)
            setPagination1(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: resPromotion.data.result.pageSize,
                totalPages: resPromotion.data.result.totalPages,
                totalElements: resPromotion.data.result.totalElements
            }));
        }
        setLoading('promotionByCode', false)
    }
    const handleGetPromotion = async (pageNumber) => {
        setLoading('promotion', true)
        let resPromotion = await getAllPromotionApi(pageNumber, 6, true)
        if (resPromotion && resPromotion.data && resPromotion.data.result) {
            setPromotion(resPromotion.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: resPromotion.data.result.pageSize,
                totalPages: resPromotion.data.result.totalPages,
                totalElements: resPromotion.data.result.totalElements
            }));
        }
        setLoading('promotion', false)
    }

    const handleDeletePromotion = async (promotionId) => {
        setLoading('promotion', true)
        await deletePromotionsFixed(promotionId)

        handleCloseModal(promotionId)
        setLoading('promotion', false)
        handleOpenModal('loading')
    }
    const handleDeletePromotionByCode = async (promotionId) => {
        setLoading('promotionByCode', true)
        await deletePromotionsCode(promotionId)

        handleCloseModal(promotionId)
        handleOpenModal('loading1')
        setLoading('promotionByCode', false)
    }

    useEffect(() => {
        handleGetPromotion(pagination.pageNumber)
        handleGetPromotionByCode(pagination1.pageNumber)
    }, [])
    useEffect(() => {
        if (modalStates['loading']) {
            handleGetPromotion(pagination.pageNumber)
            handleCloseModal('loading')
        }
        if (modalStates['loading1']) {
            handleGetPromotionByCode(pagination1.pageNumber)
            handleCloseModal('loading1')
        }
    }, [modalStates])

    const [inputSearch, setInputSearch] = useState([])
    const [showListSearch, setShowListSearch] = useState(false)
    const handleSearchFc = async (value) => {
        setLoading('search', true);
        let ress = pathname === "/admin/list-viewer" ? await getAllViewerApi(1, 5, value) : user.role === "ADMIN" ? await getAllPersonnelApi(1, 5, value) : await getAllPersonnelManagerApi(1, 5, value)
        setLoading('search', false);
        if (ress && ress.data && ress.data.result && ress.data.result && ress.data.result.content) {
            setAllUser(ress.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: 1,
                pageSize: ress.data.result.pageSize,
                totalPages: ress.data.result.totalPages,
                totalElements: ress.data.result.totalElements
            }));
        }
    }
    return (
        <div className='px-4'>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <h2 className='text-3xl cursor-default flex items-center'>
                    <BanknotesIcon className='h-10 w-10 mr-1 text-emerald-600' />
                    Chương trình khuyến mãi
                </h2>
                {
                    <button
                        className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-emerald-800 bg-emerald-600 text-white"
                        type='submit'
                        onClick={() => changeTab("/admin/add-item/promotion")}
                    >
                        Thêm
                    </button>
                }
            </div>
            <Tabs selectedIndex={tabIndex} className='relative'>
                <TabList className='py-2 px-8'>
                    <Tab onClick={() => {
                        handleGetPromotion(1)
                        setTabIndex(0)
                    }}
                    >Tự động áp dụng</Tab>
                    <Tab onClick={() => {
                        handleGetPromotionByCode(1)
                        setTabIndex(1)
                    }}
                    >Áp dụng code</Tab>
                </TabList>
                <TabPanel>
                    <div className='flex justify-center absolute mx-auto top-36 right-1/2 left-1/2 z-50'>
                        {loading['promotion'] && <Loading />}
                    </div>
                    {!loading['promotion'] &&
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
                                        promotion && promotion.map((item, index) => (
                                            <tr
                                                onClick={() => changeTab(`/admin/promotion/${item.promotionFixedId}`)}
                                                className='border-b-2 border-slate-200 hover:bg-slate-200 cursor-pointer'
                                            >
                                                <td className='text-center font-medium px-2 py-3'>{item.promotionFixedId}</td>
                                                <td className='text-start font-medium px-2 py-3 text-amber-500'>{item.name}</td>
                                                <td className='text-center font-medium px-2 py-3'>{FormatDataTime(item.startDate).date}</td>
                                                <td className='text-center font-medium px-2 py-3'>{FormatDataTime(item.endDate).date}</td>
                                                <td className={`${isAfter(parse(`${item.startDate}`, 'yyyy-MM-dd', new Date()), new Date()) ? "text-amber-600" : (!item.valid || item.deleted) ? "text-red-600" : "text-green-600"} text-center font-medium px-2 py-3`}>{isAfter(parse(`${item.startDate}`, 'yyyy-MM-dd', new Date()), new Date()) ? "Chưa diễn ra" : item.deleted ? "Ngưng hoạt động" : !item.valid ? "Đã kết thúc" : "Đang diễn ra"}</td>
                                                <td className='text-center font-medium px-2 py-3'>
                                                    <div className='flex items-center justify-end pr-8 outline-none'>
                                                        <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/promotion/${item.promotionFixedId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100'>
                                                            <PencilSquareIcon className='h-4 w-4 text-cyan-600' />
                                                        </a>
                                                        <button
                                                            type='button'
                                                            onClick={(e) => { e.stopPropagation(); handleOpenModal(item.promotionFixedId); }}
                                                            className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100 outline-none'
                                                        >
                                                            <TrashIcon className='h-4 w-4 text-red-600' />
                                                        </button>
                                                        <div>
                                                            {modalStates[item.promotionFixedId] && (
                                                                <Modal
                                                                    isOpen={modalStates[item.promotionFixedId]}
                                                                    onClose={() => handleCloseModal(item.promotionFixedId)}
                                                                    onConfirm={() => handleDeletePromotion(item.promotionFixedId)}
                                                                    onCancel={() => handleCloseModal(item.promotionFixedId)}
                                                                    title={!item.deleted ? 'Dừng khuyến mãi' : 'Khởi động lại khuyến mãi'}
                                                                    content={!item.deleted ? 'Bạn có chắc chắn dừng khuyến mãi này ?' : 'Bạn có chắc chắn khởi động lại khuyến mãi này ?'}
                                                                    buttonName='Đồng ý'
                                                                    buttonCancel='Thoát'
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetPromotion} />
                        </div>
                    }
                </TabPanel>
                <TabPanel>
                    <div className='flex justify-center absolute mx-auto top-36 right-1/2 left-1/2 z-50'>
                        {loading['promotionByCode'] && <Loading />}
                    </div>
                    {!loading['promotionByCode'] &&
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
                                        promotionByCode && promotionByCode.map((item, index) => (
                                            <tr
                                                onClick={() => { navigate(`/admin/promotion/${item.promotionCodeId}`) }}
                                                className='border-b-2 border-slate-200 hover:bg-slate-200 cursor-pointer'
                                            >
                                                <td className='text-center font-medium px-2 py-3'>{item.promotionCode}</td>
                                                <td className='text-start font-medium px-2 py-3 text-amber-500'>{item.name}</td>
                                                <td className='text-center font-medium px-2 py-3'>{FormatDataTime(item.startDate).date}</td>
                                                <td className='text-center font-medium px-2 py-3'>{FormatDataTime(item.endDate).date}</td>
                                                <td className={`${isAfter(parse(`${item.startDate}`, 'yyyy-MM-dd', new Date()), new Date()) ? "text-amber-600" : (!item.valid || item.deleted) ? "text-red-600" : "text-green-600"} text-center font-medium px-2 py-3`}>{isAfter(parse(`${item.startDate}`, 'yyyy-MM-dd', new Date()), new Date()) ? "Chưa diễn ra" : item.deleted ? "Ngưng hoạt động" : !item.valid ? "Đã kết thúc" : "Đang diễn ra"}</td>
                                                <td className='text-center font-medium px-2 py-3'>
                                                    <div className='flex items-center justify-end pr-8 outline-none'>
                                                        <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/promotion/${item.promotionCodeId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100'>
                                                            <PencilSquareIcon className='h-4 w-4 text-cyan-600' />
                                                        </a>
                                                        <button
                                                            type='button'
                                                            onClick={(e) => { e.stopPropagation(); handleOpenModal(item.promotionCodeId); }}
                                                            className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100 outline-none'
                                                        >
                                                            <TrashIcon className='h-4 w-4 text-red-600' />
                                                        </button>
                                                        <div>
                                                            {modalStates[item.promotionCodeId] && (
                                                                <Modal
                                                                    isOpen={modalStates[item.promotionCodeId]}
                                                                    onClose={() => handleCloseModal(item.promotionCodeId)}
                                                                    onConfirm={() => handleDeletePromotionByCode(item.promotionCodeId)}
                                                                    onCancel={() => handleCloseModal(item.promotionCodeId)}
                                                                    title={!item.deleted ? 'Dừng khuyến mãi' : 'Khởi động lại khuyến mãi'}
                                                                    content={!item.deleted ? 'Bạn có chắc chắn dừng khuyến mãi này ?' : 'Bạn có chắc chắn khởi động lại khuyến mãi này ?'}
                                                                    buttonName='Đồng ý'
                                                                    buttonCancel='Thoát'
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <Pagination pageNumber={pagination1.pageNumber} pageSize={pagination1.pageSize} totalElements={pagination1.totalElements} totalPages={pagination1.totalPages} getItemByPage={handleGetPromotionByCode} />
                        </div>
                    }
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default ListPromotion
