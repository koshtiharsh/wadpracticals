
import './page.css'
import {useEffect,useState} from 'react'
import Navbar from '../navbar/Navbar'
import Profile from '../../components/Profile'
import Freindlist from '../../components/Freindlist'
import { useSelector } from 'react-redux'
import Post from '../../components/Post'
import { useParams } from "react-router-dom";
import UserList from './UserList'
export default function ProfilePage() {
  
  // const {_id} = useSelector((state)=>state.user)
  // const { userId } = useParams();

  const {_id} = useSelector((state)=>state.user)
  const token = useSelector((state)=>state.token)
  const [messages,setMessages] = useState([])
  
  useEffect(()=>{
      fetch(`http://localhost/messages/getmessages`,
    {
      method:'post',
      

      headers: {'Content-Type':'application/json',
       Authorization: `Bearer ${token}` },
       body:JSON.stringify({userId:_id})
    }).then((res)=>res.json()).then((data)=>{setMessages(data)
    
     
        
    })
   
   
  }
  
  ,[])


 

  // console.log('msg user',users)
  // console.log(_id,messages)
  return (

    
    <div>
      <Navbar/>
      <div className="page">
      <Freindlist/>

      <div className='posts'>
        
        <UserList messages={messages} setMessages={setMessages} />

    </div>
   
      </div>
     

    </div>
  )
}
