import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DetailMovie from './components/detailMovie';
import AddMovie from './components/addMovie';
import ListMovies from './components/listMovies';

const ListMovie = () => {

  const { pathname } = useLocation()
  return (
    <div>
      <div className='px-4'>
        {/^\/(admin|manager)\/movie/.test(pathname) ? <DetailMovie /> :
          /^\/admin\/(add-item\/movie|update-item)/.test(pathname) ? <AddMovie /> :
            <ListMovies />
        }

      </div>
    </div >
  )
}

export default ListMovie
