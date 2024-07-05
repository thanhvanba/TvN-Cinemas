import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { FilmIcon, StarIcon } from "@heroicons/react/20/solid"

import MovieService from '../../../../service/MovieService'
import AdminService from '../../../../service/AdminService'
import UserService from '../../../../service/UserService'

import FormatDataTime from '../../../../utils/FormatDataTime'
import { LoginContext } from '../../../../context/LoginContext'

import Pagination from '../../../../components/Pagination'
import ModalComponent from '../../../../utils/Modal';
import Loading from '../../../../components/Loading';
import Search from '../../../../components/Search'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import searchImg from '../../../../images/7a0bfed18240211e7851.jpg'

const ListMovies = () => {
    const { GetAllMovieApi } = MovieService();
    const { changeStatusMovieApi, deleteMovieApi, getAllMovieApi, getListGenresApi } = AdminService()
    const { searchMovieApi } = UserService()

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
    const [arrGenres, setArrGenres] = useState([]);

    const { user } = useContext(LoginContext)
    const [allMovie, setAllMovie] = useState([])
    const [allMovieSearch, setMovieSearch] = useState([])
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
    const handleGetListGenres = async () => {
        let resGenres = await getListGenresApi()
        if (resGenres && resGenres.data && resGenres.data.result) {
            setArrGenres(resGenres.data.result)
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
        handleGetListGenres()
    }, []);
    const listMovie = {
        header: { stt: "STT", movieInfo: "Phim", rating: "rating", genres: "Thể loại", releaseDate: "Ngày phát hành", action: "actions" },
        movie: allMovie,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
    }

    const [inputSearch, setInputSearch] = useState([])
    const [iconClick, setIconClick] = useState(false)
    const [showListSearch, setShowListSearch] = useState(false)
    const handleSearchFc = async (value) => {
        let resMovie = await searchMovieApi(value)
        if (resMovie && resMovie.data && resMovie.data.result) {
            setMovieSearch(resMovie.data.result)
        }
    }
    const handleClickIconSearch = async () => {
        allMovieSearch && setAllMovie(allMovieSearch)
        setIconClick(true)
    }

    const handleSelectType = async (value) => {
        setInputSearch(null)
        const genres = arrGenres.find(genre => genre?.name === value)
        setLoading(true)
        let res = (user.role === "ADMIN") ? await getAllMovieApi(1, 4, genres?.id) : await GetAllMovieApi(1, 4, genres?.id)
        setLoading(false)
        if (res && res.data && res.data.result && res.data.result.content) {
            setAllMovie(res.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: 1,
                pageSize: res.data.result.pageSize,
                totalPages: res.data.result.totalPages,
                totalElements: res.data.result.totalElements
            }));
        }
    }
    return (
        <div className='relative'>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <a href={(user.role === "MANAGER" ? "/manager/list-movie" : "/admin/list-movie")} className='text-3xl cursor-default flex items-center'>
                        <FilmIcon className='h-12 w-12 mr-1 text-emerald-600' />
                        Quản lý phim
                    </a>
                    {iconClick &&
                        <>
                            <ChevronRightIcon className='px-1 h-6' />
                            <h2 className='cursor-default text-xl'>Tìm kiếm</h2>
                        </>
                    }
                </div>
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
            <div className='flex justify-center absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                {loading && <Loading />}
            </div>


            <div className='flex justify-end items-center py-4 pr-4 gap-x-2'>
                <div className='border-2 rounded-xl flex'>
                    {!iconClick && <div className="h-8 xl:w-60 w-32 px-4 focus:outline-none py-1">
                        <SelectMenu onSelectChange={handleSelectType} items={['Tất cả', ...arrGenres.map(item => item.name)]} content={"Chọn thể loại phim"} />
                    </div>
                    }
                </div>
                <div className="relative border-2 rounded-xl ">
                    <Search searchFunction={handleSearchFc} handleClickIconSearch={handleClickIconSearch} setShowListSearch={setShowListSearch} inputSearch={inputSearch} setInputSearch={setInputSearch} />
                    {showListSearch && allMovieSearch.length !== 0 &&
                        <div className='absolute left-0 bg-slate-100 w-[100%] mt-2 p-4 rounded-lg'>
                            {allMovieSearch.map(movie => (
                                <div className='text-gray-900 hover:bg-slate-300 hover:rounded-md'>
                                    <div onClick={() => changeTab(`/admin/movie/${movie.movieId}`)} className='flex p-2 items-end cursor-default'>
                                        <img className="h-10 w-8 text-emerald-600" src={movie.poster} alt="" />
                                        <span className='text-sm font-semibold px-4 items-center'>{movie.title}</span>
                                    </div>
                                </div>
                            ))

                            }
                        </div>
                    }
                </div>
            </div>
            {!loading &&
                <>
                    {allMovie.length === 0 ?
                        <>
                            <div className='flex justify-center'>
                                <img src={searchImg} alt="" />
                            </div>

                            <div className='p-4 font-light text-center text-gray-500'>Không tìm thấy phim</div>
                        </> :
                        <>
                            <table className='mt-6 w-full'>
                                <thead className=''>
                                    <tr className='border-b-2 border-slate-200'>
                                        <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.stt}</th>
                                        <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.movieInfo}</th>
                                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-3'>{listMovie.header.rating}</th>
                                        <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.genres}</th>
                                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-9'>{listMovie.header.releaseDate}</th>
                                        {user.role === "ADMIN" && <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listMovie.header.action}</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listMovie.movie.map((item, index) => (
                                            <tr
                                                onClick={() => changeTab(`/admin/movie/${item.movieId}`)}
                                                className='border-b-2 border-slate-200 hover:bg-slate-200 cursor-pointer'
                                            >
                                                <td className='text-center font-medium px-2 py-3'>{index + 1 + pagination.pageSize * (pagination.pageNumber - 1)}</td>
                                                <td className='text-start font-medium px-2 py-3'>
                                                    <div className='flex items-center'>
                                                        <div div className='pr-2' >
                                                            <img className="h-20 w-16" src={item.poster} alt="" />
                                                        </div >
                                                        <div>
                                                            <h3 className='uppercase'>{item.title}</h3>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center font-medium px-2 py-3'>
                                                    <div className='flex justify-center'>
                                                        {item.rating && <StarIcon className='h-6 text-amber-400 px-1' />}
                                                        <span className='w-[30px] flex text-start'>{item.rating || "-"}</span>
                                                    </div>
                                                </td>
                                                <td className='text-center font-normal px-2 py-3'>
                                                    {item.genres.length === 0 ?
                                                        <span>-</span> :
                                                        item.genres.map((genre, index) => (
                                                            <span key={index}>{genre.name}{index < item.genres.length - 1 ? ', ' : ''}</span>
                                                        ))}
                                                </td>
                                                <td className='text-center font-normal px-2 py-3 text-sky-600'>{FormatDataTime(item.releaseDate).date}</td>
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
                                                                        title='Chuyển trạng thái'
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
                            {!iconClick && <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetAllMovie} />}
                        </>
                    }
                </>
            }

        </div>
    )
}

export default ListMovies
