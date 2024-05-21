"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default form submission behavior
    localStorage.clear(); 
    try {
      const response = await axios.post('/api/users/register', { email, password, username });
      console.log(response.data); 
      router.push('/login');
    } catch (error: any) {
      setError(error.response.data.message || 'Something went wrong');
    }
  };

return (
  <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-80">
    <img src="logo.png"></img>
  </div>
  <form className="bg-opacity-80 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
  <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Nom d'utilisateur:</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Danou"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Courriel:</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="daniel@ranc.tsp"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe:</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="ranc123"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">S'inscrire</button>
      {error && <p>{error}</p>}
      
      <a className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" href="/login">
      Se connecter?
      </a>
    </div>
  </form>
  </div>
);
};

export default SignupForm;
