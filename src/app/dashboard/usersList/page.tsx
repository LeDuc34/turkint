"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../../../styles/globals.css'; 
import { withAdminAuth } from '../../authContextAdmin/page';

interface User {
    ClientID: number;
    Username: string;
    Email: string;
    Phone?: string;
    Adress?: string;
    Role: string;
    Basket?: string;
    totalOrders: number;
    totalAmountSpent: number;
    lastOrderDate: string; // ISO string format
}

const Users = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [visibleUser, setVisibleUser] = useState<number | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>('/api/users/display');
            setUsers(response.data);
        } catch (error: any) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleUserDetails = (userId: number) => {
        setVisibleUser(visibleUser === userId ? null : userId);
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            await axios.post('/api/users/updateRole', { ClientID: userId, Role: newRole });
            fetchUsers(); // Refresh the list of users to reflect the change
        } catch (error: any) {
            console.error('Failed to update user role:', error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await axios.post('/api/users/delete', { ClientID: userId });
            fetchUsers(); // Refresh the list of users after deletion
        } catch (error: any) {
            console.error('Failed to delete user:', error);
        }
    };

    const sortByMostOrders = () => {
        const sortedUsers = [...users].sort((a, b) => b.totalOrders - a.totalOrders);
        setUsers(sortedUsers);
    };

    const sortByMostMoneySpent = () => {
        const sortedUsers = [...users].sort((a, b) => b.totalAmountSpent - a.totalAmountSpent);
        setUsers(sortedUsers);
    };

    const sortByLastOrder = () => {
        const sortedUsers = [...users].sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime());
        setUsers(sortedUsers);
    };

    const renderUserDetails = (user: User) => {
        return (
            <div className="p-4 bg-gray-100 rounded-md shadow-md text-black">
                <p><strong>Client ID:</strong> {user.ClientID}</p>
                <p><strong>Username:</strong> {user.Username}</p>
                <p><strong>Email:</strong> {user.Email}</p>
                {user.Phone && <p><strong>Phone:</strong> {user.Phone}</p>}
                {user.Adress && <p><strong>Address:</strong> {user.Adress}</p>}
                <p><strong>Role:</strong> {user.Role}</p>
                <p><strong>Total Orders:</strong> {user.totalOrders}</p>
                <p><strong>Total Amount Spent:</strong> ${user.totalAmountSpent.toFixed(2)}</p>
                <p><strong>Last Order Date:</strong> {new Date(user.lastOrderDate).toLocaleString()}</p>
                <div className="flex space-x-2 mt-2">
                    {user.Role !== 'admin' ? (
                        <button 
                            onClick={() => handleRoleChange(user.ClientID, 'admin')}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Grant Admin Role
                        </button>
                    ) : (
                        <button 
                            onClick={() => handleRoleChange(user.ClientID, 'user')}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Revoke Admin Role
                        </button>
                    )}
                    <button 
                        onClick={() => handleDeleteUser(user.ClientID)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Delete User
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Users:</h2>
                <div className="flex space-x-4 mb-4">
                    <button 
                        onClick={sortByMostOrders} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Sort by Most Orders
                    </button>
                    <button 
                        onClick={sortByMostMoneySpent} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Sort by Most Money Spent
                    </button>
                    <button 
                        onClick={sortByLastOrder} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Sort by Last Order
                    </button>
                </div>
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li key={user.ClientID} className="bg-white p-4 rounded-md shadow-md text-black">
                            <div className="flex justify-between items-center">
                                <span>{`User #${user.ClientID}`}</span>
                                <button 
                                    onClick={() => toggleUserDetails(user.ClientID)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    {visibleUser === user.ClientID ? 'Hide Details' : 'Show Details'}
                                </button>
                            </div>
                            {visibleUser === user.ClientID && renderUserDetails(user)}
                        </li>
                    ))}
                </ul>
            </div>
            <button 
                onClick={() => router.push('/dashboard/adminInterface')} 
                className="mt-8 px-4 py-2 bg-purple-500 text-white rounded-md"
            >
                Commands Page
            </button>
        </div>
    );
};

export default Users;
