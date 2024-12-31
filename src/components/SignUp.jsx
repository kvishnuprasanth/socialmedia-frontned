import React,{useState,useContext} from 'react'
import { appState } from '../App'
import avatar_1 from '../assets/avatar_1.png'
import avatar_2 from '../assets/avatar_2.png'
import avatar_3 from '../assets/avatar_3.png'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import config from '../source'

const SignUp = () => {
  const {toastWarn,toastInfo,toastSuccess,toastError,openSignUp,setOpenSignUp,dark,setOpenLogin,toast}=useContext(appState)
  const [latest,setlatest]=useState('');
  const [photo,setPhoto]=useState('');
      const submit=async ()=>{
        const formData = new FormData();
        formData.append('avatar', photo);
        formData.append('email', formik.values.email);
        formData.append('password', formik.values.password);
        formData.append('confirm_password', formik.values.confirm_password);
        formData.append('name', formik.values.name);
        formData.append('latest', latest);
        if(formik.values.password!==formik.values.confirm_password) {
          toastWarn('Password does not match');
            return ;
        }
        if(latest==='' || (photo==='' && latest!=='avatar_1' && latest!=='avatar_2' && latest!=='avatar_3')) {
          toastWarn('Photo is compulsary');
            return ;
        }
       let res= await fetch(`${config.baseUrl}/api/user/create`,{
            method:"POST",
            body:formData
        })
        const data=await res.json();
        document.getElementById("update_profile").value = "";
        if(res.status===200){            
              toastSuccess('sucessfully registered');
            
            setOpenSignUp(false)
            setOpenLogin(true)
        }
        else if(res.status===401){
          toastWarn('password does not match');
        }
        else if(res.status===400){
          toastWarn('user already exists .. please log-in');
          setOpenSignUp(false)
          setOpenLogin(true)
        }
        else{           
            toastError('unable to register');
        }
        formik.values.name='';
        formik.values.email='';
        formik.values.password='';
        formik.values.confirm_password='';
      }
      const formik = useFormik({
        initialValues: {
          name:'',
          email:'',
          password:'',
          confirm_password:'',
        },
        validationSchema:Yup.object({
          name:Yup.string()
          .min(6,'name must be min 6 characters')
          .required('required'),
          email:Yup.string()
          .email('Enter valid email')
          .required('required'),
          password:Yup.string()
          .min(6,'password must be min 6 characters')
          .matches(/[0-9]/, 'Password requires a number')
          .matches(/[a-z]/, 'Password requires a lowercase letter')
          .matches(/[A-Z]/, 'Password requires an uppercase letter')
          .matches(/[^\w]/, 'Password requires a symbol')
          .required('required'),
          confirm_password:Yup.string()
          .min(6,'password must be min 6 characters')
          .matches(/[0-9]/, 'Password requires a number')
          .matches(/[a-z]/, 'Password requires a lowercase letter')
          .matches(/[A-Z]/, 'Password requires an uppercase letter')
          .matches(/[^\w]/, 'Password requires a symbol')
          .required('required'),
        }),
        onSubmit:submit
      });
      const handleKeyEnter=(e)=>{
        if(e.key=='Enter'){
          formik.handleSubmit();
        }
       }
       const handlePhotoUpload=(e)=>{
        setPhoto(e.target.files[0])
      }
  return (
    <div className={`${openSignUp?"block":"hidden"} transition duration-150 ease-in-out absolute z-40 top-4 left-[10%] sm:left-[30%] h-auto p-8 pb-3 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2 `}>
      <form action=""  className=' flex flex-col gap-6' onKeyUp={handleKeyEnter} enctype="multipart/form-data" >
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
            <input 
            type="text" 
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="what's your name?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
              {formik.touched.name && formik.errors.name && <p className={`${dark?"text-white ":"text-red-600 "} text-[0.8rem] ml-1  tracking-widest`}>{formik.errors.name}</p>}
          </label>
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Email</span>
            <input 
            type="email" 
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="what's your email?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
              {formik.touched.email && formik.errors.email && <p className={`${dark?"text-white ":"text-red-600 "} text-[0.8rem] ml-1  tracking-widest`}>{formik.errors.email}</p>}
          </label>
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Password</span>
            <input 
            type="password" 
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter password?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
              {formik.touched.password && formik.errors.password && <p className={`${dark?"text-white ":"text-red-600 "} text-[0.8rem] ml-1  tracking-widest`}>{formik.errors.password}</p>}
          </label>
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Confirm_Password</span>
            <input 
            type="password" 
            name='confirm_password'
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Confirm_password?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
              {formik.touched.confirm_password && formik.errors.confirm_password && <p className={`${dark?"text-white ":"text-red-600 "} text-[0.8rem] ml-1  tracking-widest`}>{formik.errors.confirm_password}</p>}
          </label>
          
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Choose Avatar</span>
            <div className='flex flex-row justify-around items-center'>
              <img src={avatar_1} alt="avatar_1" className={`rounded-full h-[100px] w-[100px] hover:bg-slate-400 ${latest==='avatar_1'?'bg-slate-400':''} p-1 delay-75 cursor-pointer`} onClick={()=>{setlatest('avatar_1');setPhoto('')}}/>
              <img src={avatar_2} alt="avatar_2" className={`rounded-full h-[100px] w-[100px] hover:bg-slate-400 ${latest==='avatar_2'?'bg-slate-400':''} p-1 delay-75 cursor-pointer`} onClick={()=>{setlatest('avatar_2');setPhoto('')}}/>
              <img src={avatar_3} alt="avatar_3" className={`rounded-full h-[100px] w-[100px] hover:bg-slate-400 ${latest==='avatar_3'?'bg-slate-400':''} p-1 delay-75 cursor-pointer`} onClick={()=>{setlatest('avatar_3');setPhoto('')}}/>
            </div>
          </label>

          <p className='flex justify-center items-center text-[1.125rem] font-medium left-[20%] text-red-600 -mb-3'>....... OR ........</p>
          <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Upload Profile Photo</span>
          <input id='update_profile' className='rounded-full cursor-pointer h-[1.9rem] bg-slate-600 text-[#3ddcf9]' type="file" name='photo'  placeholder="profile picture" onChange={handlePhotoUpload} onClick={()=>{setlatest('upload')}} />
        </label>
      </form>
      <div className='m-6 mb-3 right-3 font-medium'>
      <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"}`} onClick={()=>{setOpenSignUp(false); formik.values.name='';
        formik.values.email='';
        formik.values.password='';
        formik.values.confirm_password='';}} >Cancel</button>
        <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"":" text-white"} bg-red-600 hover:bg-red-700`} onClick={formik.handleSubmit}>SignUp</button>
        <span className={`${dark?"text-white hover:text-secondary":"text-green-800 hover:text-black"} cursor-pointer ml-5 text-[0.8rem]  tracking-widest`} onClick={()=>{setOpenSignUp(false);setOpenLogin(true); formik.values.name='';
        formik.values.email='';
        formik.values.password='';
        formik.values.confirm_password='';}}>Login</span>
      </div>
    </div>
  )
}

export default SignUp
