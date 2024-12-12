import { useEffect, useState } from "react"
import AccountNav from "../accountNav"
import axios from "axios"
import Placing from "./placing"
import {differenceInCalendarDays, format } from "date-fns"
import { Link } from "react-router-dom"


function BookingsPage() {
  const [bookings,setbooking]=useState([])
   
  useEffect(()=>{
    axios.get('/bookings').then(response=>{
      setbooking(response.data)
    })
   },[])

  return (
    <div>
    <AccountNav/>
    <div >
      {bookings?.length>0 && bookings.map(booking=>{
   return  <Link  className="flex my-8 h-40 gap-4 bg-gray-200 rounded-2xl overflow-hidden " key={booking.phone+Math.random()*8}>
   <div className="w-48 ">
    <Placing place={booking.place}/>
   </div>
   <div className="py-3 pr-3 grow">
   <h2 className="text-xl">{booking.place.title}</h2>
   <div className="border-t border-gray-300 mt-2 py-2">
   {format(new Date(booking.checkin),'yyyy-MM-dd')} {' ->'} {format(new Date(booking.checkout),'yyyy-MM-dd')}
   </div>
   <div className="text-xl" >
   {differenceInCalendarDays(new Date(booking.checkin),new Date(booking.checkout))}
   night total of price: ${booking.price}
   </div>
   </div>
         
        </Link>
      })}

    </div>
    </div>
  )
}

export default BookingsPage