import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import Search from '../../../components/Search'
import { useNavigate } from 'react-router-dom'
import StaffService from '../../../service/StaffService'

function SearchUser({ onToggle, infoSchedule, listSeatBooking, listFoodBooking, selectSeats, foods }) {
    const navigate = useNavigate()
    const { searchViewerApi } = StaffService()
    const [listViewerFound, setListViewerFound] = useState()
    const [showMovieList, setShowMovieList] = useState(false)
    const [userInfo, setUserInfo] = useState()
    const [inputSearch, setInputSearch] = useState()

    const handleSearch = async (value) => {
        let resViewer = await searchViewerApi(value)
        if (resViewer && resViewer.data && resViewer.data.result) {
            setListViewerFound(resViewer.data.result)
        }
    }
    const handleClickIconSearch = () => {

    }
    return (
        <div className='flex justify-center items-start bg-black bg-opacity-50 w-full h-screen right-0 bottom-0 fixed z-20'>
            <div className='w-1/3 relative pt-24'>
                <div className='text-gray-50 bg-cyan-600 flex items-center py-2 px-4 rounded-t-sm'>
                    <MagnifyingGlassIcon className='w-6 h-6 mr-2' /> <p className='font-bold text-2xl'>Tìm kiếm khách hàng</p>
                </div>
                <button
                    type="button"
                    className="absolute top-[100px] right-1 z-50 outline-none"
                >
                    <span className="sr-only">Close menu</span>
                    <div
                        className='p-1 border-[1px] rounded-lg shadow-inner hover:bg-red-600 hover:text-zinc-50 text-red-700'
                        onClick={() => onToggle(false)}
                    >
                        <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                    </div>
                </button>
                <div className='bg-slate-50 px-3 rounded-b-sm'>
                    <h2 className='py-2 text-black font-medium'>Bạn hãy nhập tên tài khoản của khách hàng:</h2>
                    <div className='pb-10 border-b'>
                        <div className='border rounded-xl w-1/2'>
                            <Search searchFunction={handleSearch} handleClickIconSearch={handleClickIconSearch} setShowListSearch={setShowMovieList} inputSearch={inputSearch} setInputSearch={setInputSearch} />
                        </div>
                        {showMovieList && listViewerFound &&

                            (listViewerFound?.length !== 0 ?
                                <div className='absolute left-0 bg-slate-100 w-[100%] mt-2 p-4 rounded-lg'>
                                    {listViewerFound.map(viewer => (
                                        <div className='text-gray-900 hover:bg-slate-300 hover:rounded-md cursor-default'>
                                            <div onClick={() => {
                                                setInputSearch(viewer?.userName)
                                                setUserInfo(viewer)
                                            }}
                                                className='flex p-2 items-center'
                                            >
                                                <img className="h-14 w-10 text-emerald-600" src={viewer.avatar} alt="" />
                                                <div className='w-2/5'>
                                                    <p className='text-sm font-semibold px-4 items-center'>{viewer.fullName}</p>
                                                    <p className='text-sm font-semibold px-4 items-center'>{viewer.userName}</p>
                                                </div>
                                                <div className='w-1/2'>
                                                    <p className="relative pl-12 font-semibold text-xs"><span className="absolute top-0 left-0 text-red-600">Email: </span>{viewer.email}</p>
                                                    <p className="relative pl-12 font-semibold text-xs"><span className="absolute top-0 left-0 text-red-600">SĐT: </span>{viewer.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                    }
                                </div>
                                : <div className='absolute font-light left-0 bg-slate-100 w-[100%] mt-2 p-4 rounded-lg'>
                                    -- Không tìm thấy --
                                </div>
                            )}
                    </div>
                    <div>
                        <div className='flex justify-end py-2'>
                            <button
                                className="px-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300 mr-2"
                                type='submit'
                                onClick={() => navigate('/staff/info-ticket', { state: { infoSchedule: infoSchedule, listSeatBooking: listSeatBooking, listFoodBooking: listFoodBooking, selectSeats: selectSeats, foods: foods, userInfo: userInfo } })}
                            // disabled={loading}
                            >
                                {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                                &nbsp;Xác nhận
                            </button>
                            <button
                                className="px-4 rounded-xl hover:bg-red-800 text-white bg-red-600 py-2 transition-colors duration-300"
                                type='submit'
                                onClick={() => navigate('/staff/info-ticket', { state: { infoSchedule: infoSchedule, listSeatBooking: listSeatBooking, listFoodBooking: listFoodBooking, selectSeats: selectSeats, foods: foods } })}
                            // disabled={loading}
                            >
                                {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                                &nbsp;Mua vé chưa có tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchUser
