import React, { useEffect, useState } from 'react';
import './profile.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile({ userId, picpath }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const token = useSelector((state) => state.token);
  const {friends,_id} = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`http://localhost/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [userId, token]); // Added userId and token as dependencies

  if (loading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  // Render null if user is not available yet
  if (!user) {
    return null;
  }

  return (
    <div className="profile">
     <Link to={`/profile/${user._id}`}>
     <div className="first">
        <img src={`http://localhost/assets/${user.picturepath}`} alt="" />
        <div className="name">
          <h4>{user.firstName}</h4>
          <p className="fcount">{friends.length} Friends</p>
        </div>
      </div>
     </Link>
    {user._id != _id ?  <Link to={`/messages/${user._id}`}> <button className='msgbtn'>Message</button>
    </Link>: ''}
      <hr />

      <div className="second">
        <div className="extra">
          <i className="fa-solid fa-location-dot"></i> <span>{user.location}</span>
        </div>
        <div className="extra">
          <i className="fa-solid fa-briefcase"></i><span>{user.occupation}</span>
        </div>
      </div>
      <hr />

      <div className="second">
        <h5>Social Profiles</h5>
        <div className="extra">
          <i className="fa-brands fa-linkedin"></i><span>LinkedIn</span>
        </div>
        <div className="extra">
          <i className="fa-brands fa-instagram"></i><span>Instagram</span>
        </div>
      </div>
      <hr />
    </div>
  );
}
