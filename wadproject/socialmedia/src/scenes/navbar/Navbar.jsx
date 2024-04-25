
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { NavLink, useNavigate } from "react-router-dom";
import './navbar.css'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  

  

  const fullName =`${user.firstName}`;
  const name = fullName.toUpperCase()


  return (
    <>
        <div className="navbar">
          <Link to='/home'> <div className="logo">
            <h3>Connectify</h3>
          </div></Link>

          <div className="rightside">
          <Link to="/messages">
          <i className="fa-solid fa-message"></i>
          </Link>
          <i className="fa-solid fa-bell"></i>
          <i className="fa-solid fa-circle-question"></i>
          <div className="username">
          <i className="fa-regular fa-user"></i>
          <p>{name}</p>
          </div>
          <div className="logout">
          <i className="fa-solid fa-right-from-bracket"></i>
          <p>LogOut</p>
          </div>
          
          </div>
        </div>
    </>
  );
}
