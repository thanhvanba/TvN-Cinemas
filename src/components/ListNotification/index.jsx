import React, { useContext, useState } from 'react'
import { Button, Drawer } from 'antd';
import { BellIcon } from '@heroicons/react/24/outline';
import { LoginContext } from '../../context/LoginContext';
import UserService from '../../service/UserService';
import bookingSC from '../../images/done_777390.png'
import cancelT from '../../images/signaling_4378030.png'
import LoadNotification from '../LoadNotification';

function ListNotification() {
  const { getNotificationsApi, getOneNotificationApi } = UserService()

  const { user } = useContext(LoginContext)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingNoti, setLoadingNoti] = useState(true);

  const [notifications, setNotifications] = useState([])
  const [notification, setNotification] = useState([])

  const showLoading = () => {
    handleGetNotification()
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleGetNotification = async () => {
    setLoadingNoti(true)
    let resNotification = await getNotificationsApi()
    if (resNotification && resNotification.data && resNotification.data.result) {
      setNotifications(resNotification.data.result.content)
    }
    setLoadingNoti(false)
  }

  const handleGetOneNotification = async (notificationId) => {
    let resNotification = await getOneNotificationApi(notificationId)
    if (resNotification && resNotification.data && resNotification.data.result) {
      setNotification(resNotification.data.result)
    }
  }
  return (
    <div className=''>
      <div type="" className='hover:bg-transparent active:text-none active:bg-none' onClick={showLoading}>
        <div className={`${user.role === "STAFF" ? "text-white" : ""} hover:opacity-70 opacity-100 flex flex-col relative px-4 cursor-pointer`}>
          <BellIcon className='h-6' />
          <span className='text-xs'>Thông báo</span>
          <span className='absolute text-center -top-3 right-6 rounded-full bg-red-600 text-white h-5 w-5 text-[12px] leading-5'>2</span>
        </div>
      </div>
      <Drawer
        closable={false}
        destroyOnClose
        title={<p className='text-2xl font-bold flex items-center gap-x-1 -mx-3 '> <BellIcon className='h-7' />Thông báo</p>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        className='relative'
      >
        {!loadingNoti ?
          notifications?.length !== 0 &&
          <div className='rounded-lg bg-white -mx-4 -mt-5'>
            {notifications.map(notif => (
              <div className={`${notif.read === false ? 'bg-zinc-100' : ''} text-gray-900 hover:bg-gray-200 rounded-md py-2 pl-2 pr-8 cursor-default relative`}>
                <div onClick={() => { handleGetOneNotification(notif?.notificationUserId) }} className='flex items-center gap-x-3'>
                  <img className='h-16 w-16' src={bookingSC} alt="" />
                  <div>
                    <h3 className='text-base font-bold items-center'>{notif.notification.title}</h3>
                    <p className='items-center'>{notif.notification.message}</p>
                  </div>
                  {/* <div>
                    <h3 className='text-base font-bold items-center'>Giao dịch mới: Đặt vé</h3>
                    <p className='items-center'>Vừa bán một vé thành công cho 2 ghế</p>
                  </div> */}
                  {notif.read === false && <div className='absolute right-1 h-3 w-3 bg-red-600 rounded-full'></div>}
                </div>
              </div>
            ))
            }
          </div>
          :
          <div className='absolute top-10 left-0 right-0 bottom-0'>
            <LoadNotification />
          </div>
        }
      </Drawer>

    </div>
  );

}

export default ListNotification
