// App.js
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './page.css'
import { useParams } from 'react-router-dom';

// const socket = io('http://localhost');

function Text() {

  const scrollRefs = useRef(null);

  // Function to scroll the fixed ref to its bottom
  const scrollToBottom = () => {
    if (scrollRefs.current) {
      scrollRefs.current.scrollTop = scrollRefs.current.scrollHeight;
    }
  };


  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [senderId, setSenderId] = useState('YOUR_SENDER_ID');
  const [receiverId, setReceiverId] = useState('YOUR_RECEIVER_ID');
  const chatFriends = useSelector((state)=>state.chatFriends)
  const {picturepath,_id} = useSelector((state)=>state.user)
  

  const [textmsg,setTextmsg] = useState('')
  const {fid} = useParams()
  useEffect(() => {
    scrollToBottom(); // Call scrollToBottom when component mounts or when messages update
  }, [messages]);

  useEffect(()=>{

    fetch(`http://localhost/messages/chats`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },body:JSON.stringify({userId:_id,friendId:fid})
    }).then((res)=>res.json()).then((data)=>{
      setMessages(data)
      scrollToBottom()
    })
    scrollToBottom()
   // Assuming scrollRef is a reference to the element you want to scroll


  },[fid,textmsg])


  // scrollRefs.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  async function sendmsg(){
   const data =await fetch(`http://localhost/messages/addmessage`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },body:JSON.stringify({
        sender : _id,
        receiver:fid,
        msg:textmsg
    })
    }).then((res)=>res.json()).then((data)=>{
      setTextmsg('')
    })
    const fi = await fetch(`http://localhost/messages/chats`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },body:JSON.stringify({userId:_id,friendId:fid})
    }).then((res)=>res.json()).then((data)=>{
      setMessages(data)
      scrollRefs.current.scrollTop = scrollRefs.current.scrollHeight;
      
    })

    socketRef.current.emit('sendmessage',{
      receiver:fid,
      userId:_id,
      text:textmsg
    })

    scrollToBottom()
  }


  const socketRef = useRef(null);

  useEffect(() => {
  
    socketRef.current = io('ws://localhost:8900');

    
    socketRef.current.on('hello', message => {
      // console.log(message);
    });

    socketRef.current.emit('adduser',_id)

  

    // mainpart 
    socketRef.current.on('getUsers',users=>{
      // console.log('socketuesrs',users)
    })

  
    return () => {
      socketRef.current.disconnect();
    };
  }, []);


  useEffect(()=>{
    socketRef.current.on('getmessage',data=>{
      // setMessages([...messages,{sender:data.userId, receiver: _id,message: data.text}])


      fetch(`http://localhost/messages/chats`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },body:JSON.stringify({userId:_id,friendId:fid})
      }).then((res)=>res.json()).then((data)=>{
        setMessages(data)
        scrollToBottom()
      })
    })
  })

  //finding friends data 
  const [f,setF] = useState({})
  useEffect(()=>{
    console.log('chatusers',chatFriends)
    chatFriends.map((m)=>(
      m._id ==fid? setF({fname:m.firstName,fimg:m.picturepath}):''
    ))
  },[fid,chatFriends])

  
 return (
 <>
  <div className="fprofile">
  <div className="friend">
    <img src={`http://localhost/assets/${f.fimg}`} alt="" />
      <p className="fname">{f.fname}</p>
    </div>
 
  </div>
  <div className="texts" ref={scrollRefs}>
   {/* <div className="my">
    
   <div className="me">
      <img src={`http://localhost/assets/${picturepath}`} alt="" />
      <p className='text'>hello how are your</p>
      <p className="time">1 hour</p>
    </div>
   </div>

  <div className="f">
    
  <div className="friend">
    <img src={`http://localhost/assets/${picturepath}`} alt="" />
      <p className='text'>hello how are your</p>
      <p className="time">1 hour</p>
    </div>
  </div>
    */}

   { messages.slice().reverse().map((m)=>{
    if(m.sender==_id){
      return (
        <div className="my">
    
   <div className="me">
      <img src={`http://localhost/assets/${picturepath}`} alt="" />
      <p className='text'>{m.message}</p>
      <p className="time">1 hour</p>
    </div>
   </div>
      )
    }else{
      return(
        <div className="f">
    
  <div className="friend" >
    {scrollToBottom}
    <img src={`http://localhost/assets/${f.fimg}`} alt="" />
      <p className='text'>{m.message}</p>
      <p className="time">1 hour</p>
    </div>
  </div>
      )
    }
    })}

  
  </div>
  <div className="msginput">
    <input onChange={(e)=>setTextmsg(e.target.value)} value={textmsg} type="text" />
    <button onClick={sendmsg}>Send</button>
   </div>
 </>
 )
}

export default Text;
