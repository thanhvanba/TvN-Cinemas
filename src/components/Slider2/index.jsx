import React, { useContext, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TruncatedContent from '../../utils/TruncatedContent';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { StarIcon } from '@heroicons/react/20/solid';

const MovieSlider = ({ movies }) => {
    const { user } = useContext(LoginContext)
    const navigate = useNavigate()
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} rounded-xl`}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} rounded-xl`}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: movies.length < 5 ? movies.length : 5,
        slidesToScroll: 1,
        autoplay: user.role === "STAFF" ? true : false,
        speed: user.role === "STAFF" ? 2000 : 1000,
        autoplaySpeed: 1,
        cssEase: "linear",
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            {movies.length === 1 ?
                (movies?.map(movie => (
                    <div
                        onClick={() => {
                            user.role === "STAFF" ? navigate(`/staff/sell-ticket/${movie.movieId}`, { state: { movieName: movie.title } })
                                : navigate(`/movie/${movie.movieId}`)
                        }}
                        className='px-2 cursor-pointer outline-none'
                        key={movie.id}
                    >
                        <div className='flex justify-center items-center'>
                            <div className='relative'>
                                <img className='h-96 w-60' src={movie.poster} alt={movie.title} />
                                <div className="absolute top-0 right-0 bg-black bg-opacity-40 z-10 rounded-bl-full">
                                    <div className='flex justify-center items-center p-2'>
                                        <StarIcon className='h-6 text-amber-400 px-4' />
                                        <p className=' text-slate-200 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className='text-yellow-50 uppercase font-bold text-center'>{movie.title}</h3>
                    </div>
                ))) : (
                    <Slider {...settings}>
                        {movies?.map(movie => (
                            <div
                                onClick={() => {
                                    user.role === "STAFF" ? navigate(`/staff/sell-ticket/${movie.movieId}`, { state: { movieName: movie.title } })
                                        : navigate(`/movie/${movie.movieId}`)
                                }}
                                className='px-2 cursor-pointer outline-none'
                                key={movie.id} 
                            >
                                <div className='relative border-[0.5px] border-slate-700 rounded-xl product-item'>
                                    <img className='product-over h-96 w-full' src={movie.poster} alt={movie.title} />
                                    <div className="absolute top-0 right-0 bg-black bg-opacity-40 z-10 rounded-bl-full">
                                        <div className='flex justify-center items-center p-2'>
                                            <StarIcon className='h-6 text-amber-400 px-4' />
                                            <p className=' text-slate-200 font-bold text-lg'>{movie.rating ? movie.rating : "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className='text-yellow-50 uppercase font-bold'><TruncatedContent content={movie.title} maxLength={18} /></h3>
                            </div>
                        ))}
                    </Slider>
                )}
        </div>
    );
}

export default MovieSlider;
