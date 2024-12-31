import React,{useContext,forwardRef} from 'react'
import {appState} from '../App'
import close from '../assets/close.svg'


const ConfirmForm = forwardRef ((props,ref) => {
    const {dark,toast,confirmForm,setConfirmForm,confirm,setConfirm,setPostId}=useContext(appState);
  return (
    <div ref={ref} className={`${confirmForm?"":"hidden"} transition duration-150 ease-in-out  absolute z-40 top-20 left-[20%] sm:left-[40%] flex flex-col justify-center items-center h-auto p-8 pb-0 w-[55%] ss:w-[300px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2 `}>
        <h3 className='text-[30px] m-2 mt-0 font-medium'>sure?</h3>
        <p className='text-[20px]'>confirm to delete a Post</p>
        <button className={`h-[42px] rounded-xl font-medium text-[18px] w-[180px] m-2 my-7 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={()=>{setConfirm(true)}}>Confirm</button>
      <img src={close} className={`top-3 right-3 absolute cursor-pointer ${dark?'':'bg-slate-800 p-1 hover:bg-slate-700 rounded-full'}`} alt="close" onClick={()=>{setConfirmForm(false);setPostId('')}}/>
    </div>
  )
})

export default ConfirmForm
