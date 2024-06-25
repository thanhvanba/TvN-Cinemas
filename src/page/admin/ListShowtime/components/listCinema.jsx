import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ManagerService from '../../../../service/ManagerService';
import AdminService from '../../../../service/AdminService';
import MovieService from '../../../../service/MovieService';
import UserService from '../../../../service/UserService';
import { LoginContext } from '../../../../context/LoginContext';
import { ArrowUturnLeftIcon, ChevronRightIcon, PencilSquareIcon, PowerIcon, TrashIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Pagination from '../../../../components/Pagination';
import Cinema from '../../../../components/Cinema';
import Modal from '../../../../utils/Modal';
import Loading from '../../../../components/Loading';

const ListCinema = () => {
    const { getAllShowtimeApi, getAllCinemaApi, deleteCinemaApi, changeStatusCinemaApi } = AdminService();
    const { getAllShowtimeByManagerApi, changeStatusShowtimeApi, deleteShowtimeApi } = ManagerService();

    const navigate = useNavigate();
    const changeTab = (pathname) => {
        navigate(pathname);
    };

    const [pagination, setPagination] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [modalStates, setModalStates] = useState({});
    const [allCinema, setAllCinema] = useState([])

    const { user } = useContext(LoginContext);
    const handleGetAllItem = async (pageNumber) => {
        setLoading(true)
        let res = user.role === "ADMIN" ? await getAllCinemaApi(pageNumber, 8, status) : null;

        if (res && res.data && res.data.result && res.data.result.content) {
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: res.data.result.pageSize,
                totalPages: res.data.result.totalPages,
                totalElements: res.data.result.totalElements
            }));
            setAllCinema(res.data.result.content)
        }
        setLoading(false)
    }
    const handleChangeStatus = async (cinemaId) => {
        setLoading(true)
        await changeStatusCinemaApi(cinemaId);
        handleGetAllItem(pagination.pageNumber);
        handleCloseModal(cinemaId)
        setLoading(false)
    };
    const handleDeleteCinema = async (cinemaId) => {
        await deleteCinemaApi(cinemaId);
        handleGetAllItem(pagination.pageNumber);
        const updatedCinemas = allCinema.filter((cinema) => cinema.cinemaId !== cinemaId);
        setAllCinema(updatedCinemas);

        setModalStates((prevStates) => ({ ...prevStates, [cinemaId]: false }));
    };

    const handleOpenModal = (cinemaId) => {
        setModalStates((prevStates) => ({ ...prevStates, [cinemaId]: true }));
    };

    const handleCloseModal = (cinemaId) => {
        setModalStates((prevStates) => ({ ...prevStates, [cinemaId]: false }));
    };

    useEffect(() => {
        handleGetAllItem(pagination.pageNumber);
    }, [status]);

    return (
        <div>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <h2 className='text-3xl cursor-default'>Quản lý rạp</h2>
                <button
                    className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-emerald-800 bg-emerald-600 text-white"
                    onClick={() => changeTab('/admin/add-item/cinema')}
                    type='button'
                >
                    Thêm rạp phim
                </button>

            </div>
            <div className='flex justify-center absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                {loading && <Loading />}
            </div>
            {!loading &&
                <div className='relative'>
                    {allCinema.length !== 0 &&
                        <h1 className='uppercase text-center pt-8 pb-6 text-2xl font-bold text-emerald-700'>{status ? 'Danh sách rạp phim' : 'Danh sách rạp phim đang bảo trì'}</h1>
                    }
                    <button
                        type="button"
                        className="absolute top-4 right-4 z-50"
                    >
                        <span className="sr-only">Close menu</span>
                        <div className={`${status ? '' : 'shadow-inner'} p-1 border-2 rounded-lg text-red-900`} onClick={() => setStatus(!status)}>
                            {status ?
                                <WrenchScrewdriverIcon className="text-4xl h-10 w-10 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                                : <ArrowUturnLeftIcon className="text-4xl h-10 w-10 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                            }
                        </div>
                    </button>

                    {
                        allCinema.length === 0 ?
                            <div className='p-4 text-center text-gray-500'>
                                {!status ?
                                    <span>Chưa có rạp nào đang bảo trì</span>
                                    : <span>Chưa có rạp. Tiến hành thêm rạp phim !!!</span>
                                }
                            </div>
                            :
                            <>
                                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10 mx-4'>
                                    {
                                        allCinema.map((item, index) => (
                                            <div className='border-2 border-slate-400 rounded-xl h-full w-full' >
                                                <div className='p-2 h-full'>
                                                    <div className='flex h-52'>
                                                        <div
                                                            key={`cinema-${index}`}
                                                            className={`relative rounded-xl bg-slate-700 cursor-pointer bg-opacity-90 sm:w-80 md:w-[260px] lg:w-64 flex flex-col justify-between`}
                                                            onClick={() => { navigate(`/admin/cinema/${item.cinemaId}/list-showtime`, { state: { cinemaName: item.cinemaName } }) }}
                                                        >
                                                            <Cinema cinemaName={item.cinemaName} location={item.location} urlLocation={item.urlLocation} />

                                                        </div>
                                                        <div className='w-1/6 pl-1'>
                                                            <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.cinemaId) }} className='flex justify-center items-center w-full h-8 mb-2 rounded-lg bg-emerald-100'>
                                                                <PowerIcon className='h-6 w-6 text-emerald-600' />
                                                            </button>
                                                            <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/cinema/${item.cinemaId}`) }} className='flex justify-center items-center w-full h-8 mb-2 rounded-lg bg-cyan-100 cursor-pointer'>
                                                                <PencilSquareIcon className='h-6 w-6 text-cyan-600' />
                                                            </a>
                                                            <div>
                                                                {modalStates[item.cinemaId] && (
                                                                    <Modal
                                                                        isOpen={modalStates[item.cinemaId]}
                                                                        onClose={() => handleCloseModal(item.cinemaId)}
                                                                        onConfirm={() => handleChangeStatus(item.cinemaId)}
                                                                        onCancel={() => handleCloseModal(item.cinemaId)}
                                                                        title={item.status ? 'Bảo trì rạp' : 'Khôi phục rạp'}
                                                                        content={item.status ? 'Bạn có chắc chắn bảo trì rạp phim này ???' : 'Bạn có chắc chắn khôi rạp phim này ???'}
                                                                        buttonName={item.status ? 'Bảo trì' : 'Khôi phục'}
                                                                        buttonCancel='Thoát'
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetAllItem} />
                            </>
                    }
                </div>
            }
        </div>
    )
}

export default ListCinema
