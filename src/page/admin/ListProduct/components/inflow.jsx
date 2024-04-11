import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'

const Inflow = () => {
    return (
        <div className='flex justify-center items-center bg-black bg-opacity-20 w-full h-screen right-0 bottom-0 fixed z-10'>
            <div className='rounded-xl bg-slate-100 w-1/2 h-96 z-10'>
                <h2 className='text-xl font-medium opacity-90 uppercase border-b-2 border-gray-950 py-2 px-4'>Nhập sản phẩm</h2>
                <div className='flex px-8 py-2'>
                    <div>
                        {/* {pathname !== `/admin/movie/${movieId}` ?
                                                    <div className="my-4 border">
                                                        <img src={imageURL} alt="Preview" className="md:w-64 md:h-80 lg:h-96 lg:w-72" />
                                                    </div> : */}
                        <div className='my-4 border'>
                            <img
                                className='w-60 h-48'
                            // src={movie.poster}
                            />
                        </div>
                        <div className='px-4'>
                            <input
                                // onChange={handleFileChange}
                                type="file"
                                className="hidden"
                                id="form_img-upload"
                            />
                            <label
                                htmlFor="form_img-upload"
                                className="bg-slate-100 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                            >
                                Chọn một tập tin
                            </label>
                        </div>
                    </div>
                    <form className='pl-4 w-[80%]' id='formAddCinema' onSubmit='' action="">
                        <div className="relative my-4">
                            <label
                                htmlFor=""
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Tên sản phẩm
                            </label>
                            <input
                                // onChange={e => setFood({ ...food, name: e.target.value })}
                                type="text"
                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            // value={food.name}
                            />
                        </div>
                        <div className="relative my-4">
                            <label
                                htmlFor=""
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Số lượng
                            </label>
                            <input
                                // onChange={e => { setFood({ ...food, price: e.target.value }); }}
                                type="text"
                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            // value={food.price}
                            />
                        </div>
                        <div className="relative my-4">
                            <label
                                htmlFor=""
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Giá nhập
                            </label>
                            <input
                                // onChange={e => { setFood({ ...food, price: e.target.value }); }}
                                type="text"
                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                            // value={food.price}
                            />
                            {/* <div className="relative mt-1 pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                            {pathname === `/admin/update-item/food/${foodId}` ?
                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={food.foodType} /> :
                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={"-------Select-------"} />}
                        </div> */}
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className="w-1/4 mr-4 text-[18px] mt-4 rounded-xl hover:bg-red-700 text-white bg-red-600 py-2 transition-colors duration-300"
                                type='submit'
                            // disabled={loading}
                            >
                                {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                                &nbsp;<span>Hủy</span>
                            </button>
                            <button
                                className="w-1/4 text-[18px] mt-4 rounded-xl hover:bg-green-800 hover:text-cyan-300 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                type='submit'
                            // disabled={loading}
                            >
                                {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                                &nbsp;<span>Nhập</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Inflow
