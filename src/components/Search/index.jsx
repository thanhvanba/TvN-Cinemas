import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../service/UserService'
import StaffService from '../../service/StaffService'
import { LoginContext } from '../../context/LoginContext'

const Search = ({ searchFunction, handleClickIconSearch, setShowListSearch, inputSearch, setInputSearch }) => {
    const { user } = useContext(LoginContext)

    const navigate = useNavigate()
    const handleInputFocus = () => {
        searchFunction(inputSearch)
        setShowListSearch(true);
    };
    const handleInputBlur = () => {
        // Sử dụng setTimeout để đảm bảo rằng onBlur sẽ được gọi sau khi onClick của danh sách
        setTimeout(() => {
            setShowListSearch(false);
        }, 100);
    };
    const handleChange = (value) => {
        searchFunction(value)// gọi api
        setInputSearch(value)
    }

    return (
        <>
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
                    onClick={() => {
                        navigate(user.role === "ADMIN" ? `/admin/list-item/search/${inputSearch}` : `/manager/list-item/search/${inputSearch}`)
                        handleClickIconSearch()
                    }}
                    className="h-5 w-5 text-gray-400" />
            </button>
        </>
    )
}

export default Search
