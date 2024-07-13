import React from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../images/bg-cinema-10.png'
import UserService from '../service/UserService';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Navigate = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { resetPasswordApi } = UserService()
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowPassword1, setIsShowPassword1] = useState(false)

  const [resetPassword, setResetPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  })

  const location = useLocation();
  const { token } = location.state || {};

  const handleResetPassword = async () => {
    setLoading(true)
    const check = await resetPasswordApi(token, resetPassword)
    check && changeTab("/signup")
    setLoading(false)
  }

  return (
    <div className='pt-48 pb-96  h-full' style={{ background: `url(${bg})`, backgroundAttachment: "fixed" }}>
      <div className='max-w-4xl mx-auto'>
        {pathname === "/user/payment-success" || pathname === "/user/payment-false" ?
          <div>
            <div className='flex justify-center'>
              {pathname === "/user/payment-success" ? <CheckCircleIcon className='h-40 w-40 text-green-600'></CheckCircleIcon>
                : <XCircleIcon className='h-40 w-40 text-red-400'></XCircleIcon>
              }
            </div>
            <h2 className={`${pathname === "/user/payment-success" ? "text-green-600" : "text-red-500"} flex justify-center text-3xl font-bold `}>{pathname === "/user/payment-success" ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</h2>
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
                type='button'
                onClick={() => changeTab('/')}
                disabled={loading}
              >
                {loading && <FontAwesomeIcon className='w-4 h-4' icon={faSpinner} spin />}
                &nbsp;Quay lại
              </button>
            </div>
          </div> :
          pathname === "/booking-timeout" ?
            <div className=''>
              <h2 className='flex justify-center uppercase text-7xl text-cyan-500'>Hết thời gian mua vé</h2>
              <p className='flex justify-center text-3xl text-slate-400 p-4'>Rất tiếc phiên giao dịch của bạn đã hết hạn</p>
              <p className='flex justify-center text-3xl text-slate-400'>Vui lòng quay lại trang Home để tiến hành đặt vé mới</p>
              <div className='flex justify-center'>
                <button
                  className="py-2 text-xl mt-8 font-semibold w-1/4 rounded-xl hover:bg-green-200 bg-emerald-600 transition-colors duration-300"
                  type='button'
                  onClick={() => changeTab('/')}
                  disabled={loading}
                >
                  {loading && <FontAwesomeIcon className='w-4 h-4' icon={faSpinner} spin />}
                  &nbsp;HOME
                </button>
              </div>
            </div> :
            <div className='flex justify-center'>
              <div className='bg-slate-200 p-4 rounded-md w-1/2'>
                <h3 className='text-2xl text-gray-900 font-bold'>Đặt mật khẩu mới</h3>
                <div className="relative my-4">
                  <input
                    onChange={e => { setResetPassword({ ...resetPassword, newPassword: e.target.value }); }}
                    type={isShowPassword === true ? "text" : "password"}
                    className="block w-full py-2.5 px-0 text-black text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                    placeholder=""
                  />
                  <div onClick={() => setIsShowPassword(!isShowPassword)}>
                    {
                      isShowPassword === false ?
                        <EyeSlashIcon
                          className='h-5 w-5 text-black absolute right-0 top-5'
                        />
                        : <EyeIcon
                          className='h-5 w-5 text-black absolute right-0 top-5'
                        />
                    }
                  </div>
                  <label
                    htmlFor=""
                    className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                  >
                    Password
                  </label>
                </div>
                <div className='relative my-4'>
                  <input
                    onChange={e => { setResetPassword({ ...resetPassword, confirmPassword: e.target.value }); }}
                    type={isShowPassword1 === true ? "text" : "password"}
                    className="block w-full py-2.5 px-0 text-black text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                    placeholder=""
                  />
                  <div onClick={() => setIsShowPassword1(!isShowPassword1)}>
                    {
                      isShowPassword1 === false ?
                        <EyeSlashIcon
                          className='h-5 w-5 text-black absolute right-0 top-5'
                        />
                        : <EyeIcon
                          className='h-5 w-5 text-black absolute right-0 top-5'
                        />
                    }
                  </div>
                  <label
                    htmlFor=""
                    className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 "
                  >
                    Confirm Password
                  </label>
                </div>

                <div className='flex justify-end'>
                  <button
                    className="w-1/2 mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                    type='button'
                    onClick={handleResetPassword}
                    disabled={loading}
                  >
                    {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                    &nbsp;Xác thực
                  </button>
                </div>
              </div>
            </div>

        }




      </div>
    </div>
  )
}

export default Navigate
