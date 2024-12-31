import React,{useContext,useEffect,useState} from 'react'
import { appState } from '../App'
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import config from '../source'

const EditProfileForm = () => {
  const Navigate=useNavigate()
    const {toastInfo,toastSuccess,toastError,editProfile,setEditProfile,user,setUser,dark,toast}=useContext(appState);
    const [photo,setPhoto]=useState('')

      const handlePhotoUpload=(e)=>{
        setPhoto(e.target.files[0])
      }
    const submit=async ()=>{
    const formData = new FormData();
    formData.append('avatar', photo);
    formData.append('description', formik.values.description);
    formData.append('name', formik.values.name);
        let res=await fetch(`${config.baseUrl}/api/user/update`,{
            method:"POST",
            credentials:'include', 
            body:formData
          })
  document.getElementById("update_profile").value = "";
          const data=await res.json();
          if(res.status===200){
            setPhoto('')
            toastSuccess('sucessfully Updated your profile');
            setUser(data.user)
            setEditProfile(false)
          }
          else{         
            toastError('error in updating profile');
          }
    }
    const formik = useFormik({
      initialValues: {
        email:'',
        name:'',
        description:'',
      },
      validationSchema:Yup.object({
        name:Yup.string()
        .min(6,'password must be min 6 characters')
        .required('required'),
        email:Yup.string()
        .email('Enter valid email')
        .required('required'),
      }),
      onSubmit:submit
    });
    useEffect( () => {
     if(user){
      formik.values.email=user.email;
      formik.values.name=user.name;
      if(user.description===undefined){
        formik.values.description='';
      }
      else formik.values.description=user.description
     }
   }, [user]);
  return (
    <div className={`${editProfile?"":"hidden"} transition duration-150 ease-in-out absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-8 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"}  rounded-2xl border-2 `}>
    <form action=""  className=' flex flex-col gap-6' enctype="multipart/form-data"  >
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`} >Your Email</span>
          <input 
          type="email" 
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="what's your email?"
          className={`${dark?"bg-blue-900 placeholder:text-secondary":"bg-white"} py-4 px-4  text-red-400 rounded-lg outline-none border-none font-medium`}
          disabled
          />
          {formik.touched.email && formik.errors.email && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.email}</p>}
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
          <input 
          type="text" 
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Name?"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
          {formik.touched.name && formik.errors.name && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.name}</p>}
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Description About You</span>
          <textarea 
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
           cols="30" 
           rows="5"
           className={`${dark?"bg-blue-900 text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black"} py-4 px-3 rounded-lg outline-none border-none font-medium resize-none`}
           ></textarea>
           {formik.touched.description && formik.errors.description && <p className={`${dark?"text-white":"text-red-600"} text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.description}</p>}
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Update Profile Photo with</span>
          <input id='update_profile' className='rounded-full cursor-pointer h-[1.9rem] bg-slate-600 text-[#3ddcf9]' type="file" name='photo'  placeholder="profile picture" onChange={handlePhotoUpload} />
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Change password !</span>
         <p className='text-[0.9rem] -mt-2 ml-2 underline  decoration-red-600'>To change password log-out and in log-in form go to forgot password</p>
        </label>
        
   
    </form>
    <div className='m-6 mb-3 right-3 font-medium'>
    <button className={`h-[42px] ${dark?"hover:bg-slate-700":"hover:bg-slate-100"} rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 `} onClick={()=>{setEditProfile(false); formik.values.email=user.email;
      formik.values.name=user.name;
      if(user.description===undefined){
        formik.values.description='';
      }
      else formik.values.description=user.description}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={formik.handleSubmit}>Update</button>
    </div>
  </div>
  )
}

export default EditProfileForm
