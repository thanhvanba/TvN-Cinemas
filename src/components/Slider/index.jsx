import { useContext, useEffect, useState } from "react"
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react"
import "./index.css"

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { Circle, CircleDot } from 'lucide-react';
import TruncatedContent from '../../utils/TruncatedContent';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from "@heroicons/react/20/solid";

import AOS from "aos";
import "aos/dist/aos.css";
import Trailer from "../Trailer";
import { LoginContext } from "../../context/LoginContext";

const HomeSlider = ({ movies }) => {
    //     const [imageIndex, setImageIndex] = useState(0)

    //     function showNextImage() {
    //         setImageIndex(index => {
    //             if (index === images?.length - 1) return 0
    //             return index + 1
    //         })
    //     }

    //     function showPrevImage() {
    //         setImageIndex(index => {
    //             if (index === 0) return images?.length - 1
    //             return index - 1
    //         })
    //     }

    //     // Auto slide every 3 seconds
    //     useEffect(() => {
    //         const interval = setInterval(() => {
    //             showNextImage();
    //         }, 5000);

    //         return () => clearInterval(interval);
    //     }, [imageIndex]);

    //     return (
    //         <section
    //             aria-label="Image Slider"
    //             style={{ width: "100%", height: "100%", position: "relative" }}
    //         >
    //             <a href="#after-image-slider-controls" className="skip-link">
    //                 Skip Image Slider Controls
    //             </a>
    //             <div className="relative h-full w-full flex overflow-hidden">
    //                 {images?.map((image, index) => (
    //                     <div
    //                         aria-hidden={imageIndex !== index}
    //                         className=""
    //                     >
    //                         <img
    //                             key={image}
    //                             src={image.poster}
    //                             aria-hidden={imageIndex !== index}
    //                             className="img-slider-img"
    //                             style={{ translate: `${-100 * imageIndex}%` }}
    //                         />

    //                         <div className="absolute top-28 left-16 right-16 flex">
    //                             <div className="w-3/4 bg-black bg-opacity-30">
    //                                 <h2 className="text-slate-50 text-3xl">{image.title}</h2>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //             <button
    //                 onClick={showPrevImage}
    //                 className="img-slider-btn"
    //                 style={{ left: 0 }}
    //                 aria-label="View Previous Image"
    //             >
    //                 <ArrowBigLeft aria-hidden />
    //             </button>
    //             <button
    //                 onClick={showNextImage}
    //                 className="img-slider-btn"
    //                 style={{ right: 0 }}
    //                 aria-label="View Next Image"
    //             >
    //                 <ArrowBigRight aria-hidden />
    //             </button>
    //             <div
    //                 style={{
    //                     position: "absolute",
    //                     bottom: ".5rem",
    //                     left: "50%",
    //                     translate: "-50%",
    //                     display: "flex",
    //                     gap: ".25rem",
    //                 }}
    //             >
    //                 {images?.map((_, index) => (
    //                     <button
    //                         key={index}
    //                         className="img-slider-dot-btn"
    //                         aria-label={`View Image ${index + 1}`}
    //                         onClick={() => setImageIndex(index)}
    //                     >
    //                         {index === imageIndex ? (
    //                             <CircleDot aria-hidden />
    //                         ) : (
    //                             <Circle aria-hidden />
    //                         )}
    //                     </button>
    //                 ))}
    //             </div>
    //             <div id="after-image-slider-controls" />
    //         </section>
    //     )
    // }
    const { user } = useContext(LoginContext)
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)
    const [showTrailer, setShowTrailer] = useState(false);
    const [toggle, setToggle] = useState(false);

    const openTrailer = () => {
        setShowTrailer(true);
    };
    const closeTrailer = () => {
        setShowTrailer(false);
    };
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} rounded-xl`}
                style={{ ...style, display: "block", background: "green" }}
                onClick={() => {
                    onClick();
                    setIndex(index => {
                        if (index === movies?.length - 1) return 0
                        return index + 1
                    })
                }}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} rounded-xl`}
                style={{ ...style, display: "block", background: "red" }}
                onClick={() => {
                    onClick();
                    setIndex(index => {
                        if (index === 0) return movies?.length - 1
                        return index - 1
                    })
                }}
            />
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 0,
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

    const handleAfterChange = () => {

        setToggle(true); // Kích hoạt toggle thành true
        // Định nghĩa biến timeoutId để lưu ID của setTimeout
        setTimeout(() => {
            setToggle(false);
        }, 5);

    };

    useEffect(() => {
        AOS.init({
            // Thiết lập các tùy chọn của AOS ở đây
            // useClassNames: true,
            // initClassName: false,
            // animatedClassName: 'animated',
        });
    }, []);

    return (
        <div className="slider-container">
            <Slider {...settings} afterChange={handleAfterChange}>
                {movies.map((movie) => (
                    <div
                        onClick={() => {
                            user.role === "STAFF" ? navigate(`/staff/sell-ticket/${movie.movieId}`, { state: { movieName: movie.title } })
                                : navigate(`/movie/${movie.movieId}`)

                        }}
                        className='cursor-pointer outline-none h-[94vh] relative'
                        key={movie.id}
                    >
                        <img className='h-full w-full' src={movie.slider} alt={movie.title} />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-40"></div>

                        {!toggle &&
                            <>
                                <div className="absolute top-28 right-14 left-14 z-50 flex">
                                    <div className="w-2/5 text-gray-50">
                                        <h2 data-aos="fade-down-right" data-aos-duration="700" className="text-6xl font-bold pt-14 uppercase">{movie.title}</h2>
                                        <div data-aos="zoom-in-left" data-aos-duration="700" className="py-4 flex items-center">
                                            <StarIcon className="h-6 w-6 text-yellow-400" />
                                            <div className="font-bold pl-4 text-orange-300 w-1/2">{movie.rating}/5</div>
                                            <p className="font-bold"><span className="text-red-600">Thời lượng: </span>{movie.duration}'</p>
                                        </div>
                                        <div data-aos="fade-left" data-aos-duration="700" >
                                            <TruncatedContent content={movie.desc} maxLength={280} />
                                        </div>
                                        <div data-aos="fade-right" data-aos-duration="700" className="py-4">
                                            <p className="relative pl-24 font-bold"><span className="absolute top-0 left-0 text-red-600">Thể loại: </span>{movie.genres}</p>
                                            <p className="relative pl-24 font-bold"><span className="absolute top-0 left-0 text-red-600">Diễn viên: </span>  <TruncatedContent content={movie.actor} maxLength={70} /></p>
                                            <p className="relative pl-24 font-bold"><span className="absolute top-0 left-0 text-red-600">Tác giả: </span>{movie.director}</p>
                                        </div>
                                    </div>

                                </div>

                                <button
                                    data-aos="flip-right"
                                    data-aos-duration="1500"
                                    className="absolute bottom-[5%] left-14 z-50 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white transition-colors duration-300"
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); openTrailer() }}
                                >
                                    Xem trailer
                                </button>
                            </>
                        }
                    </div>

                ))
                }
            </Slider >

            <div className="z-[60]">
                <Trailer showTrailer={showTrailer} closeTrailer={closeTrailer} movie={movies[index]} />
            </div>

        </div >
    );
}
export default HomeSlider;