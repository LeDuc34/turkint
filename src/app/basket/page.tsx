"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { withAuth } from '../authContext/page';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../stripeElement/page';
import '../../../styles/globals.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface Article {
    Article: string;
    Options: string[];
    ArticlePrice: number;
}

interface Basket {
    BasketID: number;
    ClientID: number;
    Articles: Article[];
    TotalPrice: number;
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

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const clientID = localStorage.getItem('ClientID');
                if (!clientID) throw new Error("Client ID is not set in localStorage.");
                const response = await axios.get<BasketResponse>('/api/baskets/display', {
                    params: { ClientID: clientID }
                });
                setBasket(response.data.Basket);
            } catch (err) {
                console.error('Empty Basket', err);
                setError('Empty Basket');
            }
        };

        fetchBasket();
    }, []);

    const handleSendOrder = async () => {
        try {
            const clientID = localStorage.getItem('ClientID');
            if (!clientID) throw new Error("Client ID is not set in localStorage.");
            
            const response = await axios.post('/api/payments/paymentIntent', {
                clientID: clientID,
                amount: basket?.TotalPrice,
            });

            setClientSecret(response.data.clientSecret);
        } catch (err) {
            console.error('Failed to initiate payment', err);
            setError('Failed to initiate payment');
        }
       handleOrderPlaced(); // here for test remove for the final version
    };

    const handleOrderPlaced = async () => {
        try {
            const clientID = localStorage.getItem('ClientID');
            if (!clientID) throw new Error("Client ID is not set in localStorage.");

            const response = await axios.post('/api/orders/send', {
                clientID: clientID,
                DateHeureCommande: new Date().toISOString(),
                Statut: "waiting",
                TotalCommande: basket?.TotalPrice,
                Details: basket?.Articles,
            });

            console.log('Order sent successfully:', response.data);
            setOrderPlaced(true);
            axios.get('/api/baskets/clear?ClientID=' + clientID); // Clear basket
            
            // Redirect to order tracking page
            console.log('Order ID:', response.data.CommandeID);
            router.push(`/orderTracking?orderID=${response.data.CommandeID}`);
        } catch (err) {
            console.error('Failed to send order', err);
            setError('Failed to send order');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!basket) {
        return <p>Loading...</p>;
    }

    return (
        <div class="flex items-center justify-center">
            <h1>Your Basket</h1>
            {orderPlaced && <p>Commande passée avec succès</p>}
            <div>
                <strong>Total Price:</strong> ${basket?.TotalPrice.toFixed(2)}
            </div>
            <ul>
                {basket.Articles.map((article, index) => (
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
            {!clientSecret ? (
                <button onClick={handleSendOrder}>Send Order</button>
            ) : (
                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} handleOrderPlaced={handleOrderPlaced} />
                </Elements>
            )}
        </div>
    );
};

export default withAuth(BasketPage);
