
"use client"
import { useRouter } from "next/navigation";
import Header from "./header";

function Home() {
  const router = useRouter();

  const handleSubmit = async() => {
    router.push("/userInterface")
  }
  return (
    <div>
    <Header />
    <div className="flex flex-col items-center justify-center items-center h-screen">
      <div className="w-80 items-center">
        <img src="logo.png"></img>
        <div className="flex items-center justify-center">
          <button onClick={handleSubmit} type="button" className="text-white font-extrabold flex justify-center w-50 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-50 font-medium rounded-full text-3xl w-60 py-5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Commander</button>
        </div>
      </div>
      </div>
      <footer className="fixed bottom-0 bg-red-600 shadow mt-2 w-full">
        <div className="container mx-auto py-4 px-4 text-center">
            <p className="text-gray-100">&copy; 2024 Turkint. Tous droits réservés.</p>
        </div>
    </footer>

    </div>
    
  )
}
export default Home;


