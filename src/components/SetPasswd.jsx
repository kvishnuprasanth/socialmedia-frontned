import React,{useState,useContext} from 'react'
import {appState} from '../App'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import config from '../source'

const SetPasswd = () => {
    const {toastWarn,toastInfo,toastSuccess,toastError,openLogin,setOpenLogin,dark,setOpenSignUp,setForgotPasswdForm,setpasswd,setSetpasswd,forgotpasswdemail,toast}=useContext(appState);

      const handleKeyEnter=(e)=>{
        if(e.key=='Enter'){
          formik.handleSubmit()
        }
       }
      const submit=async ()=>{
        const {password,confirm_password,otp}=formik.values
        if(password!==confirm_password) {
          toastWarn('Password does not match');
            return ;
        }
        let res=await fetch(`${config.baseUrl}/api/user/verifyOtp`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include', 
            body:JSON.stringify({
                password,confirm_password,otp,email:forgotpasswdemail
            })
          })
          let data=await res.json();
          if(res.status===200){
            setSetpasswd(false)
            setOpenLogin(true)
            toastSuccess('sucessfully changed password');
          }else if(res.status===400){
            toastWarn('Password does not match');
          }else if(res.status===401){
            toastWarn('Invalid OTP');
          }
          else{
            toastError('error in changing password');
          }
          formik.values.password='';
           formik.values.confirm_password='';
           formik.values.otp='';
      }
      const formik = useFormik({
      initialValues: {
        password:'',
        confirm_password:'',
        otp:''
      },
      validationSchema:Yup.object({
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
        otp:Yup.string().required('required'),
      }),
      onSubmit:submit
    });
  return (
    <div className={`${setpasswd?"":"hidden"} transition duration-150 ease-in-out  absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-8 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6 mb-3' onKeyUp={handleKeyEnter}>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Password</span>
          <input 
          type="password" 
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter password"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
           {formik.touched.password && formik.errors.password && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.password}</p>}
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Confirm Password</span>
          <input 
          type="password" 
          name='confirm_password'
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirm_password"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
           {formik.touched.confirm_password && formik.errors.confirm_password && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.confirm_password}</p>}
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Enter OTP</span>
          <input 
          type="text" 
          name='otp'
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter OTP"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
           {formik.touched.otp && formik.errors.otp && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.otp}</p>}
        </label>
   
    </form>
    <div className='m-6 mb-4 right-3 font-medium' >
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-red-500 hover:bg-red-600`} onClick={()=>{setSetpasswd(false);setForgotPasswdForm(true);formik.values.password='';
           formik.values.confirm_password='';
           formik.values.otp='';}} >&larr;Back</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={formik.handleSubmit}>Submit</button>

    </div>
  </div>
  )
}

export default SetPasswd
