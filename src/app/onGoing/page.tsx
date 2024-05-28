'use client'
import { useRouter } from 'next/navigation'

const onGoing = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/orderTracking');
    };

    return (
        <div>
            <button  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-800" onClick={handleLogout}>Mes commandes en cours</button>
        </div>
    );
};

export default onGoing;