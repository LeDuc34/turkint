"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { withAuth } from '../authContext/page'


interface Article {
    Article: string;
    Options: string[];  // Updated to reflect potential data issues
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
    const [basket, setBasket] = useState<Basket | null>(null);
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
                console.log(basket);
            } catch (err) {
                console.error('Failed to fetch basket', err);
                setError('Failed to fetch basket');
            }
        };

        fetchBasket();
    }, []);

    const handleSendOrder = async () => {
        try {
            const clientID = localStorage.getItem('ClientID');
            if (!clientID) throw new Error("Client ID is not set in localStorage.");
            
            // Make a POST request to the backend endpoint with the basket data
            const response = await axios.post('/api/orders/send', {
                clientID: clientID,
                basket: basket
            });

            // Handle the response as needed
            console.log('Order sent successfully:', response.data);
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
        <div>
            <h1>Your Basket</h1>
            <div>
                <strong>Total Price:</strong> ${basket?.TotalPrice.toFixed(2)}
            </div>
            <ul>
                {basket.Articles.map((article, index) => (
                    <li key={index}>
                        <strong>Price:</strong> ${article.ArticlePrice.toFixed(2)} -
                        <strong>Options:</strong> <ul>
                            {article.Options && typeof article.Options === 'object' && Object.keys(article.Options).length > 0 ? (
                                Object.entries(article.Options).map(([key, value]) => (
                                    <li key={key}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:{value}
                                    </li>
                                ))
                            ) : (
                                <li>No options available</li>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
            <button onClick={handleSendOrder}>Send Order</button>
        </div>
    );
};

export default withAuth(BasketPage);
