
import { useDebugValue, useEffect } from 'react'
import './flist.css'
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from '../state';
import { Link } from 'react-router-dom';
export default function Freindlist() {


  const {_id,picturepath,friends} = useSelector((state)=>state.user)
  const token= useSelector((state)=>state.token)
  const dispatch = useDispatch();

  async function addRemoveFriend(id){
    const fetching= await fetch(`http://localhost/users/${_id}/${id}`,{
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          
        }})

        const res = await fetching.json();
        console.log(res)
        dispatch(setFriends({friends:res}))
   }


  useEffect(()=>{
    fetch(`http://localhost/users/${_id}/friends`,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    }).then((res)=>res.json()).then((data)=>dispatch(setFriends({friends:data})))
  },[])
  
  return (
    <div className='flist'> 
    <h2>Friend List</h2>

    
  {friends.map((item)=>(

      <div className="friend">
   
    <div className="first">
            <a href={`/profile/${item._id}`}>
            <div className="imgandname">
                <img src={`http://localhost/assets/${item.picturepath}`} alt="" />
          
                <div className="name">
                    <h5>{item.firstName} </h5>
                    <span>{item.location}</span>
                </div>
               
            </div>
            </a>
            
            <i onClick={()=>addRemoveFriend(item._id)} className="fa-solid fa-user-minus"></i>
        </div>
    </div>
  ))}


    </div>
  )
}
