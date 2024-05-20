"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const verifyAdminToken = (): Promise<boolean> => {
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

        const { valid, user } = response.data;
        if (valid && user.role === 'admin') {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        resolve(false);
      }
    }
  });
};

// Higher-Order Component to wrap protected admin pages
const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      verifyAdminToken().then(isValid => {
        setIsAuthorized(isValid);
        setIsLoading(false);
      });
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthorized) {
      redirect('/login');
      return null; // Important: avoid rendering the component if unauthorized
    }

    return <WrappedComponent {...props} />;
  };
};

export { verifyAdminToken, withAdminAuth };
