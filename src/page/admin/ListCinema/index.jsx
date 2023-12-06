import React from 'react'
import { useState, useEffect, Fragment } from 'react'
import { ArmchairIcon, PopcornIcon, HomeIcon } from 'lucide-react'
import { MapPinIcon, PowerIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent'
import { useLocation, useNavigate } from 'react-router-dom';
import "./index.css"

import CinemaService from '../../../service/CinemaService'

const ListCinema = () => {
    const [loading, setLoading] = useState(false)
    const [allCinema, setAllCinema] = useState([])
    const { getAllCinemaApi } = CinemaService()

    const navigate = useNavigate()

    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const listCinema = {
        header: { stt: "STT", name: "Rạp", location: "Địa chỉ", revenue: "Doanh Thu", status: "status", desc: "Mô tả", map: "Vị trí", action: "ACtions" },
        cinema: allCinema,
        action: { aChange: PowerIcon, aEdit: PencilSquareIcon }
    }

    const handleGetAllCinema = async () => {
        let res = await getAllCinemaApi()
        if (res && res.data && res.data.result && res.data.result.content) {
            setAllCinema(res.data.result.content)
        }
    }

    useEffect(() => {
        handleGetAllCinema()
    }, []);
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>List Cinema</h2>
                    <div className='flex items-center'>
                        <button
                            className="border-slate-400 border p-3 m-1 text-sm font-bold uppercase rounded-2xl text-emerald-800"
                            onClick={() => changeTab("/admin/add-item/room")}
                            type='submit'
                        >
                            <HomeIcon />
                        </button>
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
                    </div>
                </div>
            </div>

            <div>
                <div className='px-3'>
                    <div className=''>
                        {
                            <table className='mt-6 w-full'>
                                <thead className=''>
                                    <tr>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.stt}</th>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.name}</th>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.location}</th>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.revenue}</th>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.status}</th>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.desc}</th>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.map}</th>
                                        <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{listCinema.header.action}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listCinema.cinema.map((item, index) => (
                                            <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                <td className='text-start text-sm font-medium px-5 py-4'>{index + 1}</td>
                                                <td className='text-start text-sm font-medium px-5 py-4'>{item.cinemaName}</td>
                                                <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={item.location} maxLength={30} /></td>
                                                <td className='text-start text-sm font-medium px-5 py-4'>{format(100000000)}</td>
                                                <td className={`${item.status ? "text-green-600" : "text-red-600"} text-start text-sm font-medium px-5 py-4`}>{item.status ? 'Active' : 'Inactive'}</td>
                                                <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={item.desc} maxLength={70} /></td>
                                                <td className='text-start text-sm font-medium px-5 py-4'>
                                                    <div className='bg-slate-300 w-48 rounded-xl'>
                                                        <div className='p-4'>
                                                            <h4 className='uppercase font-bold text-sm'>{item.cinemaName}</h4>
                                                            <p className='text-xs text-slate-600'><TruncatedContent content={item.location} maxLength={20} /></p>
                                                        </div>
                                                        <button
                                                            className="relative w-full rounded-b-xl border-slate-400 border p-3 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                                                            type='button'
                                                            onClick={() => window.open(item.urlLocation, '_blank')}
                                                        >
                                                            <span className="absolute right-12 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                                                            <a href={item.urlLocation} className='pr-8 text-xs'>Xem vị trí</a>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className='text-start font-medium px-5 py-4'>
                                                    <div className='flex items-center'>
                                                        <button className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                                            <listCinema.action.aChange className='h-4 w-4 text-emerald-600' />
                                                        </button>
                                                        <a className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                            <listCinema.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCinema
