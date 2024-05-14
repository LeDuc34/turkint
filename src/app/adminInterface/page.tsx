"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';

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
    Details: Article[]; // Array of Articles
}

const Home = () => {
    const [waitingOrders, setWaitingOrders] = useState<Order[]>([]);
    const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
    const [readyOrders, setReadyOrders] = useState<Order[]>([]);
    const [visibleOrder, setVisibleOrder] = useState<number | null>(null);

    const fetchOrders = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<Order[]>>) => {
        try {
            const response = await axios.get<Order[]>(`/api/orders/${endpoint}`);
            console.log(`Fetched ${endpoint} orders: `, response.data); // Debugging statement
            setter(response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data.message || 'An unknown error occurred');
            } else {
                console.error('Unexpected error:', error);
            }
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
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const toggleOrderDetails = (orderId: number) => {
        setVisibleOrder(visibleOrder === orderId ? null : orderId);
    };

    const handleStatusUpdate = async (orderId: number, newStatus: string) => {
        try {
            await axios.post('/api/orders/update', {
                CommandeID: orderId,
                Statut: newStatus
            });
            // Fetch updated orders
            fetchOrders('waiting', setWaitingOrders);
            fetchOrders('processing', setCurrentOrders);
            fetchOrders('ready', setReadyOrders);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data.message || 'An unknown error occurred');
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const renderOrderDetails = (order: Order) => {
        return (
            <div>
                <p>Client ID: {order.ClientID}</p>
                <p>Date/Time: {order.DateHeureCommande}</p>
                <p>Status: {order.Statut}</p>
                <p>Total: ${order.TotalCommande.toFixed(2)}</p>
                <div>
                    <h4>Articles:</h4>
                    <ul>
                        {order.Details.length === 0 ? (
                            <li>No articles available</li>
                        ) : (
                            order.Details.map((article, index) => (
                                <li key={index}>
                                    <strong>{article.Article}</strong> - Options: {JSON.stringify(article.Options)}, ${article.ArticlePrice.toFixed(2)}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div>
                <h2>Commande en attente :</h2>
                <ul>
                    {waitingOrders.map((order) => (
                        <li key={order.CommandeID}>
                            {`Order #${order.CommandeID}`}
                            <button onClick={() => toggleOrderDetails(order.CommandeID)}>
                                {visibleOrder === order.CommandeID ? 'Hide Details' : 'Show Details'}
                            </button>
                            {visibleOrder === order.CommandeID && renderOrderDetails(order)}
                            <button onClick={() => handleStatusUpdate(order.CommandeID, 'processing')}>Mark as Processing</button>
                        </li>
                    ))}
                </ul>
            </div>
                
            <div>
                <h2>Commande en cours :</h2>
                <ul>
                    {currentOrders.map((order) => (
                        <li key={order.CommandeID}>
                            {`Order #${order.CommandeID}`}
                            <button onClick={() => toggleOrderDetails(order.CommandeID)}>
                                {visibleOrder === order.CommandeID ? 'Hide Details' : 'Show Details'}
                            </button>
                            {visibleOrder === order.CommandeID && renderOrderDetails(order)}
                            <button onClick={() => handleStatusUpdate(order.CommandeID, 'waiting')}>Mark as Waiting</button>
                            <button onClick={() => handleStatusUpdate(order.CommandeID, 'ready')}>Mark as Ready</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Commande prête :</h2>
                <ul>
                    {readyOrders.map((order) => (
                        <li key={order.CommandeID}>
                            {`Order #${order.CommandeID}`}
                            <button onClick={() => toggleOrderDetails(order.CommandeID)}>
                                {visibleOrder === order.CommandeID ? 'Hide Details' : 'Show Details'}
                            </button>
                            {visibleOrder === order.CommandeID && renderOrderDetails(order)}
                            <button onClick={() => handleStatusUpdate(order.CommandeID, 'processing')}>Mark as Processing</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
