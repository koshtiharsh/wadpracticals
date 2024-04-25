import React from 'react'
import './page.css'
import {useEffect,useState} from 'react'
import Navbar from '../navbar/Navbar'
import Profile from '../../components/Profile'
import Freindlist from '../../components/Freindlist'
import { useSelector } from 'react-redux'
import Post from '../../components/Post'
import { Link, useParams } from "react-router-dom";
import UserList from './UserList'
import Text from './Text'


export default function SeperatePageMessage() {

    const {_id} = useSelector((state)=>state.user)
    const token = useSelector((state)=>state.token)
    const [users,setUsers] = useState([])
    const [messages,setMessages] = useState([])
    const {fid} = useParams()
    useEffect(()=>{
    async function fetching(){
   await fetch(`http://localhost/messages/getmessages`,
      {
        method:'post',
        
  
        headers: {'Content-Type':'application/json',
         Authorization: `Bearer ${token}` },
         body:JSON.stringify({userId:_id})
      }).then((res)=>res.json()).then((data)=>{setMessages(data)
      
       
          
      })
      
    }
      fetching()
     
    }
    
    ,[])
   
    return (

    
        <div>
          <Navbar/>
          <div className="page">
          <div className="userlist">
          <UserList messages={messages} setMessages={setMessages} />
          </div>
    
          <div className='posts' >
            
         
                <Text/>
      
    
        </div>
       
          </div>
         
    
        </div>
        
      )
}
