"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuth } from '../authContext/page';
import { useRouter } from "next/navigation";
import Header from "../header";

// Define the type for user data
interface UserData {
    ClientID?: number;
    Username?: string;
    Email?: string;
    Phone?: string;
    Adress?: string;
    Role?: string;
}

function MyProfile() {
    const [userData, setUserData] = useState<UserData>({});
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
				const ClientID = localStorage.getItem('ClientID');
                const response = await axios.post('/api/users/getUser', { ClientID:ClientID });
                setUserData(response.data);
				console.log(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Header />
            <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-white bg-opacity-90 rounded-lg">
                <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                    <img src="loup.png" alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold">{userData.Username || 'Loading...'}</h2>
                        <span className="text-sm dark:text-gray-600">{userData.Role || 'Role not available'}</span>
                    </div>
                    <div className="space-y-1">
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                                <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                            </svg>
                            <span className="dark:text-gray-600">{userData.Email || 'Loading...'}</span>
                        </span>
                    </div>
                </div>
            </div>
            <footer className="fixed bottom-0 bg-red-600 shadow mt-2 w-full">
                <div className="container mx-auto py-4 px-4 text-center">
                    <p className="text-gray-100">&copy; 2024 Turkint. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}

export default withAuth(MyProfile);
