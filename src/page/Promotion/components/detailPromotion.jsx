import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import imgVoucher from '../../../images/happy-couple-holding-movie-icons.jpg'
import imgVoucher1 from '../../../images/videotape-with-celluloid-cinema-tickets.jpg'
import imgVoucher2 from '../../../images/top-view-cinema-tickets-collection.jpg'
import FormatDataTime from '../../../utils/FormatDataTime'
import { format, parse } from 'date-fns'
import { Armchair, Sofa } from 'lucide-react'
import ConvertStringFollowFormat from '../../../utils/ConvertStringFollowFormat'

function DetailPromtion({ onePromotion, onToggle }) {
  return (
    <div className={`w-1/2 relative z-50 overflow-hidden bg-slate-300 rounded-md`}>
      <h4 className="font-bold text-2xl p-2 border-b-2 border-slate-400 text-black">Chi tiết khuyến mãi</h4>
      <div className=' rounded-xl bg-slate-100 w-1/2 z-10'>
        <button
          type="button"
          className="absolute top-1 right-1 z-50"
        >
          <span className="sr-only">Close menu</span>
          <div
            className='p-1 border-2 rounded-lg shadow-inner hover:bg-red-600 hover:text-zinc-50 text-red-700'
            onClick={() => onToggle(false)}
          >
            <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
          </div>
        </button>
      </div>
      <div className="relative flex p-6 text-sm md:text-base text-slate-900">
        <div className='w-2/5'>
          <img className='h-52 w-full rounded-xl' src={onePromotion.image || imgVoucher1} alt="" />
        </div>
        <div className='w-3/5 pl-4 space-y-2'>
          <h3 className="">
            <span className='text-[#2e99a7] font-bold text-2xl'>{onePromotion?.name}</span>
            <p className='font-medium text-sm'><span>{FormatDataTime(onePromotion.startDate).date}</span> - <span>{FormatDataTime(onePromotion.endDate).date}</span></p>
          </h3>
          <div>
            {onePromotion.ageLimit ?
              <p>Áp dụng cho người dùng không quá <span className='text-emerald-600 font-medium text-lg'>{onePromotion.ageLimit}</span> tuổi</p>
              : onePromotion.validDayOfWeek ?
                <p>Áp dụng cho <span className='text-emerald-600 font-medium text-lg'>{onePromotion.validDayOfWeek != 7 ? `Thứ ${onePromotion.validDayOfWeek + 1}` : 'Chủ nhật'}</span> hàng tuần</p>
                : <p>Áp dụng cho khung giờ từ
                  <span className='text-emerald-600 font-medium text-lg px-1'>
                    {format(
                      parse(`${onePromotion.validTimeFrameStart}`, 'HH:mm:ss', new Date()),
                      "HH:mm"
                    )}
                  </span>
                  đến
                  <span className='text-emerald-600 font-medium text-lg px-1'>
                    {format(
                      parse(`${onePromotion.validTimeFrameEnd}`, 'HH:mm:ss', new Date()),
                      "HH:mm"
                    )}
                  </span>
                </p>
            }
          </div>
          <div>{onePromotion.description}</div>
          <div className='border-t-2 text-center py-2'>
            <h3>Chi tiết</h3>
            <div className='flex justify-between items-center w-full'>
              <div className="relative w-1/3 mr-2">
                <div
                  htmlFor=""
                  className="flex items-center justify-center font-medium leading-6 text-gray-900"
                >
                  <Armchair className='h-8 w-8 text-slate-800' />&nbsp; Ghế thường
                </div>
                <div className='w-full font-bold px-4 text-xl text-emerald-600'>{ConvertStringFollowFormat(onePromotion.normalValue)}<sup>đ</sup></div>
              </div>
              <div className="relative w-1/3">
                <div
                  htmlFor=""
                  className="flex items-center justify-center font-medium leading-6 text-gray-900"
                >
                  <Armchair className='h-8 w-8 text-orange-500' />&nbsp;Ghế vip
                </div>
                <div className='w-full font-bold px-4 text-xl text-emerald-600'>{ConvertStringFollowFormat(onePromotion.vipValue)}<sup>đ</sup></div>
              </div>
              <div className="relative w-1/3 ml-2">
                <div
                  htmlFor=""
                  className="flex items-center justify-center font-medium leading-6 text-gray-900"
                >
                  <Sofa className='h-8 w-8 text-pink-700' />&nbsp; Ghế đôi
                </div>
                <div className='w-full font-bold px-4 text-xl text-emerald-600'>{ConvertStringFollowFormat(onePromotion.coupleValue)}<sup>đ</sup></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPromtion
