
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { BellIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import Search from '../../../components/Search'
import AuthService from '../../../service/AuthService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../service/UserService';
import { useEffect } from 'react';

import bg from "../../../images/bg-cinema-10.png"
import ListNotification from '../../../components/ListNotification';


function Header() {
    const { logoutApi } = AuthService();
    const { getUserInfoApi } = UserService()

    const { user } = useContext(LoginContext);

    const navigate = useNavigate()

    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()


    const handleLogoutApi = async (e) => {
        setLoading(true)
        e.preventDefault();
        await logoutApi()
        setLoading(false)
    }

    const handleGetItems = async () => {
        let resInfo = await getUserInfoApi()
        if (resInfo && resInfo.data && resInfo.data.result) {
            setAvatar(resInfo.data.result.avatar)
        }
    }

    useEffect(() => {
        handleGetItems()
    }, []);
    return (
        <div
            className={`${user.role === "STAFF" ? "fixed top-0 left-0 right-0 bottom-0 z-50" : "bg-gray-300"
                } flex justify-end items-center h-20 px-4`}
            style={user.role === "STAFF" ? { backgroundImage: `url(${bg})` } : {}}
        >
            <div className='flex px-3 items-center'>
                <div>
                    <ListNotification />
                </div>
                <div className='relative'>
                    <div
                        onClick={() => setToggle(!toggle)}
                        className='flex items-center cursor-pointer'
                    >
                        <div className='ml-3 flex flex-col'>
                            <span className={`${user.role === "STAFF" ? "text-white" : ""} flex justify-end text-sm`}>
                                Xin chào
                            </span>
                            <span className='flex justify-end text-xl text-cyan-600 font-bold'>{user.fullName}</span>
                        </div>
                        <div className='ml-2'>
                            {avatar ? <img className='rounded-full w-14 h-14 border-2' src={avatar} alt="" /> : <UserCircleIcon className="h-16 w-16 text-emerald-600" />}
                        </div>
                    </div>
                    {toggle &&
                        <ul className='absolute top-20 right-0 bg-slate-50 border-2 rounded-md text-slate-500 z-50'>
                            <li
                                onClick={() => {
                                    navigate(user.role === "ADMIN" ? `/admin/info` : user.role === "MANAGER" ? `/manager/info` : `/staff/info`)
                                    setToggle(!toggle)
                                }}
                                className='py-1 cursor-pointer'
                            >
                                <p className='flex px-6 hover:bg-slate-200'  >
                                    Hồ sơ
                                </p>
                            </li>
                            <li
                                onClick={handleLogoutApi}
                                className='py-1 border-t-2 cursor-pointer'
                            >
                                <p className='flex items-center px-6 hover:bg-slate-200'>
                                    {loading && <div className='pr-2'><FontAwesomeIcon className='w-4 h-4' icon={faSpinner} spin /></div>}
                                    Đăng xuất
                                </p>
                            </li>
                        </ul>
                    }
                </div>


            </div>
        </div>
    )
}

export default Header
