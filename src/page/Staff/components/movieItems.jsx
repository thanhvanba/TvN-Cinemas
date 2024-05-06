// import { PencilSquareIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'
import Modal from '../../../utils/Modal';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns';

function MovieItems({ listMovie }) {
    console.log("🚀 ~ MovieItems ~ listMovie:", listMovie)
    const [modalStates, setModalStates] = useState({});
    const [allFood, setAllFood] = useState([])

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const handleOpenModal = (itemId) => {
        setModalStates((prevStates) => ({ ...prevStates, [itemId]: true }));
    };
    const handleCloseModal = (itemId) => {
        setModalStates((prevStates) => ({ ...prevStates, [itemId]: false }));
    };
    // const handleChangeStatus = async (foodId) => {
    //     await deleteFoodApi(foodId);
    //     onChange()
    // };
    return (
        <>
            {
                listMovie.map((item) => (
                    <div className='border-2 border-slate-400 rounded-xl w-full' >
                        <div className='p-1'>
                            <div className='flex'>
                                <div className='w-5/6 p-2 border-slate-300 border-2 rounded-sm'>
                                    <img className='h-28 w-full' src={item.poster} alt="" />
                                </div>
                                <div className='w-1/6 pl-1'>
                                    <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/food/${item.movieId}`) }} className='flex justify-center items-center w-full h-8 mb-2 rounded-lg bg-cyan-100 cursor-pointer'>
                                        <PencilSquareIcon className='h-6 w-6 text-cyan-600' />
                                    </a>
                                </div>
                            </div>
                            <h3 className='font-bold text-lg text-gray-600 pt-4 cursor-default'>{item.title}</h3>
                            <p className='flex justify-between'>
                                <span className='text-slate-600 cursor-default'>SL: {item.rating}</span>
                                {/* <span className='text-slate-600 cursor-default'>{format(item.price)}<sup>đ</sup></span> */}
                            </p>
                        </div>
                    </div >
                ))
            }
        </>
    )
}

export default MovieItems
