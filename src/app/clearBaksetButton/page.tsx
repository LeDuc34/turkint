
"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'

const clearButton = () =>{
    const router = useRouter();
    const HandleSubmit = () => {
        axios.get('/api/baskets/clear?ClientID='+localStorage.getItem('ClientID'))
        router.push('/userInterface');
    }
    return(
        <div>
            <button   className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={HandleSubmit}>Supprimer mon panier</button>
        </div>
)
}
export default clearButton;