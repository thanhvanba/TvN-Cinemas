import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AdminService from '../../../../service/AdminService'
import CinemaService from '../../../../service/CinemaService';
import UserService from '../../../../service/UserService';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormatDataTime from '../../../../utils/FormatDataTime';
import Loading from '../../../../components/Loading';

const AddMovie = () => {
    const { getOneMovieApi } = UserService()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const { movieId } = useParams();
    const { pathname } = useLocation()
    const [loading1, setLoading1] = useState(false);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState()
    const [imageURL, setImageURL] = useState(null);
    const [image2URL, setImage2URL] = useState(null);
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        actor: "",
        genres: "",
        desc: "",
        releaseDate: "",
        poster: {},
        slider: {},
        trailerLink: "",
        duration: "",
        reviews: [],
        rating: "0",
        delete: false
    })
    const [oneMovie, setOneMovie] = useState({
        movieId: "",
        title: "",
        director: "",
        genres: "",
        actor: "",
        releaseDate: "",
        desc: "",
        poster: "",
        slider: "",
        trailerLink: "",
        duration: "",
        reviews: [],
        rating: "0",
        delete: false
    })

    const { addMovieApi, updateMovieApi } = AdminService()
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!/^\/(admin|manager)\/update-item/.test(pathname)) {
            if (Object.keys(movie.poster).length === 0 && movie.poster.lastModified === undefined) newErrors.poster = 'Vui lòng chọn ảnh (dọc)!';
            if (!movie.title) newErrors.title = 'Vui lòng nhập tên phim!';
            if (!movie.desc) newErrors.desc = 'Vui lòng nhập mô tả!';
            if (!movie.director) newErrors.director = 'Vui lòng nhập tên đạo diễn!';
            if (!movie.actor) newErrors.actor = 'Vui lòng nhập tên diễn viên!';
            if (!movie.releaseDate) newErrors.releaseDate = 'Vui lòng nhập ngày phát hành!';
            if (!movie.genres) newErrors.genres = 'Vui lòng nhập thể loại!';
            if (!movie.duration) newErrors.duration = 'Vui lòng nhập thời lượng!';
            else if (isNaN(movie.duration)) newErrors.duration = 'Vui lòng nhập đúng định dạng là số!';
            if (!movie.trailerLink) newErrors.trailerLink = 'Vui lòng nhập trailer link!';
            if (Object.keys(movie.slider).length === 0 && movie.slider.lastModified === undefined) newErrors.slider = 'Vui lòng chọn ảnh (ngang)!';
        }
        if (isNaN(movie.duration)) newErrors.duration = 'Vui lòng nhập đúng định dạng là số!';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearError = (fieldName) => {
        if (errors[fieldName]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: undefined
            }));
        }
    };

    const handleAddMovie = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = movie;
            await addMovieApi(data);
            changeTab("/admin/list-movie")
            setLoading(false);
        }
    };
    const handleUpdateMovie = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = movie;

            let resMovie = await updateMovieApi(movieId, data);
            changeTab("/admin/list-movie")
            if (resMovie && resMovie.data && resMovie.data.result) {
                console.log(resMovie.data.result)
            }
            setLoading(false);
        }
    };
    const hadleGetOneMovie = async () => {
        let resMovie = await getOneMovieApi(movieId)
        if (resMovie && resMovie.data && resMovie.data.result) {
            setOneMovie(resMovie.data.result)
        }
        setLoading1(false)
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        readAndDisplayFile(selectedFile);
    };

    const readAndDisplayFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);
            setMovie((prevMovie) => ({
                ...prevMovie,
                poster: file,
            }));
        };
        reader.readAsDataURL(file);
        clearError('poster')
    };

    const handleFileChange2 = (e) => {
        const selectedFile = e.target.files[0];
        readAndDisplayFile2(selectedFile);
    };

    const readAndDisplayFile2 = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage2URL(reader.result);
            setMovie((prevMovie) => ({
                ...prevMovie,
                slider: file,
            }));
        };
        reader.readAsDataURL(file);
        clearError('slider')
    };

    useEffect(() => {
        if (pathname === "/admin/add-item/movie") {
            setMovie({
                movieId: "",
                title: "",
                director: "",
                genres: "",
                actor: "",
                releaseDate: "",
                desc: "",
                poster: {},
                slider: {},
                trailerLink: "",
                duration: "",
                reviews: [],
                rating: "0",
                delete: false
            })
            setOneMovie({
                movieId: "",
                title: "",
                director: "",
                genres: "",
                actor: "",
                releaseDate: "",
                desc: "",
                poster: "",
                slider: "",
                trailerLink: "",
                duration: "",
                reviews: [],
                rating: "0",
                delete: false
            })
        }
    }, [pathname]);
    useEffect(() => {
        if (movieId) {
            hadleGetOneMovie();
            setLoading1(true);
        }
    }, [movieId]);
    useEffect(() => {
        pathname !== "/admin/add-item/movie" &&
            setMovie({
                ...movie,
                movieId: oneMovie.movieId,
                title: oneMovie.title,
                director: oneMovie.director,
                genres: oneMovie.genres,
                actor: oneMovie.actor,
                releaseDate: oneMovie.releaseDate,
                desc: oneMovie.desc,
                poster: oneMovie.poster,
                slider: oneMovie.slider,
                trailerLink: oneMovie.trailerLink,
                duration: oneMovie.duration,
                reviews: oneMovie.reviews,
                rating: oneMovie.rating,
                delete: oneMovie.delete
            })
        setImageURL(oneMovie.poster)
        setImage2URL(oneMovie.slider)
    }, [oneMovie]);
    return (
        <div>
            <div className='px-4 relative'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <div className='flex items-center'>
                        <h2 onClick={() => { changeTab("/admin/list-movie") }} className='cursor-pointer font-medium text-2xl'>Phim</h2>
                        <ChevronRightIcon className='px-1 h-6' />
                        {
                            /^\/admin\/(add-item\/movie)/.test(pathname) ?
                                <h2 className='cursor-default text-xl'>Thêm phim mới</h2>
                                : <h2 className='cursor-default text-xl'>Chỉnh sửa phim</h2>
                        }
                    </div>
                </div>
                <div className='pt-8'>
                    <div className='absolute mx-auto top-80 right-1/2 z-50'>
                        {loading1 && <Loading />}
                    </div>
                    {!loading1 &&
                        <div className='border py-8 px-4'>
                            <div className='flex'>
                                <div>
                                    <label
                                        htmlFor=""
                                        className="block text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Ảnh (dọc) {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                    </label>
                                    <div className="mb-4 border">
                                        <img src={imageURL} alt="Preview" className="md:w-64 md:h-80 lg:h-96 lg:w-72" />
                                    </div>

                                    <div className='px-4'>
                                        <input
                                            onChange={handleFileChange}
                                            type="file"
                                            className="hidden"
                                            id="form_img-upload"
                                        />
                                        <label
                                            htmlFor="form_img-upload"
                                            className="bg-slate-200 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                        >
                                            Chọn một tập tin
                                        </label>
                                    </div>
                                    {errors.poster && <p className="text-red-600">{errors.poster}</p>}
                                </div>

                                <div className='px-4 w-[80%]'>
                                    <div className="mb-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Tên phim {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                        </label>
                                        <input
                                            onChange={e => {
                                                setMovie({ ...movie, title: e.target.value })
                                                clearError('title')
                                            }}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            defaultValue={oneMovie.title}
                                        />
                                        {errors.title && <p className="text-red-600">{errors.title}</p>}
                                    </div>
                                    <div className="my-4">
                                        <label
                                            htmlFor=""
                                            className="block text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Mô tả {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                        </label>
                                        <textarea
                                            onChange={e => {
                                                setMovie({ ...movie, desc: e.target.value })
                                                clearError('desc')
                                            }}
                                            type="text"
                                            className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            defaultValue={oneMovie.desc}
                                            rows={5}
                                        />
                                        {errors.desc && <p className="text-red-600">{errors.desc}</p>}
                                    </div>
                                    <div className='flex justify-between my-4'>
                                        <div className="pr-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Đạo diễn {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setMovie({ ...movie, director: e.target.value })
                                                    clearError('director')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                defaultValue={oneMovie.director}
                                            />
                                            {errors.director && <p className="text-red-600">{errors.director}</p>}
                                        </div>
                                        <div className="px-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Diễn viên {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setMovie({ ...movie, actor: e.target.value })
                                                    clearError('actor')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                defaultValue={oneMovie.actor}
                                            />
                                            {errors.actor && <p className="text-red-600">{errors.actor}</p>}
                                        </div>
                                        <div className="px-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Ngày phát hành {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <DatePicker
                                                selected={time}
                                                onChange={date => {
                                                    setTime(date);
                                                    setMovie((prevMovie) => {
                                                        return { ...prevMovie, releaseDate: date };
                                                    });
                                                    clearError('releaseDate')
                                                }}
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholderText={FormatDataTime(oneMovie.releaseDate).date}
                                                dateFormat="yyyy-MM-dd" // Định dạng ngày
                                            />
                                            {errors.releaseDate && <p className="text-red-600">{errors.releaseDate}</p>}
                                        </div>
                                        <div className="pl-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Thể loại {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setMovie({ ...movie, genres: e.target.value })
                                                    clearError('genres')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                defaultValue={oneMovie.genres}
                                            />
                                            {errors.genres && <p className="text-red-600">{errors.genres}</p>}
                                        </div>
                                    </div>
                                    <div className='flex justify-between my-4'>
                                        <div className="w-1/4 pr-2 rounded-md">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Thời lượng {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setMovie({ ...movie, duration: e.target.value })
                                                    clearError('duration')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                defaultValue={oneMovie.duration}
                                            />
                                            {errors.duration && <p className="text-red-600">{errors.duration}</p>}
                                        </div>
                                        <div className="w-3/4 pl-2">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Trailer Link {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setMovie({ ...movie, trailerLink: e.target.value })
                                                    clearError('trailerLink')
                                                }}
                                                type="url"
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                defaultValue={oneMovie.trailerLink}
                                            />
                                            {errors.trailerLink && <p className="text-red-600">{errors.trailerLink}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-4'>
                                <label
                                    htmlFor=""
                                    className="block text-lg font-medium leading-6 text-gray-900"
                                >
                                    Ảnh (ngang) {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                </label>
                                <div className="mb-4 border">
                                    <img src={image2URL} alt="Preview" className="md:w-64 md:h-80 lg:h-[520px] lg:w-full" />
                                </div>

                                <div className='px-4'>
                                    <input
                                        onChange={handleFileChange2}
                                        type="file"
                                        className="hidden"
                                        id="form_img2-upload"
                                    />
                                    <label
                                        htmlFor="form_img2-upload"
                                        className="bg-slate-200 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                    >
                                        Chọn một tập tin
                                    </label>
                                </div>
                                {errors.slider && <p className="text-red-600">{errors.slider}</p>}
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    className="w-1/6 mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                    type='submit'
                                    disabled={loading}
                                    onClick={pathname === "/admin/add-item/movie" ? handleAddMovie : handleUpdateMovie}
                                >
                                    {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                    &nbsp;{pathname === "/admin/add-item/movie" ? "Thêm phim" : "Cập nhật"}
                                </button>
                            </div>
                        </div>
                    }
                </div>


            </div>
        </div >
    )
}
export default AddMovie