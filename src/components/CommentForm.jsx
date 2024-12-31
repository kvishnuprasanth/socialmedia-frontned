import React,{useState,useContext} from 'react'
import {appState} from '../App'
import {Comment} from '../components'
import ReactDOM from 'react-dom';
import config from '../source'

const CommentForm = () => {
    const {toastError,toastSuccess,toastInfo,openComment,setOpenComment,commentpostId,setCommentpostId,dark,toast,commentEvent,setCommentEvent,user,comments,setComments}=useContext(appState);


    const [comment,setComment]=useState("")
      const handleChange=(e)=>{
        setComment(e.target.value)
      }
     const submit=async ()=>{
      if(comment===''){
        toastInfo('Comment cannot be empty');
          return ;
      }
        let res=await fetch(`${config.baseUrl}/api/comment/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
          credentials:'include', 
            body:JSON.stringify({
                post:commentpostId,
                content:comment
            })
          })
          const data=await res.json();
          if(res.status===200){
            setComments([...comments,data.comment]);
            setOpenComment(false)
            setComment('')
            toastSuccess('Comment created');              
          }
          else{
              toastError('error in creating a Comment');
          }
     }
  return (
    <div className={`${openComment?"":"hidden"} transition duration-150 ease-in-out  absolute z-40 top-10 left-[10%] sm:left-[30%] h-[350px] p-4 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2 `}>
    <form action=""  className=' flex flex-col gap-6'>
    <label className='flex flex-col'>
          <span className={`${dark?"text-[#42f8ec]":"text-[#0f3330]"} font-medium text-[1.125rem] mb-4`}>Your Comment</span>
          <textarea name="content" className={`p-2 ${dark?"bg-black":"bg-slate-100"} resize-none rounded-2xl`} value={comment} onChange={(e)=>handleChange(e)} cols="30" rows="7"></textarea>
        </label>
    </form>
    <div className='m-6 right-3 font-medium'>
    <button className={`h-[42px] rounded-xl border-2 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"} border-slate-600 w-[80px] m-2 p-1 `} onClick={()=>{setOpenComment(false)}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={submit}>Comment</button>
    </div>
  </div>
  )
}

export default CommentForm
