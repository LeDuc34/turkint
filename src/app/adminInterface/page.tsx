"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../../../styles/globals.css'; 
import { withAdminAuth } from '../authContextAdmin/page';

interface Article {
    Article: string;
    Options: any;
    ArticlePrice: number;
}

interface Order {
    CommandeID: number;
    ClientID: number | null;
    DateHeureCommande: string;
    Statut: string;
    TotalCommande: number;
    Details: Article[];
    Attente: number; // Change Attente to be a number representing remaining time in seconds
}

const Home = () => {
    const [waitingOrders, setWaitingOrders] = useState<Order[]>([]);
    const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
    const [readyOrders, setReadyOrders] = useState<Order[]>([]);
    const [visibleOrder, setVisibleOrder] = useState<number | null>(null);
    const [timerDurations, setTimerDurations] = useState<{ [key: number]: number }>({});

    const fetchOrders = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<Order[]>>) => {
        try {
            const response = await axios.get<Order[]>(`/api/orders/${endpoint}`);
            setter(response.data);
        } catch (error: any) {
            console.error('Failed to fetch orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders('waiting', setWaitingOrders);
        fetchOrders('processing', setCurrentOrders);
        fetchOrders('ready', setReadyOrders);

        const intervalId = setInterval(() => {
            fetchOrders('waiting', setWaitingOrders);
            fetchOrders('processing', setCurrentOrders);
            fetchOrders('ready', setReadyOrders);
        }, 2000); // Fetch orders every 20 seconds

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentOrders((orders) =>
                orders.map(order => {
                    if (order.Attente > 0) {
                        const newAttente = order.Attente - 1;

                        if (newAttente <= 0) {
                            // Move order to "ready" section and update status
                            handleStatusUpdate(order.CommandeID, 'ready');
                            return { ...order, Attente: 0, Statut: 'ready' };
                        }

                        // Update the server with the new remaining time
                        axios.post('/api/orders/updateTimer', {
                            CommandeID: order.CommandeID,
                            Attente: newAttente,
                        }).catch(error => {
                            console.error('Failed to update timer:', error);
                        });

                        return { ...order, Attente: newAttente };
                    }
                    return order;
                })
            );
        }, 1000); // Decrement every second

        return () => clearInterval(intervalId);
    }, [currentOrders]);

    const toggleOrderDetails = (orderId: number) => {
        setVisibleOrder(visibleOrder === orderId ? null : orderId);
    };

    const handleStatusUpdate = async (orderId: number, newStatus: string) => {
        try {
            const duration = timerDurations[orderId] || 60; // Default to 5 minutes if no duration is set
            const attente = duration * 60;
            await axios.post('/api/orders/update', {
                CommandeID: orderId,
                Statut: newStatus,
                Attente: attente,
            });
            fetchOrders('waiting', setWaitingOrders);
            fetchOrders('processing', setCurrentOrders);
            fetchOrders('ready', setReadyOrders);
        } catch (error: any) {
            console.error('Failed to update status:', error);
        }
    };

    const handleSetTimer = async (orderId: number) => {
        const duration = timerDurations[orderId];
        if (duration && duration > 0) {
            try {
                await axios.post('/api/orders/updateTimer', {
                    CommandeID: orderId,
                    Attente: duration * 60, // Store the remaining time directly in seconds
                });
                fetchOrders('waiting', setWaitingOrders);
                fetchOrders('processing', setCurrentOrders);
                fetchOrders('ready', setReadyOrders);
            } catch (error: any) {
                console.error('Failed to set timer:', error);
            }
        }
    };

    const handleDeleteOrder = async (orderId: number) => {
        try {
            await axios.post('/api/orders/delete',{CommandeID : orderId});
            setReadyOrders(readyOrders.filter(order => order.CommandeID !== orderId));
        } catch (error: any) {
            console.error('Failed to delete order:', error);
        }
    };

    const getRemainingTime = (duration: number) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        if (duration <= 0) {
            return "Time's up!";
        }
        return `${minutes}m ${seconds}s`;
    };

    const formatOptions = (options: any) => {
        return Object.entries(options)
            .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
            .join(', ');
    };

    const renderOrderDetails = (order: Order) => {
        return (
            <div className="p-4 bg-gray-100 rounded-md shadow-md text-black">
                <p><strong>Client ID:</strong> {order.ClientID}</p>
                <p><strong>Date/Time:</strong> {order.DateHeureCommande}</p>
                <p><strong>Status:</strong> {order.Statut}</p>
                <p><strong>Total:</strong> ${order.TotalCommande.toFixed(2)}</p>
                <div>
                    <h4 className="font-bold">Articles:</h4>
                    <ul className="list-disc pl-6">
                        {order.Details.length === 0 ? (
                            <li>No articles available</li>
                        ) : (
                            order.Details.map((article, index) => (
                                <li key={index}>
                                    <strong>{article.Article}</strong> - Options: {formatOptions(article.Options)}, ${article.ArticlePrice.toFixed(2)}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Commande en attente :</h2>
                <ul className="space-y-4">
                    {waitingOrders.map((order) => (
                        <li key={order.CommandeID} className="bg-white p-4 rounded-md shadow-md text-black">
                            <div className="flex justify-between items-center">
                                <span>{`Order #${order.CommandeID}`}</span>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => toggleOrderDetails(order.CommandeID)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        {visibleOrder === order.CommandeID ? 'Hide Details' : 'Show Details'}
                                    </button>
                                    <button 
                                        onClick={() => handleStatusUpdate(order.CommandeID, 'processing')}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        Mark as Processing
                                    </button>
                                </div>
                            </div>
                            {visibleOrder === order.CommandeID && renderOrderDetails(order)}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Commande en cours :</h2>
                <ul className="space-y-4">
                    {currentOrders.map((order) => (
                        <li key={order.CommandeID} className="bg-white p-4 rounded-md shadow-md text-black">
                            <div className="flex justify-between items-center">
                                <span>{`Order #${order.CommandeID}`}</span>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => toggleOrderDetails(order.CommandeID)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        {visibleOrder === order.CommandeID ? 'Hide Details' : 'Show Details'}
                                    </button>
                                    <button 
                                        onClick={() => handleStatusUpdate(order.CommandeID, 'waiting')}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                                    >
                                        Mark as Waiting
                                    </button>
                                    <button 
                                        onClick={() => handleStatusUpdate(order.CommandeID, 'ready')}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        Mark as Ready
                                    </button>
                                </div>
                            </div>
                            {visibleOrder === order.CommandeID && (
                                <div className="mt-4">
                                    {renderOrderDetails(order)}
                                    <div className="mt-4">
                                        <input
                                            type="number"
                                            placeholder="Set timer (minutes)"
                                            value={timerDurations[order.CommandeID] || ''}
                                            onChange={(e) => setTimerDurations({ ...timerDurations, [order.CommandeID]: parseInt(e.target.value) })}
                                            className="p-2 border rounded w-full"
                                        />
                                        <button 
                                            onClick={() => handleSetTimer(order.CommandeID)} 
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Set Timer
                                        </button>
                                    </div>
                                    {order.Statut === 'processing' && order.Attente < 10000 && order.Attente > 0 && (
                                        <p className="mt-2 text-red-500">Remaining Time: {getRemainingTime(order.Attente)}</p>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Commande prête :</h2>
                <ul className="space-y-4">
                    {readyOrders.map((order) => (
                        <li key={order.CommandeID} className="bg-white p-4 rounded-md shadow-md text-black">
                            <div className="flex justify-between items-center">
                                <span>{`Order #${order.CommandeID}`}</span>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => toggleOrderDetails(order.CommandeID)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        {visibleOrder === order.CommandeID ? 'Hide Details' : 'Show Details'}
                                    </button>
                                    <button 
                                        onClick={() => handleStatusUpdate(order.CommandeID, 'processing')}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                                    >
                                        Mark as Processing
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteOrder(order.CommandeID)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {visibleOrder === order.CommandeID && renderOrderDetails(order)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default withAdminAuth(Home);
