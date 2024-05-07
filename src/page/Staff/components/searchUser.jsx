import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Search from '../../../components/Search'

function SearchUser({onToggle}) {
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
                            <Search />
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-end py-2'>
                            <button
                                className="px-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300 mr-2"
                                type='submit'
                            // disabled={loading}
                            >
                                {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                                &nbsp;Xác nhận
                            </button>
                            <button
                                className="px-4 rounded-xl hover:bg-red-800 text-white bg-red-600 py-2 transition-colors duration-300"
                                type='submit'
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
