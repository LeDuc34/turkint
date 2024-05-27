"use client"
import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
    clientSecret: string;
    handleOrderPlaced: () => void;
}

const CheckoutForm = ({ clientSecret, handleOrderPlaced }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            console.error("Stripe.js hasn't loaded yet or no client secret.");
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement!,
                billing_details: {
                    name: "Jenny Rosen",
                },
            },
        });

        if (error) {
            console.error("Payment error:", error.message);
            setError("Payment failed. Please try again.");
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("Payment succeeded!");
            handleOrderPlaced();
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded shadow-md mx-auto my-10">
            <h2 className="text-2xl font-semibold mb-4">Paiement</h2>
            <div className="mb-4">
                <CardElement
                    className="p-3 border border-gray-300 rounded"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': {
                                    color: '#a0aec0',
                                },
                            },
                            invalid: {
                                color: '#fa755a',
                            },
                        },
                    }}
                />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button type="submit" disabled={!stripe || isProcessing} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                {isProcessing ? 'Processing...' : 'Payer'}
            </button>
        </form>
    );
};

export default CheckoutForm;
