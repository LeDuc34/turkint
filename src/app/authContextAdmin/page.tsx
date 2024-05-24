"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const verifyAdmin = async () => {
  const userId = localStorage.getItem('ClientID');
  if (!userId) {
    return false;
  }
  try {
    const roleResponse = await axios.post('/api/users/getRole', { ClientID: userId });
    return roleResponse.data.Role === 'admin';
  } catch (error: any) {
    console.error(error.response?.data?.message || 'Something went wrong');
    return false;
  }
};

const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      const checkAdmin = async () => {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
          setErrorMessage("vous n'êtes pas autorisé à accéder à cette page");
          setIsLoading(false); // Stop loading to show the message
          await new Promise(resolve => setTimeout(resolve, 3000)); // Add a 3-second delay
          router.push('/login');
        } else {
          setIsAuthorized(true);
          setIsLoading(false);
        }
      };

      checkAdmin();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (errorMessage) {
      return <div>{errorMessage}</div>; // Display the error message if not authorized
    }

    return <WrappedComponent {...props} />;
  };
};

export { withAdminAuth };
