import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../service/UserService'

const Search = ({ searchFunction, resultList }) => {
    console.log("🚀 ~ Search ~ searchFunction:", searchFunction)
    const [inputSearch, setInputSearch] = useState("")
    const [listMovieFound, setListMovieFound] = useState([])
    const [showMovieList, setShowMovieList] = useState(false);

    const { searchMovieApi } = UserService()

    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
        setInputSearch("")
    }
    const handleInputFocus = () => {
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
                className='h-10 xl:w-full w-32 rounded-2xl px-4 text-black focus:outline-none'
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={inputSearch}
                placeholder='Tìm kiếm' />
            <button
                className='absolute right-0 top-0 m-3'>
                <MagnifyingGlassIcon
                    onClick={() => changeTab(`/tim-kiem/${inputSearch}`)}
                    className="h-5 w-5 text-gray-400" />
            </button>
        </div>
    )
}

export default Search
