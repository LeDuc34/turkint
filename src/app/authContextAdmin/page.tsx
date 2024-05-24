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
    const router = useRouter();

    useEffect(() => {
      const checkAdmin = async () => {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
          router.push('/dashboard/adminInterface');
        } else {
          setIsAuthorized(true);
        }
        setIsLoading(false);
      };

      checkAdmin();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthorized) {
      return null; // or a fallback UI
    }

    return <WrappedComponent {...props} />;
  };
};

export { withAdminAuth };
