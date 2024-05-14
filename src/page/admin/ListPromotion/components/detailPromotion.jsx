import React, { useState } from 'react'
import Loading from '../../../../components/Loading'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Space } from 'antd';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu';

function DetailPromotion() {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const changeTab = (pathname) => {
    navigate(pathname)
  }
  return (
    <div className='px-4 relative' >
      <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
        <div className='flex items-center'>
          <h2 onClick={() => { changeTab("/admin/list-movie") }} className='cursor-pointer font-medium text-2xl'>Chương trình khuyến mãi</h2>
          <ChevronRightIcon className='px-1 h-6' />
          <h2 className='cursor-default text-xl'>Chi tiết</h2>
        </div>
      </div>
      <div className='pt-8'>
        <div className='absolute mx-auto top-80 right-1/2 z-50'>
          {loading && <Loading />}
        </div>
        {!loading &&
          <div>
            <div className='rounded-lg bg-slate-100 p-4'>
              <div className='flex'>
                <div className="mb-4 w-1/4">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Mã CT khuyến mãi
                  </label>
                  <input
                    // onChange={e => setMovie({ ...movie, title: e.target.value })}
                    type="text"
                    className="block w-full mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  // defaultValue={oneMovie.title}
                  />
                </div>
                <div className="mb-4 w-1/4">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Trạng thái
                  </label>
                  <input
                    // onChange={e => setMovie({ ...movie, title: e.target.value })}
                    type="text"
                    className="block w-full mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  // defaultValue={oneMovie.title}
                  />
                </div>
              </div>
              <div className='flex'>
                <div className="mb-4 w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Tên CT khuyến mãi
                  </label>
                  <input
                    // onChange={e => setMovie({ ...movie, title: e.target.value })}
                    type="text"
                    className="block w-full mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  // defaultValue={oneMovie.title}
                  />
                </div>

                <div className="mb-4 w-1/2 ml-2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Thời gian hoạt động
                  </label>
                  <div >
                    <RangePicker
                      className="w-full mt-1 py-1.5 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-lg bg-slate-100 p-4 mt-4'>
              <div className='flex'>
                <div className="mb-4 w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Mã áp dụng
                  </label>
                  <input
                    // onChange={e => setMovie({ ...movie, title: e.target.value })}
                    type="text"
                    className="block w-full mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  // defaultValue={oneMovie.title}
                  />
                </div>
                <div className="mb-4 w-1/2 ml-2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Mô tả
                  </label>
                  <input
                    // onChange={e => setMovie({ ...movie, title: e.target.value })}
                    type="text"
                    className="block w-full mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  // defaultValue={oneMovie.title}
                  />
                </div>
              </div>
              <div className='flex'>
                <div className="mb-4 w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Loại khuyến mãi
                  </label>
                  <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                    <SelectMenu  content={"-------Select-------"} />
                  </div>
                </div>

                
              </div>
              <div className='flex'>
                <div className="mb-4 w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Số lượng KH áp dụng tối đa
                  </label>
                  <input
                    // onChange={e => setMovie({ ...movie, title: e.target.value })}
                    type="text"
                    className="block w-full mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  // defaultValue={oneMovie.title}
                  />
                </div>
                <div className="mb-4 w-1/2 ml-2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Số lượng tối đa cho 1 KH trong ngày
                  </label>
                  <input
                    // onChange={e => setMovie({ ...movie, title: e.target.value })}
                    type="text"
                    className="block w-full mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                  // defaultValue={oneMovie.title}
                  />
                </div>
              </div>
              <div className="mb-4 w-1/2">
                  <label
                    htmlFor=""
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Thời gian hoạt động
                  </label>
                  <div >
                    <RangePicker
                      className="w-full mt-1 py-1.5 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                    />
                  </div>
                </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default DetailPromotion
