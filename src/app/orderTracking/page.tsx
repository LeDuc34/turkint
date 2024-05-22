"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { withAuth } from '../authContext/page';

interface Article {
    Article: string;
    Options: string[];
    ArticlePrice: number;
}
interface Order {
    CommandeID: number;
    ClientID: number;
    DateHeureCommande: string;
    Statut: string;
    TotalCommande: number;
    Details: Article[];
    Attente: number; // Change Attente to be a number representing remaining time in seconds
}

const OrderTrackingPage = () => {
    const searchParams = useSearchParams();
    const orderID = searchParams.get('orderID');
    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState<string>('');

    const fetchOrder = async () => {
        if (!orderID) return;

        try {
            const response = await axios.get<Order>(`/api/orders/getInfos?CommandeID=${orderID}`);
            setOrder(response.data);
        } catch (err) {
            console.error('Failed to fetch order', err);
            setError('Failed to fetch order');
        }
    };

    useEffect(() => {
        fetchOrder();
        const interval = setInterval(fetchOrder, 1000); // Fetch order details every 10 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [orderID]);

    useEffect(() => {
        if (order && order.Attente <= 0 && order.Statut !== 'ready') {
            const updateOrderStatus = async () => {
                try {
                    await axios.post('/api/orders/update', {
                        CommandeID: order.CommandeID,
                        Statut: 'ready',
                        Attente: 0
                    });
                    setOrder((prevOrder) => prevOrder ? { ...prevOrder, Statut: 'ready', Attente: 0 } : null);
                } catch (err) {
                    console.error('Failed to update order status', err);
                }
            };

            updateOrderStatus();
        }
    }, [order]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Loading...</p>;
    }

    const showRemainingTime = order.Attente <= 10000; // Show remaining time if it is less than or equal to 15 minutes

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
            <div className="mb-2">
                <strong>Order ID:</strong> {order.CommandeID}
            </div>
            <div className="mb-2">
                <strong>Status:</strong> {order.Statut === 'ready' ? 'Order is ready' : order.Statut}
            </div>
            {showRemainingTime && (
                <div className="mb-2">
                    <strong>Remaining Time:</strong> {order.Attente > 0 ? formatTime(order.Attente) : 'Time is up!'}
                </div>
            )}
            <div className="mb-2">
                <strong>Total Price:</strong> ${order.TotalCommande.toFixed(2)}
            </div>
            <div className="mb-2">
                <strong>Ordered At:</strong> {new Date(order.DateHeureCommande).toLocaleString()}
            </div>
            <ul className="list-disc pl-6">
                {order.Details.map((article, index) => (
                    <li key={index}>
                        <strong>{article.Article}:</strong> ${article.ArticlePrice.toFixed(2)}
                        <ul className="list-disc pl-6">
                            {article.Options && article.Options.length > 0 ? (
                                article.Options.map((option, idx) => (
                                    <li key={idx}>
                                        {option}
                                    </li>
                                ))
                            ) : (
                                <li>No options available</li>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(OrderTrackingPage);
