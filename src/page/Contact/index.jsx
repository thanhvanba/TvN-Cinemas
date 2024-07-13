import React from 'react'
import location from '../../images/location.png'
import phone from '../../images/phone-icon.png'
import mail from '../../images/website-icon.png'
import fanpage from '../../images/support-icon.png'

function Contact() {
    return (
        <div className='pt-32 bg-[#e1dddd]'>
            <div className='py-8 px-4 w-full xl:max-w-[1360px] mx-auto flex flex-col'>
                <h2 className='mb-3 md:mb-6 text-lg md:text-3xl font-bold font-lato uppercase text-[#334862]'>
                    CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM – RẠP CHIẾU PHIM NGÔI SAO
                </h2>
                <div className='border-2 p-2 md:p-4 text-[10px] md:text-xl space-y-1 md:space-y-2'>
                    <h3 className='font-semibold font-lato flex items-center gap-x-2'>
                        <img className='h-3 md:h-5 lg:h-6' src={location} alt="" />
                        <p className='text-[#334862]'>CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM – RẠP CHIẾU PHIM NGÔI SAO</p>
                    </h3>
                    <p className='relative pl-10 md:pl-20 text-sx md:text-base font-lato text-[#334862]'><span className='absolute top-0 left-0'>Địa chỉ:</span>Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh, 01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh</p>
                    <p className='relative pl-10 md:pl-20 text-sx md:text-base font-lato text-[#334862]'><span className='absolute top-0 left-0'>SĐT:</span> 0345 046 656</p>
                    <p className='relative pl-10 md:pl-20 text-sx md:text-base font-lato text-[#334862]'><span className='absolute top-0 left-0'>Email:</span> 20110722@student.hcmute.edu.vn</p>
                    <div className='flex justify-center'>
                        <div className='w-[670px] h-[240px] md:w-[1320px] md:h-[450px]'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4853986116927!2d106.76933281086687!3d10.850637657775406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1720103813315!5m2!1svi!2s"
                                width='100%'
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <h2 className='my-6 text-center text-base md:text-3xl font-bold font-lato uppercase text-[#334862]'>
                    LIÊN HỆ với chúng tôi
                </h2>
                <div className='flex justify-center'>
                    <div className='flex justify-between gap-x-12 sm:gap-x-32 md:gap-x-40'>
                        <div className='cursor-pointer' onClick={() => window.open("mailto:20110722@student.hcmute.edu.vn", '_blank')}>
                            <img className='h-20 w-20 md:h-32 md:w-32' src={mail} alt="" />
                            <p className='text-center text-[#334862] font-bold text-lg hover:text-blue-500'>Email</p>
                        </div>
                        <div className='cursor-pointer' onClick={() => window.open("https://zalo.me/0345046656", '_blank')}>
                            <img className='h-20 w-20 md:h-32 md:w-32' src={phone} alt="" />
                            <p className='text-center text-[#334862] font-bold text-lg hover:text-blue-500'>Zalo</p>
                        </div>
                        <div className='cursor-pointer' onClick={() => window.open("https://www.facebook.com/dhspkt.hcmute", '_blank')}>
                            <img className='h-20 w-20 md:h-32 md:w-32' src={fanpage} alt="" />
                            <p className='text-center text-[#334862] font-bold text-lg hover:text-blue-500'>Fanpage</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact
