import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../../../service/UserService';
import AdminService from '../../../../service/AdminService';
import CinemaService from '../../../../service/CinemaService';
import { LoginContext } from '../../../../context/LoginContext';
import Loading from '../../../../components/Loading';
const AddCinema = () => {
    const { user } = useContext(LoginContext)
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [errors, setErrors] = useState({});
    const { pathname } = useLocation()
    const { cinemaId } = useParams()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const { getOneCinemaApi } = UserService()
    const { addCinemaApi, updateCinemaApi } = AdminService()

    const [cinema, setCinema] = useState({
        cinemaId: "",
        location: "",
        cinemaName: "",
        desc: "",
        status: true,
        urlLocation: ""
    })

    const handleGetOneCinema = async () => {
        let resCinema = await getOneCinemaApi(cinemaId)
        if (resCinema && resCinema.data && resCinema.data.result) {
            setCinema(resCinema.data.result)
        }
        setLoading1(false)
    }

    const validate = () => {
        const newErrors = {};
        if (!cinema.cinemaName) newErrors.cinemaName = 'Vui lòng nhập tên rạp phim!';
        if (!cinema.location) newErrors.location = 'Vui lòng nhập địa chỉ!';
        if (!cinema.desc) newErrors.desc = 'Vui lòng nhập mô tả!';
        if (!cinema.urlLocation) newErrors.urlLocation = 'Vui lòng nhập tọa độ vị trí!';
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
    const handleAddCinema = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = cinema;
            await addCinemaApi(data);
            changeTab(-1)
            setLoading(false);
        }
    };
    const handleUpdateCinema = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = cinema;
        await updateCinemaApi(data, cinemaId);
        changeTab(-1)
        setLoading(false);
    };

    useEffect(() => {
        if (pathname === "/admin/add-item/cinema") {
            setCinema({
                cinemaName: "",
                location: "",
                desc: "",
                urlLocation: ""
            })
        }
    }, [pathname]);

    useEffect(() => {
        if (cinemaId) {
            handleGetOneCinema()
            setLoading1(true);
        }
    }, [cinemaId]);
    return (
        <div>
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 onClick={() => { changeTab("/admin/list-cinema") }} className='cursor-pointer font-medium text-2xl'>Rạp</h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    {
                        /^\/admin\/add-item\/cinema/.test(pathname) ?
                            <h2 className='cursor-default text-xl'>Thêm rạp phim</h2>
                            :
                            <h2 className='cursor-default text-xl'>Chỉnh sửa rạp phim</h2>
                    }
                </div>
            </div>
            <div className='px-4 relative'>
                {user.role === "ADMIN" &&
                    <>
                        <div>
                            <div className="w-full py-8">
                                <div className='absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                                    {loading1 && <Loading />}
                                </div>
                                {!loading1 &&
                                    <div className="rounded-md p-8 shadow-lg bg-slate-100 relative">
                                        <form id='formAddCinema' onSubmit={pathname === "/admin/add-item/cinema" ? handleAddCinema : handleUpdateCinema} action="">
                                            <div className="relative my-4">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Tên rạp phim {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                                </label>
                                                <input
                                                    onChange={e => {
                                                        setCinema({ ...cinema, cinemaName: e.target.value })
                                                        clearError('cinemaName')
                                                    }}
                                                    type="text"
                                                    placeholder='Nhập tên rạp phim'
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.cinemaName}
                                                />
                                                {errors.cinemaName && <p className="text-red-600">{errors.cinemaName}</p>}
                                            </div>
                                            <div className="relative my-4">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Địa chỉ {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                                </label>
                                                <input
                                                    // value={account.email}
                                                    onChange={e => {
                                                        setCinema({ ...cinema, location: e.target.value });
                                                        clearError('location')
                                                    }}
                                                    type="text"
                                                    placeholder='Nhập địa chỉ rạp'
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.location}
                                                />
                                                {errors.location && <p className="text-red-600">{errors.location}</p>}
                                            </div>
                                            <div className="relative my-4">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Mô tả {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                                </label>
                                                <textarea
                                                    onChange={e => {
                                                        setCinema({ ...cinema, desc: e.target.value })
                                                        clearError('desc')
                                                    }}
                                                    type="text"
                                                    placeholder='Nhập mô tả'
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.desc}
                                                    rows={5}
                                                />
                                                {errors.desc && <p className="text-red-600">{errors.desc}</p>}
                                            </div>
                                            <div className="relative my-4">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    URL {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                                                </label>
                                                <input
                                                    // value={account.userName}
                                                    onChange={e => {
                                                        setCinema({ ...cinema, urlLocation: e.target.value })
                                                        clearError('urlLocation')
                                                    }}
                                                    type="text"
                                                    placeholder='Nhập url địa chỉ'
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.urlLocation}
                                                />
                                                {errors.urlLocation && <p className="text-red-600">{errors.urlLocation}</p>}
                                            </div>
                                            <div className='flex justify-end'>
                                                <button
                                                    className="w-[20%] mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                                                    type='submit'
                                                    disabled={loading}
                                                >
                                                    {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                                                    &nbsp;{pathname === "/admin/add-item/cinema" ? "Thêm rạp phim" : "Cập nhật"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default AddCinema