
"use client"
import {useRouter} from 'next/navigation'


const BasketButton = () => {
    const router = useRouter()
    const HandleSubmit = () => {
        router.push('/basket')
    }
    return(
        <div>
            <button  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={HandleSubmit}>Mon Panier</button>
        </div>
    )
}
export default BasketButton