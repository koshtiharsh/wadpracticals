import React from 'react'
import './page.css'
import {useEffect,useState} from 'react'
import Navbar from '../navbar/Navbar'
import Profile from '../../components/Profile'
import Freindlist from '../../components/Freindlist'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../components/Post'
import { Link, useParams } from "react-router-dom";
import { setChatFriends } from '../../state'

export default function UserList({messages,setMessages}) {

    const {_id} = useSelector((state)=>state.user)
    const token = useSelector((state)=>state.token)
    const chatFriends = useSelector((state)=>state.chatFriends)
    const [users,setUsers] = useState([])
    const {fid} = useParams()
    const dispatch = useDispatch();
    
    useEffect(() => {
        
       
        Promise.all(messages.map((m)=>
        {
            
            if(fid){
                const find = messages.find((item)=>item==fid)
                if(!find){
                 setMessages([...messages,fid])
                }
               }
                console.log(m)
               
                 return fetch(`http://localhost/users/${m}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        
                      return  res.json()})
                   
               
            }
    )).then((data)=>{
        setUsers(data)
        dispatch(setChatFriends({chatFriends:data}))

    })
    }, [messages,fid]);

    useState(()=>{
     
    },[fid,messages])
    

    console.log('chatfrends',chatFriends)
  return (



    <div style={{margin:'1rem'}}>
        {
            users.map((s)=>(
                <div className='msglist'>
   <Link to={`/messages/${s._id}`}>
   <div className="img-name">
        <img src={`http://localhost/assets/${s.picturepath}`} alt="" />
        <div className="name">
            <p>{s.firstName}</p>
            <p>{s.location}</p>
        </div>
    </div>
   </Link>
</div>
                
            ))
        }
    </div>
  )
}
