import React,{useState,useContext} from 'react'
import {appState} from '../App'
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import config from '../source'

const Login = () => {
  const {toastWarn,toastInfo,toastSuccess,toastError,openLogin,setOpenLogin,dark,calluser,setOpenSignUp,toast,setForgotPasswdForm}=useContext(appState);
  const navigate=useNavigate();
     const submit=async ()=>{
        const {email,password}=formik.values
        let res=await fetch(`${config.baseUrl}/api/user/create-session`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include', 
            body:JSON.stringify({
                email,password
            })
          })
          const data=await res.json();
          if(res.status===200){
              calluser();
              toastSuccess('sucessfully Logged In');
              navigate('/')
              setOpenLogin(false)
          }
          else if(res.status===401){              
                toastWarn('Invalid email/password');
          }
          else if(res.status===404){            
            toastWarn('Please Sign-up');
          }else{
            toastError('error in log-in');
          }
       formik.values.email='';
       formik.values.password='';
     }
     const forgotpassword=()=>{
        setOpenLogin(false)
        setForgotPasswdForm(true);
     }
     const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema:Yup.object({
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
      }),
      onSubmit:submit
    });
     const handleKeyEnter=(e)=>{
      if(e.key=='Enter'){
        formik.handleSubmit()
      }
     }
  return (
    <div className={`${openLogin?"":"hidden"} transition duration-150 ease-in-out  absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-8 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6 mb-3' onKeyUp={handleKeyEnter}>
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
          {formik.touched.email && formik.errors.email && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.email}</p>}
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Password</span>
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
   
    </form>
    <span className={`${dark?"text-white hover:text-secondary":"text-red-700 hover:text-black"} cursor-pointer ml-5 text-[0.8rem]  tracking-widest`} onClick={forgotpassword} >forgot password?</span>
    <div className='m-6 mb-4 right-3 font-medium' >
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"}`} onClick={()=>{setOpenLogin(false)}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 bg-green-600 hover:bg-green-700 ${dark?"":" text-white"}`} onClick={formik.handleSubmit}>Login</button>
    <span className={`${dark?"text-white hover:text-secondary":"text-red-800 hover:text-black"} cursor-pointer ml-5 text-[0.8rem]  tracking-widest`} onClick={()=>{setOpenLogin(false);setOpenSignUp(true);formik.values.email='';
       formik.values.password='';}}>SignUp</span>

    </div>
  </div>
  )
}

export default Login
