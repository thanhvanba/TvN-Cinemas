import { BuildingLibraryIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline'

import { FilmIcon, UsersIcon } from 'lucide-react'
import React from 'react'
import ConvertStringFollowFormat from '../../../../utils/ConvertStringFollowFormat'

const CardItem = ({ statistical }) => {

    const listStatistical = [
        { title: "Thống kê tổng doanh thu", quantity: statistical.qRevenue || "0", icon: Square3Stack3DIcon },
        { title: "Phim trong tháng", quantity: statistical.qMovieOfMonth || "0", icon: FilmIcon },
        { title: "Hệ thống rạp", quantity: statistical.qCinema || "0", icon: BuildingLibraryIcon },
        { title: "Thống kê số lượng người dùng", quantity: statistical.qUser || "0", icon: UsersIcon }
    ]
    return (
        <>
            {
                listStatistical.map((item) => (
                    <div className='px-3'>
                        <div className='mt-6 p-5 relative border-2 rounded-lg bg-slate-100'>
                            <span className='text-xs'>{item.title}</span>
                            <p className='pr-8 text-3xl font-semibold mt-2'>{ConvertStringFollowFormat(item.quantity)}</p>
                            <item.icon className='h-8 w-8 absolute right-5 bottom-5 text-emerald-600' />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default CardItem
