import { useState } from 'react';

export default function useToken() {
  console.log("useToken");
  const getToken = () => {
    console.log("getToken");
    const tokenSring = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenSring);
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    console.log("saveToken");
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }

}