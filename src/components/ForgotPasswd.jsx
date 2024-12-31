import React,{useState,useContext,forwardRef } from 'react'
import {appState} from '../App'
import backArrow from '../assets/backArrow.gif'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import config from '../source'

const ForgotPasswd = forwardRef((props,ref) => {
  const {toastInfo,toastSuccess,toastError,forgotPasswdForm,setForgotPasswdForm,dark,setOpenLogin,setpasswd,setSetpasswd,forgotpasswdemail,setForgotpasswdemail,toast}=useContext(appState);

      const handleKeyEnter=(e)=>{
        if(e.key=='Enter'){
          formik.handleSubmit()
        }
       }
      const submit=async ()=>{
        let res=await fetch(`${config.baseUrl}/api/user/sendOtp`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include', 
            body:JSON.stringify({
                email:formik.values.email
            })
          })
          let data=await res.json();
          if(res.status===200){
            setForgotPasswdForm(false)
            setSetpasswd(true)
            setForgotpasswdemail(data.email);
            toastInfo('OTP sent to email');
          }else{
            toastError('error in sending OTP to email');
          }
        formik.values.email="";
      }
      const formik = useFormik({
        initialValues: {
          email: ''
        },
        validationSchema:Yup.object({
          email:Yup.string()
          .email('Enter valid email')
          .required('required')
        }),
        onSubmit:submit
      });
     
      
  return (
    <div ref={ref} className={`${forgotPasswdForm?"":"hidden"} transition duration-150 ease-in-out  absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-8 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6 mb-3' onKeyUp={handleKeyEnter}>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Email</span>
          <input 
          type="email" 
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Email"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
           {formik.touched.email && formik.errors.email && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.email}</p>}
        </label>   
    </form>
    <div className='m-6 mb-4 right-3 font-medium' >
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-red-500 hover:bg-red-600`} onClick={()=>{setForgotPasswdForm(false);setOpenLogin(true);formik.values.email="";}} >&larr;Back</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1  ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`}  onClick={formik.handleSubmit}>Send OTP</button>
    </div>
  </div>
  )
})

export default ForgotPasswd
