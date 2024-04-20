import React,{useEffect, useState} from 'react'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS } from '../constants/user';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const [val,setVal ] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const navigate = useNavigate();
  
  const handler = async()=>{
    if(val){ // register user
      const details = {
        name , email , password : pass
      }
      try {
        dispatch({
          type : USER_REGISTER_REQUEST
        })
        const {data} = await axios.post('http://localhost:4000/api/v1/user/register',details, { withCredentials : true});
        dispatch({
          type : USER_REGISTER_SUCCESS,
          payload : data.user
        })
      } catch (error) {
        dispatch({
          type : USER_REGISTER_FAIL
        })
      }   
    }else{ //login user
      const details = { email, password : pass};
      console.log(details);
      try {
        dispatch({
          type : USER_LOGIN_REQUEST
        })
        const {data} = await axios.post('http://localhost:4000/api/v1/user/login',details, {withCredentials : true});
        dispatch({
          type : USER_LOGIN_SUCCESS,
          payload : data.user
        })
      } catch (error) {
        dispatch({
          type : USER_LOGIN_FAIL
        })
      }   
    }
  }
  const {isAuth,user} = useSelector((store) => store.user);

  useEffect(()=>{
    if(user != null){
      navigate('/home')
    }
  },[isAuth,navigate])
  return (
    <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-orange-500">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
    </svg>
      <h1 class="title-font font-medium text-3xl text-white">
        Snippeter</h1>

      <p class="leading-relaxed mt-4 font-semibold">
      "Unlocking Code Creativity: Where Every Line Is a Snippet of Brilliance!"</p>
    </div>
    <div class="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 class="text-white text-lg font-medium title-font mb-5">{val===true ? ('Sign Up') : ('Sign In')}</h2>
      {val===true && (<div class="relative mb-4">
        <label for="full-name" class="leading-7 text-sm text-gray-400">Full Name</label>
        <input 
        onChange={(e)=>setName(e.target.value)} value={name}
        type="text" id="full-name" name="full-name" class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>)}
      <div class="relative mb-4">
        <label 
        for="email" class="leading-7 text-sm text-gray-400">Email</label>
        <input 
        onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email" id="email" name="email" class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <label for="password" class="leading-7 text-sm text-gray-400">Password</label>
        <input 
        onChange={(e)=>setPass(e.target.value)} value={pass}
        type="password" id="password" name="passowrd" class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button onClick={handler} 
      class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{val ? ('Register') : ('Sign in')}</button>
      <button onClick={()=>setVal(!val)} class="text-xs mt-3 hover:text-indigo-500">{val ? ('Already have an account ? Login') : ('Create an account ? Register')}   </button>
    </div>
  </div>
</section>
  )
}
