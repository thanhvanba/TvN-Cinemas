import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ManagerService from '../../../../service/ManagerService';
import AdminService from '../../../../service/AdminService';
import MovieService from '../../../../service/MovieService';
import UserService from '../../../../service/UserService';
import { LoginContext } from '../../../../context/LoginContext';
import { ChevronRightIcon, PencilSquareIcon, PowerIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
    const [modalStates, setModalStates] = useState({});
    const [allCinema, setAllCinema] = useState([])

    const { user } = useContext(LoginContext);
    const handleGetAllItem = async (pageNumber) => {
        setLoading(true)
        let res = user.role === "ADMIN" ? await getAllCinemaApi(pageNumber, 8) : null;

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
        const updateCinemas = allCinema.map((cinema) => {
            if (cinema.cinemaId === cinemaId) {
                return { ...cinema, delete: !cinema.delete };
            }
            return cinema;
        });

        setAllCinema(updateCinemas);
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
    }, []);

    return (
        <div>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>

                <h2 className='text-3xl cursor-default'>Quản lý rạp</h2>
                <button
                    className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                    onClick={() => changeTab('/admin/add-item/cinema')}
                    type='button'
                >
                    Thêm rạp phim
                </button>

            </div>
            <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                {loading && <Loading />}
            </div>
            {!loading &&
                <div>
                    <h1 className='uppercase text-center pt-8 pb-6 text-2xl font-bold text-emerald-600'>Danh sách rạp phim</h1>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10 mx-4'>
                        {
                            allCinema.map((item, index) => (
                                <div className='border-2 border-slate-400 rounded-xl h-full w-full' >
                                    <div className='p-1 h-full'>
                                        <div className='flex relative h-full'>
                                            <div
                                                key={`cinema-${index}`}
                                                className={`rounded-xl bg-slate-700 hover:bg-slate-400 cursor-pointer bg-opacity-90 sm:w-80 md:w-[260px] lg:w-64 flex flex-col justify-between`}
                                                onClick={() => { navigate(`/admin/cinema/${item.cinemaId}/list-showtime`, { state: { cinemaName: item.cinemaName } }) }}
                                            // onClick={() => { changeTab(`/admin/update-item/cinema/${item.cinemaId}`) }}
                                            >
                                                <Cinema cinemaName={item.cinemaName} location={item.location} urlLocation={item.urlLocation} />
                                            </div>
                                            {!item.status && <div className='absolute rounded-xl top-0 right-9 bottom-0 left-0 bg-red-900 bg-opacity-20'>
                                                <XMarkIcon className='text-slate-700 opacity-70' />
                                            </div>}
                                            <div className='w-1/6 pl-1'>
                                                <button type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.cinemaId) }} className='flex justify-center items-center w-full h-8 mb-2 rounded-lg bg-emerald-100'>
                                                    <PowerIcon className='h-6 w-6 text-emerald-600' />
                                                </button>
                                                <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/cinema/${item.cinemaId}`) }} className='flex justify-center items-center w-full h-8 mb-2 rounded-lg bg-cyan-100 cursor-pointer'>
                                                    <PencilSquareIcon className='h-6 w-6 text-cyan-600' />
                                                </a>
                                                <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.cinemaId) }} className='flex justify-center items-center w-full h-8 rounded-lg bg-red-100'>
                                                    <TrashIcon className='h-6 w-6 text-red-600' />
                                                </button>
                                                <div>
                                                    {modalStates[item.cinemaId] && (
                                                        <Modal
                                                            isOpen={modalStates[item.cinemaId]}
                                                            onClose={() => handleCloseModal(item.cinemaId)}
                                                            onConfirm={() => handleDeleteCinema(item.cinemaId)}
                                                            onCancel={() => handleCloseModal(item.cinemaId)}
                                                            title='Xóa Rạp Phim'
                                                            content='Bạn có chắc chắn xóa rạp phim này ???'
                                                            buttonName='Xóa'
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
                </div>
            }
        </div>
    )
}

export default ListCinema
