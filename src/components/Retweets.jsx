import React,{useEffect,useContext, useState} from 'react'
import { appState } from '../App'
import {PostFooter,PostProfile} from '.'
 import { useNavigate } from 'react-router-dom'
 import config from '../source'
 //loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Retweets = () => {
    const {warnLogin,user,editProfile,setEditProfile,openLogin,setOpenLogin,calluser,dark,toast,imgsrc,setimgsrc,imgPreview,setImgPreview,retweetLoader,setRetweetLoader}=useContext(appState);
    const navigate=useNavigate()
    const [yourretweets,setYourretweets]=useState([])

    const getretweets=async ()=>{
      setRetweetLoader(true);
      let res= await fetch(`${config.baseUrl}/api/post/yourretweets`,{
      method:'GET',
      // mode: 'no-cors',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    setRetweetLoader(false)
    let data=await res.json();
    if(res.status===200){
        setYourretweets(data.yourretweets)
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
        getretweets();
      calluser()
      }else{
        warnLogin()
        navigate('/')
        setOpenLogin(true)
      }
   }, []);
  return (
    <>
      {yourretweets.length===0 && !retweetLoader && <><p className='flex justify-center items-center text-[1.125rem] font-medium text-blue-600 mt-10'>....... No Retweets .........</p></>}
      {!retweetLoader && <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  '>
    <div className='flex flex-col overflow-scroll no-scrollbar '>
    {yourretweets.map((post,i)=>(
      <div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]    transition duration-150 ease-in-out  hover:border-3 hover:border-slate-600 `}>
      <PostProfile user={post.retweet.user}/>
      <div className='ml-2 cursor-pointer whitespace-pre-wrap break-words' onClick={()=>{navigate(`/post/${post.retweet._id}`)}}>
        <p className='font-medium text-[16px] p-2'>{post.retweet.content}</p>
      </div>
      {post.retweet.isPhoto && <img src={`${config.baseUrl}/api/post/postPhoto/${post.retweet._id}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain hover:border-2  cursor-pointer ${dark?'hover:border-slate-800':"hover:border-slate-300"}`} onClick={()=>handleimgClick(`${config.baseUrl}/api/post/postPhoto/${post.retweet._id}`)} />}
        <PostFooter post={post.retweet} />
    </div>
    ))}
    </div>
   </div>}
   {retweetLoader && <div className='m-auto'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </>
  )
}

export default Retweets
