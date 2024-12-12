import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import {  Navigate, useParams } from "react-router-dom"
import axios from "axios"

import AccountNav from "../accountNav";




export default function Account() {
     const [homepage,sethomepage]=useState(null);
    const{ready,user,setUser}=useContext(UserContext)
    
    if(ready===null){
    return "loading...."
    }
    
    if(ready && !user && homepage){
        return <Navigate to={'/loging'}/>
    }

    function logout (){
     axios.post('/logout')
     sethomepage('/')
      setUser(null)
    }

    if(homepage){
      return <Navigate to={homepage}/>
     }
    
  return (
    <div>
       <AccountNav/>
       <div className="text-center max-w-lg mx-auto">
            logged in as {user.name} {user.email} <br/>
            <button onClick={logout} className="primary max-w-sm mt-2"> log out</button>
        </div>
       
       
    </div>
  )
}
