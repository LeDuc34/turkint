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

interface Command {
    CommandeID: number;
    ClientID: number;
    DateHeureCommande: string; // ISO string format
    Statut: string;
    TotalCommande: number;
    Details: { [key: string]: any }[];
    Attente: number;
    Payed: boolean;
}

const Users = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [visibleUser, setVisibleUser] = useState<number | null>(null);
    const [visibleCommands, setVisibleCommands] = useState<number | null>(null);
    const [commands, setCommands] = useState<{ [key: number]: Command[] }>({});

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>('/api/users/display');
            setUsers(response.data);
        } catch (error: any) {
            console.error('Échec de la récupération des utilisateurs:', error);
        }
    };

    const fetchUserCommands = async (userId: number) => {
        try {
            const response = await axios.get<Command[]>(`/api/orders/displayArchived?ClientID=${userId}`);
            setCommands((prev) => ({ ...prev, [userId]: response.data }));
        } catch (error: any) {
            console.error('Échec de la récupération des commandes:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleUserDetails = (userId: number) => {
        setVisibleUser(visibleUser === userId ? null : userId);
        if (visibleCommands === userId) {
            setVisibleCommands(null);
        }
    };

    const toggleUserCommands = (userId: number) => {
        if (visibleCommands === userId) {
            setVisibleCommands(null);
        } else {
            fetchUserCommands(userId);
            setVisibleCommands(userId);
        }
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            await axios.post('/api/users/updateRole', { ClientID: userId, Role: newRole });
            fetchUsers(); // Refresh the list of users to reflect the change
        } catch (error: any) {
            console.error('Échec de la mise à jour du rôle de l\'utilisateur:', error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await axios.post('/api/users/delete', { ClientID: userId });
            fetchUsers(); // Refresh the list of users after deletion
        } catch (error: any) {
            console.error('Échec de la suppression de l\'utilisateur:', error);
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

    const renderUserCommands = (userId: number) => {
        const userCommands = commands[userId] || [];

        return (
            <div className="p-4 bg-gray-200 rounded-md shadow-md mt-2">
                <h3 className="font-bold mb-2">Previous Commands:</h3>
                <ul>
                    {userCommands.map((command) => (
                        <li key={command.CommandeID} className="mb-2">
                            <p><strong>Order ID:</strong> {command.CommandeID}</p>
                            <p><strong>Date:</strong> {new Date(command.DateHeureCommande).toLocaleString()}</p>
                            <p><strong>Total Amount:</strong> {command.TotalCommande ? command.TotalCommande.toFixed(2) : '0.00'}€</p>
                            <p><strong>Status:</strong> {command.Statut}</p>
                            <p><strong>Details:</strong></p>
                            <ul>
                                {command.Details.map((detail, index) => (
                                    <li key={index} className="ml-4">
                                        <p><strong>Article:</strong> {detail.Article}</p>
                                        <ul>
                                            {Object.entries(detail.Options).map(([key, value]) => (
                                                <li key={key}>{`${key}: ${value}`}</li>
                                            ))}
                                        </ul>
                                        <p><strong>Article Price:</strong> {detail.ArticlePrice.toFixed(2)}€</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderUserDetails = (user: User) => {
        return (
            <div className="p-4 bg-gray-100 rounded-md shadow-md text-black">
                <p><strong>ID Client:</strong> {user.ClientID}</p>
                <p><strong>Nom d'utilisateur:</strong> {user.Username}</p>
                <p><strong>Email:</strong> {user.Email}</p>
                {user.Phone && <p><strong>Téléphone:</strong> {user.Phone}</p>}
                {user.Adress && <p><strong>Adresse:</strong> {user.Adress}</p>}
                <p><strong>Rôle:</strong> {user.Role}</p>
                <p><strong>Nombre total de commandes:</strong> {user.totalOrders}</p>
                <p><strong>Montant total dépensé:</strong> {user.totalAmountSpent.toFixed(2)}€</p>
                <p><strong>Date de la dernière commande:</strong> {new Date(user.lastOrderDate).toLocaleString()}</p>
                <div className="flex space-x-2 mt-2">
                    {user.Role !== 'admin' ? (
                        <button 
                            onClick={() => handleRoleChange(user.ClientID, 'admin')}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Accorder le rôle d'admin
                        </button>
                    ) : (
                        <button 
                            onClick={() => handleRoleChange(user.ClientID, 'user')}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Révoquer le rôle d'admin
                        </button>
                    )}
                    <button 
                        onClick={() => handleDeleteUser(user.ClientID)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Supprimer l'utilisateur
                    </button>
                    <button 
                        onClick={() => toggleUserCommands(user.ClientID)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        {visibleCommands === user.ClientID ? 'Masquer les commandes' : 'Afficher les commandes'}
                    </button>
                </div>
                {visibleCommands === user.ClientID && renderUserCommands(user.ClientID)}
            </div>
        );
    };

    return (
        <div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Utilisateurs:</h2>
                <div className="flex space-x-4 mb-4">
                    <button 
                        onClick={sortByMostOrders} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Trier par nombre de commandes
                    </button>
                    <button 
                        onClick={sortByMostMoneySpent} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Trier par montant dépensé
                    </button>
                    <button 
                        onClick={sortByLastOrder} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Trier par date de la dernière commande
                    </button>
                </div>
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li key={user.ClientID} className="bg-white p-4 rounded-md shadow-md text-black">
                            <div className="flex justify-between items-center">
                                <span>{`Utilisateur #${user.ClientID}`}</span>
                                <button 
                                    onClick={() => toggleUserDetails(user.ClientID)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    {visibleUser === user.ClientID ? 'Masquer les détails' : 'Afficher les détails'}
                                </button>
                            </div>
                            {visibleUser === user.ClientID && renderUserDetails(user)}
                        </li>
                    ))}
                </ul>
            
            <button 
                onClick={() => router.push('/dashboard/adminInterface')} 
                className="mt-8 px-4 py-2 bg-purple-500 text-white rounded-md"
            >
                Page des commandes
            </button>
            </div>
        </div>
    );
};

export default withAdminAuth(Users);
