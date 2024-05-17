"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default form submission behavior
    localStorage.clear(); 
    try {
      const response = await axios.post('/api/users/register', { email, password });
      console.log(response.data); 
      router.push('/login');
    } catch (error: any) {
      setError(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div class="flex-col flex items-center justify-center h-screen">
    <div class="w-80">
      <img src="logo.png"></img>
    </div>
    <form class="bg-opacity-80 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" >Courriel:</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="daniel@ranc.tsp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2">Mot de passe:</label>
        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          value={password}
          placeholder="ranc123"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">S'enregister</button>
      {error && <p>{error}</p>}
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
        Déjà un compte?
      </a>
      </div>
    </form>
    </div>  
    
  );
};

export default SignupForm;
