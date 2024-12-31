import React,{useState,useContext} from 'react'
import {appState} from '../App'
import config from '../source'

const CreatePostForm = () => {
    const {toastInfo,toastSuccess,toastError,postForm,setPostForm,dark,toast,setPosts,posts,postsSocket}=useContext(appState);

    const [post,setpost]=useState("")
    const [photo,setPhoto]=useState("")

      const handleChange=(e)=>{
        setpost(e.target.value)
      }
      const handlePostUpload=(e)=>{
        setPhoto(e.target.files[0])
      }
      
     const submit=async ()=>{
      if(post==='' && photo===''){
        toastInfo('Comment cannot be empty');
          return ;
      }
        const formData = new FormData();
        formData.append('postPhoto', photo);
        formData.append('content', post);
        let res=await fetch(`${config.baseUrl}/api/post/create`,{
            method:"POST",
            credentials:'include', 
            body:formData
          })
          let data=await res.json();
          if(res.status===200){
            setPostForm(false)
            document.getElementById("create_post").value = "";
            setpost("")
            setPhoto("")
              let newPost=data.post;
              console.log(newPost);
              postsSocket.emit("uploadedPost",{newPost});
              toastSuccess('sucessfully created post');  
          }
          else{             
              toastError('error in creating a post');
          }
     }
  return (
    <div className={`${postForm?"":"hidden"} transition duration-150 ease-in-out absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-4 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6' enctype="multipart/form-data">
    <label className='flex flex-col'>
          <span className={`${dark?"text-[#42f8ec]":"text-[#0f3330]"} font-medium text-[1.125rem] mb-4`}>Create Post</span>
          <textarea name="content" className={`p-2 ${dark?"bg-black":"bg-slate-100"} resize-none rounded-2xl`} value={post} onChange={(e)=>handleChange(e)} cols="30" rows="7"></textarea>
        </label>
        <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Upload Post Photo</span>
          <input id='create_post' className='rounded-full cursor-pointer h-[1.9rem] bg-slate-600 text-[#3ddcf9]' type="file" name='photo'  placeholder="profile picture" onChange={handlePostUpload} />
        </label>
    </form>
    <div className='m-6 mb-3 right-3 font-medium'>
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"}`} onClick={()=>{setPostForm(false)}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={submit}>Post</button>
    </div>
      
  </div>
  )
}

export default CreatePostForm
