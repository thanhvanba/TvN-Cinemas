import React, { useState, useEffect, useContext } from 'react';
import { PowerIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon, HomeModernIcon, HomeIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import TruncatedContent from '../../../utils/TruncatedContent';
import FormatDataTime from '../../../utils/FormatDataTime';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminService from '../../../service/AdminService';
import ManagerService from '../../../service/ManagerService';
import MovieService from '../../../service/MovieService';
import UserService from '../../../service/UserService';

import { LoginContext } from '../../../context/LoginContext';

import SelectMenu from '../../../components/SelectMenu/SelectMenu';
import Pagination from '../../../components/Pagination'
import ModalComponent from '../../../utils/Modal';
import Cinemas from '../../Cinemas';
import Loading from '../../../components/Loading';
import Cinema from '../../../components/Cinema';
import ShowtimesByRoom from './components/showtime/listShowtime'
import DetailShowtime from './components/showtime/detailShowtime';
import AddCinema from './components/addCinema';
import Modal from '../../../utils/Modal';
import AddShowtime from './components/showtime/addShowtime';
import ListRoom from './components/room/listRoom';
import AddRoom from './components/room/addRoom';
import ListCinema from './components/listCinema';
import DetailRoom from './components/room/detailRoom';

const ListShowtime = () => {
  const { pathname } = useLocation()

  const { cinemaId, showtimeId, roomId } = useParams()
  const location = useLocation();
  const { state } = location;
  const { idShowtime, dateTime } = state !== null ? state : {};

  const { user } = useContext(LoginContext);

  return (
    <div>
      <div className='px-4'>
        <div className='relative'>
          <div className=''>
            {
              user.role !== "MANAGER" && !cinemaId && !showtimeId && !idShowtime && !roomId ?
                <>
                  {/^\/(admin|manager)\/add-item\/cinema/.test(pathname) ?
                    <AddCinema /> :
                    /^\/(admin|manager)\/add-item\/showtime/.test(pathname) ?
                      <AddShowtime /> :
                      /^\/(admin|manager)\/(add-item|update-item)\/room/.test(pathname) ?
                        <AddRoom />
                        :
                        /^\/(admin|manager)\/list-room/.test(pathname) ? <ListRoom /> :
                          <ListCinema />
                  }
                </> :
                <>
                  {/^\/(admin|manager)\/update-item\/cinema/.test(pathname) ?
                    <AddCinema /> :
                    /^\/(admin|manager)\/(update-item)\/showtime/.test(pathname) ?
                      <AddShowtime /> :
                      /^\/(admin|manager)\/room/.test(pathname) ?
                        <DetailRoom /> :
                        /^\/(admin|manager)\/(list-showtime\/showtime|add-item\/schedule)/.test(pathname) ?
                          <DetailShowtime showtimeId={idShowtime ? idShowtime : showtimeId} dateTime={dateTime} /> :
                          <ShowtimesByRoom />}
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default ListShowtime;
