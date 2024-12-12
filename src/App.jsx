
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/register'
import Indexpages from './pages/indexpages'
import Logingpage from './pages/Logingpage'
import Layout from './layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/account'
import PlacesPage from './pages/placesPage'
import AddNewPlacesForm from './pages/addNewPlacesForm'
import PlacePAGE from './pages/placePAGE'
import BookingsPage from './pages/bookingsPage'


axios.defaults.baseURL="https://booking-api-3-e0zs.onrender.com"
axios.defaults.withCredentials=true
function App() {
  

  return (
<UserContextProvider>

    <Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Indexpages/>}/>
    <Route path="/loging" element={<Logingpage/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/account' element={<Account/>}/>
    <Route path='/account/places' element={<PlacesPage/>}/>
    <Route path='/account/places/new' element={<AddNewPlacesForm/>}/>
    <Route path='/account/places/:id' element={<AddNewPlacesForm/>}/>
    <Route path='/place/:id' element={<PlacePAGE/>}/>
    <Route path='/account/bookings' element={<BookingsPage/>}/>

  
    </Route>
    
    
    </Routes>
    </UserContextProvider>
   
  )
}

export default App
