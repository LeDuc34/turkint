
"use client"

import axios from 'axios'

const clearButton = () =>{
    const HandleSubmit = () => {
        axios.get('/api/baskets/clear?ClientID='+localStorage.getItem('ClientID'))
    }
    return(
        <div>
            <button   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={HandleSubmit}>Supprimer mon panier</button>
        </div>
)
}
export default clearButton