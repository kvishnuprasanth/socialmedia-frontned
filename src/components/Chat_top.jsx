import React,{useContext,useState,useEffect} from 'react'
import logo from '../assets/logo.png'
import {appState} from '../App'
import { useNavigate ,useParams} from 'react-router-dom'
import backArrow from '../assets/backArrow.png'
import config from '../source'

const Chat_top = () => {
    const [receiver,setReceiver]=useState({});
    const {dark,setNotificatioOn}=useContext(appState);
    const navigate=useNavigate();
    const {id}=useParams()
    const getReceiver=async ()=>{
        let res= await fetch(`${config.baseUrl}/api/user/getReceiver/${id}`,{
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
          setReceiver(data.user);
    }
    useEffect( () => {
        getReceiver();
     }, []);
  return (
    <div className={`absolute top-0 w-[100%] h-[80px] flex flex-row items-center ${dark?'bg-blue-950':'bg-slate-300'} px-5 z-10`}>
      <img src={backArrow} alt="back" className='h-[45px] w-[45px] mr-2 -ml-1 cursor-pointer' onClick={()=>{navigate(-1);setNotificatioOn(false)}} />
      {receiver && <img src={`${receiver.photoLocal?`${config.baseUrl}/photo/${receiver.photoLocal_path}?${Date.now()}`:`${config.baseUrl}/api/user/userAvatar/${receiver._id}?${Date.now()}`}`} alt="logo" onClick={()=>{navigate(`/people/${id}`)}} className='-ml-1 h-[60px] w-[60px] m-3 rounded-full cursor-pointer' />}
     {receiver && <div className='flex flex-col'>
        <h3 className='font-bold text-xl mt-3'>{receiver.name}</h3>
        <p className={`${dark?"text-[#f9990a]":"text-[#bf2bf1]"} text-[0.9rem] `}>#{receiver.email}</p>
      </div>}
    </div>
  )
}

export default Chat_top
