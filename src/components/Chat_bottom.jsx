import React,{useState,useContext} from 'react'
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile ,BsEmojiSmileFill} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import {appState} from '../App'
import { useNavigate ,useParams} from 'react-router-dom'
import config from '../source'

const Chat_bottom = ({msgs,setMsgs,chatSocket}) => {
    const {id}=useParams()
    const {dark,isEmojiOpen,setIsEmojiOpen,user}=useContext(appState);
    const [message,setMessage]=useState('')
    const handlemessageChange=(e)=>{
        setMessage(e.target.value)
    }
    const sendMsg=async ()=>{
        let res=await fetch(`${config.baseUrl}/api/chat/addMessage`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
          credentials:'include', 
            body:JSON.stringify({
                from:user._id,
                to:id,
                message: message,
            })
          })
          let data=await res.json();
          if(res.status===200){
            setMessage('');
            setMsgs([...msgs,data.msg])
            console.log(data.toEmailUser);
            console.log(data.msgId);
            chatSocket.emit("send-msg", {
              to: id,
              from: user._id,
              msg:message,
              fromEmail:user?.email,
              toEmail:data.toEmailUser?.email,
              userId:user._id,
              messageId:data?.msgId
            });
          }
          
    }
    const handleEmojiClick = (emojiObject) => {
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
      };
      const handleEnter=(e)=>{
        if(e.key==='Enter'){
          sendMsg();
        }
      }
  return (
    <div className={`absolute bottom-6 rounded-3xl h-[55px] w-[95%] ${dark?'bg-gray-800':'bg-slate-100 border-2 border-slate-400'} z-10 `} >
      <div className="relative text-white w-[100%] h-[53px] p-4 flex flex-row justify-around items-center">
     {isEmojiOpen && <div className='absolute bottom-14 left-10'>
     <EmojiPicker onEmojiClick={handleEmojiClick} theme={`${dark?'dark':'light'}`} height='350px' width='300px' />
     </div>}
    <div className={`rounded-full  ${dark?'':'bg-gray-600'} mx-1 hover:bg-gray-700`}>
    {isEmojiOpen && <BsEmojiSmileFill size='33px' className=' cursor-pointer' onClick={()=>{setIsEmojiOpen(false)}}/>}
      {!isEmojiOpen && <BsEmojiSmile size='33px' className='cursor-pointer' onClick={()=>{setIsEmojiOpen(true)}} />}
    </div>
    <div>

    </div>
      <input type="text" onChange={handlemessageChange} onKeyUp={handleEnter} value={message} className={`${dark?'bg-black text-white':'bg-slate-300 text-black '} px-3 w-[87%] h-[44px] rounded-xl outline-none border-none font-poppins`} onClick={()=>{setIsEmojiOpen(false)}}/>
      <div  className=' cursor-pointer bg-green-600 mx-2 h-[38px] w-[50px] rounded-lg hover:bg-green-700 flex justify-center items-center pl-1 ' onClick={()=>{sendMsg();setIsEmojiOpen(false)}} >
      <IoMdSend size='25px'/>
      </div>
      </div>
    </div>
  )
}

export default Chat_bottom
