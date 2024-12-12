import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Logingpage(){
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")
    const [reDirect,setRedirect]=useState(false);
   const{setUser}=useContext(UserContext)

   async function handlelogin(e) {
    e.preventDefault()
    try{
      const {data}=await axios.post("/login",{email, password},{withCredentials:true})
      setUser(data)
      alert("login in succesfully")
     setRedirect(true)
    }catch(err){
        alert("login failed")

    }

   e.target.value="";

   }

   if(reDirect){
    return <Navigate to={'/'}/>
   }
    return (
        <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64" >
        <h1 className="text-4xl text-center mb-4">log in</h1>
            <form className="max-w-md mx-auto" onSubmit={handlelogin}>
                <input type="email" value={email} 
                onChange={e=>{setEmail(e.target.value)}} placeholder="your@email.com" />
                <input type="password" placeholder="password" value={password}
                 onChange={e=>{setPassword(e.target.value)}} />
                <button type="submit" className="primary">log in</button>
                <div className="text-center py-2 text-gray-500">
                dont have and account yet ? <Link className="underline text-black" to={"/register"}>
                register now</Link></div>
            </form>
        </div>
        </div>
    )
}