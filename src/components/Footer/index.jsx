import React from 'react'
import f_momo from "../../images/momo.jpg"
import f_napas from "../../images/napas-40.png"
import f_mastercard from "../../images/payment-mastercard.png"
import f_visa from "../../images/payment-visa.png"
import dtb from "../../images/dathongbao.png"
import fb from "../../images/scl_facebook.png"
import yt from "../../images/scl_youtube.png"

function Footer() {
    return (
        <div className='bg-gray-800 mt-20'>
            <div className='max-w-7xl mx-auto px-4 py-20 mb-10 border-slate-200 border-b'>
                <div className='grid grid-cols-4'>
                    <div className='text-slate-200 m-2'>
                        <h2 className='uppercase font-bold text-xl text-cyan-300 '>Về chúng tôi</h2>
                        <ul className='pt-6 pl-2 text-lg'>
                            <li className='hover:text-cyan-300 mb-2'>Tuyển dụng</li>
                            <li className='hover:text-cyan-300 mb-2'>Hệ thống rạp</li>
                            <li className='hover:text-cyan-300 mb-2'>Liên hệ</li>
                        </ul>
                    </div>
                    <div className='text-slate-200 m-2 text-lg'>
                        <h2 className='uppercase font-bold text-xl text-cyan-300'>Quy định và điều khoản</h2>
                        <ul className='pt-6 pl-2'>
                            <li className='hover:text-cyan-300 mb-2'>Tuyển dụng</li>
                            <li className='hover:text-cyan-300 mb-2'>Hệ thống rạp</li>
                            <li className='hover:text-cyan-300 mb-2'>Liên hệ</li>
                        </ul>
                    </div>
                    <div></div>
                    <div className='m-2'>
                        <h2 className='uppercase font-bold text-xl text-cyan-300'>Liên Kết :</h2>
                        <ul className='pt-2 pl-2 flex justify-end'>
                            <li className='p-2'>
                                <img src={fb} alt="" />
                            </li>
                            <li className='p-2'>
                                <img src={yt} alt="" />
                            </li>
                        </ul>
                        <h2 className='uppercase font-bold text-xl text-cyan-300'>HOTLINE :</h2>
                        <p className='pt-2 pl-2 text-4xl text-end text-slate-200'>

                            +84 345 046 656
                        </p>
                        <div className='border-t border-t-slate-200 mt-6'>
                            <h2 className='pt-4 text-center text-lg text-cyan-300'>Chấp nhận thanh toán</h2>
                            <ul className='pt-2 pl-2 flex justify-center'>
                                <li className='p-2'>
                                    <img className="h-10 w-10" src={f_momo} alt="" />
                                </li>
                                <li className='p-2'>
                                    <img className="h-10 w-10" src={f_napas} alt="" />
                                </li>
                                <li className='p-2'>
                                    <img className="h-10 w-10" src={f_mastercard} alt="" />
                                </li>
                                <li className='p-2'>
                                    <img className="h-10 w-10" src={f_visa} alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-950 text-slate-200 text-center py-8'>
                <p className='text-3xl text-cyan-500 font-bold pb-4 mb-4'>
                    Trải nghiệm điện ảnh tuyệt vời cùng T&N Cinemas - Nơi Hòa Quyện Giấc Mơ!
                </p>
                <p className='flex justify-center'>
                    <img src={dtb} alt="" />
                </p>
                <p className='uppercase pt-4'>
                    CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM – RẠP CHIẾU PHIM NGÔI SAO
                    <br />
                    ĐỊA CHỈ: ktx khu B, ĐÔng Hòa, Dĩ An, Bình Dương
                    <br />
                    GIẤY CNĐKDN SỐ: 0312742744, ĐĂNG KÝ LẦN ĐẦU NGÀY 18/09/2023, CẤP BỞI SỞ KH&ĐT TP.HCM
                </p>
            </div>
        </div >
    )
}

export default Footer
