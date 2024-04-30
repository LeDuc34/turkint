
"use client"
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation'
import axios from 'axios'




const clearButton = () =>{
    const HandleSubmit = () => {
        axios.get('api/baskets/clear?ClientID='+localStorage.getItem('ClientID'))
    }
    return(
        <div>
            <button onClick={HandleSubmit}>Supprimer mon panier</button>
        </div>
)
}

const BasketPage = async () =>{
    const [basket, setBasket] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await axios.get('/api/baskets/display?ClientID='+localStorage.getItem('CientID'));
            } catch (err) {
                setError('Failed to fetch basket');
                console.error(err);
            }
        };

        fetchBasket();
    }, []);

    if (error) return <p>{error}</p>;
    if (!basket) return <p>Loading...</p>;

    return (
        <div>
            <h1>Your Basket</h1>
        </div>
    );
}

export default BasketPage