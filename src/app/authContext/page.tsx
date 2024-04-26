"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'; // Use useRouter for Next.js redirects

// Modified verifyToken to use in React components
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
        // Make sure to resolve as boolean
        resolve(response.data.valid as boolean); // Assert that valid is a boolean
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
      return <div>Loading...</div>; // Or any other loading indicator
    }

    if (!isAuthorized) {
      redirect('/login') // Use Next.js router to redirect
      return null; // Return null to comply with React rendering rules
    }
    return <WrappedComponent {...props} />;
  };
};

export { verifyToken, withAuth };
