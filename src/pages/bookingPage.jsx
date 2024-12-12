import axios from "axios"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function BookingPage() {
    const{id}=useParams()
    const[booking,setBooking]=useState(null)
    useEffect(()=>{
     if(id){
    axios.get('/bookings').then(response=>{
      const foundBookings=response.data.find(({_id})=>_id===id)
      if(foundBookings){
        setBooking(foundBookings)
      }
    })
     }
    },[id])
    if(!booking){
      return ''
    }
  return (
    <div>bookingPage {id}</div>
  )
}

export default BookingPage