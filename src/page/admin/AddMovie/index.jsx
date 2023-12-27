import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AdminService from '../../../service/AdminService'
import CinemaService from '../../../service/CinemaService';
import UserService from '../../../service/UserService';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormatDataTime from '../../../utils/FormatDataTime';

const AddMovie = () => {
    const { getOneMovieApi } = UserService()

    const { movieId } = useParams();
    const { pathname } = useLocation()
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState()
    const [imageURL, setImageURL] = useState(null);
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        actor: "",
        genres: "",
        desc: "",
        releaseDate: "",
        poster: {},
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
        trailerLink: "",
        duration: "",
        reviews: [],
        rating: "0",
        delete: false
    })

    const { addMovieApi, updateMovieApi } = AdminService()

    const handleAddMovie = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = movie;
        await addMovieApi(data);
        setLoading(false);
    };
    const handleUpdateMovie = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = movie;

        let resMovie = await updateMovieApi(movieId, data);
        if (resMovie && resMovie.data && resMovie.data.result) {
            console.log(resMovie.data.result)
        }
        setLoading(false);
    };
    const hadleGetOneMovie = async () => {
        let resMovie = await getOneMovieApi(movieId)
        if (resMovie && resMovie.data && resMovie.data.result) {
            setOneMovie(resMovie.data.result)
        }
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
                trailerLink: "",
                duration: "",
                reviews: [],
                rating: "0",
                delete: false
            })
        }
    }, [pathname]);
    useEffect(() => {
        movieId && hadleGetOneMovie()
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
                trailerLink: oneMovie.trailerLink,
                duration: oneMovie.duration,
                reviews: oneMovie.reviews,
                rating: oneMovie.rating,
                delete: oneMovie.delete
            })
        setImageURL(oneMovie.poster)
    }, [oneMovie]);
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 flex justify-between items-center border-b-2'>
                    {
                        pathname === "/admin/add-item/movie" ?
                            <h2 className='text-3xl'>Add Movie</h2> :
                            pathname === `/admin/movie/${movieId}` ?
                                <h2 className='text-3xl'>Detail Movie</h2> :
                                <h2 className='text-3xl'>Update Movie</h2>
                    }
                </div>

                <div className='pt-8'>
                    <div className='border py-8 px-4'>
                        <div className='flex'>
                            <div>
                                {pathname !== `/admin/movie/${movieId}` ?
                                    <div className="my-4 border">
                                        <img src={imageURL} alt="Preview" className="md:w-64 md:h-80 lg:h-96 lg:w-72" />
                                    </div> :
                                    <div className='my-4 border'>
                                        <img
                                            className='w-96 h-[500px]'
                                            src={movie.poster}
                                        />
                                    </div>}
                                {pathname !== `/admin/movie/${movieId}` &&
                                    <div className='px-4'>
                                        <input
                                            onChange={handleFileChange}
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
                                    </div>}
                            </div>

                            <div className='px-4 w-[80%]'>
                                <div className="mb-4">
                                    {pathname !== `/admin/movie/${movieId}` ?
                                        <>
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Title
                                            </label>
                                            <input
                                                onChange={e => setMovie({ ...movie, title: e.target.value })}
                                                type="text"
                                                className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                                defaultValue={oneMovie.title}
                                            />
                                        </> :
                                        <div>
                                            <h3 className='uppercase text-2xl text-gray-900'>
                                                {movie.title}
                                            </h3>
                                        </div>
                                    }
                                </div>
                                <div className="my-4">
                                    {pathname !== `/admin/movie/${movieId}` ?
                                        <>
                                            <label
                                                htmlFor=""
                                                className="block text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                onChange={e => setMovie({ ...movie, desc: e.target.value })}
                                                type="text"
                                                className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                                defaultValue={oneMovie.desc}
                                                rows={5}
                                            />
                                        </> :
                                        <div className='pt-4 text-slate-500'>
                                            {movie.desc}
                                        </div>}
                                </div>
                                {pathname != `/admin/movie/${movieId}` ?
                                    <>
                                        <div className='flex justify-between my-4'>
                                            <div className="pr-2">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Director
                                                </label>
                                                <input
                                                    onChange={e => setMovie({ ...movie, director: e.target.value })}
                                                    type="text"
                                                    className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                                    defaultValue={oneMovie.director}
                                                />
                                            </div>
                                            <div className="px-2">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Actor
                                                </label>

                                                <input
                                                    onChange={e => setMovie({ ...movie, actor: e.target.value })}
                                                    type="text"
                                                    className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                                    defaultValue={oneMovie.actor}
                                                />
                                            </div>
                                            <div className="px-2">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Release Date
                                                </label>
                                                <DatePicker
                                                    selected={time}
                                                    onChange={date => {
                                                        setTime(date);
                                                        setMovie((prevMovie) => {
                                                            return { ...prevMovie, releaseDate: date };
                                                        });
                                                    }}
                                                    className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md"
                                                    placeholderText={FormatDataTime(oneMovie.releaseDate).date}
                                                    dateFormat="yyyy-MM-dd" // Định dạng ngày
                                                />
                                            </div>
                                            <div className="pl-2">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Genres
                                                </label>
                                                <input
                                                    onChange={e => setMovie({ ...movie, genres: e.target.value })}
                                                    type="text"
                                                    className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                                    defaultValue={oneMovie.genres}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-between my-4'>
                                            <div className="w-1/4 pr-2 rounded-md">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Duration
                                                </label>
                                                <input
                                                    onChange={e => setMovie({ ...movie, duration: e.target.value })}
                                                    type="text"
                                                    className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                                    defaultValue={oneMovie.duration}
                                                />
                                            </div>
                                            <div className="w-3/4 pl-2">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Trailer Link
                                                </label>
                                                <input
                                                    onChange={e => setMovie({ ...movie, trailerLink: e.target.value })}
                                                    type="text"
                                                    className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md"
                                                    defaultValue={oneMovie.trailerLink}
                                                />
                                            </div>
                                        </div>
                                    </> :
                                    <ul className='pt-6 pb-4 text-gray-900'>
                                        <li className='relative pl-28 pb-5'>
                                            <span className='absolute font-bold top-0 left-0'>Đạo diễn</span>
                                            <span>{movie.director}</span>
                                        </li>
                                        <li className='relative pl-28 pb-5'>
                                            <span className='absolute font-bold top-0 left-0'>Diễn viên</span>
                                            <span>{movie.actor}</span>
                                        </li>
                                        <li className='relative pl-28 pb-5'>
                                            <span className='absolute font-bold top-0 left-0'>Thể loại</span>
                                            <span>{movie.genres}</span>
                                        </li>
                                        <li className='relative pl-28 pb-5'>
                                            <span className='absolute font-bold top-0 left-0'>Khởi chiếu</span>
                                            <span>{FormatDataTime(movie.releaseDate).date}</span>
                                        </li>
                                        <li className='relative pl-28 pb-5'>
                                            <span className='absolute font-bold top-0 left-0'>Thời lượng</span>
                                            <span>{movie.duration} phút</span>
                                        </li>
                                        <li className='relative pl-28 pb-5'>
                                            <span className='absolute font-bold top-0 left-0'>Ngôn ngữ</span>
                                            <span>Phim có phụ đề</span>
                                        </li>
                                    </ul>}
                            </div>
                        </div>
                        {pathname !== `/admin/movie/${movieId}` &&
                            <div className='flex justify-end'>
                                <button
                                    className="w-1/6 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                    type='submit'
                                    disabled={loading}
                                    onClick={pathname === "/admin/add-item/movie" ? handleAddMovie : handleUpdateMovie}
                                >
                                    {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                    &nbsp;{pathname === "/admin/add-item/movie" ? "Add Movie" : "Update Movie"}
                                </button>
                            </div>}
                        <div>

                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}
export default AddMovie