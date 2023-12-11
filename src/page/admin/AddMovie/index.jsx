import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AdminService from '../../../service/AdminService'
import CinemaService from '../../../service/CinemaService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const AddMovie = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState()

    const { addMovieApi } = AdminService()

    const [movie, setMovie] = useState({
        title: "",
        director: "",
        actor: "",
        genres: "",
        desc: "",
        releaseDate: "",
        poster: "",
        trailerLink: "",
        duration: "",
    })

    const handleAddMovie = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = movie;
        await addMovieApi(data);
        setLoading(false);
    };

    const handlePreviewImage = (e) => {
        const img = e.target.files[0]
        img.preview = URL.createObjectURL(img)
        setImage(img)
        setMovie({ ...movie, poster: img.preview })
    }
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>Add Movie</h2>
                </div>

                <div className='pt-8'>
                    <div className='border py-8 px-4'>
                        <div className='flex'>
                            <div className='relative bg-slate-100 h-80 items-center text-center justify-center mx-4 w-[20%]'>
                                <input
                                    onChange={handlePreviewImage}
                                    type="file"
                                    className="hidden" // Ẩn input mặc định
                                    id="form_img-upload"
                                />
                                <label
                                    htmlFor="form_img-upload" // Liên kết label với input
                                    className="bg-slate-100 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                >
                                    Choose a File
                                </label>
                                {image && (
                                    <img className='absolute top-0 left-0 h-[90%]' src={image.preview} alt="" />
                                )}
                            </div>
                            <div className='px-4 w-[80%]'>
                                <div className="mb-4">
                                    <input
                                        onChange={e => setMovie({ ...movie, title: e.target.value })}
                                        type="text"
                                        className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="my-4">
                                    <textarea
                                        onChange={e => setMovie({ ...movie, desc: e.target.value })}
                                        type="text"
                                        className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                        placeholder="Description"
                                        rows={5}
                                    />
                                </div>
                                <div className='flex justify-between my-4'>
                                    <div className="pr-2">
                                        <input
                                            onChange={e => setMovie({ ...movie, director: e.target.value })}
                                            type="text"
                                            className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                            placeholder="Director"
                                        />
                                    </div>
                                    <div className="px-2">
                                        <input
                                            onChange={e => setMovie({ ...movie, actor: e.target.value })}
                                            type="text"
                                            className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                            placeholder="Actor"
                                        />
                                    </div>
                                    <div className="px-2">
                                        <input
                                            onChange={e => setMovie({ ...movie, duration: e.target.value })}
                                            type="text"
                                            className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                            placeholder="Duration"
                                        />
                                    </div>
                                    <div className="pl-2">
                                        <input
                                            onChange={e => setMovie({ ...movie, genres: e.target.value })}
                                            type="text"
                                            className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md "
                                            placeholder="Genres"
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-between my-4'>
                                    <div className="w-full pr-2  bg-slate-100 rounded-md">
                                        <DatePicker
                                            selected={movie.releaseDate}
                                            onChange={date => setMovie({ ...movie, releaseDate: date })}
                                            className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md"
                                            placeholder="Release Date"
                                            dateFormat="yyyy-MM-dd" // Định dạng ngày
                                        />
                                    </div>
                                    <div className="w-full pl-2">
                                        <input
                                            onChange={e => setMovie({ ...movie, trailerLink: e.target.value })}
                                            type="text"
                                            className="block bg-slate-100 placeholder-neutral-900 w-full px-4 py-1 text-lg focus:outline-none rounded-md"
                                            placeholder="Trailer Link"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className="w-1/6 mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                type='submit'
                                disabled={loading}
                                onClick={handleAddMovie}
                            >
                                {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                &nbsp;Add Movie
                            </button>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}
export default AddMovie