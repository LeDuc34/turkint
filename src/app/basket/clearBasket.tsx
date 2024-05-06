
"use client"

import axios from 'axios'

const clearButton = () =>{
    const HandleSubmit = () => {
        axios.get('/api/baskets/clear?ClientID='+localStorage.getItem('ClientID'))
    }
    return(
        <div>
            <button onClick={HandleSubmit}>Supprimer mon panier</button>
        </div>
)
}
export default clearButton