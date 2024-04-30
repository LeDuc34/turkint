
"use client"
import {useRouter} from 'next/navigation'


const BasketButton = () => {
    const router = useRouter()
    const HandleSubmit = () => {
        router.push('/basket')
    }
    return(
        <div>
            <button onClick={HandleSubmit}>Mon Panier</button>
        </div>
    )
}
export default BasketButton