import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Circle, CircleDot } from 'lucide-react';
import TruncatedContent from '../../utils/TruncatedContent';
import { useNavigate } from 'react-router-dom';

const MovieSlider = ({ movies }) => {
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
        autoplay: true,
        speed: 2000,
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
            <Slider {...settings}>
                {movies.map(movie => (
                    <div
                        onClick={() => navigate(`/staff/sell-ticket/${movie.movieId}`)}
                        className='px-2 cursor-pointer outline-none'
                        key={movie.id}
                    >
                        <img className='h-96 w-56' src={movie.poster} alt={movie.title} />
                        <h3 className='text-yellow-50 uppercase font-bold'><TruncatedContent content={movie.title} maxLength={18} /></h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default MovieSlider;
