"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { withAuth } from '../authContext/page';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../stripeElement/page';
import ClearButton from '../clearBaksetButton/page';
import '../../../styles/globals.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface Article {
    Article: string;
    Options: { [key: string]: string }; // Change Options to be an object with key-value pairs
    ArticlePrice: number;
}

interface Basket {
    BasketID: number;
    ClientID: number;
    Articles: Article[];
    TotalPrice: number;
    Payed: boolean;
}

interface BasketResponse {
    Basket: Basket;
}

const BasketPage = () => {
    const router = useRouter();
    const [basket, setBasket] = useState<Basket | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('online'); // New state for payment method

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const clientID = localStorage.getItem('ClientID');
                if (!clientID) throw new Error("ID client non défini dans localStorage.");
                const response = await axios.get<BasketResponse>('/api/baskets/display', {
                    params: { ClientID: clientID }
                });
                setBasket(response.data.Basket);
            } catch (err) {
                console.error('Panier vide', err);
                setError('Panier vide');
            }
        };

        fetchBasket();
    }, []);

    const handleDeleteArticle = async (articleIndex: number) => {
        try {
            const clientID = localStorage.getItem('ClientID');
            if (!clientID) throw new Error("ID client non défini dans localStorage.");
            const updatedArticles = basket?.Articles.filter((_, index) => index !== articleIndex) || [];
            const updatedTotalPrice = updatedArticles.reduce((total, article) => total + article.ArticlePrice, 0);
            
            // Update the basket on the backend
            await axios.post('/api/baskets/update', {
                ClientID: clientID,
                Articles: updatedArticles,
                TotalPrice: updatedTotalPrice,
            });

            // Update the basket state
            setBasket((prevBasket) => prevBasket ? { 
                ...prevBasket, 
                Articles: updatedArticles, 
                TotalPrice: updatedTotalPrice 
            } : null);
        } catch (err) {
            console.error('Échec de la suppression de l\'article', err);
            setError('Échec de la suppression de l\'article');
        }
    };

    const handleSendOrder = async () => {
        if (!basket || basket.Articles.length === 0) {
            setError('Impossible d\'envoyer la commande: Panier vide.');
            return;
        }

        if (paymentMethod === 'online') {
            try {
                const clientID = localStorage.getItem('ClientID');
                if (!clientID) throw new Error("ID client non défini dans localStorage.");
                
                const response = await axios.post('/api/payments/paymentIntent', {
                    clientID: clientID,
                    amount: basket?.TotalPrice,
                });

                setClientSecret(response.data.clientSecret);
            } catch (err) {
                console.error('Échec de l\'initiation du paiement', err);
                setError('Échec de l\'initiation du paiement');
            }
        } else {
            await handleOrderPlaced();
        }
    };

    const handleOrderPlaced = async () => {
        try {
            // Retrieve clientID from localStorage
            const clientID = localStorage.getItem('ClientID');
            if (!clientID) throw new Error("ID client non défini dans localStorage.");
            
            // Debugging output
            console.log('ID Client:', clientID);
            
            // Send order details to the backend
            const response = await axios.post('/api/orders/send', {
                ClientID: clientID,  // Ensure the key matches what your backend expects
                DateHeureCommande: new Date().toISOString(),
                Statut: "waiting",
                TotalCommande: basket?.TotalPrice,
                Details: basket?.Articles,
                Attente: 100000000,
                Payed: paymentMethod === 'online',
            });
    
            // Log response and update UI
            console.log('Commande envoyée avec succès:', response.data);
            setOrderPlaced(true);
            
            // Clear the basket
            await axios.get(`/api/baskets/clear?ClientID=${clientID}`);
            
            // Redirect to order tracking page
            console.log('ID de commande:', response.data.CommandeID);
            router.push(`/orderTracking?orderID=${response.data.CommandeID}`);
        } catch (err) {
            console.error('Échec de l\'envoi de la commande', err);
            setError('Échec de l\'envoi de la commande');
        }
    };

    const handleReturnToOrderPage = () => {
        router.push('/userInterface');
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!basket) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Votre Panier</h1>
            {orderPlaced && <p className="text-green-500">Commande passée avec succès</p>}
            <div className="mb-4 p-4 border rounded bg-white shadow-sm">
                <strong>Prix Total:</strong> {basket?.TotalPrice.toFixed(2)}€
            </div>
            <ul className="space-y-4 bg-white p-4 rounded">
                {basket.Articles.map((article, index) => (
                    <li key={index} className="p-4 border rounded shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p><strong>Article:</strong> {article.Article}</p>
                                <p><strong>Prix:</strong> {article.ArticlePrice.toFixed(2)}€</p>
                                <p><strong>Options:</strong></p>
                                <ul className="list-disc pl-5">
                                    {article.Options && Object.keys(article.Options).length > 0 ? (
                                        Object.entries(article.Options).map(([key, value]) => (
                                            <li key={key}>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                            </li>
                                        ))
                                    ) : (
                                        <li>Pas d'options disponibles</li>
                                    )}
                                </ul>
                            </div>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDeleteArticle(index)}
                            >
                                Supprimer
                            </button>
                            
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <div className="mb-4">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="online"
                            checked={paymentMethod === 'online'}
                            onChange={() => setPaymentMethod('online')}
                        />
                        Payer en ligne
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="restaurant"
                            checked={paymentMethod === 'restaurant'}
                            onChange={() => setPaymentMethod('restaurant')}
                        />
                        Payer au restaurant
                    </label>
                </div>
                {!clientSecret && (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSendOrder}
                    >
                        Envoyer la commande
                    </button>
                )}
                {clientSecret && paymentMethod === 'online' && (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm clientSecret={clientSecret} handleOrderPlaced={handleOrderPlaced} />
                    </Elements>
                )}
                <button
                    className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleReturnToOrderPage}
                >
                    Retour à la page de commande
                </button>
                <ClearButton/>
            </div>
            
        </div>
    );
};

export default withAuth(BasketPage);
