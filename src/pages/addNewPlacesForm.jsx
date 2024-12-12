import axios from "axios"
import { useEffect, useState } from "react"
import PhotoUploads from "./PhotoUploads"
import Perks from "./perks"
import AccountNav from "../accountNav"
import { Navigate, useParams } from "react-router-dom"


function AddNewPlacesForm() {
    const{id}=useParams();
    
    const [title,setTitle]=useState('')
    const [address,setAddress]=useState('')
    const [description,setDescription]=useState('')
    const [addPhotos,setAddPhotos]=useState([])
    const [perks,setPerks]=useState([])
    const [extraInfo,setExtraInfor]=useState('')
    const [checkin,setCheckin]=useState('')
    const [checkout,setCheckout]=useState('')
    const [maxGuest,setMaxGuest]=useState(1)
    const [price,setPrice]=useState(100)
    const [redirect,setReDirect]=useState(false)
    useEffect(()=>{
   if(!id){
    return;
   }else{
    axios.get('/place/'+id).then(response=>{
        
            const{data}=response;
            setAddPhotos(data.photos)
            setAddress(data.address)
            setCheckin(data.checkin)
            setCheckout(data.checkout)
            setDescription(data.description)
            setExtraInfor(data.extrainfor)
            setMaxGuest(data.maxguest)
            setPerks(data.perks)
            setTitle(data.title)
            setPrice(data.price)
    })
   }
    },[id])
    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header,description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }


    async function saveNewPlaces(ev) {
        ev.preventDefault()
        const placeState={title,addPhotos,address,
            extraInfo,description,perks,price,
            checkin,checkout,maxGuest}
        if(id){
            await axios.put('/places',{
                id,
                ...placeState
    
            })
            setReDirect(true)
        }else{
            await axios.post('/places',{
                ...placeState
    
            })
            setReDirect(true)
        }
        
    }
if(redirect){
    return <Navigate to={'/account/places'}/>
}



  return (
    <div>
    <AccountNav/>
    <form onSubmit={saveNewPlaces}>
     {preInput('title','title for the place')}
     <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)}/>
      {preInput('address','address to this place' )}
      <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)}/>
      {preInput('photos','more = better')}
      <PhotoUploads addPhotos={addPhotos} setAddPhotos={setAddPhotos}/>
      {preInput('description','description of the place')}
      <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
       <Perks selected={perks} onChange={setPerks}/>
       {preInput("extra info","house rules")}
       <textarea value={extraInfo} onChange={ev=>setExtraInfor(ev.target.value)}/>
       {preInput("check in&out times","add check in, chack out and max number of guest")}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
       <div>
       <h3 className="mt-2 -mb-1">check in time</h3> 
       <input type="number" 
        placeholder="10:00"
        value={checkin} 
        onChange={ev=>setCheckin(ev.target.value)}/></div>
        <div>
        <h3 className="mt-2 -mb-1">check out time</h3> 
        <input type="number"
        placeholder="23:00"
         value={checkout} 
         onChange={ev=>setCheckout(ev.target.value)}/></div>
         <div>
         <h3 className="mt-2 -mb-1">maxguest</h3> 
        <input type="number" 
        value={maxGuest} 
        onChange={ev=>setMaxGuest(ev.target.value)} 
        /></div>
        <div>
         <h3 className="mt-2 -mb-1">price per night </h3> 
        <input type="number" 
        value={price} 
        onChange={ev=>setPrice(ev.target.value)}  />
            
        </div>
        
        </div>
        <button className="primary my-4">save</button>
    </form>
     
    </div>
  )
}

export default AddNewPlacesForm