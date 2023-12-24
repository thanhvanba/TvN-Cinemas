// YearPicker.js
import React, { useState, useEffect } from 'react';

const YearPicker = ({ onYearChange }) => {
    const [selectedYear, setSelectedYear] = useState(null);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    const handleChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedYear(selectedOption);

        // Gọi callback để truyền giá trị đã chọn lên cấp cha
        onYearChange(selectedOption);
    };
    return (
        <select className='border-2 p-2 rounded-lg focus:outline-none' value={selectedYear} onChange={handleChange}>
            <option value="" disabled>
                Select year
            </option>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};

export default YearPicker;
