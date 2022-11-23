import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('/token');
      console.log(response);
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      console.log(decoded);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Welcome Back: </h1>
    </div>
  );
};

export default Dashboard;
