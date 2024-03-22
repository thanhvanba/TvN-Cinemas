import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

// const items = [
//   { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//   { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//   { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
// ]

import { useState } from 'react'; // Import useState hook

export default function Pagination({ pageNumber, pageSize, totalPages, totalElements, getMovieByPage }) {
  const [inputValue, setInputValue] = useState(pageNumber); // State to manage input value

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      getMovieByPage(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      getMovieByPage(pageNumber + 1);
    }
  };

  const handleSubmit = (e) => {
    const value = parseInt(inputValue);
    if (e.key === 'Enter') {
      if (!isNaN(value) && value >= 1 && value <= totalPages) {
        getMovieByPage(value);
      } else {
        setInputValue(pageNumber);
      }
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Tổng số lượng:<span className="font-medium"> {totalElements}</span>. &nbsp;
            Hiển thị <span className="font-medium">{1 + pageSize * (pageNumber - 1)}</span> đến <span className="font-medium">{pageSize * pageNumber > totalElements ? totalElements : pageSize * pageNumber}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex items-center -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              onClick={handlePreviousPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-6 w-6 text-zinc-700" aria-hidden="true" />
            </a>
            <div className='flex items-center justify-center'>
              <input
                className='border-[#D9D9D9] border-2 rounded-lg focus:outline-none text-center text-sm'
                type="text"
                size={3}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleSubmit}
              />
              <span className='px-2'>/</span>
              <span className='text-lg font-medium'>{totalPages}</span>
            </div>
            <a
              onClick={handleNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-6 w-6 text-zinc-700" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
