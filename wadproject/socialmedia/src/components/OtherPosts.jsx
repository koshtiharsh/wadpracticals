import { useState,useEffect } from 'react';
import './otherposts.css';
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setPost } from "../state";
import { Link } from 'react-router-dom';

export default function OtherPosts({ loginuserimg,postId, postUserId, name, description, location, picturepath, userPicturePath, likes, comments }) {

    const [c,setC] = useState('none');

    const [like, setLike] = useState('unlike');
    const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const {friends,_id} = useSelector((state) => state.user);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    async function addRemoveFriend(){
        const fetching= await fetch(`http://localhost/users/${loggedInUserId}/${postUserId}`,{
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              
            }})
    
            const res = await fetching.json();
            console.log(res)
            dispatch(setFriends({friends:res}))
       }

    const patchLike = async()=>{
        const res = await fetch(`http://localhost/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
          });

    
          const updatedPost = await res.json();
          console.log(updatedPost)
          dispatch(setPost({post:updatedPost}))


    }
    
    const [newLoading,setLoading] = useState(true)


    const [users,setUsers] = useState([]);

    useEffect(() => {
        if (comments) {
            Promise.all(Object.keys(comments).map((comment) =>
                fetch(`http://localhost/users/${comment}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then((res) => res.json())
            )).then((userData) => {
                setUsers(userData);
                setLoading(false);
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
        }
    }, [comments, token]);

    console.log('usersdata', users)
    const [newComment,setNewComment] = useState({
        postUserId:postId, logInUserId:_id, commentText:''
    })

    async function addComment(){
        const res =await fetch(`http://localhost/posts/addnewcomment`,{
            method: "post",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              
            },
        body:JSON.stringify(newComment)
    })

        const data = await res.json();
        console.log('newcomment',data)
        setNewComment({...newComment,commentText:''})
        dispatch(setPost({post:data}))

    }
    console.log(newComment)
    
  

    return (
        <div className='other'>
          
           <div className="first">
           <Link to={`/profile/${postUserId}`}>
                <div className="imgandname">
                    <img src={`http://localhost/assets/${userPicturePath}`} alt="" />
                    <div className="name">
                        <h5>{name}</h5>
                        <span>{location}</span>
                    </div>
                </div>
                </Link>{
    friends.find(friend => friend._id === postUserId) ? (
        <i onClick={addRemoveFriend} className="fa-solid fa-user-minus"></i>
    ) : (
        <i onClick={addRemoveFriend} className="fa-solid fa-user-plus"></i>
    )
}
            </div>
           
            <p>{description}</p>
            <div className="postimg">
                <img src={`http://localhost/assets/${picturepath}`} alt="" />
            </div>

            <div className="second">
                <div className="like">
                    {!isLiked ? (
                        <i onClick={() => patchLike()} className="fa-regular fa-heart"></i>
                    ) : (
                        <i onClick={() => patchLike()} style={{ color: 'crimson' }} className="fa-solid fa-heart"></i>
                    )}{likeCount}
                  
                </div>

                <div className="comment" onClick={()=>c=='none'?setC('block'):setC('none')}>
                    <i style={{cursor:"pointer"}} className="fa-regular fa-comment"></i> 


                   
                </div>
                
            </div>
            <div className="commentbox" style={{display:`${c}`}}>
                       <h3>Comments</h3>

                       <div className="addcomment">
                       <div className="first">
                         
                              <div className="imgandname">
                              <Link to={`/profile/${postUserId}`}>
                              <img src={`http://localhost/assets/${loginuserimg}`} alt="" />
                              </Link>
                               <input value={newComment.commentText} onChange={(e)=>setNewComment({...newComment,commentText:e.target.value})} type="text" placeholder='Add Comment To Post' />
                                <button onClick={addComment}>Send</button>
                                  </div>
                         
                      </div>
                       </div>
                    
                       {
                        newLoading ? 'loading...':users.length>0?Object.keys(comments).map((comment, index) => {
                            
                           
                                    
                            // getUserDetails(comment)
                            const data = users.find((id)=>id._id ==comment)
                            return (<div key={index} className="comments">
                                <div className="first">
                                    <Link to={`/profile/${comment}`}>
                                        <div className="imgandname">
                                            <img src={`http://localhost/assets/${data.picturepath}`} alt="" />
                                            <div className="name">
                                                <h5>{data.firstName} </h5>
                                                {/* <span>2 Hr ago</span> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="commenttext">
                                    <span>{comments[comment]}</span>
                                </div>
                            </div>);
                        })
                        
              
                :''
                       }
                                        
                  
              </div>
        </div>
    );
}
