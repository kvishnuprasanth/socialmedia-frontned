import React,{useEffect,useContext, useState} from 'react'
import { appState } from '../App'
import logo from '../assets/logo.png'
import {PostFooter,PostProfile,Retweets} from '.'
 import { useNavigate } from 'react-router-dom'
 import BACK from '../assets/BACK.png'
 //loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import config from '../source'

const Profile = () => {
  const {setNotificatioOn,warnLogin,user,editProfile,setEditProfile,openLogin,setOpenLogin,calluser,dark,toast,imgsrc,setimgsrc,imgPreview,setImgPreview}=useContext(appState);
  const navigate=useNavigate()
  const [yourposts,setYourposts]=useState([])
  const [postLoader,setPostLoader]=useState(false);
  const [selected,setSelected]=useState('Posts')
  const getposts=async ()=>{
    setPostLoader(true)
    let res= await fetch(`${config.baseUrl}/api/post/yourposts`,{
    method:'GET',
    // mode: 'no-cors',
    headers:{
      'Access-Control-Allow-Origin': '*',
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    credentials:'include', 
  });
  setPostLoader(false)
  let data=await res.json();
  if(res.status===200){
    if(data.yourposts!==undefined){
      setYourposts(data.yourposts)
    }  
  }
  else{
   
  }
  }
  const handleimgClick=(src)=>{
    setimgsrc(src)
    setImgPreview(true)
  }
  useEffect( () => {
    if(user){
      calluser()
      getposts();
    }else{
     
      warnLogin()
      
      navigate('/')
      setOpenLogin(true)
    }
 }, [selected]);

  return (
    <>
    {user && <div className={`h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2 ${dark?"bg-black":"bg-slate-200"} flex flex-col overflow-scroll `} onClick={()=>{setNotificatioOn(false)}} >
    <img src={BACK} alt="back" className={`h-[30px] w-[30px] absolute top-5 sm:-left-9 left-1 cursor-pointer`} onClick={()=>{navigate(-1);setNotificatioOn(false)}} />
      <div className='flex flex-row  pr-7 justify-center items-center my-3'>
          <img src={`${user.photoLocal?`${config.baseUrl}/photo/${user.photoLocal_path}?${Date.now()}`:`${config.baseUrl}/api/user/userAvatar/${user._id}?${Date.now()}`}`}  alt={user.name} className='ml-[5%] sm:h-[140px] sm:w-[140px] h-[100px] w-[100px] rounded-full' />
          <div className='flex flex-col  min-w-[50%] items-center'>
            <div className={`flex justify-center items-center mt-[12%]  h-[40px] w-[120px] cursor-pointer ${dark?"hover:bg-slate-700":"hover:bg-slate-100"} font-bold tracking-[0.08em] transition duration-150 ease-in-out  border-slate-400 border-2 mb-3 rounded-3xl` }onClick={()=>setEditProfile(true)}>Edit Profile</div>
            <div className='flex flex-wrap justify-center items-center mx-6 '>
              <p className='m-2 mr-3 sm:text-[0.9rem] text-[0.6rem] font-medium '>{user.followers?user.followers.length:'0'} Followers</p>
              <p className='m-2 sm:text-[0.9rem] text-[0.6rem] font-medium '>{user.following?user.following.length:'0'} Following</p>
            </div>
          </div>
      </div>
      <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Name :</h3>
        <p className={`ml-6 ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{user.name}</p>
      </div>
      <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Email :</h3>
        <p className={`ml-6 ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{user.email}</p>
      </div>
      <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Description :</h3>
        <p className={`ml-6 whitespace-pre-wrap break-words ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{user.description}</p>
      </div>
      <div className={`text-[1.125rem] font-bold flex flex-col   my-2 ${dark?"text-[#06ceedf0]":"text-black"}`}>
        <div className='flex flex-row justify-around items-center w-[100%]'>
        <p className='cursor-pointer flex flex-row' onClick={()=>{setSelected('Posts')}}><span className='hidden sm:block'>Your&nbsp;</span>Posts&nbsp;</p>
        <p className='cursor-pointer flex flex-row' onClick={()=>{setSelected('Retweets')}}><span className='hidden sm:block'>Your&nbsp;</span>Retweets&nbsp;</p>
        </div>
        <div className=' h-[10px] mx-3 relative mt-1'>
          <div className={`h-[50%] bg-blue-500 w-[45px] xs:w-[70px] rounded-full absolute ${selected==='Posts'?'left-[11%] xs:left-[15%]':'left-[68%] xs:left-[69%]'} transition-all duration-500 ease-in-out`}></div>       
        </div>
        </div>
        {postLoader && <div className='m-auto mt-1'> <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box></div>}
      {yourposts.length===0 && !postLoader && selected==='Posts' &&<><p className='flex justify-center items-center text-[1.125rem] font-medium text-red-600 mt-10'>....... No Posts .........</p></>}
      {selected==='Posts' && <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  '>
    {!postLoader && <div className='flex flex-col overflow-scroll no-scrollbar '>
    {yourposts.map((post,i)=>(
      <div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]    transition duration-150 ease-in-out  hover:border-3 hover:border-slate-600 `}>
      <PostProfile user={user}/>
      <div className='ml-2 cursor-pointer whitespace-pre-wrap break-words' onClick={()=>{navigate(`/post/${post._id}`)}}>
        <p className='font-medium text-[16px] p-2'>{post.content}</p>
      </div>
      {post.isPhoto && <img src={`${config.baseUrl}/api/post/postPhoto/${post._id}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain hover:border-2  cursor-pointer ${dark?'hover:border-slate-800':"hover:border-slate-300"}`} onClick={()=>handleimgClick(`${config.baseUrl}/api/post/postPhoto/${post._id}`)} />}
        <PostFooter post={post} />
    </div>
    ))}
    </div>}
   </div>}
   {selected!=='Posts' && <Retweets/>}
    </div>}
    
    </>
  )
}

export default Profile
