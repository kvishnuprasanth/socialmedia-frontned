import React, { useEffect, useState, useRef } from 'react'
import config from '../source'
import { useNavigate } from 'react-router'
import { appState } from '../App'
import { useContext } from 'react'
import DeleteD from '../assets/delete_dark.png'
import DeleteW from '../assets/delete_white.png'
//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SubNotification = ({notification}) => {
  const {setNotificationDiv,user,toastSuccess,toastError,dark,setCommentId,setMessageId}=useContext(appState);
  const navigate=useNavigate()
  const handleDeleteNotification =async  (e)=>{
    let res= await fetch(`${config.baseUrl}/api/notification/delete/${notification._id}`,{
      method:'POST',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    if(res.status === 200){
      e.target.parentNode.parentNode.classList.add('hidden')
      toastSuccess('Notification deleted')
    }else{
      toastError('Error in deleting notification')
    }
  }
  return (
    <>
    
    {notification.typeOf==='LikedPost' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer relative `} onClick={()=>{navigate(`/post/${notification.LikedPost._id}`);setNotificationDiv(false)}}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.LikedPost?.content?.length>=13?`${notification?.LikedPost?.content?.substring(0, 13)} ...`:`${notification?.LikedPost?.content}`}</p>
        {user && <div className={`absolute right-1 h-[90%] w-[16%] ${dark?`bg-gray-700`:`bg-gray-300`} bg-opacity-60 top-1 rounded-tl-full rounded-bl-full justify-center items-center flex `}>
          <img 
          className={`cursor-pointer h-[40px] w-[35px]`}
          src={`${dark?DeleteD:DeleteW}`} 
          alt="Delete_Post"
          onClick={handleDeleteNotification}
          />
        </div>}
      </div> }

    {notification.typeOf==='LikedRetweet' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer relative`} onClick={()=>{navigate(`/post/${notification.LikedRetweet._id}`);setNotificationDiv(false)}}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Retweet</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification.LikedRetweet?.retweetedRef?.content?.length>=13?`${notification.LikedRetweet?.retweetedRef?.content?.substring(0, 13)} ...`:`${notification.LikedRetweet?.retweetedRef?.content}`}</p>
        {user && <div className={`absolute right-1 h-[90%] w-[16%] ${dark?`bg-gray-700`:`bg-gray-300`} bg-opacity-60 top-1 rounded-tl-full rounded-bl-full justify-center items-center flex `}>
          <img 
          className={`cursor-pointer h-[40px] w-[35px]`}
          src={`${dark?DeleteD:DeleteW}`} 
          alt="Delete_Post"
          onClick={handleDeleteNotification}
          />
        </div>}
      </div> }

    {notification.typeOf==='LikedComment' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer relative`} onClick={()=>{
      navigate(`/post/${notification?.LikedComment?.postId}`);
      setCommentId(notification?.LikedComment?.commentId?._id);
      setNotificationDiv(false)
    }}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Comment</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.LikedComment?.commentId?.content?.length>=13?`${notification?.LikedComment?.commentId?.content.substring(0, 13)} ...`:`${notification?.LikedComment?.commentId?.content}`}</p>
        {user && <div className={`absolute right-1 h-[90%] w-[16%] ${dark?`bg-gray-700`:`bg-gray-300`} bg-opacity-60 top-1 rounded-tl-full rounded-bl-full justify-center items-center flex `}>
          <img 
          className={`cursor-pointer h-[40px] w-[35px]`}
          src={`${dark?DeleteD:DeleteW}`} 
          alt="Delete_Post"
          onClick={handleDeleteNotification}
          />
        </div>}
      </div> }

    {notification.typeOf==='Commented' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer relative`} onClick={()=>{
      navigate(`/post/${notification?.Commented?.postId}`);
      setCommentId(notification?.Commented?.commentId?._id);
      setNotificationDiv(false)
    }} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#f4c838]'>Commented Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Commented?.commentId?.content?.length>=13?`${notification?.Commented?.commentId?.content.substring(0, 13)} ...`:`${notification?.Commented?.commentId?.content}`}</p>
        {user && <div className={`absolute right-1 h-[90%] w-[16%] ${dark?`bg-gray-700`:`bg-gray-300`} bg-opacity-60 top-1 rounded-tl-full rounded-bl-full justify-center items-center flex `}>
          <img 
          className={`cursor-pointer h-[40px] w-[35px]`}
          src={`${dark?DeleteD:DeleteW}`} 
          alt="Delete_Post"
          onClick={handleDeleteNotification}
          />
        </div>}
      </div> }

    {notification.typeOf==='Retweeted' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer relative`} onClick={()=>{navigate(`/post/${notification.Retweeted._id}`);setNotificationDiv(false)}}  >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Retweeted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Retweeted?.retweetedRef?.content?.length>=13?`${notification?.Retweeted?.retweetedRef?.content?.substring(0, 13)} ...`:`${notification?.Retweeted?.retweetedRef?.content}`}</p>
        {user && <div className={`absolute right-1 h-[90%] w-[16%] ${dark?`bg-gray-700`:`bg-gray-300`} bg-opacity-60 top-1 rounded-tl-full rounded-bl-full justify-center items-center flex `}>
          <img 
          className={`cursor-pointer h-[40px] w-[35px]`}
          src={`${dark?DeleteD:DeleteW}`} 
          alt="Delete_Post"
          onClick={handleDeleteNotification}
          />
        </div>}
      </div> }

      {notification.typeOf==='Posted' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer relative`} onClick={()=>{navigate(`/post/${notification.Posted._id}`);setNotificationDiv(false)}} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Posted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Posted.content?.length>=13?`${notification?.Posted?.content?.substring(0, 13)} ...`:`${notification?.Posted?.content}`}</p>
        {user && <div className={`absolute right-1 h-[90%] w-[16%] ${dark?`bg-gray-700`:`bg-gray-300`} bg-opacity-60 top-1 rounded-tl-full rounded-bl-full justify-center items-center flex `}>
          <img 
          className={`cursor-pointer h-[40px] w-[35px]`}
          src={`${dark?DeleteD:DeleteW}`} 
          alt="Delete_Post"
          onClick={handleDeleteNotification}
          />
        </div>}
      </div> }

    {notification.typeOf==='Messaged' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer relative`} onClick={()=>{
      navigate(`/chat/${notification?.Messaged?.userId}`);
      setMessageId(notification?.Messaged?.messageId?._id);
      setNotificationDiv(false)
    }} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className={`text-[0.9rem] ml-2 mt-1 ${dark?`text-[#3ff339]`:`text-[#3ca739]`}`}>Messaged</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Messaged?.messageId?.message?.text?.length>=13?`${notification?.Messaged?.messageId?.message?.text?.substring(0, 13)} ...`:`${notification?.Messaged?.messageId?.message?.text}`}</p>
        {user && <div className={`absolute right-1 h-[90%] w-[16%] ${dark?`bg-gray-700`:`bg-gray-300`} bg-opacity-60 top-1 rounded-tl-full rounded-bl-full justify-center items-center flex `}>
          <img 
          className={`cursor-pointer h-[40px] w-[35px]`}
          src={`${dark?DeleteD:DeleteW}`} 
          alt="Delete_Post"
          onClick={handleDeleteNotification}
          />
        </div>}
      </div> }
    </>
  )
}

const Notificationsm = () => {
  const {dark,user}=useContext(appState);
  const [notificationLoader, setNotificationLoader] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const containerRef = useRef(null);

  const getNotifications = async ()=>{
    setNotificationLoader(true)
    let res=await fetch(`${config.baseUrl}/api/notification/getnotifications?page=${pageNo}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    credentials:'include', 

    })
    let data=await res.json();
    if(res.status===200){
      if(pageNo == 1){
        setNotifications(data.notifications)
        setPageNo(2)
      }
      else if(data.notifications?.length !== 0){
      setNotifications((prev)=>[...prev, ...data.notifications])
      setPageNo((prev)=>prev+1)
    }
      
      // setNotifications((prev)=>{
      //   console.log(prev);
      //   return prev
      // })
    }
    setNotificationLoader(false)
  }

  const handleInfiniteScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      getNotifications();
    }
  };

  useEffect(()=>{
    if(pageNo === 1)
    handleInfiniteScroll()
  },[])
  useEffect(()=>{
    if(pageNo > 1) handleInfiniteScroll()
  },[pageNo])

  return (
    <div ref={containerRef} onScroll={handleInfiniteScroll} className={`absolute mx-auto top-0 rounded-xl min-w-[300px] w-[23vw] h-[100vh] ${dark?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-300`} z-[11] p-2 flex ss:hidden flex-col overflow-scroll  border-2 pb-16`}>
      {!user && <div className={`bg-gray-900 ${dark?'bg-opacity-80':'bg-opacity-20'} rounded-xl  h-[100vh] w-[100%] z-[39]`}></div>}
      {!user && !notificationLoader && notifications?.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium absolute top-[35%] left-[20%] text-red-600 mt-10'>....... Please login .........</p></>}
      {user && !notificationLoader && notifications?.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium absolute top-[35%] left-[10%] text-red-600 mt-10'>..... No Notifications Found .....</p></>}
      {notifications.map((notification,i)=>(
        <SubNotification key={i} notification={notification}/>
        ))}
        {notificationLoader && <div className='m-auto mt-[60%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </div>
  )
}

export default Notificationsm
