import React from 'react'
import { useState, useEffect, useContext, Fragment } from 'react'
import { ArmchairIcon, PopcornIcon, HomeIcon } from 'lucide-react'
import { MapPinIcon, PowerIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent'
import { useLocation, useNavigate } from 'react-router-dom';
import "./index.css"
import { LoginContext } from '../../../context/LoginContext'
import CinemaService from '../../../service/CinemaService'
import UserService from '../../../service/UserService'
import AdminService from '../../../service/AdminService'

import Pagination from '../../../utils/Pagination'
import ModalComponent from '../../../utils/Modal';
import Cinema from '../../../components/Cinema';
import Loading from '../../../components/Loading';

const ListCinema = () => {
    const { user } = useContext(LoginContext)
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({
        userId: "",
        address: null,
        role: {
            roleId: "",
            roleName: "",
            active: true
        },
        userName: "",
        password: "",
        email: "",
        fullName: "",
        dob: "",
        phone: "",
        createdAt: null,
        updatedAt: "",
        lastLoginAt: "",
        cinema: {
            cinemaId: "",
            location: "",
            cinemaName: "",
            desc: "",
            status: true,
            urlLocation: null
        },
        active: true,
        delete: false
    })
    const [revenueOfCinema, setRevenueOfCinema] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [allCinema, setAllCinema] = useState([])
    const [oneCinema, setOneCinema] = useState([])
    const [cinemaId, setCinemaId] = useState("")

    const { getOneCinemaApi } = CinemaService()
    const { getUserInfoApi } = UserService()
    const { changeStatusCinemaApi, deleteCinemaApi, getAllCinemaApi, totalRevenueOfCinema } = AdminService()

    const navigate = useNavigate()

    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const getTotalByName = (name) => {
        const cinema = revenueOfCinema.find(item => item.name === name);
        return cinema ? cinema.total : 0;
    };
    const extendedCinema = allCinema.map(cinema => ({
        ...cinema,
        revenue: getTotalByName(cinema.cinemaName)
    }));

    const listCinema = {
        header: { stt: "STT", name: "Rạp", location: "Địa chỉ", revenue: "Doanh Thu", status: "status", desc: "Mô tả", map: "Vị trí", action: "ACtions" },
        cinema: (user.role === "ADMIN") ? extendedCinema : oneCinema,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon }
    }

    const handleOneCinema = async () => {
        if (info && info.cinema && info.cinema.cinemaId) {
            try {

                if (user.role === "MANAGER" && info) {
                    const resOneCinema = await getOneCinemaApi(info.cinema.cinemaId);

                    if (resOneCinema && resOneCinema.data && resOneCinema.data.result) {
                        setOneCinema(resOneCinema.data.result);
                    }
                }
            } catch (error) {
                console.error("Error in handleOneCinema:", error);
            }
        }
    }
    const handleGetItems = async (pageIndex) => {
        setCurrentPage(pageIndex)
        setLoading(true)
        let resInfo;
        if (user.role === "MANAGER") {
            resInfo = await getUserInfoApi();
            if (resInfo && resInfo.data && resInfo.data.result && resInfo.data.result) {
                setCinemaId(resInfo.data.result.cinema.cinemaId)
                setInfo(resInfo.data.result);
            }
        } else {
            let res = await getAllCinemaApi(pageIndex, 5)
            if (res && res.data && res.data.result && res.data.result.content) {
                setAllCinema(res.data.result.content)
            }
        }
        setLoading(false)
    }

    const handleChangeStatus = async (cinemaId) => {
        await changeStatusCinemaApi(cinemaId);
        handleGetItems(currentPage)
        const updatedCinemas = allCinema.map((cinema) => {
            if (cinema.cinemaId === cinemaId) {
                return { ...cinema, status: !cinema.status };
            }
            return cinema;
        });

        setAllCinema(updatedCinemas);
    };

    const handleGetRevenueOfCinema = async () => {
        let resRevenueOfManager = (user.role === "ADMIN") && await totalRevenueOfCinema()
        if (resRevenueOfManager && resRevenueOfManager.data && resRevenueOfManager.data && resRevenueOfManager.data.result) {
            setRevenueOfCinema(resRevenueOfManager.data.result)
        }
    }

    useEffect(() => {
        handleGetItems(currentPage)
        handleGetRevenueOfCinema()
    }, []);
    useEffect(() => {
        handleOneCinema()
    }, [info]);
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    {user.role === "ADMIN" ? <h2 className='text-3xl'>Danh sách rạp </h2> : <h2 className='text-3xl'>Chi tiết rạp</h2>}
                    <div className='flex items-center'>
                        {user.role === "MANAGER" ?
                            <button
                                className="border-slate-400 border p-3 m-1 text-sm font-bold uppercase rounded-2xl text-emerald-800"
                                onClick={() => changeTab("/admin/add-item/room")}
                                type='submit'
                            >
                                <HomeIcon />
                            </button> :
                            <>
                                <button
                                    className="border-slate-400 border p-3 m-1 text-sm font-bold uppercase rounded-2xl text-emerald-800"
                                    onClick={() => changeTab("/admin/add-item/food")}
                                    type='submit'
                                >
                                    <PopcornIcon />
                                </button>
                                <button
                                    className="border-slate-400 border py-3 px-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                                    onClick={() => changeTab("/admin/add-item/cinema")}
                                    type='submit'
                                >
                                    Add Cinema
                                </button>
                            </>}
                    </div>
                </div>
            </div>

            <div className='relative'>
                <div className='px-3'>
                    {
                        allCinema.length === 0 ?
                            <div className='flex justify-center absolute mx-auto top-80 right-1/2 z-50'>
                                {loading && <Loading />}
                            </div>
                            :
                            <div className=''>
                                <table className='mt-6 w-full'>
                                    <thead className=''>
                                        <tr>
                                            {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.stt}</th>}
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.name}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.location}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.revenue}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.status}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.desc}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.map}</th>
                                            {user.role === "ADMIN" && <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.action}</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (user.role === "ADMIN") ?
                                                listCinema.cinema.map((item, index) => (
                                                    <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                        <td className='text-start text-sm font-medium px-5 py-4'>{index + 1}</td>
                                                        <td className='text-start text-sm font-medium px-5 py-4'>{item.cinemaName}</td>
                                                        <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={item.location} maxLength={30} /></td>
                                                        <td className='text-start text-sm font-medium px-5 py-4'>{format(getTotalByName(item.cinemaName))}</td>
                                                        <td className={`${item.status ? "text-green-600" : "text-red-600"} text-start text-sm font-medium px-5 py-4`}>{item.status ? 'Active' : 'Inactive'}</td>
                                                        <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={item.desc} maxLength={70} /></td>
                                                        <td className='text-start text-sm font-medium px-5 py-4'>
                                                            <div className='bg-slate-600 w-60 rounded-xl'>
                                                                <Cinema cinemaName={item.cinemaName} location={item.location} urlLocation={item.urlLocation} />
                                                            </div>
                                                        </td>
                                                        <td className='text-start font-medium px-5 py-4'>
                                                            <div className='flex items-center'>
                                                                <button type='button' onClick={(e) => { e.stopPropagation(); handleChangeStatus(item.cinemaId) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                                                    <listCinema.action.aChange className='h-4 w-4 text-emerald-600' />
                                                                </button>
                                                                <a onClick={(e) => { e.stopPropagation(); changeTab(`/admin/update-item/cinema/${item.cinemaId}`) }} className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100'>
                                                                    <listCinema.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                    <td className='text-start text-sm font-medium px-5 py-4'>{oneCinema.cinemaName}</td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={oneCinema.location} maxLength={30} /></td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'>{format(100000000)}</td>
                                                    <td className={`${oneCinema.status ? "text-green-600" : "text-red-600"} text-start text-sm font-medium px-5 py-4`}>{oneCinema.status ? 'Active' : 'Inactive'}</td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={oneCinema.desc} maxLength={70} /></td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'>
                                                        <div className='bg-slate-600 w-60 rounded-xl'>
                                                            <Cinema cinemaName={oneCinema.cinemaName} location={oneCinema.location} urlLocation={oneCinema.urlLocation} />
                                                        </div>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>

                                {user.role === "ADMIN" && <Pagination pageNumber={currentPage} onPageChange={handleGetItems} />}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListCinema
