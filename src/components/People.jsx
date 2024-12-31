import React,{useEffect,useContext, useState} from 'react'
import { appState } from '../App'
import logo from '../assets/logo.png'
import {PostFooter,PostProfile} from '.'
 import { useNavigate,useParams } from 'react-router-dom'
 import BACK from '../assets/BACK.png'
 //loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import config from '../source'

const People = () => {
    const {toastWarn,toastInfo,toastSuccess,toastError,setNotificatioOn,warnLogin,user,setOpenLogin,callfollowing,dark,toast,imgsrc,setimgsrc,imgPreview,setImgPreview}=useContext(appState);
    const navigate=useNavigate()
    const {id}=useParams()
    const [userdetails,setUserdetails]=useState({})
    const [peopleLoader,setPeopleLoader]=useState(false);
    const [isfollowing,setisfollowing]=useState(false)
    const [followers,setfollowers]=useState(userdetails.followers?userdetails.followers.length:0)
   
    const [follow,setfollow]=useState("Follow")
    const [posts,setPost]=useState([])
    const getUser=async ()=>{
      setPeopleLoader(true)
      let res= await fetch(`${config.baseUrl}/api/user/userdetails/${id}`,{
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
    setPeopleLoader(false)
    if(res.status===200){
        setUserdetails(data.user)
        setPost(data.posts)
    }
    else{
     
    }
    }
    const handleFollow=async ()=>{
      if(user){
        let res= await fetch(`${config.baseUrl}/api/follow?id=${userdetails._id}`,{
        method:'Post',
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
        if(data.deleted){
          setfollow("Follow")
          setfollowers(followers-1)

          setisfollowing(false)
        }else{
          setfollow("following")
          setisfollowing(true)
          setfollowers(followers+1)

        }
        callfollowing()
      }
      else{       
        toastError('error in follow/unfollow');
      }
      }else{
        setOpenLogin(true)
        warnLogin() 
      }
    }
    const isfollow=async ()=>{
      setPeopleLoader(true)
      let res= await fetch(`${config.baseUrl}/api/is/follow?id=${id}`,{
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
      setPeopleLoader(false)
      if(res.status===200){
        if(data.followexist){
          setfollow("following")
          setisfollowing(true)
        }else{
          setfollow("Follow")
          setisfollowing(false)
        }
        setfollowers(data.followers)
      }
      else{
        
      }
    }
    const handleimgClick=(src)=>{
      setimgsrc(src)
      setImgPreview(true)
    }

    const handleMessage=()=>{
      if(user)
      navigate(`/chat/${id}`);
      else
       {
        setOpenLogin(true)
        warnLogin()
       }
    }

    useEffect( () => {
        getUser();
        if(user){
          isfollow()
        }
        if(user && id==user._id){
            navigate('/profile')
        }
        
   }, [id,user]);
  
  return (
    <div className={`h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2 ${dark?"bg-black":"bg-slate-200"} flex flex-col overflow-scroll  `} onClick={()=>{setNotificatioOn(false)}} >
       <img src={BACK} alt="back" className={`h-[30px] w-[30px] absolute top-5 sm:-left-9 left-1 cursor-pointer`} onClick={()=>{navigate(-1);setNotificatioOn(false)}} />
     {!peopleLoader && <div className='flex flex-row  pr-7 justify-center items-center my-3'>
          <img src={`${userdetails.photoLocal?`${config.baseUrl}/photo/${userdetails.photoLocal_path}`:`${config.baseUrl}/api/user/userAvatar/${userdetails._id}`}`}  className='ml-[5%] sm:h-[140px] sm:w-[140px] h-[100px] w-[100px] rounded-full' />
          <div className='flex flex-col  min-w-[50%] items-center'>
            <div className={` flex ${dark?'bg-green-600 hover:bg-green-700':'bg-blue-600 hover:bg-blue-700'}  justify-center items-center mt-[12%]  h-[40px] w-[120px] cursor-pointer  font-medium tracking-[0.08em] transition duration-150 ease-in-out -mb-5 rounded-3xl`} onClick={handleMessage}>Message</div>
            <div className={`${isfollowing?`${dark?"hover:bg-slate-700":"hover:bg-slate-300"}`:"bg-white text-black hover:bg-slate-300"} flex   justify-center items-center mt-[12%]  h-[40px] w-[120px] cursor-pointer  font-bold tracking-[0.08em] transition duration-150 ease-in-out  border-slate-700 border-2 mb-3 rounded-3xl`} onClick={handleFollow}>{follow}</div>
           
            <div className='flex flex-wrap justify-center items-center mx-6 '>
              <p className='m-2 mr-3 sm:text-[0.9rem] text-[0.6rem] font-medium '>{followers} Followers</p>
              <p className='m-2 sm:text-[0.9rem] text-[0.6rem] font-medium '>{userdetails.following?userdetails.following.length:'0'} Following</p>
            </div>
          </div>
      </div>}
     {!peopleLoader &&  <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Name :</h3>
        <p className={`ml-6  ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{userdetails.name}</p>
      </div>}
      {!peopleLoader && <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Email :</h3>
        <p className={'ml-6  ${dark?"text-[#b2e4ecf0]":"text-slate-700"}'}>{userdetails.email}</p>
      </div>}
      {!peopleLoader && <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Description :</h3>
        <p className={`ml-6  ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{userdetails.description}</p>
      </div>}
      {!peopleLoader && <p className={`text-[1.125rem] font-bold flex justify-center my-2 ${dark?"text-[#06ceedf0]":"text-black"}`}> Posts</p>}
      {posts.length===0 && !peopleLoader && <><p className='flex justify-center items-center text-[1.125rem] font-medium text-red-600 mt-10'>....... No Posts .........</p></>}
      {!peopleLoader && <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  '>
    {/* <div className='m-2 rounded-xl  text-white w-[100%] h-[50px] border-b-2 border-slate-600 p-2'>dfdsfv</div> */}
    <div className='flex flex-col overflow-scroll no-scrollbar '>
    {posts.map((post,i)=>(
      <div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]  transition duration-150   hover:border-3 hover:border-slate-600 `}>
      <PostProfile user={userdetails}/>
      <div className='ml-2 cursor-pointer whitespace-pre-wrap break-words' onClick={()=>{navigate(`/post/${post._id}`)}}>
        <p className='font-medium text-[16px] p-2'>{post.content}</p>
      </div>
      {post.isPhoto && <img src={`${config.baseUrl}/api/post/postPhoto/${post._id}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain hover:border-2  cursor-pointer ${dark?'hover:border-slate-800':"hover:border-slate-300"}`} onClick={()=>handleimgClick(`${config.baseUrl}/api/post/postPhoto/${post._id}`)} />}
        <PostFooter post={post} />
    </div>
    ))}
    </div>
   </div>}
   {peopleLoader && <div className='m-auto mt-[40%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </div>
  )
}

export default People
