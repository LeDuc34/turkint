'use client'
import { useRouter } from 'next/navigation'

const onGoing = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/orderTracking');
    };

    return (
        <div>
            <button  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800" onClick={handleClick}>Ma commande en cours</button>
        </div>
    );
};

export default onGoing;