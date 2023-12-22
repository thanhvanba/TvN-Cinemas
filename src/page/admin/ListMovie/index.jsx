import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import TruncatedContent from '../../../utils/TruncatedContent'

import MovieService from '../../../service/MovieService'
import AdminService from '../../../service/AdminService'

import FormatDataTime from '../../../utils/FormatDataTime'
import { LoginContext } from '../../../context/LoginContext'

import ModalComponent from '../../../utils/Modal';

const ListMovie = () => {
  const { GetAllMovieApi } = MovieService();
  const { changeStatusMovieApi, deleteMovieApi } = AdminService()
  const navigate = useNavigate()

  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const { user } = useContext(LoginContext)
  const [allMovie, setAllMovie] = useState([])
  const [modalStates, setModalStates] = useState({});

  const HandleGetAllMovie = async () => {
    let res = await GetAllMovieApi()
    if (res && res.data && res.data.result && res.data.result.content) {
      setAllMovie(res.data.result.content)
    }
  }
  const handleChangeStatus = async (movieId) => {
    console.log("🚀 ~ file: index.jsx:31 ~ handleChangeStatus ~ movieId:", movieId)
    await changeStatusMovieApi(movieId);

    const updateMovies = allMovie.map((movie) => {
      if (movie.movieId === movieId) {
        return { ...movie, delete: !movie.delete };
      }
      return movie;
    });

    setAllMovie(updateMovies);
  };

  const handleDeleteMovie = async (movieId) => {
    await deleteMovieApi(movieId);

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
    HandleGetAllMovie()
  }, []);
  console.log("🚀 ~ file: index.jsx:11 ~ ListMovie ~ allMovie:", allMovie)
  const listMovie = {
    header: { stt: "STT", movieInfo: "Phim", rating: "rating", genres: "Thể loại", status: "status", releaseDate: "Release Date", action: "actions" },
    movie: allMovie,
    action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
  }

  return (
    <div>
      <div className='px-4'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
          <h2 className='text-3xl'>List Movie</h2>
          {
            (user.role === "ADMIN") ?
              <button
                className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                type='submit'
                onClick={() => changeTab("/admin/add-item/movie")}
              >
                Add Movie
              </button>
              :
              <div></div>
          }
        </div>

        <div>
          <div className='px-3'>
            <div className=''>
              {

                <table className='mt-6 w-full'>
                  <thead className=''>
                    <tr>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.stt}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.movieInfo}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.rating}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.genres}</th>
                      {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.status}</th>}
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.releaseDate}</th>
                      {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.action}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listMovie.movie.map((item, index) => (
                        <tr onClick={() => changeTab(`/admin/movie/${item.movieId}`)} className='border-b-8 border-slate-50 bg-slate-100'>
                          <td className='text-start font-medium px-5 py-4'>{index + 1}</td>
                          <td className='text-start font-medium px-5 py-4'>
                            <div className='flex items-center'>
                              <div div className='pr-2' >
                                <img className="h-20 w-16 text-emerald-600" src={item.poster} alt="" />
                              </div >
                              <div>
                                <h3 className='uppercase'>{item.title}</h3>
                              </div>
                            </div>
                          </td>
                          <td className='text-start font-medium px-5 py-4'>{item.rating}</td>
                          <td className='text-start font-medium px-5 py-4'>{item.genres}</td>
                          {user.role === "ADMIN" && <td className={`${item.delete ? "text-red-600" : "text-green-600"} text-start font-medium px-5 py-4`}>{item.delete ? "Hidden" : "Visible"}</td>}
                          <td className='text-start font-medium px-5 py-4'>{FormatDataTime(item.releaseDate).date}</td>
                          {user.role === "ADMIN" && <td className='text-start font-medium px-5 py-4'>
                            <div className='flex items-center'>
                              <button type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.movieId) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                <listMovie.action.aChange className='h-4 w-4 text-emerald-600' />
                              </button>
                              <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/movie/${item.movieId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100'>
                                <listMovie.action.aEdit className='h-4 w-4 text-cyan-600' />
                              </a>
                              <button type='button' onClick={(e) => { e.stopPropagation();handleOpenModal(item.movieId);  }} className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                <listMovie.action.aDelete className='h-4 w-4 text-red-600' />
                              </button>
                              <div>
                                {modalStates[item.movieId] && (
                                  <ModalComponent
                                    isOpen={modalStates[item.movieId]}
                                    onClose={() => handleCloseModal(item.movieId)}
                                    onConfirm={() => handleDeleteMovie(item.movieId)}
                                    onCancel={() => handleCloseModal(item.movieId)}
                                    title='Deactivate account'
                                    content='Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.'
                                    buttonName='Deactivate'
                                  />
                                )}
                              </div>
                            </div>
                          </td>}
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListMovie
