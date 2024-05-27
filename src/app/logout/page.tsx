'use client'
import { useRouter } from 'next/navigation'

const Logout = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    return (
        <div>
            <button  className="mt-4 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900" onClick={handleLogout}>Déconnexion</button>
        </div>
    );
};

export default Logout;
