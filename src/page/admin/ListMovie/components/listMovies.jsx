import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import MovieService from '../../../../service/MovieService'
import AdminService from '../../../../service/AdminService'

import FormatDataTime from '../../../../utils/FormatDataTime'
import { LoginContext } from '../../../../context/LoginContext'

import Pagination from '../../../../components/Pagination'
import ModalComponent from '../../../../utils/Modal';
import Loading from '../../../../components/Loading';
import Search from '../../../../components/Search'

const ListMovies = () => {
    const { GetAllMovieApi } = MovieService();
    const { changeStatusMovieApi, deleteMovieApi, getAllMovieApi } = AdminService()

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );

    const { user } = useContext(LoginContext)
    const [allMovie, setAllMovie] = useState([])
    const [modalStates, setModalStates] = useState({});

    const handleGetAllMovie = async (pageNumber) => {
        setLoading(true)
        let res = (user.role === "ADMIN") ? await getAllMovieApi(pageNumber, 4) : await GetAllMovieApi(pageNumber, 4)
        setLoading(false)
        if (res && res.data && res.data.result && res.data.result.content) {
            setAllMovie(res.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: res.data.result.pageSize,
                totalPages: res.data.result.totalPages,
                totalElements: res.data.result.totalElements
            }));
        }
    }
    const handleChangeStatus = async (movieId) => {
        setLoading(true)
        await changeStatusMovieApi(movieId);
        handleGetAllMovie(pagination.pageNumber)
        const updateMovies = allMovie.map((movie) => {
            if (movie.movieId === movieId) {
                return { ...movie, delete: !movie.delete };
            }
            return movie;
        });
        handleCloseModal(movieId)
        setAllMovie(updateMovies);
        setLoading(false)
    };

    const handleDeleteMovie = async (movieId) => {
        await deleteMovieApi(movieId);
        handleGetAllMovie(pagination.pageNumber)
        const updateMovies = allMovie.filter((movie) => movie.movieId !== movieId);
        setAllMovie(updateMovies);
    };

    const handleOpenModal = (movieId) => {
        setModalStates((prevStates) => ({ ...prevStates, [movieId]: true }));
    };

    const handleCloseModal = (movieId) => {
        setModalStates((prevStates) => ({ ...prevStates, [movieId]: false }));
    };

    useEffect(() => {
        handleGetAllMovie(pagination.pageNumber)
    }, []);
    const listMovie = {
        header: { stt: "STT", movieInfo: "Phim", rating: "rating", genres: "Thể loại", releaseDate: "Ngày phát hành", action: "actions" },
        movie: allMovie,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
    }
    return (
        <div className='relative'>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <h2 className='text-3xl cursor-default'>Quản lý phim</h2>
                {
                    user.role === "ADMIN" &&
                    <button
                        className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-emerald-800 bg-emerald-600 text-white"
                        type='submit'
                        onClick={() => changeTab("/admin/add-item/movie")}
                    >
                        Thêm phim
                    </button>
                }
            </div>
            <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                {loading && <Loading />}
            </div>

            {
                !loading && <div className=''>
                    <div className='flex justify-end items-center py-4 pr-4'>
                        <div className="border-2 rounded-xl ">
                            <Search />
                        </div>
                    </div>
                    <table className='mt-6 w-full'>
                        <thead className=''>
                            <tr className='border-b-2 border-slate-200'>
                                <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.stt}</th>
                                <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.movieInfo}</th>
                                <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.rating}</th>
                                <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.genres}</th>
                                <th className='text-sm text-center font-light px-2 pb-4 uppercase w-9'>{listMovie.header.releaseDate}</th>
                                {user.role === "ADMIN" && <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.action}</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listMovie.movie.map((item, index) => (
                                    <tr onClick={() => changeTab(`/admin/movie/${item.movieId}`)} className='border-b-2 border-slate-200 hover:bg-slate-200'>
                                        <td className='text-center font-medium px-2 py-3'>{index + 1 + pagination.pageSize * (pagination.pageNumber - 1)}</td>
                                        <td className='text-start font-medium px-2 py-3'>
                                            <div className='flex items-center'>
                                                <div div className='pr-2' >
                                                    <img className="h-20 w-16 text-emerald-600" src={item.poster} alt="" />
                                                </div >
                                                <div>
                                                    <h3 className='uppercase'>{item.title}</h3>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center font-medium px-2 py-3'>{item.rating}</td>
                                        <td className='text-center font-medium px-2 py-3'>{item.genres}</td>
                                        <td className='text-center font-medium px-2 py-3'>{FormatDataTime(item.releaseDate).date}</td>
                                        {user.role === "ADMIN" &&
                                            <td className='text-center font-medium px-2 py-3'>
                                                <div className='flex items-center justify-center'>
                                                    <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/movie/${item.movieId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100'>
                                                        <listMovie.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                    </a>
                                                    <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.movieId); }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                        <listMovie.action.aChange className='h-4 w-4 text-red-600' />
                                                    </button>
                                                    <div>
                                                        {modalStates[item.movieId] && (
                                                            <ModalComponent
                                                                isOpen={modalStates[item.movieId]}
                                                                onClose={() => handleCloseModal(item.movieId)}
                                                                onConfirm={() => handleChangeStatus(item.movieId)}
                                                                onCancel={() => handleCloseModal(item.movieId)}
                                                                title='Chuyển trạng  thái'
                                                                content='Bạn có chắc chắn đổi trạng thái phim này ???'
                                                                buttonName='Thay đổi'
                                                                buttonCancel='Thoát'
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </td>}
                                        {user.role === "ADMIN" && <td className={`${item.delete ? "text-red-600" : "text-green-600"} text-center font-medium px-2 py-3`}>{item.delete ? "Đã xóa" : "Sẵn sàng"}</td>}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetAllMovie} />
                </div>
            }
        </div>
    )
}

export default ListMovies
