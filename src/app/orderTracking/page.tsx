"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { withAuth } from '../authContext/page';
import { useRouter } from "next/navigation";
import Header from "../header";
import { motion } from 'framer-motion';

interface Article {
    Article: string;
    Options: { [key: string]: string }; // Change Options to be an object with key-value pairs
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
    Payed: boolean;
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
            console.log('Order data:', response.data); // Log the fetched order data
            setOrder(response.data);
        } catch (err) {
            console.error('Failed to fetch order', err);
            setError('Échec de la récupération de la commande');
        }
    };

    useEffect(() => {
        fetchOrder();
        const interval = setInterval(fetchOrder, 5000); // Fetch order details every 5 seconds

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

    const router = useRouter();

    const handleSubmit = async() => {
        router.push("/userInterface")
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Chargement...</p>;
    }

     
    const translateStatus = (status: string) => {
        switch (status) {
            case 'processing':
                return 'En cours';
            case 'waiting':
                return 'En attente';
            default:
                return status;
        }
    };

    const showRemainingTime = order.Attente <= 10000; // Show remaining time if it is less than or equal to 15 minutes

    return (
    <div className="my-40">
    <Header/>
    <div className="flex items-center justify-center mt-5">
    <div className="flex flex-col items-center">
        <div className="p-6 bg-white rounded bg-opacity-80 w-90 mx-auto flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Suivi de Commande</h1>
            <div className="mb-2">
                <strong>ID de Commande:</strong> {order.CommandeID}
            </div>
            <div className="mb-2">
                <strong>Statut:</strong> {order.Statut === 'ready' ? 'Commande prête' : translateStatus(order.Statut)}
            </div>
            {showRemainingTime && (
                <div className="mb-2">
                    <strong>Temps Restant:</strong> {order.Attente > 0 ? formatTime(order.Attente) : 'Le temps est écoulé !'}
                </div>
            )}
            <div className="mb-2">
                <strong>Prix Total:</strong> {order.TotalCommande.toFixed(2)}€
            </div>
            <div className="mb-2">
                <strong>Commandé à:</strong> {new Date(order.DateHeureCommande).toLocaleString()}
            </div>
            <div className="mb-2">
                <strong>Payé:</strong> {order.Payed ? 'Oui' : 'Non'}
            </div>
            <ul className="list-disc pl-6">
                {order.Details.map((article, index) => (
                    <li key={index}>
                        <strong>{article.Article}:</strong> {article.ArticlePrice.toFixed(2)}€
                        {article.Options && Object.keys(article.Options).length > 0 ? (
                            <ul className="list-disc pl-6">
                                {Object.entries(article.Options).map(([key, value], idx) => (
                                    <li key={idx}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>Aucune option disponible</div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-red-500 mb-24 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" onClick={handleSubmit}>Commander à nouveau</button>
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
};

export default withAuth(OrderTrackingPage);
