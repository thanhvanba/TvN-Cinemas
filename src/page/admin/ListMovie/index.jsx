import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import TruncatedContent from '../../../utils/TruncatedContent'

// import MovieService from '../../../service/MovieService'
// import AdminService from '../../../service/AdminService'

// import FormatDataTime from '../../../utils/FormatDataTime'
import { LoginContext } from '../../../context/LoginContext'

import Pagination from '../../../components/Pagination'
// import ModalComponent from '../../../utils/Modal';
// import Loading from '../../../components/Loading';
import DetailMovie from './components/detailMovie';
import AddMovie from './components/addMovie';
import ListMovies from './components/listMovies';

const ListMovie = () => {
  // const { GetAllMovieApi } = MovieService();
  // const { changeStatusMovieApi, deleteMovieApi, getAllMovieApi } = AdminService()

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const { user } = useContext(LoginContext)
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [allMovie, setAllMovie] = useState([])
  // const [modalStates, setModalStates] = useState({});

  // const handleGetAllMovie = async (pageIndex) => {
  //   setCurrentPage(pageIndex)
  //   setLoading(true)
  //   let res = (user.role === "ADMIN") ? await GetAllMovieApi(pageIndex, 5) : await GetAllMovieApi(pageIndex, 5)
  //   setLoading(false)
  //   if (res && res.data && res.data.result && res.data.result.content) {
  //     setAllMovie(res.data.result.content)
  //   }
  // }
  // const handleChangeStatus = async (movieId) => {
  //   await changeStatusMovieApi(movieId);
  //   handleGetAllMovie(currentPage)
  //   const updateMovies = allMovie.map((movie) => {
  //     if (movie.movieId === movieId) {
  //       return { ...movie, delete: !movie.delete };
  //     }
  //     return movie;
  //   });

  //   setAllMovie(updateMovies);
  // };

  // const handleDeleteMovie = async (movieId) => {
  //   await deleteMovieApi(movieId);
  //   handleGetAllMovie(currentPage)
  //   const updateMovies = allMovie.filter((movie) => movie.movieId !== movieId);

  //   setAllMovie(updateMovies);
  // };

  // const handleOpenModal = (movieId) => {
  //   setModalStates((prevStates) => ({ ...prevStates, [movieId]: true }));
  // };

  // const handleCloseModal = (movieId) => {
  //   setModalStates((prevStates) => ({ ...prevStates, [movieId]: false }));
  // };

  // useEffect(() => {
  //   console.log("DDaay")
  //   handleGetAllMovie(currentPage)
  // }, []);
  // const listMovie = {
  //   header: { stt: "STT", movieInfo: "Phim", rating: "rating", genres: "Thể loại", status: "Trạng thái", releaseDate: "Ngày phát hành", action: "actions" },
  //   movie: allMovie,
  //   action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
  // }

  return (
    <div>
      <div className='px-4'>
        {/^\/(admin|manager)\/movie/.test(pathname) ? <DetailMovie /> :
          /^\/admin\/(add-item\/movie|update-item)/.test(pathname) ? <AddMovie /> :
            // <div className='relative'>
            //   <div className='px-3'>
            //     {
            //       allMovie.length === 0 ?
            //         <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
            //           {loading && <Loading />}
            //         </div>
            //         :
            //         <div className=''>
            //           {
            //             <table className='mt-6 w-full'>
            //               <thead className=''>
            //                 <tr>
            //                   <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.stt}</th>
            //                   <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.movieInfo}</th>
            //                   <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.rating}</th>
            //                   <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.genres}</th>
            //                   {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.status}</th>}
            //                   <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.releaseDate}</th>
            //                   {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.action}</th>}
            //                 </tr>
            //               </thead>
            //               <tbody>
            //                 {
            //                   listMovie.movie.map((item, index) => (
            //                     <tr onClick={() => changeTab(`/admin/movie/${item.movieId}`)} className='border-b-8 border-slate-50 bg-slate-100'>
            //                       <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
            //                       <td className='text-start font-medium px-5 py-4'>
            //                         <div className='flex items-center'>
            //                           <div div className='pr-2' >
            //                             <img className="h-20 w-16 text-emerald-600" src={item.poster} alt="" />
            //                           </div >
            //                           <div>
            //                             <h3 className='uppercase'>{item.title}</h3>
            //                           </div>
            //                         </div>
            //                       </td>
            //                       <td className='text-start font-medium px-5 py-4'>{item.rating}</td>
            //                       <td className='text-start font-medium px-5 py-4'>{item.genres}</td>
            //                       {user.role === "ADMIN" && <td className={`${item.delete ? "text-red-600" : "text-green-600"} text-start font-medium px-5 py-4`}>{item.delete ? "Hidden" : "Visible"}</td>}
            //                       <td className='text-start font-medium px-5 py-4'>{FormatDataTime(item.releaseDate).date}</td>
            //                       {user.role === "ADMIN" && <td className='text-start font-medium px-5 py-4'>
            //                         <div className='flex items-center'>
            //                           <button type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.movieId) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
            //                             <listMovie.action.aChange className='h-4 w-4 text-emerald-600' />
            //                           </button>
            //                           <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/movie/${item.movieId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100'>
            //                             <listMovie.action.aEdit className='h-4 w-4 text-cyan-600' />
            //                           </a>
            //                           <button type='button' onClick={(e) => { e.stopPropagation(); handleOpenModal(item.movieId); }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
            //                             <listMovie.action.aDelete className='h-4 w-4 text-red-600' />
            //                           </button>
            //                           <div>
            //                             {modalStates[item.movieId] && (
            //                               <ModalComponent
            //                                 isOpen={modalStates[item.movieId]}
            //                                 onClose={() => handleCloseModal(item.movieId)}
            //                                 onConfirm={() => handleDeleteMovie(item.movieId)}
            //                                 onCancel={() => handleCloseModal(item.movieId)}
            //                                 title='Xóa Phim'
            //                                 content='Bạn có chắc chắn xóa phim này ???'
            //                                 buttonName='Delete'
            //                               />
            //                             )}
            //                           </div>
            //                         </div>
            //                       </td>}
            //                     </tr>
            //                   ))
            //                 }
            //               </tbody>
            //             </table>
            //           }
            //           <Pagination pageNumber={currentPage} onPageChange={handleGetAllMovie} />
            //         </div>
            //     }
            //   </div>
            // </div>
            <ListMovies />
        }

      </div>
    </div >
  )
}

export default ListMovie
