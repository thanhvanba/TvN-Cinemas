import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Armchair, Sofa } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DatePicker, Space, TimePicker } from 'antd';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu';
import PromotionService from '../../../../service/PromotionService';
import { BanknotesIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function AddPromotion() {
    const { RangePicker } = DatePicker;
    const { promotionId } = useParams();
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
        image: {}
    })

    console.log("🚀 ~ AddPromotion ~ promotion:", promotion)
    const [formality, setFormality] = useState(null)
    const [formalityOfPromotion, setFormalityOfPromotion] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [loading, setLoading] = useState(false)
    const changeTab = (pathname) => {
        promotion
        navigate(pathname)
    }

    const { addPromotionsCode, addPromotionsFixed, getOnePromotionApi } = PromotionService()

    const handleAddPromotion = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const data = promotion;
            formality === 0 ? await addPromotionsFixed(data) : await addPromotionsCode(data)
            changeTab("/admin/list-promotion")
            setLoading(false);
        }

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
        clearError('formality')
    }

    const types = ["Khuyến mãi giảm tiền", "Khuyến mãi chiết khấu %"]
    const handleSelectType = (selectedValue) => {
        selectedValue === "Khuyến mãi giảm tiền" ? setSelectedType(0) : setSelectedType(1)
        setPromotion({ ...promotion, discountType: selectedValue === "Khuyến mãi giảm tiền" ? "FIXED_AMOUNT" : "PERCENTAGE" })
        clearError('discountType')
    }

    const formalityOfPromotions = ["Theo ngày trong tuần(T2-CN)(1-7)", "Theo khung thời gian", "Theo độ tuổi"]
    const handleSelectFormality = (selectedValue) => {
        selectedValue === "Theo độ tuổi" ? setFormalityOfPromotion(2) : selectedValue === "Theo khung thời gian" ? setFormalityOfPromotion(1) : setFormalityOfPromotion(0)
        clearError('formalityOfPromotion')
    }

    const [errors, setErrors] = useState({});
    console.log("🚀 ~ AddPromotion ~ errors:", errors)

    const validate = () => {
        const newErrors = {};
        if (!/^\/(admin|manager)\/update-item/.test(pathname)) {
            if (Object.keys(promotion.image).length === 0 && promotion.image.lastModified === undefined) newErrors.image = 'Vui lòng chọn ảnh!';
            if (!promotion.name) newErrors.name = 'Vui lòng nhập tên khuyến mãi!';
            if (!promotion.description) newErrors.description = 'Vui lòng nhập mô tả!';
            if (!promotion.startDate) newErrors.startDate = 'Vui lòng nhập thời gian diễn ra sự kiện!';

            if (formality === null) newErrors.formality = 'Vui lòng chọn hình thức áp dụng!';
            else {
                if (formality === 1) {
                    if (!promotion.maxUsage) newErrors.maxUsage = 'Vui lòng nhập số lượng áp dụng tối đa!';
                    if (promotion.promotionCode.length < 6 || promotion.promotionCode.length > 8) newErrors.promotionCode = 'Vui lòng nhập mã code từ 6-8 ký tự!';
                    else
                        if (!promotion.promotionCode) newErrors.promotionCode = 'Vui lòng nhập mã code!';
                    if (!promotion.useForUserPerDay) newErrors.useForUserPerDay = 'Vui lòng nhập số lượng sử dụng tối đa trong ngày!';
                    if (!promotion.discountType) newErrors.discountType = 'Vui lòng chọn loại khuyến mãi!';
                    else {
                        if (promotion.discountType === 'PERCENTAGE') {
                            if (!promotion.maxDiscountAmount) newErrors.maxDiscountAmount = 'Vui lòng nhập giá tối đa!';
                        }
                        if (!promotion.minOrderValue) newErrors.minOrderValue = 'Vui lòng nhập giá trị tối thiểu!';
                        if (!promotion.discountValue) newErrors.discountValue = 'Vui lòng nhập giá trị khuyến mãi!';
                    }
                } else {
                    if (!promotion.coupleValue) newErrors.coupleValue = 'Vui lòng nhập giá ghế đôi!';
                    if (!promotion.vipValue) newErrors.vipValue = 'Vui lòng nhập giá ghế vip!';
                    if (!promotion.normalValue) newErrors.normalValue = 'Vui lòng nhập giá ghế thường!';

                    if (formalityOfPromotion === null) newErrors.formalityOfPromotion = 'Vui lòng chọn hình thức khuyến mãi!';
                    else {
                        if (formalityOfPromotion === 1) {
                            if (!promotion.validTimeFrameStart) newErrors.validTimeFrameStart = 'Vui lòng chọn khung thời gian!';
                        } else {
                            if (!promotion.ageLimit && !promotion.validDayOfWeek) newErrors.ageLimit = 'Vui lòng nhập giá trị!';
                        }
                    }
                }
            }
            // if (!promotion.duration) newErrors.duration = 'Vui lòng nhập thời lượng!';
            // else if (isNaN(promotion.duration)) newErrors.duration = 'Vui lòng nhập đúng định dạng là số!';
            // if (!promotion.trailerLink) newErrors.trailerLink = 'Vui lòng nhập trailer link!';
            // if (Object.keys(promotion.slider).length === 0 && promotion.slider.lastModified === undefined) newErrors.slider = 'Vui lòng chọn ảnh (ngang)!';
        }
        // if (isNaN(promotion.duration)) newErrors.duration = 'Vui lòng nhập đúng định dạng là số!';
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

    // Upload ảnh
    const [imageURL, setImageURL] = useState(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        readAndDisplayFile(selectedFile);
    };

    const readAndDisplayFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);
            setPromotion((prevPromotion) => ({
                ...prevPromotion,
                image: file,
            }));
        };
        reader.readAsDataURL(file);
        clearError('image')
    };

    useEffect(() => {
        if (promotionId) {
            handleGetOnePromotion(promotionId);
        }
    }, [promotionId]);
    return (
        <div className='px-4 relative' >
            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                <div className='flex items-center'>
                    <h2 onClick={() => { changeTab("/admin/list-promotion") }} className='cursor-pointer font-medium text-2xl flex items-end'>
                        <BanknotesIcon className='h-8 w-8 mr-1 text-emerald-600' />
                        Chương trình khuyến mãi
                    </h2>
                    <ChevronRightIcon className='px-1 h-6' />
                    <h2 className='cursor-default text-xl'>Thêm khuyến mãi</h2>
                </div>
            </div>
            <div className='pt-8'>
                <div>
                    <div className='flex gap-x-3'>
                        <div className='w-2/3 rounded-lg bg-slate-200 p-4 shadow-xl'>
                            <div className='flex items-start'>
                                <div className="mb-4 w-1/2 mr-2">
                                    <label
                                        htmlFor=""
                                        className="block font-medium leading-6 text-gray-900"
                                    >
                                        Tên CT khuyến mãi <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        onChange={e => {
                                            setPromotion({ ...promotion, name: e.target.value })
                                            clearError('name')
                                        }
                                        }
                                        type="text"
                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                        placeholder='Nhập tên CT khuyến mãi'
                                        defaultValue={promotion?.name}
                                    />
                                    {errors.name && <p className="text-red-600">{errors.name}</p>}
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
                                                clearError('startDate')
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
                                    {errors.startDate && <p className="text-red-600">{errors.startDate}</p>}
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
                                        clearError('description')
                                    }}
                                    type="text"
                                    className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                    placeholder='Nhập mô tả khuyến mãi'
                                    defaultValue={promotion?.description}
                                    rows={5}
                                />
                                {errors.description && <p className="text-red-600">{errors.description}</p>}
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
                                {errors.formality && <p className="text-red-600">{errors.formality}</p>}
                            </div>
                        </div>
                        <div className='pb-4 w-1/3'>
                            <label
                                htmlFor=""
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Ảnh khuyến mãi {!/^\/(admin|manager)\/update-item/.test(pathname) && <span className='text-red-600'>*</span>}
                            </label>
                            <div className="mb-4 border">
                                <img src={imageURL} alt="Ảnh khuyến mãi" className="w-full lg:h-[264px]" />
                            </div>

                            <div className=''>
                                <input
                                    onChange={handleFileChange}
                                    type="file"
                                    className="hidden"
                                    id="form_img2-upload"
                                />
                                <label
                                    htmlFor="form_img2-upload"
                                    className="bg-slate-200 w-full h-full px-4 py-1 text-lg focus:outline-none rounded-md cursor-pointer flex items-center flex-col-reverse"
                                >
                                    Chọn một tập tin
                                </label>
                            </div>
                            {errors.image && <p className="text-red-600">{errors.image}</p>}
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
                                                onChange={e => {
                                                    setPromotion({ ...promotion, promotionCode: e.target.value })
                                                    clearError('promotionCode')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập mã áp dụng'
                                                defaultValue={promotion?.promotionCode}
                                            />
                                            {errors.promotionCode && <p className="text-red-600">{errors.promotionCode}</p>}
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
                                                onChange={e => {
                                                    setPromotion({ ...promotion, maxUsage: e.target.value })
                                                    clearError('maxUsage')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập số lượng khách hàng tối đa'
                                                defaultValue={promotion?.maxUsage}
                                            />
                                            {errors.maxUsage && <p className="text-red-600">{errors.maxUsage}</p>}
                                        </div>
                                        <div className="mb-4 w-1/2 ml-2">
                                            <label
                                                htmlFor=""
                                                className="block font-medium leading-6 text-gray-900"
                                            >
                                                Số lượng tối đa cho 1 KH trong ngày
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setPromotion({ ...promotion, useForUserPerDay: e.target.value })
                                                    clearError('useForUserPerDay')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập số lượng tối đa trong ngày'
                                                defaultValue={promotion?.useForUserPerDay}
                                            />
                                            {errors.useForUserPerDay && <p className="text-red-600">{errors.useForUserPerDay}</p>}
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
                                            {errors.discountType && <p className="text-red-600">{errors.discountType}</p>}
                                        </div>
                                        {selectedType !== null &&
                                            <div className="mb-4 w-1/2 ml-2">
                                                <label
                                                    htmlFor=""
                                                    className="block font-medium leading-6 text-gray-900"
                                                >
                                                    {selectedType === 0 ? 'Số tiền giảm' : 'Phần trăm giảm (10% => 0.1)'} <span className='text-red-600'>*</span>
                                                </label>
                                                <input
                                                    onChange={e => {
                                                        setPromotion({ ...promotion, discountValue: parseFloat(e.target.value) })
                                                        clearError('discountValue')
                                                    }}
                                                    type="text"
                                                    className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    placeholder={selectedType === 0 ? 'Nhập số tiền' : 'Nhập phần trăm'}
                                                    defaultValue={promotion?.discountValue}
                                                />
                                                {errors.discountValue && <p className="text-red-600">{errors.discountValue}</p>}
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
                                                    onChange={e => {
                                                        setPromotion({ ...promotion, minOrderValue: e.target.value })
                                                        clearError('minOrderValue')
                                                    }}
                                                    type="text"
                                                    className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                    placeholder='Nhập số tiền tối thiểu của đơn hàng'
                                                    defaultValue={promotion?.minOrderValue}
                                                />
                                                {errors.minOrderValue && <p className="text-red-600">{errors.minOrderValue}</p>}
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
                                                        onChange={e => {
                                                            setPromotion({ ...promotion, maxDiscountAmount: e.target.value })
                                                            clearError('maxDiscountAmount')
                                                        }}
                                                        type="text"
                                                        className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                        placeholder='Nhập số tiền tối đa'
                                                        defaultValue={promotion?.maxDiscountAmount}
                                                    />
                                                    {errors.maxDiscountAmount && <p className="text-red-600">{errors.maxDiscountAmount}</p>}
                                                </div>
                                            }
                                        </div>
                                    }

                                </> :
                                <>
                                    <div className='flex items-start'>
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
                                            {errors.formalityOfPromotion && <p className="text-red-600">{errors.formalityOfPromotion}</p>}
                                        </div>
                                        {formalityOfPromotion !== null &&
                                            <div className="mb-4 w-1/2 ml-2">
                                                <label
                                                    htmlFor=""
                                                    className="block font-medium leading-6 text-gray-900"
                                                >
                                                    {formalityOfPromotion === 2 ? 'Giới hạn tuổi' : formalityOfPromotion === 1 ? 'Khung thời gian' : 'Ngày trong tuần(T2-CN)(1-7)'} <span className='text-red-600'>*</span>
                                                </label>
                                                {
                                                    formalityOfPromotion === 1 ?
                                                        <div >
                                                            <TimePicker.RangePicker
                                                                onChange={(dates, dateStrings) => {
                                                                    setPromotion({
                                                                        ...promotion,
                                                                        validTimeFrameStart: dateStrings ? dateStrings[0] : null,
                                                                        validTimeFrameEnd: dateStrings ? dateStrings[1] : null,
                                                                        validDayOfWeek: null,
                                                                        ageLimit: null
                                                                    });
                                                                    clearError('validTimeFrameStart')
                                                                }}
                                                                format="HH:mm"
                                                                className="w-full py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                                placeholder={['Chọn thời gian bắt đầu', 'Chọn thời gian kết thúc']}
                                                                defaultValue={[
                                                                    promotion?.validTimeFrameStart ? dayjs(promotion.validTimeFrameStart, "hh:mm") : null,
                                                                    promotion?.validTimeFrameEnd ? dayjs(promotion.validTimeFrameEnd, "hh:mm") : null
                                                                ]}
                                                            />
                                                            {errors.validTimeFrameStart && <p className="text-red-600">{errors.validTimeFrameStart}</p>}
                                                        </div>
                                                        :
                                                        <div>
                                                            <input
                                                                onChange={e => {
                                                                    setPromotion({
                                                                        ...promotion,
                                                                        [formalityOfPromotion === 0 ? 'validDayOfWeek' : 'ageLimit']: parseFloat(e.target.value),
                                                                        [formalityOfPromotion === 2 ? 'validDayOfWeek' : 'ageLimit']: null,
                                                                        validTimeFrameStart: null,
                                                                        validTimeFrameEnd: null,
                                                                    })
                                                                    clearError('ageLimit')
                                                                }}
                                                                type="text"
                                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                                placeholder={formalityOfPromotion === 0 ? 'Nhập thứ' : 'Nhập độ tuổi'}
                                                                defaultValue={formalityOfPromotion === 0 ? promotion?.validDayOfWeek : promotion?.ageLimit}
                                                            />
                                                            {errors.ageLimit && <p className="text-red-600">{errors.ageLimit}</p>}

                                                        </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <h2 className='font-semibold text-xl py-3'>Nhập giá trị các loại ghế</h2>
                                    <div className='flex justify-between items-start w-full'>
                                        <div className="relative my-4 w-1/3 mr-2">
                                            <label
                                                htmlFor=""
                                                className="flex items-center font-medium leading-6 text-gray-900"
                                            >
                                                <Armchair className='h-8 w-8 text-slate-800' />&nbsp; Ghế thường <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setPromotion({ ...promotion, normalValue: e.target.value })
                                                    clearError('normalValue')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập giá ghế thường'
                                                defaultValue={promotion?.normalValue}
                                            />
                                            {errors.normalValue && <p className="text-red-600">{errors.normalValue}</p>}
                                        </div>
                                        <div className="relative my-4 w-1/3">
                                            <label
                                                htmlFor=""
                                                className="flex items-center font-medium leading-6 text-gray-900"
                                            >
                                                <Armchair className='h-8 w-8 text-orange-500' />&nbsp;Ghế vip <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setPromotion({ ...promotion, vipValue: e.target.value })
                                                    clearError('vipValue')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập giá ghế vip'
                                                defaultValue={promotion?.vipValue}
                                            />
                                            {errors.vipValue && <p className="text-red-600">{errors.vipValue}</p>}
                                        </div>
                                        <div className="relative my-4 w-1/3 ml-2">
                                            <label
                                                htmlFor=""
                                                className="flex items-center font-medium leading-6 text-gray-900"
                                            >
                                                <Sofa className='h-8 w-8 text-pink-700' />&nbsp; Ghế đôi <span className='text-red-600'>*</span>
                                            </label>
                                            <input
                                                onChange={e => {
                                                    setPromotion({ ...promotion, coupleValue: e.target.value })
                                                    clearError('coupleValue')
                                                }}
                                                type="text"
                                                className="block w-full px-4 py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                                                placeholder='Nhập giá ghế đôi'
                                                defaultValue={promotion?.coupleValue}
                                            />
                                            {errors.coupleValue && <p className="text-red-600">{errors.coupleValue}</p>}
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
                            disabled={loading}
                            onClick={handleAddPromotion}
                        >
                            {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                            &nbsp;Thêm khuyến mãi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPromotion
