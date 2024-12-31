import React ,{useContext} from 'react'
import retweet from '../assets/retweet.png'
import { appState } from '../App'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import config from '../source'
import notification_on from '../assets/notification_on.png'
import notification_off from '../assets/notification_off.png'
//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Following=({following})=>{
  const {dark,setNotificatioOn}=useContext(appState);
  const navigate=useNavigate()
return (
  <div key={following._id} className={`flex flex-col  transition duration-150 ease-in-out ${dark?"bg-black hover:bg-[#232334]":"bg-white hover:bg-slate-100"} rounded-2xl left-2  p-2 mb-2 min-w-[97%] cursor-pointer`} onClick={()=>{navigate(`/people/${following.followable._id}`);setNotificatioOn(false)}}>
    <div className='flex flex-row justify-start items-center'>
      <img src={`${following.followable.photoLocal?`${config.baseUrl}/photo/${following.followable.photoLocal_path}?${Date.now()}`:`${config.baseUrl}/api/user/userAvatar/${following.followable._id}?${Date.now()}`}`}  className='h-[40px] w-[40px] mr-2 rounded-full' alt="" />
      <div className='-mt-3 break-all'>
        <h3 className='font-medium text-[0.9rem] mt-3'>{following.followable.name}</h3>
        <p className={`${dark?"text-[#42a5c6]":"text-[#414ced]"} text-[0.75rem]`}>#{following.followable.email}</p>
      </div>
    </div>
    <div className='flex flex-wrap justify-around text-[0.7rem] mt-3 '>
      <div className='flex justify-center items-center text-[#f4c838] '>
        <p className={`text-[0.8rem] ${dark?"text-[#f4c838]":"text-[#fd980c]"}`}>Followers &nbsp;</p>
        <p>{following.followable.followers?following.followable.followers.length:'0'}</p>
      </div>
      <div className='flex justify-center items-center text-[#f4c838]'>
        <p className={`text-[0.8rem] ${dark?"text-[#f4c838]":"text-[#fd980c]"}`}>following &nbsp;</p>
        <p className=''>{following.followable.following?following.followable.following.length:'0'}</p>
      </div>
      <div className='flex justify-center items-center'>
        <img src={retweet} className='h-[20px] w-[20px] mr-1' alt="retweet" />
        <p className=''>{following.followable.retweets?following.followable.retweets.length:'0'}</p>
      </div>
    </div>

  </div>
)
}

const Right = () => {
  const {notificatioOn,setNotificatioOn,following,setFollowing,followingLoader,dark,user}=useContext(appState);

  return (
    <div className={`relative h-full hidden ss:flex flex-col min-w-[33%] ml-2 items-center right-2 rounded-3xl p-2 border-2 ${dark?"border-slate-700 ":"border-slate-300"} scroll-smooth `}>
      <div>
      {!notificatioOn && <img src={notification_off} alt="notification_off" className='absolute left-2 sw:left-7 sm:left-5 top-4 h-10 cursor-pointer' onClick={()=>{setNotificatioOn(true)}} />}
      {notificatioOn && <img src={notification_on} alt="notification_off" className='absolute left-2 sw:left-7 sm:left-5 top-3 h-12 w-10 cursor-pointer' onClick={()=>{setNotificatioOn(false)}} />}
      </div>
      <h3 className='font-medium text-[23px] my-3'>Following</h3>
    {!followingLoader && <div className='border-t-2 border-slate-500 py-3 min-w-[95%] overflow-scroll no-scrollbar'>
   {!user && <div className={`bg-gray-900 ${dark?'bg-opacity-80':'bg-opacity-20'} rounded-xl  h-[100vh] w-[100%] z-[39]`}></div>}

    {!user && following.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium absolute top-[35%] left-[20%] text-red-600 mt-10'>....... Please login .........</p></>}
    {user && following.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium absolute top-[35%] left-[10%] text-red-600 mt-10'>..... Not Following Anyone .....</p></>}
      {following.map((following)=>(
        <Following following={following}  />
      ))}
    </div>}
    {followingLoader && <div className='m-auto mt-[40%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
   </div>
  )
}

export default Right
