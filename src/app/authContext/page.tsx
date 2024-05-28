"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'; 


const verifyToken = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage.');
      resolve(false);
    } else {
      try {
        const response = await axios.post('/api/users/verifyToken', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        resolve(response.data.valid as boolean);
      } catch (error) {
        console.error('Error verifying token:', error);
        resolve(false);
      }
    }
  });
};

// Higher-Order Component to wrap protected pages
const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      verifyToken().then(isValid => {
        setIsAuthorized(isValid);
        setIsLoading(false);
      });
    }, []);

    if (isLoading) {
      return <div>Loading...</div>; 
    }

    if (!isAuthorized) {
      redirect('/login') 
    }
    return <WrappedComponent {...props} />;
  };
};

export { verifyToken, withAuth };