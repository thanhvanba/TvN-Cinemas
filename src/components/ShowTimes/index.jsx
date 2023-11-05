import React, { useEffect } from 'react'
import { useState } from 'react'
import { MapPinIcon } from "@heroicons/react/24/outline"
import { useLocation, useNavigate } from 'react-router-dom';
const ShowTimes = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState('1');
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const handleCheckPathname = (pathname) => {
    switch (pathname) {
      case "/showtimes/lichchieuphim":
        setCurrentTab("1")
        break;
      case "/showtimes/phimtheorap":
        setCurrentTab("2")
        break;
      default:
        setCurrentTab("1")
    }
  }

  useEffect(() => {
    handleCheckPathname(pathname)

  }, [pathname]);

  return (
    <div className="w-full pt-32 pb-10">
      <div className="content-page">
        {/* tab */}
        <div className="sub-tab">
          <ul className="relative inline-block">
            <li onClick={() => changeTab("/showtimes/lichchieuphim")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tl-full text-slate-100">
              <a href="#" className={`${currentTab === '1' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo phim</a>

            </li>
            <li onClick={() => changeTab("/showtimes/phimtheorap")} className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tr-full text-slate-100">
              <a href="#" className={`${currentTab === '2' ? "active1" : ""} p-2 leading-[3.5rem]`}>Lịch chiếu theo rạp</a>
            </li>
          </ul>
        </div>

        {/* Lịch chiếu theo phim */}
        <div id='lichchieutheophim' style={{ display: currentTab === '1' ? 'block' : 'none' }}>
          {/* load ds phim đang chiếu ở đây */}
          <div className="tab-movie max-w-screen-xl mx-auto">
            <div className="grid grid-cols-7 gap-4">
              <div className="mb-4">
                <div className="product-item table relative">
                  <img src="https://cdn.galaxycine.vn/media/2023/10/11/dat-rung-sneak-4_1697007647619.jpg" alt=""
                    className="product-over h-auto w-full table-cell" />
                  <a href="#" className="mt-2">
                    <div className=" w-full h-full absolute top-0 left-0">

                    </div>
                  </a>
                </div>
                <div className="relative text-slate-200 mt-2 text-left uppercase font-bold">
                  Đất rừng phương nam
                </div>
              </div>
              <div className="mb-4">
                <div className="product-item table relative">
                  <img src="https://cdn.galaxycine.vn/media/2023/9/21/500x750_1695282600306.jpg" alt=""
                    className="product-over h-auto w-full table-cell" />
                  <a href="#" className="mt-2">
                    <div className=" w-full h-full absolute top-0 left-0">

                    </div>
                  </a>
                </div>
                <div className="relative text-slate-200 mt-2 text-left uppercase font-bold">
                  Giao lộ 8675s
                </div>
              </div>
              <div className="mb-4">
                <div className="product-item table relative">
                  <img src="https://cdn.galaxycine.vn/media/2023/10/12/400-blows-500_1697081173581.jpg" alt=""
                    className="product-over h-auto w-full table-cell" />
                  <a href="#" className="mt-2">
                    <div className=" w-full h-full absolute top-0 left-0">

                    </div>
                  </a>
                </div>
                <div className="relative text-slate-200 mt-2 text-left uppercase font-bold">
                  Đất rừng phương nam
                </div>
              </div>
              <div className="mb-4">
                <div className="product-item table relative">
                  <img src="https://cdn.galaxycine.vn/media/2023/10/3/500x750_1696307210165.jpg" alt=""
                    className="product-over h-auto w-full table-cell" />
                  <a href="#" className="mt-2">
                    <div className=" w-full h-full absolute top-0 left-0">

                    </div>
                  </a>
                </div>
                <div className="relative text-slate-200 mt-2 text-left uppercase font-bold">
                  Đất rừng phương nam
                </div>
              </div>
              <div className="mb-4">
                <div className="product-item table relative">
                  <img src="https://cdn.galaxycine.vn/media/2023/9/27/500x750_1695787578707.jpg" alt=""
                    className="product-over h-auto w-full table-cell" />
                  <a href="#" className="mt-2">
                    <div className=" w-full h-full absolute top-0 left-0">

                    </div>
                  </a>
                </div>
                <div className="relative text-slate-200 mt-2 text-left uppercase font-bold">
                  Đất rừng phương nam
                </div>
              </div>
              <div className="mb-4">
                <div className="product-item table relative">
                  <img src="https://cdn.galaxycine.vn/media/2023/9/21/cheon-500_1695281331881.jpg" alt=""
                    className="product-over h-auto w-full table-cell" />
                  <a href="#" className="mt-2">
                    <div className=" w-full h-full absolute top-0 left-0">

                    </div>
                  </a>
                </div>
                <div className="relative text-slate-200 mt-2 text-left uppercase font-bold">
                  Đất rừng phương nam
                </div>
              </div>
              <div className="mb-4">
                <div className="product-item table relative">
                  <img src="https://cdn.galaxycine.vn/media/2023/10/11/dat-rung-sneak-4_1697007647619.jpg" alt=""
                    className="product-over h-auto w-full table-cell" />
                  <a href="#" className="mt-2">
                    <div className=" w-full h-full absolute top-0 left-0">

                    </div>
                  </a>
                </div>
                <div className="relative text-slate-200 mt-2 text-left uppercase font-bold">
                  Đất rừng phương nam
                </div>
              </div>
            </div>
          </div>

          {/* ds cụ thể phim và thời gian chiếu */}
          <div className='relative max-w-6xl mx-auto text-left pt-5'>
            {/* chi tiết phim */}
            <div className='flex pt-12 max-w-5xl mx-auto pb-10 px-4 my-4 border-t-4 border-t-cyan-600'>
              {/* product image */}
              <div className='w-1/5 px-4'>
                <a href="">
                  <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                </a>
              </div>
              {/* product detail */}
              <div className='w-4/5 px-4'>
                {/* name */}
                <div>
                  <h3 className='uppercase text-2xl text-slate-200'>
                    Đất rừng phương nam
                  </h3>
                </div>
                {/* dec */}
                <div className='pt-4 text-slate-500'>
                  An-một cậu bé chẳng may mất mẹ trên đường đi tìm cha.Cùng với An, khán giả sẽ trải nghiệm sự trù phú của thiên nhiên và nét đẹp văn hoá đặc sắc của vùng đất Nam Kì Lục Tỉnh, sự hào hiệp của những người nông dân bám đất bám rừng và tinh thần yêu nước
                </div>
              </div>
            </div>

            {/* ngày chiếu */}
            <div className='grid grid-cols-6'>
              <a href="" className='active2 option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
            </div>
            {/* rạp và thời gian chiếu */}
            <div className='max-w-5xl mx-auto'>
              <div className='relative pl-60 pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* rạp */}
                <div className='absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl'>
                  <div className='p-6'>
                    <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                    <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                  </div>
                  <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                  >
                    <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                    <a href="" className='pr-8'>Xem vị trí</a>
                  </button>
                </div>
                {/* thời gian */}
                <div className='block relative'>
                  <div className='relative pl-28 pt-4'>
                    <ul className='grid grid-cols-5 gap-4'>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='relative pl-60 pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* vị trí */}
                <div className='absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl'>
                  <div className='p-6'>
                    <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                    <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                  </div>
                  <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                  >
                    <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                    <a href="" className='pr-8'>Xem vị trí</a>
                  </button>
                </div>
                {/* thời gian */}
                <div className='block relative'>
                  <div className='relative pl-28 pt-4'>
                    <ul className='grid grid-cols-5 gap-4'>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='relative pl-60 pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* vị trí */}
                <div className='absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl'>
                  <div className='p-6'>
                    <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                    <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                  </div>
                  <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                  >
                    <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                    <a href="" className='pr-8'>Xem vị trí</a>
                  </button>
                </div>
                {/* thời gian */}
                <div className='block relative'>
                  <div className='relative pl-28 pt-4'>
                    <ul className='grid grid-cols-5 gap-4'>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='relative pl-60 pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* vị trí */}
                <div className='absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl'>
                  <div className='p-6'>
                    <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                    <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                  </div>
                  <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                  >
                    <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                    <a href="" className='pr-8'>Xem vị trí</a>
                  </button>
                </div>
                {/* thời gian */}
                <div className='block relative'>
                  <div className='relative pl-28 pt-4'>
                    <ul className='grid grid-cols-5 gap-4'>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='relative pl-60 pb-10 pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* vị trí */}
                <div className='absolute top-4 left-4 bg-slate-700 w-60 rounded-3xl'>
                  <div className='p-6'>
                    <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                    <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                  </div>
                  <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                  >
                    <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                    <a href="" className='pr-8'>Xem vị trí</a>
                  </button>
                </div>
                {/* thời gian */}
                <div className='block relative'>
                  <div className='relative pl-28 pt-4'>
                    <ul className='grid grid-cols-5 gap-4'>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                      <li className='inline-block'>
                        <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lịch chiếu theo rạp */}
        <div id='lichchieutheorap' style={{ display: currentTab === '2' ? 'block' : 'none' }}>
          <div className='max-w-screen-xl mx-auto'>
            {/*ds rạp */}
            <div className='grid grid-cols-4 gap-8 mb-16 mx-4'>
              <div className='bg-slate-700 w-72'>
                <div className='p-6'>
                  <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                  <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                </div>
                <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                >
                  <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                  <a href="" className='pr-8'>Xem vị trí</a>
                </button>
              </div>
              <div className='bg-slate-700 w-72'>
                <div className='p-6'>
                  <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                  <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                </div>
                <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                >
                  <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                  <a href="" className='pr-8'>Xem vị trí</a>
                </button>
              </div>
              <div className='bg-slate-700 w-72'>
                <div className='p-6'>
                  <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                  <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                </div>
                <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                >
                  <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                  <a href="" className='pr-8'>Xem vị trí</a>
                </button>
              </div>
              <div className='bg-slate-700 w-72'>
                <div className='p-6'>
                  <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                  <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                </div>
                <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                >
                  <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                  <a href="" className='pr-8'>Xem vị trí</a>
                </button>
              </div>
              <div className='bg-slate-700 w-72'>
                <div className='p-6'>
                  <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                  <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                </div>
                <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                >
                  <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                  <a href="" className='pr-8'>Xem vị trí</a>
                </button>
              </div>
              <div className='bg-slate-700 w-72'>
                <div className='p-6'>
                  <h4 className='uppercase font-bold text-lg text-slate-200'>TvN movie</h4>
                  <p className='text-slate-500'>Lầu 5, Siêu Thị Vincom 3/2, 3C Đường 3/2, Quận 10, TPHCM</p>
                </div>
                <button className="relative w-full border-slate-400 border p-4 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                >
                  <span className="absolute right-16 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                  <a href="" className='pr-8'>Xem vị trí</a>
                </button>
              </div>
            </div>

            {/* ngày */}
            <div className='grid grid-cols-6'>
              <a href="" className='active2 option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
              <a href="" className='option-style2 px-8 border border-slate-400 text-center text-slate-200'>
                14/10 <br />
                <span>Th 7</span>
              </a>
            </div>

            {/* phim và thời gian chiếu */}
            <div className='max-w-5xl mx-auto'>
              <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* chi tiết phim */}
                <div className='flex pb-10 px-4 my-4'>
                  {/* product image */}
                  <div className='w-1/5 px-4'>
                    <a href="">
                      <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                    </a>
                  </div>
                  {/* product detail */}
                  <div className='w-4/5 px-4'>
                    {/* name */}
                    <div>
                      <h3 className='uppercase text-2xl text-slate-200'>
                        Đất rừng phương nam
                      </h3>
                    </div>
                    {/* thời gian */}
                    <div className='block relative'>
                      <div className='relative pl-2 pt-4'>
                        <ul className='grid grid-cols-5 gap-4'>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* chi tiết phim */}
                <div className='flex pb-10 px-4 my-4'>
                  {/* product image */}
                  <div className='w-1/5 px-4'>
                    <a href="">
                      <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                    </a>
                  </div>
                  {/* product detail */}
                  <div className='w-4/5 px-4'>
                    {/* name */}
                    <div>
                      <h3 className='uppercase text-2xl text-slate-200'>
                        Đất rừng phương nam
                      </h3>
                    </div>
                    {/* thời gian */}
                    <div className='block relative'>
                      <div className='relative pl-2 pt-4'>
                        <ul className='grid grid-cols-5 gap-4'>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* chi tiết phim */}
                <div className='flex pb-10 px-4 my-4'>
                  {/* product image */}
                  <div className='w-1/5 px-4'>
                    <a href="">
                      <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                    </a>
                  </div>
                  {/* product detail */}
                  <div className='w-4/5 px-4'>
                    {/* name */}
                    <div>
                      <h3 className='uppercase text-2xl text-slate-200'>
                        Đất rừng phương nam
                      </h3>
                    </div>
                    {/* thời gian */}
                    <div className='block relative'>
                      <div className='relative pl-2 pt-4'>
                        <ul className='grid grid-cols-5 gap-4'>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative pt-4 my-4 px-4 shadow-inner shadow-cyan-500 rounded-3xl'>

                {/* chi tiết phim */}
                <div className='flex pb-10 px-4 my-4'>
                  {/* product image */}
                  <div className='w-1/5 px-4'>
                    <a href="">
                      <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002699?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" alt="" />
                    </a>
                  </div>
                  {/* product detail */}
                  <div className='w-4/5 px-4'>
                    {/* name */}
                    <div>
                      <h3 className='uppercase text-2xl text-slate-200'>
                        Đất rừng phương nam
                      </h3>
                    </div>
                    {/* thời gian */}
                    <div className='block relative'>
                      <div className='relative pl-2 pt-4'>
                        <ul className='grid grid-cols-5 gap-4'>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>19:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>20:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>21:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:00</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                          <li className='inline-block'>
                            <a href="" className='block leading-[46px] hover:text-white hover:bg-emerald-600 bg-slate-900 text-center text-xl text-cyan-300'>22:15</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ShowTimes
