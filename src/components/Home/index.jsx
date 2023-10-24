import Slider from "../Slider"
import slider1 from "../../images/slider.jpg"
import slider2 from "../../images/slider-1.jpg"
import slider3 from "../../images/slider-2.jpg"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import "./index.css"

const IMAGES = [
  slider1, slider2, slider3
]

const Home = () => {
  return (
    <div className="w-full">
      {/* slider */}
      <div className="relative">
        <Slider images={IMAGES} />
        <a href="/" style={{ fontSize: "4rem" }}>
          Link
        </a>
      </div>
      {/* mua vé nhanh */}
      <div className="cart-wrap">
        <div className="block h-36">
          <div className="inline-block w-1/5 p-3 items-center justify-between font-bold text-emerald-800">
            <h2 className="uppercase font-bold text-2xl">mua vé <br /> online </h2>
          </div>
          <div className="inline-block w-4/5 p-2">
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-r-full rounded-bl-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn phim</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-br-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn ngày</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-r-full rounded-tl-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn rạp</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
            <div className="inline-block hover:bg-emerald-600 bg-slate-700 m-2 rounded-l-full rounded-tr-full text-gray-200 relative h-12 w-52">
              <h3 className="flex uppercase pl-2 pr-8 py-3">Chọn suất chiếu</h3>
              <span className="absolute right-2 top-3"><ChevronDownIcon className="h-5 w-5 text-gray-200" /></span>
            </div>
          </div>
        </div>
      </div>
      {/* hiển thị ds phim */}
      <div className="content-page">
        <div className="sub-tab">
          <ul className="relative inline-block">
            <li className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tl-full z-30 text-slate-100">
              <a href="" className="active1 p-2 leading-[3.5rem]">Phim đang chiếu</a>
            </li>
            <li className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 z-20 text-slate-100">
              <a href="" className="p-2 leading-[3.5rem]">Phim sắp chiếu</a>
            </li>
            <li className="relative option1-style uppercase font-bold float-left w-72 h-14 shadow-inner shadow-cyan-500 rounded-tr-full z-10 text-slate-100">
              <a href="" className="p-2 leading-[3.5rem]">Suất chiếu đặc biệt</a>
            </li>
          </ul>
        </div>

        <div className="tab-movie">
          <div className="grid grid-cols-4 gap-4 max-w-screen-xl mx-auto">
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
            </div><div className="mb-4">
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
            </div><div className="mb-4">
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
            </div><div className="mb-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;