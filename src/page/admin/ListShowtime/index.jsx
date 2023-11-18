import React from 'react'
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import TruncatedContent from '../../../utils/TruncatedContent'
import FormatDataTime from '../../../utils/FormatDataTime'

const ListShowtime = () => {
  const listShowtime = [
    {
      header: { stt: "STT", movieInfo: "Phim", time: "Thời gian", room: "Phòng", status: "status", action: "actions" },
      showtime: [
        {
          stt: "1", 
          movieInfo: {
            poster: "https://upload.wikimedia.org/wikipedia/vi/2/2d/Avengers_Endgame_bia_teaser.jpg",
            title: "Avengers: End Game",
            director: "Anthony Russo, Joe Russo",
            actor: "Scarlett Johansson, Jeremy Renner, Chris Hemsworth, Chris Evans, Mark Ruffalo, Paul Rudd, Robert Downey Jr."
          },
          time: "2023-10-20T17:18:59.774+00:00", 
          room: "D01", 
          status: "Visible",
          action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
        },
        {
          stt: "1", 
          movieInfo: {
            poster: "https://upload.wikimedia.org/wikipedia/vi/2/2d/Avengers_Endgame_bia_teaser.jpg",
            title: "Avengers: End Game",
            director: "Anthony Russo, Joe Russo",
            actor: "Scarlett Johansson, Jeremy Renner, Chris Hemsworth, Chris Evans, Mark Ruffalo, Paul Rudd, Robert Downey Jr."
          },
          time: "2023-10-20T17:18:59.774+00:00", 
          room: "D01", 
          status: "Visible",
          action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
        },
        {
          stt: "1", 
          movieInfo: {
            poster: "https://upload.wikimedia.org/wikipedia/vi/2/2d/Avengers_Endgame_bia_teaser.jpg",
            title: "Avengers: End Game",
            director: "Anthony Russo, Joe Russo",
            actor: "Scarlett Johansson, Jeremy Renner, Chris Hemsworth, Chris Evans, Mark Ruffalo, Paul Rudd, Robert Downey Jr."
          },
          time: "2023-10-20T17:18:59.774+00:00", 
          room: "D01", 
          status: "Visible",
          action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
        },
        {
          stt: "1", 
          movieInfo: {
            poster: "https://upload.wikimedia.org/wikipedia/vi/2/2d/Avengers_Endgame_bia_teaser.jpg",
            title: "Avengers: End Game",
            director: "Anthony Russo, Joe Russo",
            actor: "Scarlett Johansson, Jeremy Renner, Chris Hemsworth, Chris Evans, Mark Ruffalo, Paul Rudd, Robert Downey Jr."
          },
          time: "2023-10-20T17:18:59.774+00:00", 
          room: "D01", 
          status: "Visible",
          action: { aChange: PowerIcon, aEdit: PencilSquareIcon, aDelete: TrashIcon }
        }
        ]
    }
  ]
  return (
    <div>
      <div className='px-4'>
        <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
          <h2 className='text-3xl'>List Showtime</h2>
          <button
            className="my-4 px-8 border-slate-400 border p-4 text-sm font-bold uppercase rounded-2xl hover:bg-white hover:text-emerald-800 bg-emerald-600 text-white"
            type='submit'
          >
            Add Showtime
          </button>
        </div>
      </div>

      <div>
        <div className='px-3'>
          <div className=''>
            {
              listShowtime.map((showtime) => (
                <table className='mt-6 w-full'>
                  <thead className=''>
                    <tr>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{showtime.header.stt}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{showtime.header.movieInfo}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{showtime.header.time}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{showtime.header.room}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{showtime.header.status}</th>
                      <th className='text-sm text-start font-light px-5 pb-4 uppercase'>{showtime.header.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      showtime.showtime.map((item) => (
                        <tr className='border-b-8 border-slate-50 bg-slate-100'>
                          <td className='text-start font-medium px-5 py-4'>{item.stt}</td>
                          <td className='text-start font-medium px-5 py-4'>
                            <div className='flex items-center'>
                              <div div className='pr-2' >
                                <img className="h-16 w-16 text-emerald-600"  src="item.movieInfo.poster" alt="" />
                              </div >
                              <div>
                                <h3>{item.movieInfo.title}</h3>
                                <p className='font-normal text-xs'><TruncatedContent content={"Actor: " + item.movieInfo.actor} maxLength={20}/></p>
                                <span className='font-normal text-xs'><TruncatedContent content={"Director: " + item.movieInfo.director} maxLength={20}/></span>
                              </div>
                            </div>
                          </td>
                          <td className='text-start font-medium px-5 py-4'>{(item.time)}</td>
                          <td className='text-start font-medium px-5 py-4'>{item.room}</td>
                          <td className={`${item.status === "Visible" ? "text-green-600" : "text-red-600"} text-start font-medium px-5 py-4`}>{item.status}</td>
                          <td className='text-start font-medium px-5 py-4'>
                            <div className='flex items-center'>
                              <button className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-emerald-100'>
                                <item.action.aChange className='h-4 w-4 text-emerald-600' />
                              </button>
                              <a className='flex justify-center items-center w-8 h-8 mr-2 rounded-lg bg-cyan-100' href="">
                                <item.action.aEdit className='h-4 w-4 text-cyan-600' />
                              </a>
                              <button className='flex justify-center items-center w-8 h-8 rounded-lg bg-red-100'>
                                <item.action.aDelete className='h-4 w-4 text-red-600' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListShowtime
