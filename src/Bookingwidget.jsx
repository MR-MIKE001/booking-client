import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios"
import { Navigate } from "react-router-dom"
import { UserContext } from "./UserContext"

function Bookingwidget({place}) {
  
  const [checkin,setCheckin]=useState('')
  const [checkout,setCheckout]=useState('')
  const [maxGuest,setMaxGuest]=useState(1)
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [redirect,setRedirect]=useState('')
  const {user}=useContext(UserContext)
  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  },[user])
  let numberofdays=0;
  if(checkin&&checkout){
    numberofdays=differenceInCalendarDays(new Date(checkout),new Date(checkin))
  }

  async function bookthisplace(ev){
    ev.preventDefault()
    axios.post('/booking',{
      checkin,checkout,place:place._id,numberofguest:maxGuest,
       price:numberofdays*place.price,name,phone}).then(response=>{
        const {data}=response
       const bookingid=data._id;
        
        setRedirect(`/account/bookings`)
       }).catch(err=>{if(err) throw err;
  })

      
  }

  if(redirect){
    return <Navigate to={redirect}/>
    
  }
  
  return (
    <><div className="bg-white shadow rounded-2xl  ">
    <div className="text-2xl text-center"> price: ${place.price}/per night</div>
   <div className="border rounded-2xl mt-4">
   <div className="flex">
   <div className=" px-3 py-4 ">
      <label  >check in:</label>
       <input type="date" value={checkin} onChange={ev=>setCheckin(ev.target.value)}/>
   </div>
    <div className=" py-3 px-4 border-l " >
      <label >check out: </label>
       <input type="date" value={checkout} onChange={ev=>setCheckout(ev.target.value)}/>
   </div>
   </div>
   <div>
   <div className=" py-3 px-4 border-t " >
      <label >max guest: </label>
       <input type="number" value={maxGuest} onChange={ev=>setMaxGuest(ev.target.value)}/>
   </div>

   </div>
   {numberofdays>0 &&(
    <div className=" py-3 px-4 border-t " >
      <label >your full name: </label>
       <input type="text" value={name} placeholder="mike john" onChange={ev=>setName(ev.target.value)}/>
       <label >phone number: </label>
       <input type="tel" value={phone} onChange={ev=>setPhone(ev.target.value)}/>
   </div>
   )}
   </div>
   
 
 <button onClick={bookthisplace} className="primary mt-4">book this place
 {numberofdays && (
  <span> ${numberofdays * place.price}</span>
 )}
 </button>
    </div></>
  )
}

export default Bookingwidget