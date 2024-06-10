import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Armchair, Sofa } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DatePicker, Space, TimePicker } from 'antd';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu';
import dayjs from 'dayjs';
import PromotionService from '../../../../service/PromotionService';

function AddPromotion() {
    const { RangePicker } = DatePicker;
    const { promotionId } = useParams();
    console.log("🚀 ~ AddPromotion ~ promotionId:", promotionId)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [promotion, setPromotion] = useState({
        name: null,
        description: null,
        discountType: null,
        discountValue: null,
        validDayOfWeek: null,
        coupleValue: null,
        vipValue: null,
        normalValue: null,
        maxDiscountAmount: null,
        minOrderValue: null,
        ageLimit: null,
        validTimeFrameStart: null,
        validTimeFrameEnd: null,
        startDate: null,
        endDate: null,
        promotionCode: null,
        maxUsage: null,
        useForUserPerDay: null,
    })
    console.log("🚀 ~ AddPromotion ~ promotionId:", promotion)
    const [formality, setFormality] = useState(null)
    const [formalityOfPromotion, setFormalityOfPromotion] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [loading, setLoading] = useState(false)
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const { addPromotionsCode, addPromotionsFixed, updatePromotionsCode, updatePromotionsFixed, getOnePromotionApi } = PromotionService()

    const handleAddPromotion = async (e) => {
        e.preventDefault();
        // if (validate()) {
        setLoading(true);
        const data = promotion;
        formality === 0 ? await addPromotionsFixed(data) : await addPromotionsCode(data)
        changeTab("/admin/list-promotion")
        setLoading(false);
        // }
    };

    const handleGetOnePromotion = async (promotionId) => {
        setLoading('promotion', true)
        let resPromotion = await getOnePromotionApi(promotionId)
        if (resPromotion && resPromotion.data && resPromotion.data.result) {
            setPromotion(resPromotion.data.result.content)
        }
        setLoading('promotion', false)
    }

    const formalitys = ["Tự động", "Áp dụng mã"]
    const handleSelectChange = (selectedValue) => {
        selectedValue === "Tự động" ? setFormality(0) : setFormality(1)
        setFormalityOfPromotion(null)
    }

    const types = ["Khuyến mãi giảm tiền", "Khuyến mãi chiết khấu %"]
    const handleSelectType = (selectedValue) => {
        selectedValue === "Khuyến mãi giảm tiền" ? setSelectedType(0) : setSelectedType(1)
        setPromotion({ ...promotion, discountType: selectedValue === "Khuyến mãi giảm tiền" ? "FIXED_AMOUNT" : "PERCENTAGE" })
    }

    const formalityOfPromotions = ["Theo ngày trong tuần(T2-CN)(2-8)", "Theo khung thời gian", "Theo độ tuổi"]
    const handleSelectFormality = (selectedValue) => {
        selectedValue === "Theo độ tuổi" ? setFormalityOfPromotion(2) : selectedValue === "Theo khung thời gian" ? setFormalityOfPromotion(1) : setFormalityOfPromotion(0)
    }
    useEffect(() => {
        if (promotionId) {
            handleGetOnePromotion(promotionId);
        }
    }, [promotionId]);
    return (
        <div className='px-4 relative' >
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 onClick={() => { changeTab("/admin/list-promotion") }} className='cursor-pointer font-medium text-2xl'>Chương trình khuyến mãi</h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    <h2 className='cursor-default text-xl'>Thêm khuyến mãi</h2>
                </div>
            </div>
            <div className='pt-8'>
                <div>
                    <div className='rounded-lg bg-slate-200 p-4 shadow-xl'>
                        <div className='flex items-center'>
                            <div className="mb-4 w-1/2 mr-2">
                                <label
                                    htmlFor=""
                                    className="block font-medium leading-6 text-gray-900"
                                >
                                    Tên CT khuyến mãi <span className='text-red-600'>*</span>
                                </label>
                                <input
                                    onChange={e => setPromotion({ ...promotion, name: e.target.value })}
                                    type="text"
                                    className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                    placeholder='Nhập tên CT khuyến mãi'
                                    defaultValue={promotion?.name}
                                />
                            </div>

                            <div className="mb-4 w-1/2 ml-2">
                                <label
                                    htmlFor=""
                                    className="block font-medium leading-6 text-gray-900"
                                >
                                    Thời gian hoạt động <span className='text-red-600'>*</span>
                                </label>
                                <div >
                                    <RangePicker
                                        onChange={(dates, dateStrings) => {
                                            setPromotion({
                                                ...promotion,
                                                startDate: dateStrings ? dateStrings[0] : null,
                                                endDate: dateStrings ? dateStrings[1] : null
                                            });
                                        }}
                                        className="w-full py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        placeholder={['Chọn ngày bắt đầu', 'Chọn ngày kết thúc']}
                                        defaultValue={[
                                            promotion?.startDate ? dayjs(promotion.startDate, 'DD/MM/YYYY') : null,
                                            promotion?.endDate ? dayjs(promotion.endDate, 'DD/MM/YYYY') : null
                                        ]}
                                    // format={'DD/MM/YYYY'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor=""
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Mô tả <span className='text-red-600'>*</span>
                            </label>
                            <textarea
                                onChange={e => {
                                    setPromotion({ ...promotion, description: e.target.value })
                                    // clearError('desc')
                                }}
                                type="text"
                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                placeholder='Nhập mô tả khuyến mãi'
                                defaultValue={promotion?.description}
                                rows={5}
                            />
                        </div>
                        <div className="relative my-4">
                            <label
                                htmlFor=""
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Hình thức áp dụng <span className='text-red-600'>*</span>
                            </label>
                            <div className="relative pr-4 w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                <SelectMenu onSelectChange={handleSelectChange} items={formalitys} content={'Chọn hình thức'} />
                            </div>
                            {/* {errors.foodType && <p className="text-red-600">{errors.foodType}</p>} */}
                        </div>
                    </div>

                    {formality !== null &&
                        <div className='rounded-lg bg-slate-200 p-4 mt-4'>
                            {formality === 1 ?
                                <>
                                    <div className='flex'>
                                        <div className="mb-4 w-1/2 mr-2">
                                            <label
                                                htmlFor=""
                                                className="block font-medium leading-6 text-gray-900"
                                            >
                                                Mã áp dụng <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => setPromotion({ ...promotion, promotionCode: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập mã áp dụng'
                                                defaultValue={promotion?.promotionCode}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className="mb-4 w-1/2 mr-2">
                                            <label
                                                htmlFor=""
                                                className="block font-medium leading-6 text-gray-900"
                                            >
                                                Số lượng KH áp dụng tối đa
                                            </label>
                                            <input
                                                onChange={e => setPromotion({ ...promotion, maxUsage: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập số lượng khách hàng tối đa'
                                                defaultValue={promotion?.maxUsage}
                                            />
                                        </div>
                                        <div className="mb-4 w-1/2 ml-2">
                                            <label
                                                htmlFor=""
                                                className="block font-medium leading-6 text-gray-900"
                                            >
                                                Số lượng tối đa cho 1 KH trong ngày
                                            </label>
                                            <input
                                                onChange={e => setPromotion({ ...promotion, useForUserPerDay: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập số lượng tối đa trong ngày'
                                                defaultValue={promotion?.useForUserPerDay}
                                            />
                                        </div>
                                    </div>

                                    <h2 className='font-semibold text-xl py-3'>Chi tiết loại khuyến mãi</h2>
                                    <div className='flex'>
                                        <div className="mb-4 w-1/2 mr-2">
                                            <label
                                                htmlFor=""
                                                className="block font-medium leading-6 text-gray-900"
                                            >
                                                Loại khuyến mãi <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="relative pr-4 w-full cursor-default rounded-md bg-white py-1 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                <SelectMenu onSelectChange={handleSelectType} items={types} content={promotion?.discountType || "Chọn loại khuyến mãi"} />
                                            </div>
                                        </div>
                                        {selectedType !== null &&
                                            <div className="mb-4 w-1/2 ml-2">
                                                <label
                                                    htmlFor=""
                                                    className="block font-medium leading-6 text-gray-900"
                                                >
                                                    {selectedType === 0 ? 'Số tiền giảm' : 'Phần trăm giảm'} <span className='text-red-600'>*</span>
                                                </label>
                                                <input
                                                    onChange={e => setPromotion({ ...promotion, discountValue: parseFloat(e.target.value) })}
                                                    type="text"
                                                    className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    placeholder={selectedType === 0 ? 'Nhập số tiền' : 'Nhập phần trăm'}
                                                    defaultValue={promotion?.discountValue}
                                                />
                                            </div>
                                        }
                                    </div>
                                    {selectedType !== null &&
                                        <div className='flex'>
                                            <div className="mb-4 w-1/2 mr-2">
                                                <label
                                                    htmlFor=""
                                                    className="block font-medium leading-6 text-gray-900"
                                                >
                                                    Số tiền tối thiểu của đơn hàng
                                                </label>
                                                <input
                                                    onChange={e => setPromotion({ ...promotion, minOrderValue: e.target.value })}
                                                    type="text"
                                                    className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    placeholder='Nhập số tiền tối thiểu của đơn hàng'
                                                    defaultValue={promotion?.minOrderValue}
                                                />
                                            </div>
                                            {selectedType === 1 &&
                                                <div className="mb-4 w-1/2 ml-2">
                                                    <label
                                                        htmlFor=""
                                                        className="block font-medium leading-6 text-gray-900"
                                                    >
                                                        Số tiền khuyến mãi tối đa
                                                    </label>
                                                    <input
                                                        onChange={e => setPromotion({ ...promotion, maxDiscountAmount: e.target.value })}
                                                        type="text"
                                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                        placeholder='Nhập số tiền tối đa'
                                                        defaultValue={promotion?.maxDiscountAmount}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    }

                                </> :
                                <>
                                    <div className='flex items-center'>
                                        <div className="mb-4 w-1/2 mr-2">
                                            <label
                                                htmlFor=""
                                                className="block font-medium leading-6 text-gray-900"
                                            >
                                                Hình thức khuyến mãi<span className='text-red-600'>*</span>
                                            </label>
                                            <div className="relative pr-4 w-full cursor-default rounded-md bg-white py-1 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                                                <SelectMenu onSelectChange={handleSelectFormality} items={formalityOfPromotions} content={"Chọn hình thức khuyến mãi"} />
                                            </div>
                                        </div>
                                        {formalityOfPromotion !== null &&
                                            <div className="mb-4 w-1/2 ml-2">
                                                <label
                                                    htmlFor=""
                                                    className="block font-medium leading-6 text-gray-900"
                                                >
                                                    {formalityOfPromotion === 2 ? 'Giới hạn tuổi' : formalityOfPromotion === 1 ? 'Khung thời gian' : 'Ngày trong tuần(T2-CN)(2-8)'} <span className='text-red-600'>*</span>
                                                </label>
                                                {
                                                    formalityOfPromotion === 1 ?
                                                        <div >
                                                            <TimePicker.RangePicker
                                                                onChange={(dates, dateStrings) => {
                                                                    setPromotion({
                                                                        ...promotion,
                                                                        validTimeFrameStart: dateStrings ? dateStrings[0] : null,
                                                                        validTimeFrameEnd: dateStrings ? dateStrings[1] : null
                                                                    });
                                                                }}
                                                                format="hh:mm"
                                                                className="w-full py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                                placeholder={['Chọn thời gian bắt đầu', 'Chọn thời gian kết thúc']}
                                                                defaultValue={[
                                                                    promotion?.validTimeFrameStart ? dayjs(promotion.validTimeFrameStart, "hh:mm") : null,
                                                                    promotion?.validTimeFrameEnd ? dayjs(promotion.validTimeFrameEnd, "hh:mm") : null
                                                                ]}
                                                            />
                                                        </div>
                                                        : <input
                                                            onChange={e => setPromotion({ ...promotion, [formalityOfPromotion === 0 ? 'validDayOfWeek' : 'ageLimit']: parseFloat(e.target.value) })}
                                                            type="text"
                                                            className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                            placeholder={formalityOfPromotion === 0 ? 'Nhập thứ' : 'Nhập độ tuổi'}
                                                            defaultValue={formalityOfPromotion === 0 ? promotion?.validDayOfWeek : promotion?.ageLimit}
                                                        />
                                                }
                                            </div>
                                        }
                                    </div>
                                    <h2 className='font-semibold text-xl py-3'>Nhập giá trị các loại ghế</h2>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className="relative my-4 w-1/3 mr-2">
                                            <label
                                                htmlFor=""
                                                className="flex items-center font-medium leading-6 text-gray-900"
                                            >
                                                <Armchair className='h-8 w-8 text-slate-800' />&nbsp; Ghế thường <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => setPromotion({ ...promotion, normalValue: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập giá ghế thường'
                                                defaultValue={promotion?.normalValue}
                                            />
                                            {/* {errors.foodType && <p className="text-red-600">{errors.foodType}</p>} */}
                                        </div>
                                        <div className="relative my-4 w-1/3">
                                            <label
                                                htmlFor=""
                                                className="flex items-center font-medium leading-6 text-gray-900"
                                            >
                                                <Armchair className='h-8 w-8 text-orange-500' />&nbsp;Ghế vip <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => setPromotion({ ...promotion, vipValue: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập giá ghế vip'
                                                defaultValue={promotion?.vipValue}
                                            />
                                            {/* {errors.foodType && <p className="text-red-600">{errors.foodType}</p>} */}
                                        </div>
                                        <div className="relative my-4 w-1/3 ml-2">
                                            <label
                                                htmlFor=""
                                                className="flex items-center font-medium leading-6 text-gray-900"
                                            >
                                                <Sofa className='h-8 w-8 text-pink-700' />&nbsp; Ghế đôi <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => setPromotion({ ...promotion, coupleValue: e.target.value })}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập giá ghế đôi'
                                                defaultValue={promotion?.coupleValue}
                                            />
                                            {/* {errors.foodType && <p className="text-red-600">{errors.foodType}</p>} */}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    }
                    <div className='flex justify-end'>
                        <button
                            className="w-1/6 mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                            type='submit'
                            // disabled={loading}
                            onClick={handleAddPromotion}
                        >
                            {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                            &nbsp;Thêm khuyến mãi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPromotion
