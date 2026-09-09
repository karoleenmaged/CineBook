import { Toaster } from "react-hot-toast";
import Home from './pages/Home'
import Movies from './pages/Movies'
import Layout from './components/Layout'
import Upcoming from './components/Upcoming'
import NowPlaying from './components/NowPlaying'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieDetails from './pages/MovieDetails'
import SelectSeats from './pages/SelectSeats'
import FoodDrinks from './pages/FoodDrinks'
import Payment from './pages/Payment'
import Confirmation from "./pages/Confirmation";
import MyTickets from "./pages/MyTickets";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
     <Routes>
      <Route element={<Layout/>}>
      <Route element={<Home/>} path="/"></Route>
      <Route element={<Signup/>} path="/signup"></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/movies" element={<Movies />}>
    <Route index element={<NowPlaying />} />
    <Route path="upcoming" element={<Upcoming />} />
       </Route>
       <Route path='/movies/:id' element={<MovieDetails/>}></Route>
       <Route path='/profile' element={<Profile/>}></Route>
       <Route path="/tickets" element={<ProtectedRoute><MyTickets/></ProtectedRoute>}></Route>
      </Route>
      <Route path='/booking' element={<ProtectedRoute><SelectSeats/></ProtectedRoute>}></Route>
      <Route path='/Fooddrinks' element={<ProtectedRoute><FoodDrinks/></ProtectedRoute>}></Route>
      <Route path='/Payment' element={<ProtectedRoute><Payment/></ProtectedRoute>}></Route>
      <Route path='/confirmation' element={<ProtectedRoute><Confirmation/></ProtectedRoute>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
