import React from 'react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const ListUser = () => {
    const listUser = [
        {
            header: { stt: "STT", info: "Basic info", username: "user name", role: "role", status: "status", created: "created date", login: "last login", action: "actions" },
            user: [
                { stt: "1", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "2", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "3", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Banned", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "4", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "5", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "6", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Banned", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "7", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "8", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "9", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } },
                { stt: "10", info: { iAvatar: UserCircleIcon, iName: "Văn Bá Trung Thành", iEmail: "thanh@gmail.com", iPhone: "0378987089" }, username: "Thanh15", role: "User", status: "Approved", created: "11/10/2023", login: "08/11/2023", action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon } }
            ]
        }
    ]
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>List User</h2>
                    <button
                        className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                        type='submit'
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div>
                <div className='px-3'>
                    <div className=''>
                        {
                            listUser.map((user) => (
                                <table className='mt-6 w-full'>
                                    <thead className=''>
                                        <tr>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.stt}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.info}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.username}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.role}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.status}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.created}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.login}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{user.header.action}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            user.user.map((item) => (
                                                <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                    <td className='text-start font-medium px-5 py-4'>{item.stt}</td>
                                                    <td className='text-start font-medium px-5 py-4'>
                                                        <div className='flex items-center'>
                                                            <div div className='pr-2' >
                                                                <item.info.iAvatar className="h-16 w-16 text-emerald-600" />
                                                            </div >
                                                            <div>
                                                                <h3>{item.info.iName}</h3>
                                                                <p className='font-normal'>Email: {item.info.iEmail}</p>
                                                                <span className='font-normal'>Sdt: {item.info.iPhone}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-start font-medium px-5 py-4'>{item.username}</td>
                                                    <td className='text-start font-medium px-5 py-4'>{item.role}</td>
                                                    <td className={`${item.status === "Approved" ? "text-green-600" : "text-red-600"} text-start font-medium px-5 py-4`}>{item.status}</td>
                                                    <td className='text-start font-medium px-5 py-4'>{item.created}</td>
                                                    <td className='text-start font-medium px-5 py-4'>{item.login}</td>
                                                    <td className='text-start font-medium px-5 py-4'>
                                                        <div className='flex items-center'>
                                                            <button className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                                                <item.action.aChange className='h-4 w-4 text-emerald-600' />
                                                            </button>
                                                            <a className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                                <item.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                            </a>
                                                            <button className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                                                <item.action.aDelete className='h-4 w-4 text-red-600' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUser
