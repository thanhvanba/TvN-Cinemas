import React from 'react'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import YearPicker from '../../../../components/YearPicker';
import { useState } from 'react';

const OptionsStatistics = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, selectedOptions, setSelectedOptions, handleStatistic }) => {
    const optionsStatistics = ['Năm', 'Tháng']
    const months = Array.from({ length: 12 }, (_, index) => `Tháng ${index + 1}`);
    const currentMonth = (new Date()).getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    const handleSelectOptions = (selectedValue) => {
        if (selectedValue === 'Năm') {
            setSelectedOptions(1)
            setSelectedYear(currentYear)
        } else {
            setSelectedOptions(2);
            setSelectedYear(currentYear)
        }
    };

    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    };
    const handleMonthChange = (selectedMonth) => {
        setSelectedMonth(parseInt(selectedMonth.split(" ")[1]));
    };

    return (
        <div className='flex items-center'>
            <div className='w-48 pr-3'>
                <span className='font-bold text-lg'>Thống kê theo</span>
                <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                    <SelectMenu onSelectChange={handleSelectOptions} items={optionsStatistics} content={selectedOptions === 1 ? "Năm" : "Tháng" || "Năm"} />
                </div>
            </div>
            {selectedOptions === 1 &&
                <div className='w-40 pr-3'>
                    <span className='font-bold text-lg'>Năm</span>
                    <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                        <SelectMenu onSelectChange={handleYearChange} items={years} content={selectedYear || currentYear} />
                    </div>
                </div>
            }
            {selectedOptions === 2 &&
                <div className='flex'>
                    <div className='w-40 pr-3'>
                        <span className='font-bold text-lg'>Năm</span>
                        <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                            <SelectMenu onSelectChange={handleYearChange} items={years} content={selectedYear || currentYear} />
                        </div>
                    </div>
                    <div className='w-44 pr-3'>
                        <span className='font-bold text-lg'>Tháng</span>
                        <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                            <SelectMenu onSelectChange={handleMonthChange} items={months} content={`Tháng ${selectedMonth}` || currentMonth} />
                        </div>
                    </div>
                </div>
            }
            <button
                className="w-1/6 mt-6 text-[18px] rounded-xl hover:bg-emerald-800 text-white bg-emerald-600 py-2 transition-colors duration-300"
                type='button'
                onClick={handleStatistic}
            >
                {/* {loading && <FontAwesomeIcon className='w-4 h-4 ' icon={faSpinner} spin />} */}
                &nbsp;Thống kê
            </button>
        </div>
    )
}

export default OptionsStatistics
