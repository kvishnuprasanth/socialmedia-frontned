import React, { useEffect, useState ,useContext} from 'react'
import save from '../assets/save.png'
import saved from '../assets/saved.png'
import llike from '../assets/like.png'
import liked from '../assets/liked.png'
import Rretweet from '../assets/retweet.png'
import Rretweeted from '../assets/retweeted.png'
import comment from '../assets/comment.png'
import {appState} from '../App'
import {Link,useLocation, useNavigate} from "react-router-dom";
import config from '../source'

const PostFooter =  ({post}) => {
  let location = useLocation();
  const navigate=useNavigate();
  const {toastWarn,toastInfo,toastSuccess,toastError,warnLogin,user,setOpenLogin,dark,toast,posts,setPosts,postsSocket}=useContext(appState)

  const [likes,setLikes]=useState(post.likes.length)
  const [retweets,setRetweets]=useState(post.retweets.length)
  const [issave,setIssaved]=useState("Save")
  const [isretweet,setIsretweet]=useState("Retweet")
  const [disable,setDisable]=useState(false)
  const [islike,setIslike]=useState("Like")
  const like=async ()=>{
      if(user){
        let res=await fetch(`${config.baseUrl}/api/like?id=${post._id}&type=Post`,{
      method:'POST',
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
        setIslike("Like")
      }else{
        setLikes(likes+1);
        setIslike("Liked")

      }
    }else{     
      toastError('unable to make like');
    }
      }else{
        warnLogin()
        setOpenLogin(true)
      }
  }
  const savepost=async ()=>{
    let res=await fetch(`${config.baseUrl}/api/is/saved?id=${post._id}`,{
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
      if(data.bookmarkexist)
      setIssaved("Saved")
      else
      setIssaved("Save")
    }
    else{
     
    }
  }
  const likepost=async ()=>{
    let res=await fetch(`${config.baseUrl}/api/is/liked?id=${post._id}&type=Post`,{
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
      setIslike("Liked")
      else
      setIslike("Like")
    }
    else{
     
    }
    setLikes(data.likes)
  }
  const bookmark=async (e)=>{
   if(user){
    let res=await fetch(`${config.baseUrl}/api/bookmark?id=${post._id}`,{
      method:'post',
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
        setIssaved("Save")
        if(location.pathname==='/bookmark'){
          e.target.parentElement.parentElement.classList.add('hidden');
        }
        toastInfo('Bookmark removed');
      }
      else{
        toastInfo('Bookmark added');
        setIssaved("Saved")
      }
    }
    else{
      toastError('error in bookmark');
    }
   }else{
    warnLogin()
    setOpenLogin(true)
  }
  }
  const retweet=async ()=>{
    if(user){
      let res=await fetch(`${config.baseUrl}/api/retweet?id=${post._id}`,{
        method:'post',
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
            setRetweets(retweets-1);
            setIsretweet("Retweet")   
            toastInfo('Retweet removed');
        }
        else{
          let newPost=data.post;
          postsSocket.emit("uploadedPost",{newPost});
          setRetweets(retweets+1);
          setIsretweet("Retweeted")
            toastInfo('Retweet added');
        }
      }
      else{
          toastError('error in Retweet');
      }
    }else{
      warnLogin()
    setOpenLogin(true)
    }
  }
  const isRetweeted=async ()=>{
    let res=await fetch(`${config.baseUrl}/api/is/retweeted?id=${post._id}`,{
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
      if(data.retweetexist)
      setIsretweet("Retweeted")
      else
      setIsretweet("Retweet")
    }
    else{
      
    }
    setRetweets(data.retweets)
  }
  useEffect( () => {
    if(user){
    likepost()
    savepost()
    isRetweeted()
    }
 }, [user]);
  return (
    <div className='flex flex-row justify-around items-center p-3'>

        <p onClick={like} className={`hidden xs:block ${dark?"text-[#f93838]":"text-red-700"} text-[0.9rem] font-bold cursor-pointer`}>{likes} {islike}</p>

        <div className='flex xs:hidden flex-row cursor-pointer text-[#f93838] justify-center items-center'>{likes} 
        {islike==='Like' && <img src={llike} alt="like" onClick={like} className='block xs:hidden h-[23px] w-[23px] m-1' />} 
        {islike!=='Like' && <img src={liked} alt="liked" onClick={like} className='block xs:hidden h-[23px] w-[23px] m-1' /> }
        </div>

        <p className={`hidden xs:block ${dark?"text-[#f4c838]":"text-[#fd980c]"} text-[0.9rem] font-bold cursor-pointer`} onClick={()=>{navigate(`/post/${post._id}`)}}>{post.comments.length} Comments</p>

        <div className={`flex xs:hidden cursor-pointer flex-row ${dark?"text-[#f4c838]":"text-[#fd980c]"} justify-center items-center`}>{post.comments.length} 
         <img src={comment} alt="comment" onClick={()=>{navigate(`/post/${post._id}`)}} className='block xs:hidden h-[25px] w-[25px] m-1' />
        </div>

        {post.type!=='Retweet' && <button onClick={retweet} id='retweet' className={`hidden xs:block text-[#3a3afb] text-[0.9rem] font-bold cursor-pointer`} >{retweets} {isretweet}</button>}

        {post.type!=='Retweet' && <div className='flex xs:hidden cursor-pointer flex-row text-[#3a3afb] justify-center items-center'>{retweets} 
        {isretweet==='Retweet' && <img src={Rretweet} alt="retweet" onClick={retweet} className='block xs:hidden h-[23px] w-[23px] m-1' />} 
        {isretweet!=='Retweet' && <img src={Rretweeted} alt="retweeted" onClick={retweet} className='block xs:hidden h-[23px] w-[23px] m-1' /> }
        </div>}


        <p onClick={bookmark} className={`hidden xs:block ${dark?"text-[#3ff339]":"text-green-600"} text-[0.9rem] font-bold cursor-pointer`}>{issave}</p> 

        {issave==='Save' && <img src={save} alt="save" onClick={bookmark} className='block xs:hidden cursor-pointer h-[23px] w-[23px]' />}  
        {issave!=='Save' && <img src={saved} alt="saved" onClick={bookmark} className='block xs:hidden cursor-pointer h-[23px] w-[23px]' /> }
    </div>
  )
}

export default PostFooter
