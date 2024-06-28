import React, { useContext, useState } from 'react'
import { ChevronDownIcon, MapPinIcon, StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { LoginContext } from '../../../context/LoginContext';
import UserService from '../../../service/UserService';
import Modal from '../../../utils/Modal';
import { useNavigate } from 'react-router-dom';
import Load from '../../../components/Load';

const ReviewMovie = ({ movie, onToggle }) => {
    const { getShowtimeByMovieApi, reviewMovieApi } = UserService()
    const { user } = useContext(LoginContext)

    const navigate = useNavigate()

    const [toggleRV, setToggleRV] = useState(true)
    const [loading, setLoading] = useState(false)
    const [modalStates, setModalStates] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const handleToggle = () => {
        setToggleRV(!toggleRV)
        onToggle(!toggleRV)
    }
    const handleModalStates = () => {
        setModalStates(!modalStates);
    };

    const handleReviewMovie = async (comment, rating, movieId) => {
        setLoading(true)
        await reviewMovieApi(comment, rating, movieId)
        setLoading(false)
        handleToggle()
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='absolute top-28 w-1/3 h-4/5'>
                <div className='w-full h-full bg-slate-200 bg-cover'>
                    <button
                        type="button"
                        className="absolute top-1 right-1"
                    >
                        <span className="sr-only">Close menu</span>
                        <div
                            className='p-1 border-2 rounded-2xl shadow-inner bg-slate-100 hover:bg-red-600 hover:text-zinc-50 text-red-700'
                            onClick={handleToggle}
                        >
                            <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                        </div>
                    </button>
                    <img src={movie.poster} className='h-2/5 w-full' />
                    <div className='h-3/5'>
                        <h1 className='py-2 text-center font-bold text-lg opacity-70'>{movie.title}</h1>
                        <div className='mx-4 px-8 py-1 rounded'>
                            <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] mx-auto border-blue-500 border rounded-full flex flex-col items-center justify-center text-center'>
                                <div className='flex flex-col justify-center items-center'>
                                    <StarSolidIcon className='h-6 text-amber-400' />
                                    <p className={`${movie.rating ? 'text-lg' : 'text-base'} text-slate-700 font-bold`}>{movie.rating ? movie.rating : "N/A"}</p>
                                </div>
                            </div>
                            <div className='flex justify-center py-1'>
                                <div className='grid grid-cols-5 gap-1'>
                                    <span
                                        onMouseEnter={() => setHoverRating(1)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(1)}
                                    >
                                        <StarOutlineIcon
                                            className={`flex justify-center h-4 md:h-6 ${hoverRating >= 1 || rating >= 1 ? 'text-amber-300' : 'text-gray-400'}`}
                                        />
                                    </span>
                                    <span
                                        onMouseEnter={() => setHoverRating(2)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(2)}
                                    >
                                        <StarOutlineIcon
                                            className={`flex justify-center h-4 md:h-6 ${hoverRating >= 2 || rating >= 2 ? 'text-amber-300' : 'text-gray-400'}`}
                                        />
                                    </span>
                                    <span
                                        onMouseEnter={() => setHoverRating(3)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(3)}
                                    >
                                        <StarOutlineIcon
                                            className={`flex justify-center h-4 md:h-6 ${hoverRating >= 3 || rating >= 3 ? 'text-amber-300' : 'text-gray-400'}`}
                                        />
                                    </span>
                                    <span
                                        onMouseEnter={() => setHoverRating(4)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(4)}
                                    >
                                        <StarOutlineIcon
                                            className={`flex justify-center h-4 md:h-6 ${hoverRating >= 4 || rating >= 4 ? 'text-amber-300' : 'text-gray-400'}`}
                                        />
                                    </span>
                                    <span
                                        onMouseEnter={() => setHoverRating(5)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(5)}
                                    >
                                        <StarOutlineIcon
                                            className={`flex justify-center h-4 md:h-6 ${hoverRating >= 5 || rating >= 5 ? 'text-amber-300' : 'text-gray-400'}`}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mx-4 h-2/5">
                            <textarea
                                className="w-full h-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-cyan-500"
                                placeholder="Viết đánh giá của bạn..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
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
                                className="w-full flex items-center justify-center md:w-1/2 p-2 md:p-4 text-sm bg-cyan-600 font-medium uppercase" type='submit'
                                onClick={() => {
                                    !user.auth ?
                                        handleModalStates()
                                        : handleReviewMovie(comment, rating, movie.movieId)
                                }}
                            >
                                {loading ? <Load /> : 'Xác nhận'}
                            </button>
                        </div>
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
                        buttonCancel='Thoát'
                    />
                )}
            </div>
        </div>
    )
}

export default ReviewMovie
