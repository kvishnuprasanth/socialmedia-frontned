import React,{useContext,useEffect,useState,useRef} from 'react'
import {appState} from '../App'
import Chat_bottom from './Chat_bottom'
import Chat_top from './Chat_top'
import { useNavigate ,useParams} from 'react-router-dom'
import { io } from "socket.io-client";
import config from '../source'

const Chat = ({msgs,setMsgs}) => {
  const chatSocket= io(`${config.baseUrl}/chat`);
  const scrollRef = useRef();
  const targetDivRef = useRef(null);
    const {setNotificatioOn,messageId,setMessageId,dark,user,setIsEmojiOpen}=useContext(appState);
    const {id}=useParams()
  const [arrivalMessage, setArrivalMessage] = useState(null);
    const getmsgs=async ()=>{
      if(!id || !user) return ;
        let res=await fetch(`${config.baseUrl}/api/chat/getMessages`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
          credentials:'include', 
            body:JSON.stringify({
                from:user._id,
                to:id
            })
          })
          let data=await res.json();
          if(res.status === 200){
            setMsgs(data.projectedMessages)
          }
    }
    useEffect( () => {
       if(id && user) getmsgs();
     }, [user]);
      useEffect(() => {
        if (id && user) {
          chatSocket.emit("add-user", user._id);
        }
      }, [id]);
     
      useEffect(() => {
        if (chatSocket) {
          chatSocket.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
              });
        }
      }, []);
      useEffect(() => {
        arrivalMessage && setMsgs((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);
      useEffect(() => {
        if(messageId === '')
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
     }, [msgs]);

     useEffect(() => {
      if (targetDivRef.current && messageId !== '') {
        targetDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetDivRef.current.classList.add(`${dark?`bg-slate-800`:`bg-slate-100`}`)
        setTimeout(() => {
          targetDivRef.current.classList.remove(`${dark?`bg-slate-800`:`bg-slate-100`}`)
          setMessageId('')
        }, 700);
        // confirmFormchild.current.classList.add(`${dark?'bg-slate-600':'bg-red-400'}`)
      }
    }, [msgs,messageId]);
      
  return (
    <div className={`relative h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2 ${dark?"bg-black":"bg-slate-200"} flex flex-col overflow-scroll no-scrollbar `} onClick={()=>{setNotificatioOn(false)}} >
        <Chat_top/>
        <div className='relative w-[100%] h-[100%] pt-[84px] pb-[68px] flex flex-col text-white overflow-scroll no-scrollbar' ref={scrollRef} onClick={()=>{setIsEmojiOpen(false)}}>
        {msgs.map((msg,index)=>(
               <div className={`min-h-[42px] m-1 `} ref={msg.id === messageId ? targetDivRef : null} key={index}>
                <p className={`absolute flex justify-center items-center min-w-[60px] min-h-[30px] p-2 rounded-xl font-poppins ${msg.fromSelf?`right-3 bg-blue-700 `:`left-2 bg-violet-700`}`}>{msg.message}</p>
               </div>
        ))}
        </div>
        <Chat_bottom msgs={msgs} setMsgs={setMsgs} chatSocket={chatSocket}/> 
    </div>
  )
}

export default Chat
