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
    const handleAddCinema = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = cinema;
        await addCinemaApi(data);
        changeTab(-1)
        setLoading(false);
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
                                <div className='absolute mx-auto top-80 right-1/2 z-50'>
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
                                                    Tên rạp phim
                                                </label>
                                                <input
                                                    onChange={e => setCinema({ ...cinema, cinemaName: e.target.value })}
                                                    type="text"
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.cinemaName}
                                                />

                                            </div>
                                            <div className="relative my-4">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Địa chỉ
                                                </label>
                                                <input
                                                    // value={account.email}
                                                    onChange={e => { setCinema({ ...cinema, location: e.target.value }); }}
                                                    type="text"
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.location}
                                                />
                                            </div>
                                            <div className="relative my-4">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    onChange={e => setCinema({ ...cinema, desc: e.target.value })}
                                                    type="text"
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.desc}
                                                    rows={5}
                                                />
                                            </div>
                                            <div className="relative my-4">
                                                <label
                                                    htmlFor=""
                                                    className="block text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    URL
                                                </label>
                                                <input
                                                    // value={account.userName}
                                                    onChange={e => setCinema({ ...cinema, urlLocation: e.target.value })} type="text"
                                                    className="block w-full px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    value={cinema.urlLocation}
                                                />
                                            </div>
                                            <div className='flex justify-end'>
                                                <button
                                                    className="w-[12%] mb-4 text-[18px] mt-4 rounded-xl hover:bg-white hover:text-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
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