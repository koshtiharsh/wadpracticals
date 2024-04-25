
import './posts.css'
import OtherPosts from './OtherPosts'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from '../state/index.js';
import { useEffect, useState } from 'react';




export default function Post({ userId, page }) {

  const [newPost, setNewPost] = useState({
    userId: userId,
    description: '',
    picture: '',
  })
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { picturepath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const getAllPosts = async () => {
    const fetching = await fetch('http://localhost/posts', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    const res = await fetching.json();
    dispatch(setPosts({ posts: res }))

  }

  const getMyPost = async () => {
    const fetching = await fetch(`http://localhost/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });


    const res = await fetching.json();
    console.log(res)
    dispatch(setPosts({ posts: res }))


  }
  useEffect(() => {
    if (page == 'home') {
      getAllPosts()
    }
    else if (page == 'profile') {
      getMyPost();
    }
  }, [])




  async function createPost() {
    var formData = new FormData();

    for (let i in newPost) {
      formData.append(i, newPost[i]);
    }
    formData.append('picturepath', newPost.picture.name)
    console.log(newPost)
    const fetching = await fetch(`http://localhost/newpost/xyz`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const res = await fetching.json()
    dispatch(setPosts({ posts: res }))
    dispatch(setPosts({ posts: res }));
    setNewPost({
      userId: userId,
      description: '',
      picture: '',
    })


  }

  return (
    <div>
      <div className='posts'>
        <div className="posts1">
          <div className="first">
            <img src={`http://localhost/assets/${picturepath}`} alt="" />


            <input onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} value={newPost.description} type="text" placeholder="What's on your mind..." />
          </div>
          <hr />
          <div className="attach">
            <label htmlFor="image"><i className="fa-regular fa-image"></i> <span className='postspan'>Image </span>
              <input onChange={(e) => setNewPost({ ...newPost, picture: e.target.files[0] })} id='image' type="file" hidden />
            </label>

            <button style={{ cursor: 'pointer' }} onClick={createPost} disabled={newPost.description === ''}>Post</button>
          </div>
        </div>


      </div>

      {
        posts.map((post) => {
          return (
            <OtherPosts key={post._id}
              postId={post._id}
              postUserId={post.userId}
              name={post.firstName}
              description={post.description}
              location={post.location}
              picturepath={post.picturepath}
              userPicturePath={post.userPicturePath}
              likes={post.likes}
              comments={post.comments}
              loginuserimg={picturepath}
            />
          )


        })
      }

    </div>
  )
}
