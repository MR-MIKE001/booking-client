import axios from "axios"
import { useEffect } from "react"
import {useState} from 'react'
import { Link } from "react-router-dom"
export default function Indexpages(){

const [places,setPlaces]=useState([])


    useEffect(()=>{
        axios.get('/places').then(response=>{
         setPlaces(response.data)
        })
    },[])


    
    return(
        <div className='mt-8 grid gap-6 gap-y-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>{
           places.length > 0 && places.map(place=>{
        
          return  <Link  key={place.title+Math.random()*8} to={'/place/'+place._id} >
          <div   className='bg-gray-500 flex mb-2 rounded-2xl'>
          {place.photos?.[0] &&(
    <img className='rounded-2xl aspect-square object-cover' src={'https://booking-api-3-e0zs.onrender.com/uploads/'+place.photos?.[0]}/>
          )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
        <h3 className="text-sm  text-gray-500 ">{place.title}</h3>
               
                <div className="mt-1 ">
                   <span className="font-bold"> ${place.price}</span> per night
                </div>
            </Link>
           })
           
        }</div>
    )
}