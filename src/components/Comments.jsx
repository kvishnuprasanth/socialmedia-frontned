import React,{useState,useEffect,useContext} from 'react'
import {PostProfile} from '.'
import Arrow from '../assets/arrow.png'
import Like from '../assets/like.png'
import Liked from '../assets/liked.png'
import {appState} from '../App'
import DeleteD from '../assets/delete_dark.png'
import DeleteW from '../assets/delete_white.png'
import config from '../source'


const Comments = ({comment,key,targetDivRef}) => {
  const {toastInfo,toastSuccess,toastError,commentId,warnLogin,user,setOpenLogin,dark,toast}=useContext(appState)

  const [likes,setLikes]=useState(comment.likes.length)
  const [islike,setIslike]=useState(false)
  const like=async ()=>{
    if(user){
      let res=await fetch(`${config.baseUrl}/api/like?id=${comment._id}&type=Comment`,{
      method:'POST',
      // mode: 'no-cors',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    let data=await res.json()
    if(res.status===200){
      if(data.deleted){
        setLikes(likes-1);
        setIslike(false)
      }else{
        setLikes(likes+1);
        setIslike(true)

      }
    }else{
   
    }
    }else{
      setOpenLogin(true)    
      warnLogin()
    }
  }
  const likecomment=async ()=>{
    let res=await fetch(`${config.baseUrl}/api/is/liked?id=${comment._id}&type=Comment`,{
      method:'get',
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
      if(data.likeexist)
      setIslike(true)
      else
      setIslike(false)
    }
    else{
     
    }
    setLikes(data.likes)
  }
  const handleDeleteComment=async (e)=>{
    let res= await fetch(`${config.baseUrl}/api/comment/delete/${comment._id}`,{
      method:'GET',
      // mode: 'no-cors',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    if(res.status===200){
    e.target.parentElement.classList.add('hidden');
      toastSuccess('Comment removed');
    }
    else{
      toastError('Comment removed');
    }
  }
  useEffect( () => {
    likecomment();
 }, []);
  return (
    <div key={key} ref={comment._id === commentId ? targetDivRef : null} className='flex flex-row pl-3 relative '>
      <img src={Arrow} className='h-[50px] ' alt="" />
      <div className='-ml-3 '>
      <PostProfile user={comment.user} />
      <div className='ml-14 -mt-3 break-all'>
        <p className=' text-[0.9rem] p-2 '>{comment.content}</p>
      </div>
      </div>
      <p className='mt-7 ml-2 text-red-700'>{likes}</p>
      <img src={islike?Liked:Like} className='h-[20px] w-[20px] mt-7 ml-2 cursor-pointer' onClick={like} alt="" />
      {user && (comment.user._id==user._id) && <img 
        className={`absolute right-5 top-5 cursor-pointer h-[30px] w-[25px]`}
        src={`${dark?DeleteD:DeleteW}`} 
        alt="Delete_Post"
        onClick={handleDeleteComment}
         />}
     </div>
  )
}

export default Comments
