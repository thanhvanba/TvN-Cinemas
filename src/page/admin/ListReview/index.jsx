import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import searchImg from '../../../images/7a0bfed18240211e7851.jpg'

import AdminService from '../../../service/AdminService'
import MovieService from '../../../service/MovieService'
import ManagerService from '../../../service/ManagerService'

import FormatDataTime from '../../../utils/FormatDataTime'

import Pagination from '../../../components/Pagination'
import ModalComponent from '../../../utils/Modal';
import Loading from '../../../components/Loading';
import Search from '../../../components/Search'
import { LoginContext } from '../../../context/LoginContext'
import TimeAgo from '../../../components/TimeAgo'
import { StarIcon } from '@heroicons/react/20/solid'
import SelectMenu from '../../../components/SelectMenu/SelectMenu'

const ListReview = () => {
  const { getListReviewApi } = ManagerService()
  const { GetAllMovieApi } = MovieService()

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
  const [reviews, setReviews] = useState([])
  const [movieArr, setMovieArr] = useState([]);
  console.log("🚀 ~ ListReview ~ movieArr:", movieArr)
  const [selectedMovie, setSelectedMovie] = useState({});

  const handleGetReviews = async (pageNumber) => {
    setLoading(true)
    let res = await getListReviewApi(pageNumber, 6, selectedMovie.movieId)
    setLoading(false)
    if (res && res.data && res.data.result && res.data.result.content) {
      setReviews(res.data.result.content)
      setPagination(prevPagination => ({
        ...prevPagination,
        pageNumber: pageNumber,
        pageSize: res.data.result.pageSize,
        totalPages: res.data.result.totalPages,
        totalElements: res.data.result.totalElements
      }));
    }
  }

  const handleAllMovie = async () => {
    let resMovie = await GetAllMovieApi(1, 999)
    if (resMovie && resMovie.data && resMovie.data.result && resMovie.data.result.content) {
      setMovieArr(resMovie.data.result.content)
    }
  }

  useEffect(() => {
    handleGetReviews(pagination.pageNumber)
  }, [selectedMovie]);

  useEffect(() => {
    handleAllMovie()
  }, []);

  const handleSelectType = async (value) => {
    const movie = movieArr.find(movie => movie?.title === value)
    setSelectedMovie(movie)
  }
  const listReview = {
    header: { stt: "STT", movieInfo: "Phim", rating: "Số sao", desc: "Chi tiết", userName: "Người dùng", releaseDate: "Ngày đánh giá" },
    reviews: reviews,
    action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
  }
  return (
    <div className='relative'>
      <div className='px-3'>

        <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
          <h2 className='text-3xl cursor-default flex items-end'>
            <StarIcon className='h-12 w-12 mr-1 text-emerald-600' />Quản lý đánh giá</h2>
        </div>
        <div className='flex justify-center absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
          {loading && <Loading />}
        </div>


        <div className='flex justify-end items-center py-4 pr-4'>
          <div className='border-2 rounded-xl flex'>
            <div className="h-8 xl:w-72 w-32 px-4 focus:outline-none py-1">
              <SelectMenu onSelectChange={handleSelectType} items={movieArr.map(item => item.title)} content={"Chọn phim"} />
            </div>
          </div>
        </div>
        {
          !loading &&
          <>
            {
              reviews.length === 0 ?
                <>
                  <div className='flex justify-center'>
                    <img src={searchImg} alt="" />
                  </div>

                  <div className='p-4 font-light text-center text-gray-500'>Không tìm thấy đánh giá</div>
                </> :
                <>
                  <table className='mt-6 w-full'>
                    <thead className=''>
                      <tr className='border-b-2 border-slate-200'>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-10'>{listReview.header.stt}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-72'>{listReview.header.movieInfo}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-16'>{listReview.header.rating}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase'>{listReview.header.desc}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-32'>{listReview.header.userName}</th>
                        <th className='text-sm text-center font-light px-2 pb-4 uppercase w-32'>{listReview.header.releaseDate}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        listReview.reviews.map((item, index) => (
                          <tr className='border-b-2 border-slate-200 hover:bg-slate-200'>
                            <td className='text-center font-medium px-2 py-3'>{index + 1 + pagination.pageSize * (pagination.pageNumber - 1)}</td>
                            <td className='text-center font-semibold px-2 py-3 text-emerald-800'>{item.movieName}</td>
                            <td className='text-center font-medium px-2 py-3'>
                              <div className='flex justify-center'>
                                {(item.rating || item.rating != 0) && <StarIcon className='h-6 text-amber-400 px-1' />}
                                <span className='w-[30px] flex text-start'>{item.rating ? item.rating : "-"}</span>
                              </div>
                            </td>
                            <td className='text-center font-medium px-2 py-3'>{item.comment ? item.comment : "-"}</td>
                            <td className='text-center font-medium px-2 py-3'>{item.userName}</td>
                            <td className='text-center font-light px-2 py-3 text-sky-600'>{TimeAgo(item.createAt)}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <Pagination pageNumber={pagination.pageNumber} pageSize={pagination.pageSize} totalElements={pagination.totalElements} totalPages={pagination.totalPages} getItemByPage={handleGetReviews} />

                </>
            }
          </>
        }
      </div>
    </div>
  )
}

export default ListReview
