
import './page.css'
import Navbar from '../navbar/Navbar'
import Profile from '../../components/Profile'
import Freindlist from '../../components/Freindlist'
import { useSelector } from 'react-redux'
import Post from '../../components/Post'
import { useParams } from "react-router-dom";
export default function ProfilePage() {
  
  // const {_id} = useSelector((state)=>state.user)
  const { userId } = useParams();
  

  return (

    
    <div>
      <Navbar/>
      <div className="page">
        <div className="newfirst">
            <Profile userId={userId}  />
            <Freindlist/>
        </div>
        <Post userId={userId} page="profile"/>

      </div>

    </div>
  )
}
