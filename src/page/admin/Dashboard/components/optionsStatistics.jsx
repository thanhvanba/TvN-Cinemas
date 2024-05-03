import React from 'react'
import SelectMenu from '../../../../components/SelectMenu/SelectMenu'
import YearPicker from '../../../../components/YearPicker';
import { useState } from 'react';

const OptionsStatistics = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const optionsStatistics = ['Năm', 'Tháng']
    const months = Array.from({ length: 12 }, (_, index) => `Tháng ${index + 1}`);
    const currentMonth = (new Date()).getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    const handleSelectOptions = (selectedValue) => {
        selectedValue === 'Năm' ? setSelectedOptions(1) : setSelectedOptions(2);
    };

    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    };
    const handleMonthChange = (selectedMonth) => {
        setSelectedMonth(selectedMonth);
    };

    return (
        <div className='flex'>
            <div className='w-48 pr-3'>
                <span className='font-bold text-lg'>Thống kê theo</span>
                <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                    <SelectMenu onSelectChange={handleSelectOptions} items={optionsStatistics} content={"Năm"} />
                </div>
            </div>
            <div className='w-40 pr-3'>
                <span className='font-bold text-lg'>Năm</span>
                <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                    <SelectMenu onSelectChange={handleYearChange} items={years} content={currentYear} />
                </div>
            </div>
            {selectedOptions === 2 &&
                <div className='w-44 pr-3'>
                    <span className='font-bold text-lg'>Tháng</span>
                    <div className='border-2 p-2 rounded-lg focus:outline-none bg-white'>
                        <SelectMenu onSelectChange={handleMonthChange} items={months} content={`Tháng ${currentMonth}`} />
                    </div>
                </div>
            }
        </div>
    )
}

export default OptionsStatistics
