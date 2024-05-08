import React from 'react'
import img from '../../images/logo.jpg'
function InfoTicket() {
    return (
        <div className='pt-20 px-12'>
            <h2 className='font-medium uppercase text-xl text-center py-4'>Thông tin đặt vé</h2>
            <div className='flex'>
                <div className='hidden sm:block w-1/3 px-4'>
                    <img
                        className='w-full h-5/6'
                        src={img}
                    />
                </div>
                <div className='w-full sm:w-2/3 px-4 relative'>
                    <div className="relative px-3 pb-2 md:px-4 md:pb-2 rounded-2xl text-sm md:text-base text-slate-900">
                        {/* <div className='flex justify-center absolute mx-auto w-full h-full top-0 right-0 z-10'>
                                {loading['ticket'] && <Loading />}
                            </div> */}
                        <div className='space-y-4'>
                            <p className="text-3xl text-emerald-600 font-semibold">{`Đồ án tốt nghiệp`}</p>

                            <div>
                                <p className='font-light'>Suất chiếu</p>
                                <div className="flex items-center space-x-2 text-xl">
                                    <span className="font-bold text-orange-500">{`09:05`}</span>
                                    <span>-</span>
                                    <span className="font-bold">{`01/02/2024`}</span>
                                    <span>({`90`} phút)</span>
                                </div>
                            </div>

                            <div>
                                <p className='font-light'>Rạp chiếu</p>
                                <p className="font-semibold text-xl">{`Quận 9`}</p>
                            </div>

                            <div className="flex gap-10">
                                <div className="w-3/5">
                                    <p className='font-light'>Ghế</p>
                                    {/* <p className="font-semibold text-xl">{ticketDetail && ticketDetail.seats && ticketDetail.seats.map(seat => (
                                            <span>&nbsp;{String.fromCharCode(65 + parseInt(seat.row, 10) - 1) + seat.column},</span>
                                        ))}</p> */}
                                </div>

                                <div className='w-2/5'>
                                    <p className='font-light'>Phòng chiếu</p>
                                    <p className="font-semibold text-xl">{`G1`}</p>
                                </div>
                            </div>

                            <div className='flex gap-10'>
                                <div className='w-3/5'>
                                    <p className='font-light'>Bắp nước</p>
                                    {/* <p className="font-semibold text-xl w-full inline-block">
                                            {ticketDetail.foods && ticketDetail.foods.map((food, index) => (
                                                <p key={index}>&nbsp;{food},</p>
                                            ))}
                                        </p> */}
                                </div>
                                <div className='w-2/5'>
                                    <p className='font-light'>Giá tiền</p>
                                    <p className="font-semibold text-3xl text-cyan-600">{`908000`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex justify-center pb-4'>
                <div className='w-1/2'>
                    <h2 className='font-medium uppercase text-xl text-center py-4'>Kiểm tra thông tin cá nhân</h2>
                    <div className="relative flex justify-between border-t-[3px] border-cyan-600 py-3 px-4">
                        <p className="text-lg leading-6 text-gray-900">
                            Họ và tên
                        </p>
                        <input
                            // value={account.password}
                            // onChange={e => setAccount({ ...account, password: e.target.value })}
                            className="px-4 py-1 w-96 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            placeholder="Nhập họ và tên"
                        />
                    </div>
                    <div className="relative flex justify-between border-t-2 py-3 px-4">
                        <p className="text-lg leading-6 text-gray-900">
                            Email
                        </p>
                        <input
                            // value={account.password}
                            // onChange={e => setAccount({ ...account, password: e.target.value })}
                            className="px-4 py-1 w-96 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            placeholder="Nhập email"
                        />
                    </div>
                    <div className="relative flex justify-between border-t-2 py-3 px-4">
                        <p className="text-lg leading-6 text-gray-900">
                            Số điện thoại
                        </p>
                        <input
                            // value={account.password}
                            // onChange={e => setAccount({ ...account, password: e.target.value })}
                            className="px-4 py-1 w-96 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div className="relative flex justify-between border-t-2 py-3 px-4">
                        <p className="text-lg leading-6 text-gray-900">
                            Mật khẩu
                        </p>
                        <input
                            // value={account.password}
                            // onChange={e => setAccount({ ...account, password: e.target.value })}
                            className="px-4 py-1 w-96 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <div className='flex justify-center py-2'>
                        <button
                            className="px-4 rounded-xl hover:bg-sky-800 text-white bg-sky-600 py-2 transition-colors duration-300 mr-2"
                            type='submit'
                                // onClick={() => navigate('/staff/info-ticket')}
                        // disabled={loading}
                        >
                            {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                            &nbsp;Quay lại
                        </button>
                        <button
                            className="px-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                            type='submit'
                            // onClick={() => navigate('/staff/info-ticket')}
                        // disabled={loading}
                        >
                            {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                            &nbsp;Xác nhận bán vé
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoTicket
