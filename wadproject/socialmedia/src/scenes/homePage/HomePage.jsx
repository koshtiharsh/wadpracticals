
import Navbar from '../navbar/Navbar'
import './home.css'
import Profile from '../../components/Profile'
import Post from '../../components/Post'
import Freindlist from '../../components/Freindlist'
// import {useSelector} from 'react-redux'
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const {_id,picturepath} = useSelector((state)=>state.user)
  

  return (
    <div>
      
    <Navbar/>
    <div className="home">
      <Profile  userId ={_id} picpath={picturepath} />
      <Post userId ={_id} page='home' />
      <Freindlist userId ={_id}  />
    </div>
    </div>
  )
}
