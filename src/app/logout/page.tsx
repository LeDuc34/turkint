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
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
