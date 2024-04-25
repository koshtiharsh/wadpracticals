import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setLogin} from '../../state/index.js'

// Import setLogin action from your Redux actions

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState('login');

  const [ldata, setLdata] = useState({
    email: '',
    password: '',
  });

  const [sdata, setSdata] = useState({
    firstName: '',
    location: '',
    occupation: '',
    picture: '',
    email: '',
    password: '',
  });
  console.log(sdata.picture.name)

  async function register() {
    let data = new FormData();

    for (let item in sdata) {
      data.append(item, sdata[item]);
    }
    data.append('picturepath', sdata.picture.name);
    console.log(data)
    fetch('http://localhost/auth/register', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setState('login');
        }
      });
  }

  async function login() {
    const loggedInResponse = await fetch('http://localhost/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ldata),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn)
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  }

  return state === 'login' ? (
    <div className='login'>
      <div className='container'>
        <h3>Welcome to Connectify, Login Here To continue</h3>
        <form onSubmit={login}>
          <input
            onChange={(e) => setLdata({ ...ldata, email: e.target.value })}
            type='text'
          />
          <input
            onChange={(e) => setLdata({ ...ldata, password: e.target.value })}
            type='password'
          />
          <button onClick={login}  type='button'>Login</button>
          <p style={{ cursor: 'pointer' }} onClick={() => setState('signup')}>
            Dont have Account ? Sign Up
          </p>
        </form>
      </div>
    </div>
  ) : (
    <div className='login signup'>
      <div className='container'>
        <h3>Welcome to Connectify, SignUp Here To continue</h3>
        <form>
          <input
            onChange={(e) => setSdata({ ...sdata, firstName: e.target.value })}
            type='text'
            placeholder='Name'
          />
          <input
            onChange={(e) => setSdata({ ...sdata, location: e.target.value })}
            type='text'
            placeholder='Location'
          />
          <input
            onChange={(e) => setSdata({ ...sdata, occupation: e.target.value })}
            type='text'
            placeholder='Occupation'
          />
          <input
            onChange={(e) => setSdata({ ...sdata, picture: e.target.files[0] })}
            type='file'
            placeholder=''
          />
          <input
            onChange={(e) => setSdata({ ...sdata, email: e.target.value })}
            type='email'
            placeholder='Email'
          />
          <input
            onChange={(e) => setSdata({ ...sdata, password: e.target.value })}
            type='password'
            placeholder='Password'
          />
          <button type='button' onClick={register}>
            Register
          </button>
          <p style={{ cursor: 'pointer' }} onClick={() => setState('login')}>
            Already Registered ? Login
          </p>
        </form>
      </div>
    </div>
  );
}
