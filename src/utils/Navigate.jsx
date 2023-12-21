import React from 'react'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const changeTab = (pathname) => {
    navigate(pathname)
  }
  return (
    <div className='pt-48 bg-white h-full'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-center'>
          <CheckCircleIcon className='h-40 w-40 text-green-600'></CheckCircleIcon>
        </div>
        <p className='flex justify-center text-3xl font-bold text-green-600'>Thanh toán thành công</p>
        <div className='mx-auto w-1/2 flex justify-between'>
          <button
            className="px-4 py-2 mt-4 text-xl font-semibold w-1/2 rounded-xl hover:bg-green-200 hover:text-blue-800 text-white bg-teal-600 transition-colors duration-300"
            type='button'
            onClick={() => changeTab('/user/history-booking')}
            disabled={loading}
          >
            {loading && <FontAwesomeIcon className='w-4 h-4' icon={faSpinner} spin />}
            &nbsp;Lịch sử giao dịch
          </button>
          <button
            className="px-4 py-2 mt-4 text-xl font-semibold w-2/5 rounded-xl hover:bg-neutral-300 bg-slate-200 transition-colors duration-300"
            type='submit'
            disabled={loading}
          >
            {loading && <FontAwesomeIcon className='w-4 h-4' icon={faSpinner} spin />}
            &nbsp;Quay lại
          </button>
        </div>

      </div>
    </div>
  )
}

export default Navigate
