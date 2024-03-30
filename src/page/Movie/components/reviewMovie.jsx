import React, { useContext, useState } from 'react'
import { ChevronDownIcon, MapPinIcon, StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { LoginContext } from '../../../context/LoginContext';
import UserService from '../../../service/UserService';
import Modal from '../../../utils/Modal';
import { useNavigate } from 'react-router-dom';

const ReviewMovie = ({ movie, onToggle }) => {
    const { getShowtimeByMovieApi, reviewMovieApi } = UserService()
    const { user } = useContext(LoginContext)

    const navigate = useNavigate()

    const [toggleRV, setToggleRV] = useState(true)
    const [modalStates, setModalStates] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const handleToggle = () => {
        setToggleRV(!toggleRV)
        onToggle(!toggleRV)
    }
    const handleModalStates = () => {
        setModalStates(!modalStates);
    };

    const handleReviewMovie = async (comment, rating, movieId) => {
        await reviewMovieApi(comment, rating, movieId)
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='absolute top-32 w-1/3 h-3/4'>
                <div className='w-full h-full bg-slate-200 bg-cover'>
                    <button
                        type="button"
                        className="absolute -top-8 -right-8"
                        onClick={handleToggle}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                    </button>
                    <img src={movie.poster} className='h-1/2 w-full' />
                    <h1 className='py-4 text-center font-bold text-lg opacity-70'>{movie.title}</h1>
                    <div className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] mx-auto border-blue-500 border rounded-full flex flex-col items-center justify-center text-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <StarSolidIcon className='h-8 text-amber-400' />
                            <p className={`${movie.rating ? 'text-lg' : 'text-base'} text-slate-700 font-bold`}>{movie.rating ? movie.rating : "N/A"}</p>
                        </div>
                    </div>
                    <div className='flex justify-center py-2'>
                        <div className='grid grid-cols-5 gap-1'>
                            <span
                                onMouseEnter={() => setHoverRating(1)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(1)}
                            >
                                <StarOutlineIcon
                                    className={`flex justify-center h-6 md:h-8 ${hoverRating >= 1 || rating >= 1 ? 'text-amber-300' : 'text-gray-400'}`}
                                />
                            </span>
                            <span
                                onMouseEnter={() => setHoverRating(2)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(2)}
                            >
                                <StarOutlineIcon
                                    className={`flex justify-center h-6 md:h-8 ${hoverRating >= 2 || rating >= 2 ? 'text-amber-300' : 'text-gray-400'}`}
                                />
                            </span>
                            <span
                                onMouseEnter={() => setHoverRating(3)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(3)}
                            >
                                <StarOutlineIcon
                                    className={`flex justify-center h-6 md:h-8 ${hoverRating >= 3 || rating >= 3 ? 'text-amber-300' : 'text-gray-400'}`}
                                />
                            </span>
                            <span
                                onMouseEnter={() => setHoverRating(4)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(4)}
                            >
                                <StarOutlineIcon
                                    className={`flex justify-center h-6 md:h-8 ${hoverRating >= 4 || rating >= 4 ? 'text-amber-300' : 'text-gray-400'}`}
                                />
                            </span>
                            <span
                                onMouseEnter={() => setHoverRating(5)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(5)}
                            >
                                <StarOutlineIcon
                                    className={`flex justify-center h-6 md:h-8 ${hoverRating >= 5 || rating >= 5 ? 'text-amber-300' : 'text-gray-400'}`}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='w-full bottom-0 absolute md:flex'>
                        <button
                            className="w-1/2 p-4 text-sm bg-slate-300 font-medium uppercase hidden md:block"
                            type="button"
                            onClick={handleToggle}
                        >
                            Đóng
                        </button>
                        <button
                            className="w-full md:w-1/2 p-2 md:p-4 text-sm bg-cyan-600 font-medium uppercase" type='submit'
                            onClick={() => {
                                (!user.auth) ?
                                    handleModalStates() :
                                    handleReviewMovie('', rating, movie.movieId)
                                handleToggle()
                            }}
                        >
                            <a>Xác nhận</a>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {modalStates && (
                    <Modal
                        isOpen={modalStates}
                        onClose={() => handleModalStates()}
                        onConfirm={() => navigate("/signup")}
                        onCancel={() => handleModalStates()}
                        title='Đăng nhập để trải nghiệm chức năng đánh giá'
                        content='Vui lòng đăng ký nếu như bạn chưa có tài khoản. Hoặc đăng nhập nếu đã có tài khoản bạn nhé. Xin cảm ơn !!!'
                        buttonName='Chuyển đến trang đăng ký/ đăng nhập'
                    />
                )}
            </div>
        </div>
    )
}

export default ReviewMovie
