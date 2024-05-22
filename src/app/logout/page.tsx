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
            <button  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
