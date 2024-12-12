import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Bookingwidget from "../Bookingwidget";


function PlacePAGE() {
  
   const{id}=useParams()
   const [place,setPlace]=useState(null)
   const [showAllPhotos,setShowAllPhotos]=useState(false);
  useEffect(()=>{
    if(!id){
        return;
    }
    axios.get('/place/'+id).then(response=>{
      setPlace(response.data)
    })
  },[id])
if(!place) return'';
  if(showAllPhotos){
    return(
        <div className="absolute inset-0 text-white min-h-screen">
 <div className=" bg-black p-8 grid gap-4 ">
 <div  >
 <h2 className="text-3xl mr-36 ">photos of {place.title}</h2>
    <button onClick={()=>setShowAllPhotos(false)} className="flex right-12 top-8 gap-1 py-2 px-4 rounded-2xl fixed shadow shadow-black bg-white text-black"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg> close photos</button>
 </div>
 {place?.photos?.length>0 && place.photos.map(photo=>{
   return <div key={photo} >
    <img className="w-full" src={'https://booking-api-3-e0zs.onrender.com/uploads/'+photo }/>
    </div>
  })}
 </div>
        </div>
    )
}
    return (
    <div className="mt-4 px-8 bg-gray-100 -mx-8 pt-6">
        <h1 className="text-3xl">{place.title} </h1>
        <a className="flex gap-1 my-3 font-semibold my-2  underline" target="blank" href={'https://maps.google.com/?q='+place.address} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
</svg>
{place.address}</a>
    <div className="relative ">
<div className="grid gap-1 rounded-3xl overflow-hidden grid-cols-[2fr_1fr]">
   <div>{
    place.photos?.[0] && (
        <div>
        <img onClick={()=>setShowAllPhotos(true)} className="w-full cursor-pointer aspect-square object-cover" 
        src={'https://booking-api-3-e0zs.onrender.com/uploads/'+place.photos[0]}/>
        </div>
        
    )
   }</div>
   <div className="grid ">
   <div className="overflow-hidden">
   {
    place.photos?.[1] && (
        <img className=" w-full h-full aspect-square object-cover cursor-pointer" 
        src={'https://booking-api-3-e0zs.onrender.com/uploads/'+place.photos[1]}/>
    )
   }
   </div>
   
   <div className="overflow-hidden">
   {
    place.photos?.[2] && (
        <img className=" w-full h-full aspect-square object-cover cursor-pointer relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]}/>
    )
   }
   </div>
   </div>
    </div>
<button onClick={()=>setShowAllPhotos(true)}
className=" flex gap-1 absolute bottom-2 right-2 py-2 px-2 bg-white rounded-2xl shadow-md shadow-gray-500">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
</svg>

show more photos
</button>
    </div>
    
    <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] ">
     <div>
     <div className="my-4">
    <h2 className="font-semibold text-2xl ">description</h2>
        {place.description}
    </div>
        chech in: {place.checkin}
        <br/>
        check out: {place.checkout}
        <br/>
        max guest: {place.maxguest}
        
     </div>
     <div className="border ">
     <Bookingwidget place={place}/>
     </div>
    </div>
    <div>
    <div className="bg-white border-t -mx-8 px-8 py-8">
    <h2 className="font-semibold text-2xl ">Extra Info</h2>
    <div className="mb-4 mt-1 text-sm text-gray-700 leading-8">{place.extrainfor}</div>
    </div>
    </div>
    
    
    </div>
  )
}

export default PlacePAGE