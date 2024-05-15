import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../service/UserService'
import StaffService from '../../service/StaffService'

const Search = ({ searchFunction, setShowMovieList, inputSearch, setInputSearch }) => {

    const handleInputFocus = () => {
        searchFunction(inputSearch)
        setShowMovieList(true);
    };
    const handleInputBlur = () => {
        // Sử dụng setTimeout để đảm bảo rằng onBlur sẽ được gọi sau khi onClick của danh sách
        setTimeout(() => {
            setShowMovieList(false);
        }, 100);
    };
    const handleChange = (value) => {
        searchFunction(value)
        setInputSearch(value)
    }
    
    return (
        <div className='relative'>
            <input
                onChange={(e) => handleChange(e.target.value)}
                className='h-8 xl:w-full w-32 rounded-2xl px-4 text-black focus:outline-none'
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={inputSearch}
                placeholder='Tìm kiếm' />
            <button
                className='absolute right-0 top-0 m-2'>
                <MagnifyingGlassIcon
                    // onClick={() => changeTab(`/tim-kiem/${inputSearch}`)}
                    className="h-5 w-5 text-gray-400" />
            </button>
        </div>
    )
}

export default Search
