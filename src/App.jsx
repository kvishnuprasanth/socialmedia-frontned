import React,{useState,createContext,useEffect,useRef} from 'react'
import {Left,Home,Right,Signup,Login,Bookmark,Profile,Post,CommentForm,EditProfile,People,CreatePostForm,SetPasswd,ForgotPasswd,ImagePreview,ConfirmForm,Chat} from './components'
import {
  Routes,
  Route
} from "react-router-dom";
const appState=createContext()
//back drop
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import setBodyColor from './setBodyColor'
import config from './source'
import Notification from './components/Notification';
import notification_on from './assets/notification_on.png'
import notification_off from './assets/notification_off.png'
import Notificationsm from './components/Notificationsm';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



function App() {
  const navigate=useNavigate();
  const classes=useStyles();
  const postsSocket = io(`${config.baseUrl}/posts`);

  const [user,setUser]=useState(undefined);
  const [openLogin,setOpenLogin]=useState(false);
  const [openComment,setOpenComment]=useState(false);
  const [openSignUp,setOpenSignUp]=useState(false);
  const [isEmojiOpen,setIsEmojiOpen]=useState(false);
  const [commentpostId,setCommentpostId]=useState(false);
  const [editProfile,setEditProfile]=useState(false);
  const [following,setFollowing]=useState([]);
  const [postForm,setPostForm]=useState(false);
  const [posts,setPosts]=useState([]);
  const [comments,setComments]=useState([]);
  const [msgs,setMsgs]=useState([])
  const [followingLoader,setFollowingLoader]=useState(false);
  const [loading,setLoading]=useState(false);
  const [retweetLoader,setRetweetLoader]=useState(false);
  const [dark,setDark]=useState(true);
  const [forgotPasswdForm,setForgotPasswdForm]=useState(false);
  const [setpasswd,setSetpasswd]=useState(false);
  const [forgotpasswdemail,setForgotpasswdemail]=useState('');
  const [imgPreview,setImgPreview]=useState(false);
  const [confirm,setConfirm]=useState(false);
  const [notificatioOn,setNotificatioOn]=useState(false);
  const [confirmForm,setConfirmForm]=useState(false);
  const [followingDiv,setFollowingDiv]=useState(false);
  const [notificationDiv,setNotificationDiv]=useState(false);
  const [commentEvent,setCommentEvent]=useState(undefined);
  const [arrivalWarn,setArrivalWarn]=useState(null);
  const [postId,setPostId]=useState('');
  const [imgsrc,setimgsrc]=useState('');
  const [commentId,setCommentId]=useState('');
  const [messageId,setMessageId]=useState('');
  const confirmFormchild=useRef(null);
  const forgotPasswdFormchild=useRef(null);
  
  const warnLogin = ()=>{
    setArrivalWarn('warn')
    setTimeout(()=>{
      setArrivalWarn(null)
    },400)
  }

  const toastInfo=(message)=>{
    toast.info(message, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  const toastSuccess=(message)=>{
    toast.success(message, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  const toastError=(message)=>{
    toast.error(message, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  const toastWarn=(message)=>{
    toast.warn(message, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
    const calluser=async ()=>{
      try {
        // setLoading(true)
        let res= await fetch(`${config.baseUrl}/api/user/getuser`,{
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
        setLoading(false)
        if(res.status===200){
          setUser(data.can);
          callfollowing()
      }
      else{
          setUser(undefined)
          warnLogin();
      }
      } catch (err) {
        toastError('error in authentication');
      }
    }
    const callfollowing=async ()=>{
      setFollowingLoader(true)
      let res= await fetch(`${config.baseUrl}/api/follow/following`,{
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
      setFollowingLoader(false)

        if(res.status===200){
          setFollowing(data.following)
        }else{
          setFollowing([])
        }
    }
    const handleBackDrop=()=>{
      setPostForm(false);
      setEditProfile(false);
      setOpenSignUp(false);
      setOpenComment(false);
      setOpenLogin(false);
      if(confirmForm){
        confirmFormchild.current.classList.remove(`bg-black-gradient`)
        confirmFormchild.current.classList.remove(`bg-slate-300`)
        confirmFormchild.current.classList.add(`${dark?'bg-slate-600':'bg-red-400'}`)
      }
      if(forgotPasswdForm){
        forgotPasswdFormchild.current.classList.remove(`bg-black-gradient`)
        forgotPasswdFormchild.current.classList.add(`${dark?'bg-slate-600':'bg-red-400'}`)
      }
    }
    const deletePost=async ()=>{
      let res= await fetch(`${config.baseUrl}/api/post/delete/${postId}`,{
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
      if(res.status===200){
        navigate('/')
        setConfirmForm(false)
        setConfirm(false);
        setPostId('')
        toastSuccess('Successfully deleted post');
      }
      else{
          toastError('error in deleting post');
      }
    }
    useEffect( () => {
      // console.log(config.baseUrl);
       calluser();
    }, []);
    useEffect( () => {
       if(postId && confirm){
        deletePost();
       }
    }, [confirm]);
    useEffect(() => {
      if(arrivalWarn){
        toastWarn('please log-in');
      }
    }, [arrivalWarn]);
    setBodyColor({color: `${dark?"black":"white"}`})
   

  return (
    <>
    {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
    <appState.Provider value={{toastWarn,toastInfo,toastSuccess,toastError,setNotificationDiv,messageId,setMessageId,commentId,setCommentId,warnLogin,user,setUser,openSignUp,setOpenSignUp,openLogin,setOpenLogin,posts,setPosts,openComment,setOpenComment,commentpostId,setCommentpostId,editProfile,setEditProfile,calluser,postForm,setPostForm,following,setFollowing,callfollowing,followingLoader,dark,setDark,toast,forgotPasswdForm,setForgotPasswdForm,setpasswd,setSetpasswd,forgotpasswdemail,setForgotpasswdemail,imgsrc,setimgsrc,imgPreview,setImgPreview,confirmForm,setConfirmForm,confirm,setConfirm,postId,setPostId,followingDiv,setFollowingDiv,commentEvent,setCommentEvent,comments,setComments,notificatioOn,setNotificatioOn,isEmojiOpen,setIsEmojiOpen,retweetLoader,setRetweetLoader,postsSocket}}>
    <div className={`${dark?"bg-primary text-white":"bg-white text-black"} h-full w-full flex flex-row `}>
      
     <Left/>
    <Signup/>
    <ForgotPasswd ref={forgotPasswdFormchild}/>
    <ConfirmForm ref={confirmFormchild}/>
    {imgPreview && <ImagePreview/>}
    <SetPasswd/>
    {(openSignUp || openComment || openLogin || postForm || editProfile || forgotPasswdForm || setpasswd || confirmForm) && <div className='bg-gray-900 bg-opacity-70  h-[170vh] w-[150vw] z-[39] ' onClick={handleBackDrop}></div>}
    <EditProfile/>
    <CommentForm/>
    <CreatePostForm/>
    <Login/>
    <div  className={`bg-gradient-to-b rounded-3xl fixed left-[9%] sm:left-[29%] top-6 right-4 bottom-4 z-0 ${dark?"from-black to-blue-950 border-slate-700":"bg-gray-200 border-slate-300"} h-full max-w-[95%] sm:max-w-[69%] p-1 flex flex-row sm:border-2  `}>
      
      <Routes >
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/bookmark' element={<Bookmark/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/post/:id' element={<Post/>} />
        <Route exact path='/people/:id' element={<People/>} />
        <Route exact path='/chat/:id' element={<Chat msgs={msgs} setMsgs={setMsgs}/>} />
      </Routes>
      {notificatioOn && <Notification/>}

      <div className='absolute h-10 w-10 right-1 -top-5 ss:hidden z-[12]' >
      {!notificationDiv && <img src={notification_off} alt="notification_off" className='absolute left-2 sw:left-7 sm:left-5 top-4 h-10 cursor-pointer' onClick={()=>{setNotificationDiv(true)}} />}
      {notificationDiv && <img src={notification_on} alt="notification_off" className='absolute left-2 sw:left-7 sm:left-5 top-3 h-12 w-10 cursor-pointer' onClick={()=>{setNotificationDiv(false)}} />}
      </div>
      {notificationDiv && <div className={`absolute flex ss:hidden z-[11] rounded-xl left-0 top-1  ${dark?"bg-primary text-white":"bg-white text-black"} h-full w-[90vw]  `}>
      <Notificationsm/>
    </div>}

     <Right/>
     {/* <Practice/> */}
     {/* <button onClick={calluser}>button</button> */}
    </div>
    </div>
    </appState.Provider>
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
/>
    </>
  )
}

export default App
export {appState}