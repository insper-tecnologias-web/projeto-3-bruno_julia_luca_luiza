import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

// async function loginUser(credentials) {
//   return fetch('http://127.0.0.1:8000/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }

async function loginUser(username, password){
  axios
  .post('http://127.0.0.1:8000/token/', {
    "username": username,
    "password": password
  })
}

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      username,
      password
    );
    setToken(token);
  }
  return(
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" 
        onChange={e => setUserName(e.target.value)}
        />
      </label>
      <label>
        <p>Password</p>
        <input type="password" 
        onChange={e => setPassword(e.target.value)}
        />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}