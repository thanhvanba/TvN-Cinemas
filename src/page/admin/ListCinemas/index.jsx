import React from 'react'
import { MapPinIcon, PowerIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent'
import TruncatedContentShowModal from '../../../utils/TruncatedContentShowModal'

const ListCinemas = () => {
    const listCinema = [
        {
            header: { stt: "STT", name: "Rạp", location: "Địa chỉ", revenue: "Doanh Thu", status: "status", desc: "Mô tả", map: "Vị trí", action: "ACtions" },
            cinema: [
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Active",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Inactive",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Active",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Active",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Inactive",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Active",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Active",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Active",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } },
                { stt: "1", name: "TN Cinema Star", location: "Tầng 4, Vincom Plaza Lê Văn Việt, 50 Lê Văn Việt, P.Hiệp Phú, Quận 9", revenue: "20000", status: "Active",desc: "Rạp chiếu phim TN Cinema Star nằm ở trung tâm thành phố với kiến trúc hiện đại và biểu trưng ánh sáng neon. Phòng chiếu rộng rãi với ghế thoải mái, âm thanh sống động và hình ảnh sắc nét. Quầy bán vé và quầy bar đa dạng thức ăn và đồ uống. Star Cinema là điểm đến giải trí và thư giãn lý tưởng cho người yêu điện ảnh.", map: "Link map", action: { aChange: PowerIcon, aEdit: PencilSquareIcon } }
            ]
        }
    ]
    return (
        <div>
            <div className='px-4'>
                <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                    <h2 className='text-3xl'>List Cinemas</h2>
                    <button
                        className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
                        type='submit'
                    >
                        Add Cinemas
                    </button>
                </div>
            </div>

            <div>
                <div className='px-3'>
                    <div className=''>
                        {
                            listCinema.map((cinema) => (
                                <table className='mt-6 w-full'>
                                    <thead className=''>
                                        <tr>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.stt}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.name}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.location}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.revenue}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.status}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.desc}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.map}</th>
                                            <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{cinema.header.action}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cinema.cinema.map((item) => (
                                                <tr className='border-b-8 border-slate-50 bg-slate-100'>
                                                    <td className='text-start text-sm font-medium px-5 py-4'>{item.stt}</td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'>{item.name}</td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={item.location} maxLength={30}/></td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'>{format(item.revenue)}</td>
                                                    <td className={`${item.status === "Active" ? "text-green-600" : "text-red-600"} text-start text-sm font-medium px-5 py-4`}>{item.status}</td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'><TruncatedContent content={item.desc} maxLength={70}/></td>
                                                    <td className='text-start text-sm font-medium px-5 py-4'>
                                                        <div className='bg-slate-300 w-48 rounded-xl'>
                                                            <div className='p-4'>
                                                                <h4 className='uppercase font-bold text-sm'>{item.name}</h4>
                                                                <p className='text-xs text-slate-600'><TruncatedContent content={item.location} maxLength={20}/></p>
                                                            </div>
                                                            <button className="relative w-full rounded-b-xl border-slate-400 border p-3 text-sm font-bold uppercase hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white" type='submit'
                                                            >
                                                                <span className="absolute right-12 top-3 "><MapPinIcon className="h-6 w-6" /></span>
                                                                <a href={item.map} className='pr-8 text-xs'>Xem vị trí</a>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className='text-start font-medium px-5 py-4'>
                                                        <div className='flex items-center'>
                                                            <button className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                                                <item.action.aChange className='h-4 w-4 text-emerald-600' />
                                                            </button>
                                                            <a className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                                                <item.action.aEdit className='h-4 w-4 text-cyan-600' />
                                                            </a>
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

export default ListCinemas
