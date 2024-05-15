"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try{
    const response = await axios.post('/api/users/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('ClientID', response.data.ClientID);
    axios.get('/api/baskets/clear?ClientID='+localStorage.getItem('ClientID'))
    router.push('/userInterface');
    console.log(response.data);
    
    }catch (error: any) {
      console.log(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
