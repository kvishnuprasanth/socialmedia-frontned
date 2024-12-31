import React,{useState,useContext,useEffect } from 'react'
import {ProfileBox} from '../components'

import profileimg from '../assets/profile.png'
import homeimg from '../assets/home.png'
import postimg from '../assets/post.png'
import bookmarkimg from '../assets/bookmark.png'
import logoutimg from '../assets/logout.png'

import close from '../assets/close.svg'
import menu from '../assets/menu.svg'
import { Link,useNavigate,useLocation } from "react-router-dom";
import { appState } from '../App'
import Followingsm from './Followingsm'
import config from '../source'

const Left = () => {
  const Navigate=useNavigate();
  let location = useLocation();
  const {toastInfo,toastSuccess,toastError,setNotificatioOn,warnLogin,calluser,postForm,setPostForm,dark,setDark,user,setOpenSignUp,setOpenLogin,callfollowing,toast,followingDiv,setFollowingDiv,setNotificationDiv}=useContext(appState);
  const [active,setActive]=useState('/');
  const [toggle,setToggle]=useState(false);
  const logout=async ()=>{
    let res= await fetch(`${config.baseUrl}/api/user/sign-out`,{
      method:'GET',
      // mode: 'no-cors',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    let data=await res.json();
    if(res.status===200){
      toastSuccess('sucessfully Logged Out');
      Navigate('/');
      calluser();
      callfollowing()
    }else{      
      toastError('error in logging out');    
    }
  }
  useEffect( () => {
    calluser();
 }, []);
  useEffect( () => {
    setActive(location.pathname)
 }, [location.pathname]);

  return (
   <div >
    <div className={`bg-gradient-to-b hidden sm:flex rounded-3xl fixed overflow-y-scroll top-6 left-4 bottom-4 z-0 ${dark?"from-black to-blue-950 border-slate-700":"bg-gray-200 border-slate-300"} h-full max-w-[25%] p-3 overflow-hidden flex-col no-scrollbar border-2 `} onClick={()=>{setNotificatioOn(false)}} >
      <ProfileBox/>
      <div className=' flex flex-col mt-4 py-5 '>
        <div className={`${
            active==='/'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-bold text-[20px] font-medium cursor-pointer flex justify-start items-center mb-4 `}>
            <img src={homeimg} alt="" className='ml-10 h-[25px] w-[25px]' />
            <Link className='ml-4' to='/'>Home</Link>
        </div>
        <div className={`${
            active==='/profile'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex justify-start items-center mb-4 `}>
            <img src={profileimg} alt="" className='ml-10 h-[25px] w-[25px]' />
            <Link className='ml-4' to='/profile'>Profile</Link>
        </div>
        <div className={`${dark?"text-secondary":"text-[#841808]"} ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex justify-start items-center mb-4 `}>
            <img src={postimg} alt="" className='ml-10 h-[25px] w-[25px]' />
            <p className='ml-4' onClick={()=>{
              if(user){setPostForm((pre)=>!pre);Navigate('/')}
              else {
                setOpenLogin(true)
                warnLogin()
                }}}>Post</p>
        </div>
        <div className={`${
           active==='/bookmark'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex justify-start items-center mb-4 `}>
            <img src={bookmarkimg} alt="" className='ml-10 h-[25px] w-[25px]' />
            <Link className='ml-4' to='/bookmark'>Bookmark</Link>
        </div>
        {user && <div className={`${dark?"text-secondary":"text-[#841808]"} ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex justify-start items-center mb-4 `}>
            <img src={logoutimg} alt="" className='ml-10 h-[28px] w-[28px]' />
            <p className='ml-4' onClick={logout}>Log-Out</p>
        </div>}
      </div>
      <div  className='flex flex-row justify-start items-center border-t-2  border-slate-400 p-2 '>
      
          <label   htmlFor="check" className='bg-blue-600 cursor-pointer relative w-16 h-8 rounded-full ' >
            <input onClick={()=>{setDark((prev)=> !prev);}} type="checkbox" id='check' className='sr-only peer ' />
            <span onClick={()=>{setDark((prev)=> !prev);}} className={`w-2/5 h-4/5  absolute rounded-full ${dark?"left-1 bg-black":"left-9  bg-white"}  top-1 peer-checked:  translate-all duration-500`}></span>
          </label>

        <h3 onClick={()=>{setDark((prev)=> !prev);}} className={` ${dark?"hover:text-secondary":"hover:text-black"} mb-3 mt-2   ml-3 text-[22px] font-medium 
         cursor-pointer`} >{` ${dark?"Dark on":"Dark off"}`}</h3>
      </div>
    </div>
    <div className='sm:hidden fixed top-0 z-10 flex flex-1 h-[600px] w-[38px] bg-gradient-to-t from-black to-blue-950'>
    <img src={toggle?close:menu} alt="menu" 
      className='w-[28px] h-[28px] object-contain m-1 cursor-pointer'
      onClick={()=>setToggle(!toggle)}
      />
      <div className={`${!toggle?'hidden':'flex'} p-6 bg-black-gradient absolute top-6 left-0 mx-6 my-3 min-w-[170px] z-10 rounded-xl`}>
      <ul className='list-none flex justify-end z-10 items-start flex-col gap-4 '>
     
       {!user && <li
        className={`text-secondary hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);}}
        >
          <p onClick={()=>{setOpenLogin(prev=>!prev);setOpenSignUp(false)}}>login</p>
        </li>}
        {!user && <li
       className={`text-secondary hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
       onClick={()=>{setToggle(!toggle);}}
        >
          <p  onClick={()=>{setOpenSignUp(prev=>!prev);setOpenLogin(false)}}>signUp</p>
        </li>}
        {!user && <li
       className={`text-secondary hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
       onClick={()=>{setToggle(!toggle);}}
        >
          <Link to={`${config.baseUrl}/api/user/auth/google`}>Google login</Link>
        </li>}
       {!user && <li
        className={`text-secondary hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);}}
        >
          <Link to={`${config.baseUrl}/api/user/auth/facebook`}>Fackbook login</Link>
        </li>}
        <li
        className={`${
          active==='/'?"text-white":"text-secondary"
        } hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle)}}
        >
          <Link to='/'>Home</Link>
        </li>
        <li
        className={`${
          active==='/profile'?"text-white":"text-secondary"
        } hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle)}}
        >
          <Link to='/profile'>Profile</Link>
        </li>
        <li
        className={` font-poppins hover:text-white font-medium cursor-pointer text-[16px] text-secondary`}
        onClick={()=>{setToggle(!toggle)}}
        >
          <p className='' onClick={()=>{setPostForm((pre)=>!pre);Navigate('/')}}>Post</p>
        </li>
        <li
        className={`${
          active==='/bookmark'?"text-white":"text-secondary"
        } hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle)}}
        >
          <Link to='/bookmark'>Bookmark</Link>
        </li>
        <li
        className={`hover:text-white ss:hidden text-secondary font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle)}}
        >
          <p onClick={()=>{setFollowingDiv(true);setNotificationDiv(false)}}>Following</p>
        </li>
       {user && <li
        className={`${
          active==='Log-Out'?"text-white":"text-secondary"
        } hover:text-white font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);}}
        >
        <p className='' onClick={logout}>Log-Out</p>

        </li>}
        <h3 onClick={()=>{setDark((prev)=> !prev);}} className={`hover:text-secondary text-white  m-1 mt-0 text-[22px] font-medium 
         cursor-pointer`} >{` ${dark?"Dark on":"Dark off"}`}</h3>
      
    </ul>
    
    {/* <div className=' flex flex-col mt-4 py-5 '>
        <div className={`${
            active==='Home'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-bold text-[20px] font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Home')}}>
            
            <Link className='ml-4' to='/'>Home</Link>
        </div>
        <div className={`${
            active==='Profile'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Profile')}}>
            
            <Link className='ml-4' to='/profile'>Profile</Link>
        </div>
        <div className={`${
            active==='Post'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Post')}}>
            
            <p className='ml-4' onClick={()=>{setPostForm((pre)=>!pre)}}>Post</p>
        </div>
        <div className={`${
           active==='Bookmark'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Bookmark')}}>
           
            <Link className='ml-4' to='/bookmark'>Bookmark</Link>
        </div>
        <div className={`${
            active==='Log-Out'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Log-Out')}}>
            
            <Link className='ml-4' to='/sign-out'>Log-Out</Link>
        </div>
      </div> */}
      </div>
    </div>
    {followingDiv && <div className={`absolute flex ss:hidden z-[11] rounded-xl left-10 top-1  ${dark?"bg-primary text-white":"bg-white text-black"} h-full w-[90vw]  `}>
      
    <Followingsm/>
    </div>}
   </div>
   
    
  )
}

export default Left
