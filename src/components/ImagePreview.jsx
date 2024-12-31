import React,{useContext} from 'react'
import {appState} from '../App'
import close from '../assets/close.svg'


const ImagePreview = () => {
    const {imgPreview,setImgPreview,imgsrc,setimgsrc}=useContext(appState);
  return (
   <div className='bg-gray-900 bg-opacity-80 relative  transition duration-150 ease-in-out  flex justify-center items-center  h-[100vh] w-[100vw] z-40' >
    <img src={close} alt="close" className='absolute top-5 right-9 cursor-pointer' onClick={()=>{setImgPreview(false)}}/>
    <img className=' px-5 w-[70%] h-[95%] rounded-xl object-contain mt-3' src={imgsrc} alt="imagePreview" />
   </div>
  )
}

export default ImagePreview
