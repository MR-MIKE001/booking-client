

function Placing({place,index=0,className=null}) {
    if(!place.photos?.length){
        return ''
    }
    if(!className){
        className='object-cover'
    }
  return (
   
        <img className={className}
         src={'https://booking-api-3-e0zs.onrender.com/uploads/'+place.photos[index]}/>
  )
}

export default Placing