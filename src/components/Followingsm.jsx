import React ,{useContext} from 'react'
import retweet from '../assets/retweet.png'
import { appState } from '../App'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import close from '../assets/close.svg'
//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import config from '../source'

const Following=({following})=>{
    const {dark,followingDiv,setFollowingDiv}=useContext(appState);
    const navigate=useNavigate()
  return (
    <div key={following._id} className={`flex flex-col  transition duration-150 ease-in-out ${dark?"bg-black hover:bg-[#232334]":"bg-white hover:bg-slate-100"} rounded-2xl left-2  p-2 mb-2 w-[95%]   cursor-pointer`} onClick={()=>{setFollowingDiv(false);navigate(`/people/${following.followable._id}`)}}>
      
      <div className='flex flex-row justify-start items-center'>
        <img src={`${following.followable.photoLocal?`${config.baseUrl}/photo/${following.followable.photoLocal_path}?${Date.now()}`:`${config.baseUrl}/api/user/userAvatar/${following.followable._id}?${Date.now()}`}`}  className='h-[40px] w-[40px] mr-2 rounded-full' alt="" />
        <div className='-mt-3'>
          <h3 className='font-medium text-[0.9rem] mt-3'>{following.followable.name}</h3>
          <p className={`${dark?"text-[#42a5c6]":"text-[#414ced]"} text-[0.75rem]`}>#{following.followable.email}</p>
        </div>
      </div>
      <div className='flex flex-row justify-around text-[0.7rem] mt-3'>
        <div className='flex justify-center items-center text-[#f4c838]'>
          <p className={`text-[0.8rem] ${dark?"text-[#f4c838]":"text-[#f1af29]"}`}>Followers &nbsp;</p>
          <p>{following.followable.followers?following.followable.followers.length:'0'}</p>
        </div>
        <div className='flex justify-center items-center text-[#f4c838]'>
          <p className={`text-[0.8rem] ${dark?"text-[#f4c838]":"text-[#f1af29]"}`}>following &nbsp;</p>
          <p className=''>{following.followable.following?following.followable.following.length:'0'}</p>
        </div>
        <div className='flex justify-center items-center'>
          <img src={retweet} className='h-[20px] w-[20px] mr-1' alt="retweet" />
          <p className=''>0</p>
        </div>
      </div>
  
    </div>
  )
  }

const Followingsm = () => {
    const {following,setFollowing,followingLoader,dark,followingDiv,setFollowingDiv}=useContext(appState);

    return (
      <div className={`relative h-full flex ss:hidden flex-col min-w-[33vw] w-[350px] ml-2 items-center right-2 rounded-3xl p-2 border-2 ${dark?"border-slate-700 ":"border-slate-300"} scroll-smooth`}>
          <img src={close} className={`top-3 right-3 absolute cursor-pointer ${dark?'':'bg-slate-800 p-1 hover:bg-slate-700 rounded-full'}`} alt="close" onClick={()=>{setFollowingDiv(false);}}/>
      {!followingLoader && <h3 className='font-medium text-[23px] my-3'>Following</h3>}
      {!followingLoader && <div className='border-t-2 border-slate-500 py-3 w-[95%] overflow-scroll no-scrollbar'>
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

export default Followingsm
