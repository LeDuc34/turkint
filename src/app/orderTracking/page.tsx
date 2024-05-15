"use client"
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
}

const OrderTrackingPage = () => {
    const searchParams = useSearchParams();
    const orderID = searchParams.get('orderID');
    console.log(orderID);
    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
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

        fetchOrder();
    }, [orderID]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Order Tracking</h1>
            <div>
                <strong>Order ID:</strong> {order.CommandeID}
            </div>
            <div>
                <strong>Status:</strong> {order.Statut}
            </div>
            <div>
                <strong>Total Price:</strong> ${order.TotalCommande.toFixed(2)}
            </div>
            <div>
                <strong>Ordered At:</strong> {new Date(order.DateHeureCommande).toLocaleString()}
            </div>
            <ul>
                {order.Details.map((article, index) => (
                    <li key={index}>
                        <strong>Price:</strong> ${article.ArticlePrice.toFixed(2)} -
                        <strong>Options:</strong>
                        <ul>
                            {article.Options && typeof article.Options === 'object' && Object.keys(article.Options).length > 0 ? (
                                Object.entries(article.Options).map(([key, value]) => (
                                    <li key={key}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
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
