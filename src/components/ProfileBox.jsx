import React,{useState,useContext} from 'react'
import logo from '../assets/logo.png'
import {appState} from '../App'
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import config from '../source'

const ProfileBox = () => {
  const navigate=useNavigate();
  const {user,setUser,openSignUp,setOpenSignUp,openLogin,setOpenLogin,dark}=useContext(appState)
  let name,email,following,followers
  if(user)
  {
     name=user.name;
     email=user.email;
  }
  const handlegoogle=async ()=>{
    window.open(`${config.baseUrl}/api/user/auth/google`,'_self')
  }
  const handlefacebook=async ()=>{
    window.open(`${config.baseUrl}/api/user/auth/facebook`,'_self')
    
  }
  return (
    <>
    {user? <div onClick={()=>navigate('/profile')} className=' cursor-pointer flex flex-col  border-b-2 border-slate-400 mt-4 pb-3 '>
        <div className={`flex flex-row  justify-center items-center h-full px-7 ${dark?"text-white":"text-black"}`}>
      <img src={`${user.photoLocal?`${config.baseUrl}/photo/${user.photoLocal_path}?${Date.now()}`:`${config.baseUrl}/api/user/userAvatar/${user._id}?${Date.now()}`}`} alt="logo" className='-ml-2 h-[60px] w-[60px] m-3 rounded-full' />
      <div className='flex flex-col break-all'>
        <h3 className='font-bold text-xl mt-3'>{name}</h3>
        <p className={`${dark?"text-[#dfd9ff]":"text-[#bf2bf1]"} text-[0.9rem] `}>#{email}</p>
      </div>
    </div>
    <div className='ml-10 mt-2 mb-2 text-white'>
        {/* <h3 className=' text-white text-bold'>{following.length} <span className='text-[#dfd9ff] text-[0.9rem]'>following</span>&nbsp; | &nbsp; {followers.length} <span className='text-[#dfd9ff] text-[0.9rem]'>followers</span></h3> */}
    </div>
    </div>
   : <div className='flex flex-col'>
    <div className='fllex flex-row justify-center h-[60px] w-[200px] font-medium p-3 items-center'>
      <button className='h-[35px] transition duration-150 ease-in-out rounded-md w-[70px] m-2 p-1 bg-green-600 hover:bg-green-500 cursor-pointer' 
       onClick={()=>{setOpenLogin(prev=>!prev);setOpenSignUp(false)}} >Login</button>
        <button className='h-[35px] transition duration-150 ease-in-out rounded-md w-[70px] m-2 p-1 bg-red-600 hover:bg-red-500 cursor-pointer' 
         onClick={()=>{setOpenSignUp(prev=>!prev);setOpenLogin(false)}}>SignUp</button>
      </div>
      <button onClick={handlegoogle} className='flex justify-center items-center transition duration-150 ease-in-out h-[35px] rounded-md m-2  mt-3 p-2 bg-red-600 cursor-pointer hover:bg-red-500 ' ><img className='h-[29px] mt-1' src={google} alt="google" /><p className='font-medium text-white mx-2 tracking-widest'>Google</p></button>
      <button onClick={handlefacebook} className='flex justify-center items-center h-[35px] transition duration-150 ease-in-out rounded-md m-2 mt-1 mb-0 p-2 bg-blue-600 cursor-pointer hover:bg-blue-500 ' ><img className='h-[35px] ' src={facebook} alt="facebook" /><p className='font-medium text-white mx-1 tracking-widest'>facebook</p></button>
     
    </div>}
    </>
  )
}

export default ProfileBox
