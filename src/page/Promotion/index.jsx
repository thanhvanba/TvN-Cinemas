import React, { useEffect, useState } from 'react'
import UserService from '../../service/UserService'
import imgVoucher from '../../images/happy-couple-holding-movie-icons.jpg'
import imgVoucher1 from '../../images/videotape-with-celluloid-cinema-tickets.jpg'
import imgVoucher2 from '../../images/top-view-cinema-tickets-collection.jpg'
import FormatDataTime from '../../utils/FormatDataTime'
import DetailPromtion from './components/detailPromotion'
import Loading from '../../components/Loading'


function Prommotion() {
    const { getPromotionFixedApi } = UserService()

    const [listPromotion, setListPromotion] = useState([])
    const [onePromotion, setOnePromotion] = useState({})
    const [loading, setLoading] = useState(false)
    console.log("🚀 ~ Prommotion ~ onePromotion:", onePromotion)
    const [toggle, setToggle] = useState(false)
    const handleGetPromotionFixeds = async () => {
        setLoading(true)
        const res = await getPromotionFixedApi()
        if (res && res.data && res.data.result) {
            setListPromotion(res.data.result)
        }
        setLoading(false)
    }

    const handleGetOnePromotion = (id) => {
        const promotion = listPromotion.find(item => item.promotionFixedId === id)
        setOnePromotion(promotion)
    }
    useEffect(() => {
        handleGetPromotionFixeds()
    }, [])

    return (
        <div className='pt-32 pb-10 relative' >
            <h2 className='text-white font-bold text-3xl text-center mb-12'>Khuyến mãi</h2>
            {loading ?
                <Loading />
                : <div className='grid grid-cols-3 gap-x-20 gap-y-10 mx-32 mt-3'>
                    {listPromotion && listPromotion.map((promotion) => (
                        <div
                            onClick={() => { handleGetOnePromotion(promotion.promotionFixedId); setToggle(!toggle) }}
                            className='space-y-2'
                        >
                            <img className='h-52 w-full rounded-xl' src={promotion.image || imgVoucher1} alt="" />
                            <h3 className='cursor-pointer text-[#00bcd4] font-bold text-xl text-start'>{promotion?.name}</h3>
                            <p className='cursor-default text-slate-300 text-sm font-medium'>Thời gian khuyến mãi: <span>{FormatDataTime(promotion.startDate).date}</span> - <span>{FormatDataTime(promotion.endDate).date}</span></p>
                        </div>
                    ))}
                </div>
            }
            {onePromotion && toggle &&
                <div className='flex justify-center items-center bg-black bg-opacity-30 w-full h-screen right-0 bottom-0 fixed z-50'>
                    <DetailPromtion onePromotion={onePromotion} onToggle={setToggle} />
                </div>
            }
        </div>
    )
}

export default Prommotion
