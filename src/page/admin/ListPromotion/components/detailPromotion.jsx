import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DatePicker, Space, TimePicker } from 'antd';
import SelectMenu from '../../../../components/SelectMenu/SelectMenu';
import PromotionService from '../../../../service/PromotionService';

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import FormatDataTime from '../../../../utils/FormatDataTime';
import { Armchair, Sofa } from 'lucide-react';
import useLoadingState from '../../../../hook/UseLoadingState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { BanknotesIcon } from '@heroicons/react/20/solid';
import { parse } from 'date-fns';
import { isAfter } from 'date-fns';

function DetailPromotion() {
  const { promotionId } = useParams()
  const { pathname } = useLocation()
  const [promotion, setPromotion] = useState({})
  const [formality, setFormality] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [formalityOfPromotion, setFormalityOfPromotion] = useState(null)
  const { RangePicker } = DatePicker;
  const { getOnePromotionApi, updatePromotionsCode, updatePromotionsFixed } = PromotionService()
  const navigate = useNavigate()
  const { loading, setLoading } = useLoadingState(false)
  const changeTab = (pathname) => {
    navigate(pathname)
  }

  const handleGetOnePromotion = async (promotionId) => {
    setLoading('getOne', true)
    let resPromotion = await getOnePromotionApi(promotionId)
    if (resPromotion && resPromotion.data && resPromotion.data.result) {
      //nếu tồn tại mã code thì set hình thức áp dụng là theo mã code
      resPromotion.data.result.promotionCode ? setFormality(1) : setFormality(0)
      resPromotion.data.result.discountType === "FIXED_AMOUNT" ? setSelectedType(0) : setSelectedType(1)
      resPromotion.data.result.ageLimit ? setFormalityOfPromotion(2) : resPromotion.data.result.validTimeFrameStart ? setFormalityOfPromotion(1) : setFormalityOfPromotion(0)
      setImageURL(resPromotion.data.result.image)
      setPromotion(resPromotion.data.result)
    }
    setLoading('getOne', false)
  }

  const handleUpdatePromotion = async (e) => {
    e.preventDefault();
    setLoading('update', true);
    const data = promotion;
    formality === 0 ? await updatePromotionsFixed(data, promotionId) : await updatePromotionsCode(data, promotionId)
    changeTab("/admin/list-promotion")
    setLoading('update', false);
  };
  const types = ["Khuyến mãi giảm tiền", "Khuyến mãi chiết khấu %"]
  const handleSelectType = (selectedValue) => {
    selectedValue === "Khuyến mãi giảm tiền" ? setSelectedType(0) : setSelectedType(1)
    setPromotion({ ...promotion, discountType: selectedValue === "Khuyến mãi giảm tiền" ? "FIXED_AMOUNT" : "PERCENTAGE" })
  }
  const formalityOfPromotions = ["Theo ngày trong tuần(T2-CN)(1-7)", "Theo khung thời gian", "Theo độ tuổi"]
  const handleSelectFormality = (selectedValue) => {
    selectedValue === "Theo độ tuổi" ? setFormalityOfPromotion(2) : selectedValue === "Theo khung thời gian" ? setFormalityOfPromotion(1) : setFormalityOfPromotion(0)
  }

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
    handleGetOnePromotion(promotionId)
  }, [])

  return (
    <div className='px-4 relative' >
      <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
        <div className='flex items-center'>
          <h2 onClick={() => { changeTab("/admin/list-promotion") }} className='cursor-pointer font-medium text-2xl flex items-end'>
            <BanknotesIcon className='h-8 w-8 mr-1 text-emerald-600' />
            Chương trình khuyến mãi
          </h2>
          <ChevronRightIcon className='px-1 h-6' />
          <h2 className='cursor-default text-xl'>{/^\/(admin|manager)\/promotion/.test(pathname) ? 'Chi tiết khuyến mãi' : 'Cập nhật khuyến mãi'}</h2>
        </div>
      </div>
      <div className='pt-8'>
        <div className='absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
          {loading['getOne'] && <Loading />}
        </div>
        {!loading['getOne'] &&
          <div>
            <div className='flex gap-x-3'>
              <div className='w-2/3 rounded-lg bg-slate-100 p-4'>
                <div className='flex justify-between'>
                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      htmlFor=""
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Mã CT khuyến mãi
                    </label>
                    <input
                      type="text"
                      className="block w-1/2 mt-1 px-4 py-1 text-lg text-black focus:outline-none rounded-md border-2 focus:border-blue-600 cursor-not-allowed"
                      disabled={true}
                      defaultValue={promotionId}
                    />
                  </div>
                  <div className="mb-4 w-1/2 ml-2">
                    <label
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Trạng thái
                    </label>
                    <input
                      type="text"
                      className={`${isAfter(parse(`${promotion.startDate}`, 'yyyy-MM-dd', new Date()), new Date()) ? "text-amber-600" : (!promotion.valid || promotion.deleted) ? "text-red-600" : "text-green-600"} block w-1/2 mt-1 px-4 py-1 text-lg focus:outline-none rounded-md border-2 focus:border-blue-600 cursor-not-allowed`}
                      defaultValue={
                        isAfter(parse(`${promotion.startDate}`, 'yyyy-MM-dd', new Date()), new Date())
                          ? "Chưa diễn ra"
                          : promotion.deleted
                            ? 'Ngưng hoạt động'
                            : !promotion.valid
                              ? 'Đã kết thúc'
                              : 'Đang diễn ra'
                      }
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='flex'>
                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      htmlFor=""
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Tên CT khuyến mãi
                    </label>
                    <input
                      onChange={e => setPromotion({ ...promotion, name: e.target.value })}
                      type="text"
                      className="block w-full mt-1 px-4 py-1 text-lg bg-white text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                      defaultValue={promotion.name}
                      disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                    />
                  </div>

                  <div className="mb-4 w-1/2 ml-2">
                    <label
                      htmlFor=""
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Thời gian hoạt động
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
                        placeholder={['Chọn ngày bắt đầu', 'Chọn ngày kết thúc']}
                        defaultValue={[dayjs(FormatDataTime(promotion.startDate).date, 'DD/MM/YYYY'), dayjs(FormatDataTime(promotion.endDate).date, 'DD/MM/YYYY')]}
                        className="w-full mt-1 py-1.5 text-lg text-black bg-white focus:outline-none rounded-md border-2 focus:border-blue-600"
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor=""
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Mô tả
                  </label>
                  <textarea
                    onChange={e => {
                      setPromotion({ ...promotion, description: e.target.value })
                      // clearError('desc')
                    }}
                    type="text"
                    className="block w-full px-4 py-1 text-black bg-white focus:outline-none rounded-md border-2 focus:border-blue-600"
                    placeholder='Nhập mô tả khuyến mãi'
                    defaultValue={promotion?.description}
                    rows={5}
                    disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                  />
                </div>
              </div>
              <div className='pb-4 w-1/3'>
                <label
                  htmlFor=""
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Ảnh khuyến mãi
                </label>
                <div className="mb-4 border">
                  <img src={imageURL} alt="Ảnh khuyến mãi" className="w-full lg:h-[264px]" />
                </div>

                {!/^\/(admin|manager)\/promotion/.test(pathname) &&
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
                }
              </div>
            </div>

            <div className='rounded-lg bg-slate-100 p-4 mt-4'>
              {formality === 1 ?
                <>
                  <div className='flex'>
                    <div className="mb-4 w-1/2 pr-2">
                      <label
                        htmlFor=""
                        className="block font-medium leading-6 text-gray-900"
                      >
                        Mã áp dụng <span className='text-red-600'>*</span>
                      </label>
                      <input
                        onChange={e => setPromotion({ ...promotion, promotionCode: e.target.value })}
                        type="text"
                        className="block w-full px-4 py-1 text-black bg-white focus:outline-none rounded-md border-2 border-slate-300 focus:border-blue-600"
                        placeholder='Nhập mã áp dụng'
                        defaultValue={promotion?.promotionCode}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
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
                        className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder='Nhập số lượng khách hàng tối đa'
                        defaultValue={promotion?.maxUsage}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
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
                        className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder='Nhập số lượng tối đa trong ngày'
                        defaultValue={promotion?.useForUserPerDay}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
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
                      {/^\/(admin|manager)\/promotion/.test(pathname) ?
                        <input
                          type="text"
                          className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                          value={promotion?.discountType === "FIXED_AMOUNT" ? "Khuyến mãi giảm tiền" : "Khuyến mãi chiết khấu %"}
                          disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                        /> :
                        <div className="relative pr-4 w-full cursor-default rounded-md bg-white py-1 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                          <SelectMenu onSelectChange={handleSelectType} items={types} content={promotion?.discountType === "FIXED_AMOUNT" ? "Khuyến mãi giảm tiền" : "Khuyến mãi chiết khấu %" || "Chọn loại khuyến mãi"} />
                        </div>
                      }
                    </div>
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
                        className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder={selectedType === 0 ? 'Nhập số tiền' : 'Nhập phần trăm'}
                        defaultValue={promotion?.discountValue}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                      />
                    </div>
                  </div>

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
                        className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder='Nhập số tiền tối thiểu của đơn hàng'
                        defaultValue={promotion?.minOrderValue}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
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
                          className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                          placeholder='Nhập số tiền tối đa'
                          defaultValue={promotion?.maxDiscountAmount}
                          disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                        />
                      </div>
                    }
                  </div>
                </> :
                <>
                  <div className='flex items-center'>
                    <div className="mb-4 w-1/2 mr-2">
                      <label
                        htmlFor=""
                        className="block font-medium leading-6 text-gray-900"
                      >
                        Hình thức khuyến mãi
                      </label>
                      {/^\/(admin|manager)\/promotion/.test(pathname) ?
                        <input
                          type="text"
                          className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                          defaultValue={
                            promotion?.validDayOfWeek ? "Theo ngày trong tuần(T2-CN)(1-7)" :
                              promotion?.validTimeFrameStart ?
                                "Theo khung thời gian" :
                                "Theo độ tuổi"
                          }
                          disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                        /> :
                        <div className="relative pr-4 w-full cursor-default rounded-md bg-white py-1 pl-3 text-left text-gray-900 shadow-sm focus:outline-none border-2 sm:text-sm sm:leading-6">
                          <SelectMenu onSelectChange={handleSelectFormality} items={formalityOfPromotions} content={formalityOfPromotion === 2 ? "Theo độ tuổi" : formalityOfPromotion === 1 ? 'Theo khung thời gian' : "Theo ngày trong tuần(T2-CN)(1-7)" || "Chọn hình thức khuyến mãi"} />
                        </div>
                      }
                    </div>
                    <div className="mb-4 w-1/2 ml-2">
                      <label
                        htmlFor=""
                        className="block font-medium leading-6 text-gray-900"
                      >
                        {formalityOfPromotion === 2 ? 'Giới hạn tuổi' : formalityOfPromotion === 1 ? 'Khung thời gian' : 'Ngày trong tuần(T2-CN)(1-7)'}
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
                                  ageLimit: null,
                                });
                              }}
                              format="HH:mm"
                              className="w-full py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
                              placeholder={['Chọn thời gian bắt đầu', 'Chọn thời gian kết thúc']}
                              defaultValue={[
                                promotion?.validTimeFrameStart ? dayjs(promotion.validTimeFrameStart, "HH:mm") : null,
                                promotion?.validTimeFrameEnd ? dayjs(promotion.validTimeFrameEnd, "HH:mm") : null
                              ]}
                              disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                            />
                          </div>
                          :
                          <input
                            onChange={e => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                setPromotion(prev => ({
                                  ...prev,
                                  validDayOfWeek: formalityOfPromotion === 0 ? value : null,
                                  ageLimit: formalityOfPromotion === 0 ? null : value,
                                  validTimeFrameStart: null,
                                  validTimeFrameEnd: null
                                }));
                              } else {
                                console.log("Invalid number input");
                              }
                            }}
                            type="text"
                            className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                            placeholder={formalityOfPromotion === 0 ? 'Nhập thứ' : 'Nhập độ tuổi'}
                            defaultValue={formalityOfPromotion === 0 ? promotion?.validDayOfWeek : promotion?.ageLimit}
                            disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                          />
                      }
                    </div>
                  </div>
                  <h2 className='font-semibold text-xl py-3'>Giá trị các loại ghế</h2>
                  <div className='flex justify-between items-center w-full'>
                    <div className="relative my-4 w-1/3 mr-2">
                      <label
                        htmlFor=""
                        className="flex items-center font-medium leading-6 text-gray-900"
                      >
                        <Armchair className='h-8 w-8 text-slate-800' />&nbsp; Ghế thường
                      </label>
                      <input
                        onChange={e => setPromotion({ ...promotion, normalValue: e.target.value })}
                        type="text"
                        className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder='Nhập giá ghế thường'
                        defaultValue={promotion?.normalValue}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                      />
                      {/* {errors.foodType && <p className="text-red-600">{errors.foodType}</p>} */}
                    </div>
                    <div className="relative my-4 w-1/3">
                      <label
                        htmlFor=""
                        className="flex items-center font-medium leading-6 text-gray-900"
                      >
                        <Armchair className='h-8 w-8 text-orange-500' />&nbsp;Ghế vip
                      </label>
                      <input
                        onChange={e => setPromotion({ ...promotion, vipValue: e.target.value })}
                        type="text"
                        className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder='Nhập giá ghế vip'
                        defaultValue={promotion?.vipValue}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                      />
                      {/* {errors.foodType && <p className="text-red-600">{errors.foodType}</p>} */}
                    </div>
                    <div className="relative my-4 w-1/3 ml-2">
                      <label
                        htmlFor=""
                        className="flex items-center font-medium leading-6 text-gray-900"
                      >
                        <Sofa className='h-8 w-8 text-pink-700' />&nbsp; Ghế đôi
                      </label>
                      <input
                        onChange={e => setPromotion({ ...promotion, coupleValue: e.target.value })}
                        type="text"
                        className="block w-full px-4 py-1 text-black bg-white border-slate-300 focus:outline-none rounded-md border-2 focus:border-blue-600"
                        placeholder='Nhập giá ghế đôi'
                        defaultValue={promotion?.coupleValue}
                        disabled={/^\/(admin|manager)\/promotion/.test(pathname) ? true : false}
                      />
                      {/* {errors.foodType && <p className="text-red-600">{errors.foodType}</p>} */}
                    </div>
                  </div>
                </>
              }
            </div>

            <div className='flex justify-end'>
              <button
                className="w-1/6 mb-4 text-[18px] mt-4 rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                type='button'
                disabled={loading['update']}
                onClick={(e) => {
                  if (/^\/(admin|manager)\/promotion/.test(pathname)) {
                    changeTab(`/admin/update-item/promotion/${promotionId}`);
                  } else {
                    handleUpdatePromotion(e);
                  }
                }}
              >
                {loading['update'] && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />}
                &nbsp;{/^\/(admin|manager)\/promotion/.test(pathname) ? 'Cập nhật' : 'Lưu'}
              </button>
            </div>
          </div>
        }
      </div>
    </div >
  )
}

export default DetailPromotion
