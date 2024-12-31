import React,{useEffect,useContext, useState, useRef} from 'react'
import {PostFooter,PostProfile} from '.'
import { appState } from '../App'
import { useNavigate ,useParams} from "react-router-dom";
import dropDown from '../assets/dropDown.png'
import config from '../source'

//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Home = () => {
  const navigate=useNavigate()
  const {setNotificatioOn,posts,setPosts,toastError,user,dark,calluser,imgsrc,setimgsrc,imgPreview,setImgPreview,postsSocket}=useContext(appState);
  const [homeLoader,setHomeLoader]=useState(false);
  const [arrivalPost, setArrivalPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const containerRef = useRef(null);

    const getposts=async ()=>{
      setHomeLoader(true);
      let res=await fetch(`${config.baseUrl}/api/home?page=${pageNo}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      let data=await res.json();
      if(res.status===200){
        if(pageNo == 1){
          setPosts(data.posts)
          setPageNo(2)
        }
        else if(data.posts?.length !== 0){
          setPosts((prev)=>[...prev, ...data.posts])
          setPageNo((prev)=>prev+1)
      }
        // setPosts((prev)=>{
        //   console.log(prev);
        //   return prev
        // })

      }else{
        toastError('error in getting posts')
      }
      setHomeLoader(false);
    }

    const handleInfiniteScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        getposts();
      }
    };

    const handleimgClick=(src)=>{
      setimgsrc(src)
      setImgPreview(true)
    }

    const updateLatestPosts=()=>{
      setPosts((prev) => [...latestPosts,...prev]);
      setLatestPosts([])
    }

    useEffect(() => {
      if (postsSocket) {
        postsSocket.on('postarrived',(data)=>{
          setArrivalPost(data.newPost)
        })
      }
    }, []);
    useEffect(() => {
      arrivalPost && setLatestPosts((prev) => [arrivalPost,...prev]);
    }, [arrivalPost]);
    useEffect( () => {
      calluser()
      if(pageNo === 1){
        getposts()
      }
    }, []);
    useEffect(()=>{
      if(pageNo > 1) handleInfiniteScroll()
    },[pageNo])
 

  return (
    
   <div ref={containerRef} className={`h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2  ${homeLoader?`${dark?"bg-black":"bg-slate-200"}`:""} overflow-y-scroll ` } onScroll={handleInfiniteScroll} onClick={()=>{setNotificatioOn(false)}} >

    {latestPosts.length!==0 && <div onClick={updateLatestPosts} className='absolute flex justify-center items-center top-0 left-[43%] ss:left-[28%] rounded-b-full bg-blue-600 hover:bg-blue-700 h-[38px] w-[43px]'>
    <img src={dropDown} alt="dropDown" className='mt-1 cursor-pointer h-[40px] w-[40px]'  />
    </div>}
    
    <div className='flex flex-col overflow-scroll no-scrollbar '>
    {posts.map((post,i)=>(
     <div key={i}>
      {post.type!=='Retweet'?<div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]   hover:border-3 hover:border-slate-600  transition duration-150 ease-in-out `}>
      <PostProfile user={post.user}/>
      <div className='ml-2 cursor-pointer whitespace-pre-wrap break-words' onClick={()=>{navigate(`/post/${post._id}`)}}>
        <p className='font-poppins text-[15px] p-2'>{post.content}</p>
      </div>
      {post.isPhoto && <img src={`${config.baseUrl}/api/post/postPhoto/${post._id}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain hover:border-2  cursor-pointer ${dark?'hover:border-slate-800':"hover:border-slate-300"}`} onClick={()=>handleimgClick(`${config.baseUrl}/api/post/postPhoto/${post._id}`)} />}
        <PostFooter post={post} />
    </div>:

    <div className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black ":"bg-white "} min-h-[50%]   hover:border-3 hover:border-slate-600  transition duration-150 ease-in-out `}>
      <PostProfile user={post.user}/>
      <div className={`flex flex-col ml-6 rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]   hover:border-3 hover:border-slate-600 border-t-2 border-l-2 ${dark?'border-slate-700':'border-slate-300'} transition duration-150 ease-in-out  cursor-pointer`} onClick={()=>{navigate(`/post/${post.retweetedRef._id}`)}} >
      <PostProfile user={post.retweetedRef.user}/>
      <div className='ml-2 whitespace-pre-wrap break-words'>
        <p className='font-medium text-[16px] p-2 '>{post.retweetedRef.content}</p>
      </div>
      {post.retweetedRef.isPhoto && <img src={`${config.baseUrl}/api/post/postPhoto/${post.retweetedRef._id}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain `} />}
    </div>
    <PostFooter post={post} />
    </div>
    }
     </div>
    ))}
    {homeLoader && <div className='m-auto mt-[40%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </div>
   </div>
  )
}

export default Home
