import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AdminService from '../../../../service/AdminService'
import CinemaService from '../../../../service/CinemaService';
import UserService from '../../../../service/UserService';


import { Space, TimePicker, DatePicker } from 'antd'
import FormatDataTime from '../../../../utils/FormatDataTime';
import Loading from '../../../../components/Loading';
import { ChevronUpDownIcon, FilmIcon } from '@heroicons/react/20/solid';
import { PlusCircle } from 'lucide-react';
import useLoadingState from '../../../../hook/UseLoadingState';
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const AddMovie = () => {
    const { getOneMovieApi } = UserService()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const { movieId } = useParams();
    const { pathname } = useLocation()

    const { loading, setLoading } = useLoadingState(false)

    const [toggle, setToggle] = useState(false)
    const [toggleAddGenres, setToggleAddGenres] = useState(false)

    const [time, setTime] = useState()
    const [imageURL, setImageURL] = useState(null);
    const [image2URL, setImage2URL] = useState(null);

    const [genres, setGenres] = useState('')
    const [arrGenres, setArrGenres] = useState([]);
    const [selectGenres, setSelectGenres] = useState([]);
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        actor: "",
        genres: [],
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
        genres: [],
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

    const { addMovieApi, updateMovieApi, getListGenresApi, createGenresApi } = AdminService()
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
            if (movie.genres.length === 0) newErrors.genres = 'Vui lòng nhập thể loại!';
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
            setLoading('addMovie', true);
            const data = movie;
            await addMovieApi(data);
            changeTab("/admin/list-movie")
            setLoading('addMovie', false);
        }
    };
    const handleUpdateMovie = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading('addMovie', true);
            const data = movie;

            let resMovie = await updateMovieApi(movieId, data);
            changeTab("/admin/list-movie")
            if (resMovie && resMovie.data && resMovie.data.result) {
                console.log(resMovie.data.result)
            }
            setLoading('addMovie', false);
        }
    };
    const hadleGetOneMovie = async () => {
        setLoading('getOneMovie', true);
        let resMovie = await getOneMovieApi(movieId)
        if (resMovie && resMovie.data && resMovie.data.result) {
            setOneMovie(resMovie.data.result)
        }
        setLoading('getOneMovie', false)
    }
    const handleGetListGenres = async () => {
        console.log('sss')
        let resGenres = await getListGenresApi()
        if (resGenres && resGenres.data && resGenres.data.result) {
            setArrGenres(resGenres.data.result)
        }
    }
    const handleSelectGenres = (value) => {
        const res = selectGenres.map(genre => genre.id)
        if (value && !selectGenres.includes(value)) {
            setSelectGenres([...selectGenres, value])
            setMovie({ ...movie, genres: [...res, value.id] })
            setToggle(!toggle)
            clearError('genres')
        }

        clearError('genres')
    }
    const hadleCreateGenres = async (name) => {
        setLoading('confirm', true)
        const data = { name: name }
        await createGenresApi(data)
        handleGetListGenres()
        setLoading('confirm', false)
        setToggleAddGenres(false)
    }


    const handleRemoveGenres = (genres) => {
        const searchGenres = selectGenres.find((item) => item.name === genres.name);

        if (searchGenres) {
            const updatedGenres = selectGenres.filter(genre => genre.name !== genres.name);
            setSelectGenres(updatedGenres);
            setMovie({ ...movie, genres: updatedGenres.map(genre => genre.id) })
        }
    };
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
    const handleSelectDate = (date, dateString) => {
        setTime(dateString);
        setMovie((prevMovie) => {
            return { ...prevMovie, releaseDate: dateString };
        });
        clearError('releaseDate')
    };
    useEffect(() => {
        if (pathname === "/admin/add-item/movie") {
            setMovie({
                movieId: "",
                title: "",
                director: "",
                genres: [],
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
                genres: [],
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
        }
    }, [movieId]);
    useEffect(() => {
        pathname !== "/admin/add-item/movie" &&
            setMovie({
                ...movie,
                movieId: oneMovie.movieId,
                title: oneMovie.title,
                director: oneMovie.director,
                genres: oneMovie.genres.map(genre => genre.id),
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
        setSelectGenres(oneMovie.genres)
        setImageURL(oneMovie.poster)
        setImage2URL(oneMovie.slider)
    }, [oneMovie]);
    useEffect(() => {
        handleGetListGenres()
    }, [])

    return (
        <div>
            <div className='px-4 relative'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <div className='flex items-center'>
                        <h2 onClick={() => { changeTab("/admin/list-movie") }} className='cursor-pointer font-medium text-2xl flex items-center'>
                            <FilmIcon className='h-10 w-10 mr-1 text-emerald-600' />
                            Phim
                        </h2>
                        <ChevronRightIcon className='px-1 h-6' />
                        {
                            /^\/admin\/(add-item\/movie)/.test(pathname) ?
                                <h2 className='cursor-default text-xl'>Thêm phim mới</h2>
                                : <h2 className='cursor-default text-xl'>Chỉnh sửa phim</h2>
                        }
                    </div>
                </div>
                <div className='pt-8'>
                    <div className='absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                        {!loading['getOneMovie'] && <Loading />}
                    </div>
                    {!loading['getOneMovie'] &&
                        <div className='border py-8 px-4'>
                            <div className='flex'>
                                <div>
                                    <label
                                        htmlFor=""
                                        className="block text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Ảnh (dọc) {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                    </label>
                                    <div className="mb-4 border-2 border-[#d9d9d9] rounded-md">
                                        <img src={imageURL} alt="Ảnh phim (dọc)" className="md:w-64 md:h-80 lg:h-96 lg:w-72" />
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
                                            placeholder='Nhập tên phim'
                                            type="text"
                                            className="block placeholder-[#bfbfbf] leading-7 font-sans border-[#d9d9d9] w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
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
                                            placeholder='Nhập mô tả'
                                            className="block placeholder-[#bfbfbf] leading-7 font-sans border-[#d9d9d9] w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                            defaultValue={oneMovie.desc}
                                            rows={5}
                                        />
                                        {errors.desc && <p className="text-red-600">{errors.desc}</p>}
                                    </div>
                                    <div className='flex justify-between my-4'>
                                        <div className="pr-2 w-1/4">
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
                                                placeholder='Nhập tên đạo diễn'
                                                className="block placeholder-[#bfbfbf] leading-7 font-sans border-[#d9d9d9] w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                defaultValue={oneMovie.director}
                                            />
                                            {errors.director && <p className="text-red-600">{errors.director}</p>}
                                        </div>
                                        <div className="px-2 w-1/4">
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
                                                placeholder='Nhập tên diễn viên'
                                                className="placeholder-[#bfbfbf] leading-7 font-sans block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 border-[#d9d9d9] focus:border-blue-600"
                                                defaultValue={oneMovie.actor}
                                            />
                                            {errors.actor && <p className="text-red-600">{errors.actor}</p>}
                                        </div>
                                        <div className="px-2 w-1/4">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Ngày phát hành {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <DatePicker
                                                selected={time}
                                                onChange={handleSelectDate}
                                                placeholder={'Chọn ngày phát hành'}
                                                size='large'
                                                className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholderText={FormatDataTime(oneMovie.releaseDate).date}
                                                dateFormat="yyyy-MM-dd" // Định dạng ngày
                                                defaultValue={/^\/(admin|manager)\/update-item/.test(pathname) ? dayjs(FormatDataTime(oneMovie.releaseDate).date, 'DD/MM/YYYY') : null}
                                            />
                                            {errors.releaseDate && <p className="text-red-600">{errors.releaseDate}</p>}
                                        </div>
                                        <div className="pl-2 w-1/4 relative">
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Thể loại {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                            </label>
                                            <div onClick={() => setToggle(!toggle)} className='absolute top-0 right-1 bg-slate-100 rounded-sm hover:bg-slate-200 cursor-pointer'>
                                                <ChevronUpDownIcon className='h-5 text-gray-400' />
                                            </div>
                                            <div
                                                className={`${selectGenres.length <= 2 ? "h-10" : "h-12"} modal-body flex items-center overflow-x-auto max-w-[200px] px-2 py-0.5 text-sm text-black focus:outline-none rounded-md border-2`}
                                            >
                                                {selectGenres.length === 0 ?
                                                    <span className='flex items-center leading-7 font-sans border-[#d9d9d9] text-lg text-[#bfbfbf]'>Chọn thể loại</span>
                                                    :
                                                    selectGenres.map((genres) => (
                                                        <div className='relative h-5 bg-green-200 rounded-md mx-0.5'>
                                                            <div className='text-sm text-center px-1 h-5 w-20 cursor-default' >
                                                                {genres.name}
                                                            </div>
                                                            <button className='absolute top-0 -right-3 text-red-400 pr-2'
                                                                onClick={() => {
                                                                    handleRemoveGenres(genres)
                                                                }}
                                                            >
                                                                <sup className='text-xs'><XMarkIcon className='h-4' /></sup>
                                                            </button>
                                                        </div>
                                                    ))}
                                            </div>
                                            {toggle &&
                                                <div className='absolute bg-white shadow-xl border-2 rounded-xl w-48 '>
                                                    <p
                                                        onClick={() => setToggleAddGenres(!toggleAddGenres)}
                                                        className='sticky top-0 py-2 px-3 bg-white cursor-pointer border-b-2'
                                                    >
                                                        <p className='flex gap-x-1 ml-1 items-center font-medium'>
                                                            <PlusCircle className='h-5 text-blue-600' />Thêm thể loại
                                                        </p>
                                                    </p>
                                                    <ul className='modal-body top-6 overflow-y-auto max-h-60'>
                                                        {arrGenres && arrGenres.map((genres) => (
                                                            <li
                                                                onClick={() => handleSelectGenres(genres)}
                                                                className='py-2 px-3 flex hover:bg-[#4F46E5] hover:text-white'
                                                            >
                                                                <span className='ml-3 cursor-default'>{genres.name}</span>
                                                            </li>
                                                        ))}

                                                        {toggleAddGenres &&
                                                            <div className='flex justify-center items-center bg-black bg-opacity-30 w-full h-screen right-0 bottom-0 fixed z-20'>
                                                                <div className="relative w-1/3 z-10 overflow-hidden bg-slate-300 rounded-md">
                                                                    <h4 className="font-bold text-3xl p-2 border-b-2 border-slate-400 text-slate-700">Thêm thể loại phim</h4>
                                                                    <div className=' rounded-xl bg-slate-100 w-1/2 z-10'>
                                                                        <button
                                                                            type="button"
                                                                            className="absolute top-1 right-1 z-50"
                                                                        >
                                                                            <span className="sr-only">Close menu</span>
                                                                            <div
                                                                                className='p-1 border-2 rounded-lg shadow-inner hover:bg-red-600 hover:text-zinc-50 text-red-700'
                                                                                onClick={() => setToggleAddGenres(false)}
                                                                            >
                                                                                <XMarkIcon className="text-4xl h-5 w-5 z-50 cursor-pointer opacity-80 hover:opacity-100" aria-hidden="true" />
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                    <div className="relative px-4 pb-2 md:px-6 md:pb-2 bg-slate-300 rounded-2xl text-sm md:text-base text-slate-900">
                                                                        <div className="flex items-center my-4">
                                                                            <label
                                                                                htmlFor=""
                                                                                className="block w-[24%] text-lg font-medium leading-6 text-gray-900"
                                                                            >
                                                                                Tên thể loại
                                                                            </label>
                                                                            <input
                                                                                onChange={e => setGenres(e.target.value)}
                                                                                type="text"
                                                                                className="block w-[76%] px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                                            // value={fare.price}
                                                                            />
                                                                        </div>
                                                                        <div className='flex justify-end'>
                                                                            <button
                                                                                className="w-1/4 text-[18px] rounded-xl hover:bg-emerald-800 hover:text-white text-white bg-emerald-600 py-2 transition-colors duration-300"
                                                                                type='submit'
                                                                                // disabled={loading['change']}
                                                                                onClick={() => {
                                                                                    hadleCreateGenres(genres)
                                                                                }}
                                                                            >
                                                                                {loading['confirm'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                                                                &nbsp;Xác nhận
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </ul>
                                                </div>
                                            }
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
                                                placeholder='Nhập thời lượng'
                                                className="block placeholder-[#bfbfbf] leading-7 font-sans border-[#d9d9d9] w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
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
                                                placeholder='Nhập đường dẫn trailer'
                                                className="block placeholder-[#bfbfbf] leading-7 font-sans border-[#d9d9d9] w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
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
                                <div className="mb-4 border-2 border-[#d9d9d9] rounded-md">
                                    <img src={image2URL} alt="Ảnh bìa (ngang)" className="md:w-64 md:h-80 lg:h-[520px] lg:w-full" />
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
                                    disabled={loading['addMovie']}
                                    onClick={pathname === "/admin/add-item/movie" ? handleAddMovie : handleUpdateMovie}
                                >
                                    {loading['addMovie'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
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