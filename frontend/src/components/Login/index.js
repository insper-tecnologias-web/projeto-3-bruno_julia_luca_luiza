import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import "./index.css";


async function loginUser(username, password){
  axios
  .post('http://127.0.0.1:8000/token/', {
    "username": username,
    "password": password
  })
  .then(async(res) => {
    console.log("ENVIA TOKEN");
    console.log(res.data.token);
    await sessionStorage.setItem('token', JSON.stringify(res.data.token));
    window.location.replace('/');
  })
  .catch((err) => {console.log(err);
    window.location.replace('./Cadastro');
    
  });
}


export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = loginUser(
      username,
      password
    );
    await setToken(token);

  }
  return(
    <div className="alinha_2">
      <h1>Por favor faça o Login</h1>
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
          <button className="fonte3" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}