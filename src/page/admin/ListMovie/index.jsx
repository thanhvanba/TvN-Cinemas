import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import TruncatedContent from '../../../utils/TruncatedContent'
import MovieService from '../../../service/MovieService'

const ListMovie = () => {
  const { GetAllMovieApi } = MovieService();
  const navigate = useNavigate()

  const changeTab = (pathname) => {
    navigate(pathname)
  }
  const [allMovie, setAllMovie] = useState([])
  const HandleGetAllMovie = async () => {
    let res = await GetAllMovieApi()
    if (res && res.data && res.data.result && res.data.result.content) {
      setAllMovie(res.data.result.content)
    }
  }

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
          <button
            className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
            type='submit'
            onClick={() => changeTab("/admin/add-item/movie")}
          >
            Add Movie
          </button>
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
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.status}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.releaseDate}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listMovie.header.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listMovie.movie.map((item, index) => (
                        <tr className='border-b-8 border-slate-50 bg-slate-100'>
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
                          <td className={`${item.delete ? "text-red-600" : "text-green-600"} text-start font-medium px-5 py-4`}>{item.delete ? "Hidden" : "Visible"}</td>
                          <td className='text-start font-medium px-5 py-4'>{item.releaseDate}</td>
                          <td className='text-start font-medium px-5 py-4'>
                            <div className='flex items-center'>
                              <button className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                <listMovie.action.aChange className='h-4 w-4 text-emerald-600' />
                              </button>
                              <a className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                <listMovie.action.aEdit className='h-4 w-4 text-cyan-600' />
                              </a>
                              <button className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                <listMovie.action.aDelete className='h-4 w-4 text-red-600' />
                              </button>
                            </div>
                          </td>
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
